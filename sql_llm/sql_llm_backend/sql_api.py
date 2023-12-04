from flask import Flask, url_for, render_template, request, redirect, session, jsonify
from llm_sql import askQuestion
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt  
import logging

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


@app.route('/chat', methods=['POST'])
def sqlquery():
        query = request.json['message']
        response = askQuestion(query)
        print(response)
        return jsonify({'query': response})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5002)
