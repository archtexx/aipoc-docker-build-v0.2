#!/usr/bin/env python3
import os
import glob
from constants import *
from typing import List
from multiprocessing import Pool
from tqdm import tqdm
from utils import *
from langchain.embeddings import OpenAIEmbeddings
import logging
from langchain.document_loaders import (
    CSVLoader,
    EverNoteLoader,
    PyPDFLoader,
    TextLoader,
    UnstructuredEmailLoader,
    UnstructuredEPubLoader,
    UnstructuredHTMLLoader,
    UnstructuredMarkdownLoader,
    UnstructuredODTLoader,
    UnstructuredPowerPointLoader,
    UnstructuredWordDocumentLoader,
)

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document
from constants import CHROMA_SETTINGS

#OPENAI_API_KEY = "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"

OPENAI_API_KEY = os.getenv("openai_api_key")
OPENAI_DEPLOYMENT_ENDPOINT = os.getenv("openai_api_base")
OPENAI_DEPLOYMENT_NAME = os.getenv("deployment_name")
OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL_NAME")
OPENAI_DEPLOYMENT_VERSION = os.getenv("openai_api_version")
OPENAI_API_type=os.getenv("openai_api_type")

embedmodelname=os.getenv("OPENAI_EMBEDMODEL")

embeddeployname=os.getenv("OPENAI_EMBEDdeployname")

load_dotenv()

chunk_size = 512
chunk_overlap = 200


# Custom document loaders
class MyElmLoader(UnstructuredEmailLoader):
    """Wrapper to fallback to text/plain when default does not work"""

    def load(self) -> List[Document]:
        """Wrapper adding fallback for elm without html"""
        try:
            try:
                doc = UnstructuredEmailLoader.load(self)
            except ValueError as e:
                if 'text/html content not found in email' in str(e):
                    # Try plain text
                    self.unstructured_kwargs["content_source"]="text/plain"
                    doc = UnstructuredEmailLoader.load(self)
                else:
                    raise
        except Exception as e:
            logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
            logging.info("Exception has occured")
            # Add file_path to exception message
            raise type(e)(f"{self.file_path}: {e}") from e

        return doc



LOADER_MAPPING = {
    ".csv": (CSVLoader, {}),
    # ".docx": (Docx2txtLoader, {}),
    ".doc": (UnstructuredWordDocumentLoader, {}),
    ".docx": (UnstructuredWordDocumentLoader, {}),
    ".enex": (EverNoteLoader, {}),
    ".eml": (MyElmLoader, {}),
    ".epub": (UnstructuredEPubLoader, {}),
    ".html": (UnstructuredHTMLLoader, {}),
    ".md": (UnstructuredMarkdownLoader, {}),
    ".odt": (UnstructuredODTLoader, {}),
    ".pdf": (PyPDFLoader, {}),
    ".ppt": (UnstructuredPowerPointLoader, {}),
    ".pptx": (UnstructuredPowerPointLoader, {}),
    ".txt": (TextLoader, {"encoding": "utf8"}),
    
}


def load_single_document(file_path: str) -> List[Document]:
    ext = "." + file_path.rsplit(".", 1)[-1]
    if ext in LOADER_MAPPING:
        loader_class, loader_args = LOADER_MAPPING[ext]
        loader = loader_class(file_path, **loader_args)
        return loader.load()

    raise ValueError(f"Unsupported file extension '{ext}'")

def load_documents(source_dir: str, ignored_files: List[str] = []) -> List[Document]:
    """
    Loads all documents from the source documents directory, ignoring specified files
    """
    all_files = []
    for ext in LOADER_MAPPING:
        all_files.extend(
            glob.glob(os.path.join(source_dir, f"**/*{ext}"), recursive=True)
        )
    filtered_files = [file_path for file_path in all_files if file_path not in ignored_files]

    with Pool(processes=os.cpu_count()) as pool:
        results = []
        with tqdm(total=len(filtered_files), desc='Loading new documents', ncols=80) as pbar:
            for i, docs in enumerate(pool.imap_unordered(load_single_document, filtered_files)):
                results.extend(docs)
                pbar.update()

    return results

def process_documents(ignored_files: List[str] = []) -> List[Document]:
    """
    Load documents and split in chunks
    """
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering process_documents method call ")
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    logging.debug(f'loading documents from  {SOURCE_DIRECTORY}')
    #print(f"Loading documents from {SOURCE_DIRECTORY}")
    documents = load_documents(SOURCE_DIRECTORY, ignored_files)
    if not documents:
        print("No new documents to load")
        exit(0)
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    logging.debug(f'Loaded documents new documents from {SOURCE_DIRECTORY}')
    #print(f"Loaded {len(documents)} new documents from {SOURCE_DIRECTORY}")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    texts = text_splitter.split_documents(documents)
    logging.debug(f'Split into {len(texts)} chunks of text (max. {chunk_size} tokens each)')
    #print(f"Split into {len(texts)} chunks of text (max. {chunk_size} tokens each)")
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Exiting process_documents method call ")
    return texts

def main_ingest():
    # Create embeddings
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering main_ingest method call ")

    ensure_integrity(PERSIST_DIRECTORY, True)
    #embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    embeddings=OpenAIEmbeddings(deployment=embeddeployname,
                                model=embedmodelname,
                                openai_api_base=OPENAI_DEPLOYMENT_ENDPOINT,
                                openai_api_type=OPENAI_API_type,
                                openai_api_key=OPENAI_API_KEY
                                )
    ROOT_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
    #persist_directory = os.path.join(PERSIST_DIRECTORY, filename)


    # Define the Chroma settings
    CHROMA_SETTINGS = Settings(
            chroma_db_impl='duckdb+parquet',
            persist_directory=PERSIST_DIRECTORY,
            anonymized_telemetry=False
)

    db = Chroma(persist_directory=PERSIST_DIRECTORY , embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    collection = db.get()
    texts = process_documents([metadata['source'] for metadata in collection['metadatas']])
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    logging.debug("Creating embeddings")
    #print(f"Creating embeddings")
    db.add_documents(texts)
    db.persist()
    db = None

if __name__ == "__main__":
    main_ingest()