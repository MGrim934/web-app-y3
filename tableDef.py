from sqlalchemy import *
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
 
engine = create_engine('sqlite:///db/myStorage.db', echo=True)
Base = declarative_base()
#used tutorial to get set up
#https://pythonspot.com/en/login-authentication-with-flask/
#showed how to create and add users
#expanded on this with posts
 
########################################################################
class User(Base):
    """"""
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)

 
    #----------------------------------------------------------------------
    def __init__(self, username, password):
        """"""
        self.username = username
        self.password = password


class Post(Base):
    """"""
    __tablename__ = "posts"
 
    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    username = Column(String)
 
    #----------------------------------------------------------------------
    def __init__(self, title, content, username):
        """"""
        self.title = title
        self.content = content
        self.username = username


 
# create tables
Base.metadata.create_all(engine)