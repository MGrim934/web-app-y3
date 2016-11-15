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
    var post ={
        title: $("#title").val(),
        content: $("#content").val()

    }
    console.log(post)
    $.post("/create/",post,function(e){
        console.log("Test"+ e);
        swapDisplay();

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
    if (check=="inline") {
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