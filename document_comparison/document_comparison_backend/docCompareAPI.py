import platform
import subprocess
from flask import Flask, url_for, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import os
import logging
import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool
from langchain.embeddings.openai import OpenAIEmbeddings
from pydantic import BaseModel, Field
from chromadb.config import Settings
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from docCompareEmbeddings import docCompareEmbeddings
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'sampleee'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
 
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
 
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


@app.route('/register', methods=['POST'])
def register():
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering user registration API call ")
    if request.method == 'POST':
        u = request.json.get('email')
        p = request.json.get('password')
 
        existing_user = User.query.filter_by(username=u).first()
        if existing_user:
            
            return jsonify({"message": "Username already exists. Please choose a different one."}), 400
 
        new_user = User(username=u)
        new_user.set_password(p)
        db.session.add(new_user)
        db.session.commit()
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
        logging.info ("Exiting user registration API call ")
        return jsonify({"message": "Account created successfully! You can now log in."}), 200

@app.route('/login', methods=['POST'])
def login():
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info('Entering login API call')
    if request.method == 'POST':
        u = request.json.get('email')
        p = request.json.get('password')
 
        user = User.query.filter_by(username=u).first()
 
        if user and user.check_password(p):
            session['logged_in'] = True
            logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
            logging.debug(f'{user} logged in')
            return jsonify({"message": "Login successful"}), 200
        else:
            logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
            logging.debug("Invalid username or password")
            return jsonify({"message": "Invalid username or password"}), 401
            
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    return redirect(url_for('index'))

@app.route('/chat', methods=['POST','GET'])
def chat():
         
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
        logging.info ("Entering chat API call ")
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
        query_param_value = request.args.get('query_param_value')
        logging.debug("The current use case is  = "+query_param_value)
        user_message = request.json['message']
        chatbot_response = agent_query(user_message)
        logging.debug(f'chatbot response is :{chatbot_response}')
        logging.info ("Exiting chat API call ")
        return jsonify({'message': chatbot_response})        

def agent_query(user_message):  
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering agent_query method call ") 
    class DocumentInput(BaseModel):
        question: str = Field()
    files=[]
    folder_path = os.path.join(os.getcwd(), 'source_docs')
    llm = ChatOpenAI(openai_api_key="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", model_name='gpt-4')
    print(llm)
    ROOT_DIRECTORY = os.path.dirname(os.path.realpath(__file__)) 
    CHROMA_SETTINGS = Settings(
            chroma_db_impl='duckdb+parquet',
            persist_directory=f"{ROOT_DIRECTORY}/db",
            anonymized_telemetry=False
    )
    embeddings=OpenAIEmbeddings(openai_api_key="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")
    db = Chroma(persist_directory=f"{ROOT_DIRECTORY}/db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    retriever = db.as_retriever()
    print(retriever)
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            files.append({"name": os.path.splitext(filename)[0], "path": file_path})
            print(filename)
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    logging.debug(files)      
    tools=[]
    for file in files:
        tools.append(Tool(
                    args_schema=DocumentInput,
                    name=file["name"],
                    description=f"useful when you want to answer questions about{file['name']} ",
                    func=RetrievalQA.from_chain_type(llm=llm, retriever=retriever),
                )
            )

    agent = initialize_agent(
            agent=AgentType.OPENAI_FUNCTIONS,
            tools=tools,
            llm=llm,
            verbose=True,
        )
    res=agent({"input":user_message})
    answer=res['output']
    stranswer = str(answer)
    print(stranswer)
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Exiting agent_query method call ") 
    logging.debug(f'response from agent is : {stranswer}')
    return stranswer

@app.route('/upload', methods=['POST','GET'])

def upload_file():
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering upload API call ")
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'})
    upload_dir = os.path.join(os.getcwd(), 'source_docs')
    if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
    file.save(os.path.join(upload_dir, file.filename))
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    logging.debug(f'{file.filename} uploaded into {upload_dir}')
            
    res=docCompareEmbeddings()
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Exiting upload API call ")
    return jsonify({'message': 'File uploaded and processed successfully'})

@app.route('/delete_files/<user_payload>', methods=['POST','GET'])
def delete_db(user_payload):
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering delete API call ")
    query_param_value = user_payload
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    logging.debug("The current use case is  = "+query_param_value)
  
    os_name = platform.system()
    print("OS name: {}".format(os_name))
    fileName= request.json['fileName']
    docs_path= os.path.join(os.getcwd(), 'source_docs')
    filepath=os.path.join(docs_path, fileName)
    if os_name=="Windows":
            os.system(f'del /q "{filepath}"')
            logging.debug(f'{fileName} deleted')
            files = os.listdir(docs_path)
            os.system("rmdir /s /q db")
            logging.debug("db deleted")  
            os.system(f'del /q "{filepath}"')           
            if len(files)>0:
                docCompareEmbeddings()
    else:
             subprocess.call(["rm", "-r", "db"])
                # Delete the file
             if os.path.exists(filepath):
                    os.remove(filepath)
                    logging.debug(f'{fileName} deleted') 
                # List the files in the directory
             files = os.listdir(docs_path)
             if len(files)>0:
                docCompareEmbeddings()
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering delete API call ")
    return jsonify({'message': 'file deleted successfully'})
 

@app.route('/listdocs/<user_payload>', methods=['GET','POST'])
def listdocs(user_payload):
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
    try:
        query_param_value = user_payload
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
        logging.debug(query_param_value)
       
        upload_dir = os.path.join(os.getcwd(), 'source_docs')
        files = os.listdir(upload_dir)
        return jsonify({"files": files})
    except Exception as e:
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.ERROR)
        logging.error("Exception has occured")
        return jsonify({"error": str(e)})

if __name__ == '__main__': 
    # hostname = os.getenv("HOST_URL_IP")
    hostport = os.getenv("HOST_URL_IP_PORT")
    app.run(host='0.0.0.0', port=5001)
