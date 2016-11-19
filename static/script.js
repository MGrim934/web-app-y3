//dashboard specific functions here?
$(function () {
    showRecentPosts();

});

var showRecentPosts = function (){
    
    $.get("/allposts/",function(data){
        //get all posts
        
        d=JSON.parse(data);
        //parse that data as json
        //        d.sort(function (a, b) {
        //    return b.id - a.id;
      //  });
      sortMe(d);
        //sort it by id! Recent up the top
        loadPosts(d);
        //load them

    });


}
var sortMe= function (posts){
console.log("sort test")
                posts.sort(function (a, b) {
            return b.id - a.id;
        });
}

$("#btnRecentPosts").click(function(){
   

    showRecentPosts();
});

//main to dos
//verification and validation of users
//if logged in user hits create, ajax
//styling

/*$(function () {

    $("#postContainer").load("/showall/");
});*/

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
        //neato burrito
       
        var p = format(data[i]);

        //post += '<hr><button type="button" class="btn btn-info manage" id="' + data[i].id + '" >Change</button>'

        $("#postContainer").append(p);
        //in this case append, could html as well


    }//for


 
}//load posts



var format = function(curPost){
    //formats the current post!

        var post = "<div class='container' style='background-color: rgba(0,0,20,0.1); margin-bottom: 10px;'><h1 class='display-3'>" + curPost.title + "</h1>";
        var formatPost = curPost.content.replace(/\n/g, "<br/>");
        post += "<p> By: " + curPost.username + " Date: " + curPost.date + "</p><hr >";
        post += "<p class='lead'>" + formatPost + "</p><hr></div>";

        return post;


}



$("#btnMyPosts").click(function () {
    console.log("test")
    updateViewPersonal();





});
//use .on instead of.click
//why?
//with .on, this function will work with dynamically created elements after initial load
//doesn't work this way with .click alone'
$("#postContainer").on("click", ".manage", function (e) {
    console.log(e);
    console.log("check me out again... more test logs");
    myID = $(this).attr("id")
    console.log(myID)
    $.get("/userposts/" + myID, function (data) {
        console.log(data)
        //instead of posting console. log, should fill up the div with
        //the post
        //an option to delete the post
        //perhaps an option to update the post
        data = JSON.parse(data)

        //hide the post container, show the edit
        var post = "<h1 class='display-4'>" + data.title + "</h1>";
        var formatPost = data.content.replace(/\n/g, "<br/>");
        post += "<p class='lead'> By: " + data.username + " Date: " + data.date + "</p><hr>";
        post += "<p>" + formatPost + "</p><hr></div>";
        post += '<hr><button type="button" class="btn btn-danger delete" id="' + data.id + '" >Delete MEEE</button>'
        $("#postContainer").html(post)


    })
});

function updateViewPersonal() {
    $.get("/userposts/", function (data) {
      
        $("#postContainer").empty();
        d = JSON.parse(data)
      
        sortMe(d);
        //sort it out m8
        if (d.length < 1) {
            console.log("empty")
            $("#postContainer").append("You have not made any posts!");
        } else {


            for (var i = 0; i < d.length; i++) {

                var post = format(d[i]);

                post += '<hr><button type="button" class="btn btn-info manage" id="' + d[i].id + '" >Change</button>'

                $("#postContainer").append(post);


            }//for




        }
        console.log("testing updateViewPersonal")


        //callback
    });


}

//need to implement delete and ajax post for post creation
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



$("#test3").click(function () {
    console.log("check me out")

    $("#postContainer").load("/userposts/f/");
});

//forcreation purposes
$("#btnCreate").click(function () {
    console.log("I am the creator")
    //load in the creation div
    //hide and show your posts?
    //or just show all posts
    swapDisplay();



});


$("#btnPublish").click(function (e) {
    console.log("yes we shall publish you")
    e.preventDefault();
    //prevent default!
    //now grab those vars
    var post = {
        title: $("#title").val(),
        content: $("#content").val()

    }
    console.log(post)
    $.post("/create/", post, function (e) {
        console.log("Test" + e);
        swapDisplay();
        //trigger a load of your posts
        updateViewPersonal();

    });



});



$("#btnCancel").click(function () {
    console.log("cancel that");
    swapDisplay();




});

var swapDisplay = function () {

    //need to show and hide displays!
    //http://stackoverflow.com/questions/5059596/jquery-css-remove-add-displaynone
    //found that display: none
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


}

var displayTitles = function () {

    //get all posts
    $.get("/allposts/", function (data) {
        console.log(data)
        d = JSON.parse(data);
        console.log(d);
        d.sort(function (a, b) {
            return b.id - a.id;
        });
        //set up a table
        $("#postContainer").empty();
        //put in a table
        $("#postContainer").append("<table class ='table'></table>");
        $("#postContainer").find("table").append("<thead><tr><td>Title</td> <td>Author</td> <td>Date</td> </tr> </thead>");
        for (var i = 0; i < d.length; i++) {
            $("#postContainer").find("table").append("<tr> <td>" + d[i].title + "</td><td>" + d[i].username + "</td> <td>" + d[i].date + "</td><td><button class='btn btn-block btn-secondary btnShowMore' id = " + d[i].id + ">click me</button></td>+ </tr>")
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
        post= format(d);

        /*   if(id==d.id){
           post += '<hr><button type="button" class="btn btn-info manage" id="' + d.id + '" >Change</button>';
           }*/

        $("#postContainer").html(post);

    });


});

