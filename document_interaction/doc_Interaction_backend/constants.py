import os
from chromadb.config import Settings
from dotenv import load_dotenv

# load_dotenv()
ROOT_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
print(f"The root directory is ==>  {ROOT_DIRECTORY}")


# Define the folder for storing database
SOURCE_DIRECTORY = f"{ROOT_DIRECTORY}/source_docs"
PERSIST_DIRECTORY = f"{ROOT_DIRECTORY}/db"
Excel_dir=f"{ROOT_DIRECTORY}/source_excel"

# Define the Chroma settings
CHROMA_SETTINGS = Settings(
        chroma_db_impl='duckdb+parquet',
        persist_directory=PERSIST_DIRECTORY,
        anonymized_telemetry=False
)
