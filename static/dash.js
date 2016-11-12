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
       
           post+='<hr><button type="button" class="btn btn-info manage" id="'+data[i].id+'" >Change</button>'
       
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
//use .on instead of.click
//why?
//with .on, this function will work with dynamically created elements after initial load
//doesn't work this way with .click alone'
$("#postContainer").on("click",".manage",function(e){
    console.log(e);
    myID = $(this).attr("id")
    console.log(myID)
    $.get("/userposts/"+myID,function(data){
        console.log(data)
        //instead of posting console. log, should fill up the div with
        //the post
        //an option to delete the post
        //perhaps an option to update the post
        data=JSON.parse(data)
       
        //hide the post container, show the edit
       var post="<h1 class='display-4'>"+ data.title+"</h1>";
       var formatPost = data.content.replace(/\n/g, "<br/>");
       post+="<p class='lead'> By: "+data.username+" Date: "+data.date+"</p><hr>";
       post+="<p>"+formatPost+"</p><hr></div>";
       post+='<hr><button type="button" class="btn- btn-block delete" id="'+data.id+'" >Delete</button>'
       $("#postContainer").html(post)
        

    })
});

//need to implement delete and ajax post for post creation
//learned some stuff about jquery selectors
//http://stackoverflow.com/questions/23223526/jquery-selector-for-id-starts-with-specific-text
//allowed me to dynamically create buttons and assign appropriate functions to them


$("#postContainer").on("click",".delete",function(e){
    console.log("I am a delete function. Neat")
    myID = $(this).attr("id")
    

    $.ajax({
    url: ('/userposts/'+myID),
    type: 'DELETE',
    success: function(data) {console.log("success")}
    
});



});