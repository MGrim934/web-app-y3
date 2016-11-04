import datetime

from sqlalchemy import create_engine
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
 
user = User("Bill","gate")
session.add(user)


post = Post("title","content test","admin")
session.add(post)

 
# commit the record the database
session.commit()
 
session.commit()
