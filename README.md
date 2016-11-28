
# Web Application Project
=======
# Web Application - Third Year Student Project

##BlogThing 3000

This project was created using python 3.5 and the flask microframework. Any other packages are referenced below.

This web application was developed as a college project for a module called "Data Representation and Querying".
This module was one in a "Software Development" course at GMIT Galway.

#What is it?
This web app is a simple private blogging application. To view posts, a user must log in. If they do not have an account they can register.
Once logged in a user can 
* Create a new post
* Read recent posts
* See a list of all posts made
* Manage their posts
  * See all of their posts
  * delete their posts
	

	
##Installation
This was created in Python and uses the flask microframework.
To install this application, you will need a version of python as well as the packages the app uses.
You will also need to run two .py files which define tables and fill them up with some dummy data. 
The easiest way to get up and running is to follow these steps.



1. Go to <https://www.continuum.io/downloads>
  * This is a link to Anaconda. This includes an installation of python as well as
	a large collection of useful packages in one tidy installer.
  * Download the latest version for Python 3. This was not made in Python 2.
  * Follow the installation instructions

2. Once Python and anaconda is installed you will need to install one more package.
	This app uses a package known as "Marshmallow". Open up your terminal and type:
	> pip install -U marshmallow
	
3. Clone the repository from github
  * Documentation on how to do this can be found on the github

4. Open up the command console in the appropriate directory and run the following commands.
	> python tableDef.py
	
	> python fillDB.py
	
	* The first defines data base tables and creates the database.
	* The second fills the database with some dummy data.
	
5. Finally into the console type
	> python myApp.py
	
	* This will host the app locally.
	* Navigate to <http://127.0.0.1:5000/> in your browser of choice.
	
6. You should be able to use the app now.



 
	


	
#Using the App
I attempted to design the u.i. to be as clear and concise as possible.
Each button is clearly labelled. However, here are some guidelines on how to use the app.

###Log in/Registration
  To actually use this app you must either log in to an existing account or register.
  Simply go to the registration page and create a username and password or use an existing one.
  
#I created an account. What now?

###DASHBOARD
This is the primary view of the app. Pretty much everything you want to do will be in the dashboard.
You can only view the dashboard if you are logged in.
It will show you the ten most recent posts made by all users of the system when you log in.

###Options

* Create
  * Enter a title, enter your post content and publish it for others to read.
  
* Show Everyone's Posts
	* This will show you the titles of all posts, the date it was made and the author of each post.
	From here you will be able to click to see the full post content. Should you wish to do so.

* Recent Posts
  * Loads in the ten most recent posts for you to see in full.

* Manage My Posts
  * Allows you to see all of the posts you've made with the option for further management.
Right now, this amounts to being able to delete the post.

* Log out!
  * When you are done!


##Project Goal
This was a learning project. I wanted to create a small private blogging app and attempted to design
an easy to use but functional system that allowed users the ability to make and store posts.
A simple concept, but one that allowed me to explore several areas such as
 * Simple Log in system
 * Database usage
 * AJAX calls
 
 The following is how I attempted to implement the design goals as well as the successes and failures.
 
 ##Technology used
 
 ##Database storage
 For database storage I used SQLite
 
 <https://sqlite.org/>
 
 Why did I choose this? It seemed like a great way of getting a lightweight database up and running pretty quickly.
 It had its advantages and disadvantages. There is plenty of precedence for using SQLite as a storage system
 with python and flask which meant there was plenty of documentation to consult.

####Issues
#####SqlAlchemy

<http://www.sqlalchemy.org/>

SqlAlchemy is an Object Relational Mapper that is easy to integrate with SQLite.
I used this as it allows a programmer to treat database queries as python objects which was useful when working in python.
It also meant I could use its datetime object to store post dates that. Important for any blogging application!

#### Marshmallow

<https://marshmallow.readthedocs.io/en/latest/>

A serialization tool. (Convert an object to a string)
One of the issues I ran into with SQLite and SqlAlchemy was the difficulty I ran into converting the objects from python objects to json.
JSON could not parse the sqlalchemy object id.
This would result in a lot of issues with ajax calls where I wished to send back data that could be JSONIFIED.
The answer was marshmallow.
Although I ran into a number of methods of getting around this issue (including creating custom functions to get around this)
marshmallow was an easy to install package. So I went with this.

####Thoughts
In the end SQLite pretty much did what I needed it to do, so it could be considered a success. However, having to jump through hoops using additional packages
is probably not ideal. In future projects I would hope to use more robust database systems such as couchDB or MongoDB.


#AJAX
##Jquery
The app makes many ajax calls both on page load and on button click. To implement these calls I used the Jquery library.
I found that jquery offered a great amount of flexibility and allowed me to acheive most of what I needed it to do.
For example: 
On a page load, load the ten most recent posts.

On user request:

* Create a post (performs a post request to flask)
* Get their own posts
* Delete a post (performs a delete request to flask)
* view the posts of others.

I also used jquery to dynamically render elements in the html. I.e. It loads content based on the json it gets back.
For example, for every post it receives as part of "manage my posts" it creates a suitable div and button to allow the user to view and manage the post.

####Thoughts
Although Jquery is a powerful tool, I found it initially overwhelming. There is much documentation out there and many ways of doing many things.
I spent a lot of time wondering what was the best way of doing something, and sometimes just had to pick "one decent way of doing it" instead of the "best way".
There simply wasn't one. I have a much greater understanding of jquery than I did when I began the project, and find it much easier to read and understand.



##Log in
The system I used to log in was rather basic. A user enters their details which sends a post request to flask.
From here, the database is queried and it looks for matching details. If it is a success, the user is logged in and can use the system.

##Sessions
Tracking user logins is handeled with the flask session object.
In flask, a session object includes information specific to the user and is implemented on top of cookies that are signed cryptographically.
I found a number of packages that enhanced session functionality, but in the end decided the default session object was good enough for the scope of my project.
When a user logs in, their log in status is set to true and their name is stored in the object.
This is used to determine whether they can view the primary "dashboard" view, as well as being used to store who made what post in the database.

##The View
When logging in/registering the user is shown templates derived from one index page. This is implemented using JINJA2. However, once the user logs in,
they are sent to the dashboard. From here, this is the single page they will use to navigate the app. AJAX calls handle the post/get requests and loading in relevant data from the database.
To do this, I used many jquery requests to get the appropriate information by sending requests that are dealt with in flask.
For example
* User wants to see posts, presses button.
* Jquery makes a request for their posts.
* Flask gets this and queries the database and returns back data to be jsonified.
* Jquery jsonifies the string
Jquery handles filling the appropriate divs with the appropriate content.

##Result
Further goals for this project include implementing a more robust database, having far better user verification and allowing other users to comment other posts.
However, in the 5-6 week scope (which included a lot of learning, coding, re-doing and scrapping) of the project, I feel like putting those to the side to focus on core functionality proved key.
Building on the project bit by bit proved to be the best way of gradually making it come together, but it is undeniably far from perfect.

##Conclusion
It was a learning project, I feel like I have a much greater grasp of jquery and javascript. I also feel like I have a better handle on how database systems work.
In the future, I think I would rather use a more robust database system such as Mongo or CouchDB. However, sqlite did allow me to get up and running fairly quickly.

I also feel like I have a greater appreciation for the concepts of HTTP, get and post requests and how data is handeled between a client and a server.

Jquery, although powerful gave me a greater appreciation and understanding as to why things like Angular, Angular 2 and typescript exist.
Frameworks (and new languages!) that use javascript in a more structured fashion feel like they have great potential, and in a future project I think I would consult
these before diving in. Perhaps my eagerness to get coding got in the way of taking a step back and considering if I should have used something a little more structured than the jquery library.

My code is substantially commented and I have sourced and referenced where appropriate.
If you have any further questions do not hesitate to contact me.


-Mark Grimes




