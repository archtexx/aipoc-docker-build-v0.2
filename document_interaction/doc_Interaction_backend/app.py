from flask import Flask, url_for, render_template, request, redirect, session, jsonify
from flask_cors import CORS
from constants import *
import os
from func import *
import platform
import subprocess
import pandas as pd
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from ingest import main_ingest
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt  # For password hashing



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'sampleee'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

delete_directory = 'source'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')



@app.route('/login', methods=['GET', 'POST'])
def login():
    print("called")
    if request.method == 'GETg':
        return jsonify({"message": "Login successful"})
    else:
        print(request,"hello",request.json['email'])
        # return jsonify({"message": "Login successful"})
        u = request.json['email']
        p = request.json['password']

        # Find the user by username
        user = User.query.filter_by(username=u).first()

        if user and bcrypt.check_password_hash(user.password, p):
            # Passwords match, log the user in
            session['logged_in'] = True
            
            response = jsonify({"message": "Login successful"})
            response.status = 200
            return response
        else:
            response = jsonify({"message": "Incorrect Details"})
            response.status = 401
            return response

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    return redirect(url_for('index'))

@app.route('/chat', methods=['POST','GET'])
def chat():
    try:
        query_param_value = request.args.get('query_param_value')
        print(request.args)
        print(query_param_value)
        user_message = request.json['message']
        prompttt = request.json['prompt']
        temperature = request.json['temperature']
        max_tokens = request.json['max_tokens']
        print(max_tokens) 
        print(prompttt)
        if query_param_value =="Excel - Data Analysis":
            customizedPrompt = prompttt + user_message
            answer = excel(customizedPrompt,temperature,max_tokens)
            return jsonify({'message': answer ,'source_information': answer[1]})
        elif query_param_value =="Test case generation":
            print("testcase generation")
            customizedPrompt = prompttt + user_message
            chatbot_response = proc(user_message, prompttt, temperature, max_tokens)
            return jsonify({'message': chatbot_response[0],'source_information': chatbot_response[1]})
        else:
            chatbot_response = proc(user_message, prompttt, temperature, max_tokens)
            print(chatbot_response[0])
            return jsonify({'message': chatbot_response[0], 'source_information': chatbot_response[1]})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/upload', methods=['POST','GET'])

def upload_file():
    query_param_value = request.args.get('query_param_value')
    print(request.args)
    print(query_param_value)
    
    try:
        if query_param_value=="Excel - Data Analysis":
            
            if 'file' not in request.files:
                return jsonify({'message': 'No file part'})
            file = request.files['file']
            if file.filename == '':
                return jsonify({'message': 'No selected file'})
            upload_dir = os.path.join(os.getcwd(), 'source_excel')
            if not os.path.exists(upload_dir):
                    os.makedirs(upload_dir)
            file.save(os.path.join(upload_dir, file.filename))
            print("ingesting started")
            #main_ingest()
            return jsonify({'message': 'File uploaded and processed successfully'})
        else:
            if 'file' not in request.files:
                    return jsonify({'message': 'No file part'})
            file = request.files['file']
            if file.filename == '':
                    return jsonify({'message': 'No selected file'})
            upload_dir = os.path.join(os.getcwd(), 'source_docs')
            if not os.path.exists(upload_dir):
                        os.makedirs(upload_dir)
            file.save(os.path.join(upload_dir, file.filename))
            print("ingesting started")
            main_ingest()
            return jsonify({'message': 'File uploaded and processed successfully'})
    except Exception as err:
            return jsonify({"error":str(err)})

@app.route('/delete_files/<user_payload>', methods=['POST','GET'])
def delete_db(user_payload):
    query_param_value = user_payload
    print(request.args)
    print(query_param_value)
    if query_param_value=="Excel - Data Analysis":       
        fileName= request.json['fileName']
        print(fileName)
        docs_path= os.path.join(os.getcwd(), 'source_excel')
        filepath=os.path.join(docs_path, fileName)
         # Get the OS name
        os_name = platform.system()
        print("OS name: {}".format(os_name))
        
        if os_name=="Windows":
            os.system(f'del /q "{filepath}"')
            files = os.listdir(docs_path)
        else:
            # Delete the file
            if os.path.exists(filepath):
                os.remove(filepath)
        return jsonify({'message': 'file deleted successfully'})
    else:
        os_name = platform.system()
        print("OS name: {}".format(os_name))
        fileName= request.json['fileName']
        print(fileName)
        docs_path= os.path.join(os.getcwd(), 'source_docs')
        filepath=os.path.join(docs_path, fileName)
        if os_name=="Windows":
            os.system(f'del /q "{filepath}"')
            files = os.listdir(docs_path)
            os.system("rmdir /s /q db")
            print("db deleted")
            os.system(f'del /q "{filepath}"')           
            if len(files)>0:
                print("ingestion again with ")
                main_ingest()
        else:
             subprocess.call(["rm", "-r", "db"])
                # Delete the file
             if os.path.exists(filepath):
                    os.remove(filepath)
                # List the files in the directory
             files = os.listdir(docs_path)
             if len(files)>0:
                main_ingest()  
        return jsonify({'message': 'file deleted successfully'})
 

@app.route('/listdocs/<user_payload>', methods=['GET','POST'])
def listdocs(user_payload):
    try:
        query_param_value = user_payload
        # print(request.args)
        print(query_param_value)
        #print(user_payload)
        if query_param_value=="Excel - Data Analysis":
        # Get the list of files in the specified folder
          upload_dir = os.path.join(os.getcwd(), 'source_excel')
          files = os.listdir(upload_dir)
        # Return the list of files as JSON
          return jsonify({"files": files})
        else:
          upload_dir = os.path.join(os.getcwd(), 'source_docs')
          files = os.listdir(upload_dir)
          return jsonify({"files": files})
    except Exception as e:
        return jsonify({"error": str(e)})
    

if __name__ == '__main__':
    
    #hostname = os.getenv("HOST_URL_IP")
    hostport = os.getenv("HOST_URL_IP_PORT")
    app.run(host='0.0.0.0', port=hostport, debug=True)
    
