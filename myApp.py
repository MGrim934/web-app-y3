from flask import Flask, flash, render_template, request, url_for, redirect,session,abort,json,jsonify
import os

import datetime

#main to-do list
#adapt create route for ajax
#ensure appropriate redirection based on logging in/out
#make the test dashboard the new main dashboard and phase out the early one

#https://docs.python.org/2/library/datetime.html#datetime.datetime.tzinfo
#decided to import datetime but only use date element
#blog does not need Time
#may consider adding time in the Future 
#perhaps moment.js and utc formatting?

from sqlalchemy.orm import sessionmaker,scoped_session
from tableDef import *
from marshmallow import Schema, fields,post_dump
#what is marshmallow
#serialisation
#use case: convert sqlalchemy object to json so I can mess with it in jquery
#api
#http://marshmallow.readthedocs.io/en/latest/quickstart.html


class postSchema(Schema):
    class Meta:
        fields= ("id","title","content","username","date")



class userSchema(Schema):
    class Meta:
        fields= ("id","username","password")

#define schemas that corresspond to the database models
#then these can be used to "dump" the sqlalchemy object into something that can be jsonified
#json doesnt play nice with sqlalchemy objects







#Mark Grimes Third year web app project

engine = create_engine('sqlite:///db/myStorage.db', echo=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
#from flask website about patterns related to sqlalchemy
#http://flask.pocoo.org/docs/0.11/patterns/sqlalchemy/
#creating this to maintain a "conversation" between my wep app and the sqlite database


#scoped_session
#ran into issues with threads having multiple sessions opened
#consulted here and found out about scoped_session and sqlAlchemy
#http://stackoverflow.com/questions/34009296/using-sqlalchemy-session-from-flask-raises-sqlite-objects-created-in-a-thread-c
#http://stackoverflow.com/questions/35664436/flask-and-sqlalchemy-handling-sessions

#consulted login authentication tutorial and database set up here
#https://pythonspot.com/en/login-authentication-with-flask/
#provides information on how to set up a basic log in
#used this as a jumping off point to add other features such as registration and storing posts too!



#session allows to track the user, if their session is "logged in" for example
#import os so we can set a secret key with a random number
#apparently random number is safer!
app = Flask(__name__)


@app.route("/")
@app.route("/home/")
def index():
    if not session.get('logged_in'):
        
        now = datetime.datetime.today()
        print(now)
        return render_template("welcome.html")
        #if they aren't logged in, bring them to the welcome screen
        #not much to do except log in and feel...welcome
    else:
        flash("You are logged in!")
        return dashboard()
        #bring them to the guts of the web app that allows post creation and viewing
        # if they are logged in then they should go straight to the dash





@app.route('/login/', methods=["GET","POST"])
def login():
    print("test")
    if request.method=="POST":
        #if its a post
        print ("post")
        name=request.form['username']
        password=request.form['password']
        #attempts to store the password and name
       # Session = sessionmaker(bind=engine)
       # s=Session()
       #used code like this before I tried to implement scoped session at top of app.py
       #querys the database with a filter of the entered user name and password
        query = db_session.query(User).filter(User.username.in_([name]), User.password.in_([password]) )
        #if it found something as a result of the filter, result will be assigned a status of true
        result = query.first()

        if result:
            #storing a session of true! you have logged in!
            session["logged_in"]=True
            #storing the username in a session, so when the logged in user makes a post. We can easily grab it and assign it to the post
            session["username"]=name
            #session, so we can track if the user can actually get to the dashboard
            return redirect("dashboard")
            
        else:
            flash("Incorrect Log in")
            #this will flash in the log in page_not_found
            #http://flask.pocoo.org/docs/0.11/patterns/flashing/
            return render_template("login.html")
    return render_template("login.html")

#================end of /login/=================================================================================================

@app.route("/dashboard/")
def dashboard():
    if session.get("logged_in")==True:
        
        return render_template("dashboardFull.html")
        #send the user to the main dash!
    else:
        flash("You need to log in to access the dashboard")
        #message flashing
        return redirect("login")
        #you're not logged in so you'll go to the login. No cutting the line!


#========================end of /dashboard/============================


@app.route("/logout/")
def logout():
    session["logged_in"]=False
    session.pop('username',None)
    #http://flask.pocoo.org/docs/0.11/quickstart/#sessions
    return index()
    #sets the session log in to False
    #returns them to the welcome screen
    #hurray

#=============end of /login/===============


#add a new users
@app.route("/register/",methods=["GET","POST"])
def register():
    if request.method=="POST":
        name=request.form['username']
        password=request.form['password']
        #a post request
        #simple registration. Just a name and a password
        #perhaps add better authentication if have time!
        #check database before adding?


       # Session = sessionmaker(bind=engine)
       # s=Session()
        user = User(name,password)
        #creates an object of the user class defined in tableDef
        db_session.add(user)
        #add the user
        db_session.commit()
        #hurray you're in the db!..hopefully
        
        flash(name+"  created an account!")
        #we'll see'
        return login()
        # should redirect them to the dash

    else:
        if session.get("logged_in")==True:
            return "You're already logged in..'"
        else:
         return render_template("register.html")
        #if its a get request. Then it will send them to the registration page!


#==================================end of /register/====================



@app.route("/create/", methods=["GET","POST"])
def create():
    #need to update this for ajax and stuff
    if session.get("logged_in")==True:
        #you are logged in so you can make a post!
        if request.method=="POST":
            title=request.form['title']
            content=request.form['content']
            username= session.get("username")
           
            dt = datetime.datetime.today()
            print(username)
            print(content)
            print(title)
            print(dt)
            #just making sure its taking values in correctly
            #lets see if we can add to a database
            #Session = sessionmaker(bind=engine)
           # s=Session()
            post = Post(title,content,username,dt)
            #creating a Post object defined in tableDef
            db_session.add(post)
            db_session.commit()
           # s.close()
            #send them back to the dash, perhaps it will send them straight to posts in the future
            return "success"
        else:
            #its a get request, so send them to the creation page itself
            return render_template("create.html")
    else:
        #if you're not logged in, send you to the log in'
        return login()

#==============end of /create/================================================


@app.route("/posts/")
def posts():
    #Session = sessionmaker(bind=engine)
    #s=Session()
    #a test view just to make sure views are showing
    #must make pretty and show all posts for reasons and stuff
    posts =  db_session.query(Post).all()
    return render_template("posts.html", posts=posts)



#============endof/posts/======================================================

@app.route("/posts/<id>")
def showPost(id):
    posts = db_session.query(Post).filter(Post.id.in_(id))
    return render_template("posts.html", posts=posts)


@app.route("/about/")
def about():
    return render_template("about.html")

#test for new dashboard
@app.route("/dashboard/")
def dash():
    posts =  db_session.query(Post).all()
    return render_template("dashboardFull.html",posts=posts)

@app.route("/allposts/")
def getall():
    #get everything
    result = db_session.query(Post).all()
    schema = postSchema(many=True)
    #create a schema object - many=true ensures it will work with a list of objects like this query!
    res= schema.dump(result)
    #dumping the result
    print(res.data)
    return json.dumps(res.data)
    #finally returning it as a json friendly String
    #can be parsed with jquery in the view
    #hurray
    
    #result =[dict(r) for r in db_session.query(Post).all()]


@app.route("/users/")
def getUsers():
    result = db_session.query(User).all()
    schema = userSchema(many=True)
    res= schema.dump(result)
    print(res.data)
    return json.dumps(res.data)

@app.route("/userposts/")
def getUserInfo():
    #get everything
    name = session.get("username")
    print(name)
    #whats the difference between filter and filter_by?
    result = db_session.query(Post).filter_by(username = name).all()
    schema = postSchema(many=True)
    #create a schema object - many=true ensures it will work with a list of objects like this query!
    res= schema.dump(result)
    #dumping the result
    print(res.data)
    return json.dumps(res.data)


@app.route("/userposts/<i>")
def getPost(i):
    #get everything
    print("stuuuuuuuuuuuuuuuuuuuuuuuffff")
    print(i)
    
    #whats the difference between filter and filter_by?
    
    p = db_session.query(Post).get(i)
    #sqlalchemy prefers if you get when filtering by id
    #http://stackoverflow.com/questions/6750017/how-to-query-database-by-id-using-sqlalchemy
   # print(p)
    schema = postSchema()
    #create a schema object - many=true ensures it will work with a list of objects like this query!
    res= schema.dump(p)
    #dumping the result
    print(res.data)
    return json.dumps(res.data)

@app.route("/userposts/<i>",methods=["DELETE"])
def deleteIt(i):
    #get everything
    print("Delete Test")
    print(i)
    
    #whats the difference between filter and filter_by?
    
    #first get the record I want to delete
    a=db_session.query(Post).get(i)
    #now delete it
    db_session.delete(a)
    db_session.commit()
    #need to commit delete 
    #sqlalchemy prefers if you get when filtering by id
    #http://stackoverflow.com/questions/6750017/how-to-query-database-by-id-using-sqlalchemy
   # print(p)
 
    return "deleted"

@app.route("/showall/")
def showAll():
    p=result = db_session.query(Post).all()
    return render_template("allPosts.html",posts=p)

@app.route("/userposts/f/")
def userPosts():

    name = session.get("username")
    print(name)
  
    result = db_session.query(Post).filter_by(username = name).all()
    return render_template("userPosts.html",posts=result)
    
   
   
    
  
  

    
    





@app.errorhandler(404)
def page_not_found(e):
    #official flask documentation
    err = e
    return render_template('404.html',err=err), 404
    #simple 404 example



if __name__ == "__main__":
    app.secret_key=os.urandom(12)
    #sets the secret key to a random number
    #imported the os so that one could take advantage of the random
    #security and stuff
    app.run(debug=True)
