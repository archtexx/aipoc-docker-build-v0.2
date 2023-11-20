
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from langchain.memory import ConversationKGMemory,ConversationBufferMemory
from langchain.vectorstores import Chroma
from constants import CHROMA_SETTINGS, PERSIST_DIRECTORY
from ingest import *
import pandas as pd
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import AzureChatOpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
import matplotlib.pyplot as plt 



import os

OPENAI_API_KEY = os.getenv("openai_api_key")
OPENAI_DEPLOYMENT_ENDPOINT = os.getenv("openai_api_base")
OPENAI_DEPLOYMENT_NAME = os.getenv("deployment_name")
OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL_NAME")
OPENAI_DEPLOYMENT_VERSION = os.getenv("openai_api_version")
OPENAI_API_type=os.getenv("openai_api_type")
embedmodelname=os.getenv("OPENAI_EMBEDMODEL")
embeddeployname=os.getenv("OPENAI_EMBEDdeployname")

load_dotenv()


def load_llm(customPrompt, temperature, max_tokens):
        embeddings=OpenAIEmbeddings(
               deployment=embeddeployname,
               model=embedmodelname,
               openai_api_base=OPENAI_DEPLOYMENT_ENDPOINT,
               openai_api_type=OPENAI_API_type,
               openai_api_key=OPENAI_API_KEY)
        
        db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
        retriever = db.as_retriever()
        print(ROOT_DIRECTORY)
        standardPromptTemplate = """This is the following chat history available to you, refer to it and do not mention this usage in the answer {chat_history}
        =========
        question: Any greetings from the user.
        =========
        respond accordingly without source documents for greetings.
        =========
        context: {context}
        =========
        question: {question}
        ======
        """
        if customPrompt != '':
             promtemplate = '"""' + customPrompt + ". " +standardPromptTemplate
        else:
             promtemplate = '"""' + customPrompt + """"
                You are a helpful AI assistant and you are conversational. you are given file its content is represented by the following pieces of context, 
                use them to answer the question at the end. If you don't know the answer, just say you don't know. Do NOT try to make up an answer.
                Use as much detail as possible when responding.
        """ + standardPromptTemplate
        
        print (promtemplate)

        prompt = PromptTemplate(
        input_variables=["context", "chat_history", "question"], template=promtemplate)

        llm = AzureChatOpenAI(
                temperature = temperature,
                openai_api_key =OPENAI_API_KEY ,
                max_tokens = max_tokens,
                openai_api_base =OPENAI_DEPLOYMENT_ENDPOINT ,
                openai_api_version = OPENAI_DEPLOYMENT_VERSION,
                openai_api_type = OPENAI_API_type,
                deployment_name = OPENAI_DEPLOYMENT_NAME)
        memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True, output_key='answer')
        qa = ConversationalRetrievalChain.from_llm(llm=llm, retriever=retriever,memory=memory, return_source_documents=True,combine_docs_chain_kwargs={"prompt": prompt})
        return qa


def proc(query, customPrompt, temperature, max_tokens):
        qa = load_llm(customPrompt, temperature, max_tokens)    
        res = qa({"question":query})
        print(res)
        answer,source = res['answer'] , res['source_documents']
        stranswer = str(answer)
        strsource = str(source)
        return[stranswer,strsource]

def excel(customPrompt, temperature, max_tokens):
    print(customPrompt)
    folder_path = Excel_dir  # Replace with the actual folder path
    print(folder_path)
    directory_path =Excel_dir  # Replace with the actual directory path

# List all files in the directory
    file_paths = [os.path.join(directory_path, filename) for filename in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, filename))]
    print(file_paths)
        # Check if any files are present in the directory
    if file_paths:
        # Print the list of file paths
        for file_path in file_paths:
          print("File Path:", file_path)
          normalized_filepath = os.path.normpath(file_path)
          print(normalized_filepath)
    data = pd.read_excel(normalized_filepath)
    print (customPrompt)
    agent = create_pandas_dataframe_agent(
                AzureChatOpenAI(
                temperature = temperature,
                openai_api_key =OPENAI_API_KEY ,
                max_tokens = max_tokens,
                openai_api_base =OPENAI_DEPLOYMENT_ENDPOINT ,
                openai_api_version = OPENAI_DEPLOYMENT_VERSION,
                openai_api_type = OPENAI_API_type,
                deployment_name = OPENAI_DEPLOYMENT_NAME),
                data,verbose=True)
    print("awaiting answer") 
    answer = agent.run(customPrompt)
    print(answer)
    return answer