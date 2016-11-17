import datetime

from sqlalchemy import create_engine,DATETIME
from sqlalchemy.orm import sessionmaker
#fills up the db with a few basic things
#primarily for testing
#https://pythonspot.com/en/login-authentication-with-flask/

from tableDef import *

engine = create_engine('sqlite:///db/myStorage.db', echo=True)
 
# create a Session
Session = sessionmaker(bind=engine)
session = Session()
 
user = User("admin","password")
session.add(user)
 
user = User("Mark","Cool1")
session.add(user)
 
user = User("JohnDoe1","word123")
session.add(user)

dt = datetime.datetime.today()
post = Post("First Post","This is the first post in this blog thing. \n I hope it goes well","admin",dt)
session.add(post)

post = Post("Just Another Day","Dummy data, hurray!","admin",dt)
session.add(post)

post = Post("More Dummy Date","Its a thing with a place.\n Should have really used latin.","Mark",dt)
session.add(post)

 
# commit the record the database
session.commit()
 
session.commit()
