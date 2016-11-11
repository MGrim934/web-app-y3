//dashboard specific functions here?
$("#showRated").click(function(){

$.get("/allposts/",function(data){
    console.log(data)
    d= JSON.parse(data);
    console.log(d);
    d.sort(function(a,b){
        return b.id-a.id;
    });
    //sorts it by id
    console.log(d)
    console.log(d.length);

});

});

//want to create a function that loads posts into a div
var loadPosts = function (data){
    //assume data is the list of posts
    $("#postContainer").html("");
    for(var i=0;i<data.length;i++){
        
       var post="<h1 class='display-4'>"+ data[i].title+"</h1>";
       var formatPost = data[i].content.replace(/\n/g, "<br/>");
       post+="<p class='lead'> By: "+data[i].username+" Date: "+data[i].date+"</p><hr>";
       post+="<p>"+formatPost+"</p><hr></div>";
       
           post+='<hr><button type="button" class="btn btn-info" id="'+data[i].id+'" >Manage My Posts</button>'
       
       $("#postContainer").append(post);
       
       
    }//for
    

//create a posts
//append it?
}//load posts

$("#tiredTest").click(function(){
    console.log("sup")

$.get("/allposts/",function(data){
    console.log(data)
    d= JSON.parse(data);
    console.log(d);
    d.sort(function(a,b){
        return b.id-a.id;
    });
    //sorts it by id
    console.log(d)
    console.log(d.length);
    loadPosts(d);

});

});

$("#btnMyPosts").click(function(){
    console.log("test")
    $.get("/userposts/",function(data){
        console.log(data)
        //load the posts
        d = JSON.parse(data)
        loadPosts(d)

        //callback
    });


});

$("#postContainer").on("click","button",function(e){
    console.log(e);
    thing = $(this).attr("id")
    console.log(thing)
    $.get("/userposts/"+thing,function(data){
        console.log(data)
        //instead of posting console. log, should fill up the div with
        //the post
        //an option to delete the post
        //perhaps an option to update the post

    })
});

//need to implement delete and ajax post for post creation