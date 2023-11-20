from dotenv import load_dotenv
from pydantic import BaseModel, Field

from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.vectorstores import Chroma
from langchain.document_loaders import PyPDFLoader
from langchain.chains import RetrievalQA
from pydantic import BaseModel, Field
from langchain.chat_models import AzureChatOpenAI
from chromadb.config import Settings
import os
from langchain.agents import initialize_agent
from langchain.agents import AgentType


def docCompareEmbeddings():
    class DocumentInput(BaseModel):
        question: str = Field()

    queryTools = []

    llm = ChatOpenAI(openai_api_key="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", model_name='gpt-4')
    embeddings=OpenAIEmbeddings(openai_api_key="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")
    folder_path = os.path.join(os.getcwd(), 'source_docs')
       
    ROOT_DIRECTORY = os.path.dirname(os.path.realpath(__file__)) 

    CHROMA_SETTINGS = Settings(
            chroma_db_impl='duckdb+parquet',
            persist_directory=f"{ROOT_DIRECTORY}/db",
            anonymized_telemetry=False
    )
    files=[]
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            files.append({"name": os.path.splitext(filename)[0], "path": file_path})
            print(filename)
    print(files)
    count=0
    for file in files:
        loader = PyPDFLoader(file["path"])
        pages = loader.load_and_split()

        db = Chroma(persist_directory=f"{ROOT_DIRECTORY}/db" , embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
        collection = db.get()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        docs = text_splitter.split_documents(pages)
        db.add_documents(docs)
        db.persist()
        db = Chroma(persist_directory=f"{ROOT_DIRECTORY}/db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    return "successfully created the embeddings"

if __name__ == '__main__':
    docCompareEmbeddings()