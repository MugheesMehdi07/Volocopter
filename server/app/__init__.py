from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///missions.db'
db = SQLAlchemy(app)

from app import views,models

with app.app_context():
    db.create_all()
    db.session.commit()
