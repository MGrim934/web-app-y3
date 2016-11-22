//dashboard specific functions here?
$(function () {
    //when the document (that is dashboard) loads, it populates the page with recent posts
    showRecentPosts();

});

var showRecentPosts = function () {

    $.get("/allposts/", function (data) {
        //get all posts

        d = JSON.parse(data);
        //parses the data as json
        sortMe(d);
        //sort it by id! Recent up the top
        loadPosts(d);
        //load them

    });


}
var sortMe = function (posts) {
    //simple function to sort by id
    //post id is incremented as more posts are added to post table, so more recent posts should be put first
    console.log("sort test")
    posts.sort(function (a, b) {
        return b.id - a.id;
    });
}

$("#btnRecentPosts").click(function () {

    //when the user wants to see the ten most recent posts
    showRecentPosts();
});






//want to create a function that loads posts into a div
var loadPosts = function (data) {
    //assume data is the list of posts
    $("#postContainer").empty();
    //empty it out
    //only want to show ten most recent posts
    if (data.length > 10) {
        show = 10;
    } else {
        show = data.length;
    }
    for (var i = 0; i < show; i++) {
        //function to format a post
   

        var p = format(data[i]);

        $("#postContainer").append(p);
        //in this case append, could html as well


    }//for



}//load posts



var format = function (curPost) {
    //formats the current post!
    //puts it in a little div container with some grey shading
    //displays title, content, id, all that stuff

    var post = "<div class='container' style='background-color: rgba(0,0,20,0.1); margin-bottom: 10px;'><h1 class='display-3'>" + curPost.title + "</h1>";
    var formatPost = curPost.content.replace(/\n/g, "<br/>");
    //replaces line breaks with br to ensure that it will properly display on the page
    post += "<p> By: " + curPost.username + " Date: " + curPost.date + "</p><hr >";
    post += "<p class='lead'>" + formatPost + "</p><hr></div>";

    return post;
    //returns a string

}



$("#btnMyPosts").click(function () {
  
    updateViewPersonal();
    //shows posts that the user has made





});
//use .on instead of.click
//why?
//with .on, this function will work with dynamically created elements after initial load
//doesn't work this way with .click alone'
//since I'm programmatically adding these buttons for every post it makes sense to use .on instead of just click

$("#postContainer").on("click", ".manage", function (e) {

    myID = $(this).attr("id")
    //every manage button is given an id upon creation
    //the id is the post id
    //assigns the buttons id to the myID variable
    //can then use this to retrieve that post!

   
    $.get("/userposts/" + myID, function (data) {
        //gets JUST the post of id "myID"
        data = JSON.parse(data)
        //parse it

        
        var post = format(data);
        //format the post using that format function

        post += '<hr><button type="button" class="btn btn-block btn-danger delete" id="' + data.id + '" >Delete</button><hr/>'
        //append this button which will give the user the option to delete their post upon request
        $("#postContainer").html(post)
        


    })
});

function updateViewPersonal() {
    //this function is designed to show the user the posts they've made as well as present the option to change it'
    
    $.get("/userposts/", function (data) {
        //callback function begins!
        //get the posts of whoever is logged in
        //checks who is logged in with the session object in flask

        $("#postContainer").empty();
        //empty the container!
        d = JSON.parse(data)
        //parse the data!

        sortMe(d);
        //sort it
        if (d.length < 1) {
            console.log("empty")
            $("#postContainer").append("You have not made any posts!");
            //a message for the user if they haven't made any posts'
        } else {


            for (var i = 0; i < d.length; i++) {
                //loops through each post
                //formats it

                var post = format(d[i]);

                post += '<hr><button type="button" class="btn btn-block btn-info manage" id="' + d[i].id + '" >Change</button><hr/>'
                //adds this "manage" button that allows the user to choose to change it
                //uses similar logic to the delete option in that the id of the button is assigned to whatever the post id is

                $("#postContainer").append(post);
                //use append instead of html since we want to append each of the user posts
                //if I used .html it would overwrite the html content each time

            }//for

        }//else
        //callback function ends
       
    });


}


//learned some stuff about jquery selectors
//http://stackoverflow.com/questions/23223526/jquery-selector-for-id-starts-with-specific-text
//allowed me to dynamically create buttons and assign appropriate functions to them


$("#postContainer").on("click", ".delete", function (e) {
    console.log("I am a delete function. Neat")
    myID = $(this).attr("id")


    $.ajax({
        url: ('/userposts/' + myID),
        type: 'DELETE',
        success: function (data) {

            console.log("success");
            //change postContainer view back to their posts
            updateViewPersonal();


        }

    });



});



//forcreation purposes
$("#btnCreate").click(function () {
   
    //just swaps the display
    swapDisplay();



});


$("#btnPublish").click(function (e) {
    e.preventDefault();
    //prevent default!
    //now grab those vars
    var post = {
        title: $("#title").val(),
        content: $("#content").val()

    }
    //create an object that can be read in the .py file
    console.log(post)
    $.post("/create/", post, function (e) {
        //posts your creation
        //swaps you back to the display of the post container
        swapDisplay();
        //trigger a load of your posts
        updateViewPersonal();

    });



});



$("#btnCancel").click(function () {
    console.log("cancel that");
    //you're cancelling so simply swap the display from the creation
    swapDisplay();




});

//==========================

var swapDisplay = function () {

    //need to show and hide displays!
    //http://stackoverflow.com/questions/5059596/jquery-css-remove-add-displaynone
    //found that display: none

   //performs check to see what is currently being displayed and swaps it appropriately
   //this is either the post creator or the post container div
    var check = $("#postCreator").css("display")
    console.log(typeof check)
    if (check == "inline") {
        $("#postCreator").css("display", "none")
        //this shows the post creator div
        //hide the main post container
        $("#postContainer").css("display", "inline")


    } else {
        $("#postCreator").css("display", "inline")
        //this shows the post creator div
        //hide the main post container
        $("#postContainer").css("display", "none")
    }


}//swapDisplay

var displayTitles = function () {
    //this function gets all posts and shows the title and the author of each post

    //get all posts
    $.get("/allposts/", function (data) {
        console.log(data)
        d = JSON.parse(data);
        console.log(d);
        d.sort(function (a, b) {
            return b.id - a.id;
        });
        //sort the posts so it shows most recent up at the top
        //set up a table
        $("#postContainer").empty();
        //put in a table
        $("#postContainer").append("<table class ='table'></table>");
        $("#postContainer").find("table").append("<thead><tr><td>Title</td> <td>Author</td> <td>Date</td> </tr> </thead>");
        //put in a head
        for (var i = 0; i < d.length; i++) {
            $("#postContainer").find("table").append("<tr> <td>" + d[i].title + "</td><td>" + d[i].username + "</td> <td>" +
             d[i].date + "</td><td><button class='btn btn-block btn-secondary btnShowMore' id = " + d[i].id + ">click me</button></td>+ </tr>");
             //for each post append a row to the table
        }
        //dynamically adding and adding to tables
        //http://stackoverflow.com/questions/2160890/how-do-you-append-rows-to-a-table-using-jquery

        //sorts it by id


    });

    //format it
    //out put it
}

$("#btnAllDetails").click(function () {
    console.log("Clicked all posts")
    displayTitles();


});



$("#postContainer").on("click", ".btnShowMore", function (e) {
    var id = $(this).attr("id");
    //okay we got this, need to show the entirety of the post now
    $.get("/userposts/" + id, function (data) {
        console.log(data)
        d = JSON.parse(data);
        post = format(d);

        $("#postContainer").html(post);

    });


});

