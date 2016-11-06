//if a paragraph element is clicked
/*$("p").click(function () {
    var word = $(this).text();

    word = word.replace(/\n/g, "<br/>");

    var id = $(this).attr("id")
    console.log(id)
    $(this).html(word);
//test out to see if i can format on page load
//placed into a function that loops through all entries

}


);*/






$(function () {
    // var posts = $("#postContainer").children("p").text();
    console.log("triggering function")
    //console.log(posts)
    //get length
    var posts = $("#postContainer").children("p");

    //get the children of the post container that are paragraph elements
    //trigger a function
    count = 0;
    for (var i = 0; i < posts.length; i++) {
        console.log(posts[i].id)
        //now get the p
        var old = $("#" + posts[i].id).text();
        //grab the text of each post by id
        var update = old.replace(/\n/g, "<br/>");

        //g for global replacement
        //might have to implement different carriage returns?

        //replaces all instances of x in the string
        //in this case \n
        //when the textarea was stored, it stored any line breaks as \n. need to make this a br so it renders in html
        //hurray
        console.log(update)
        //now update the view
        $("#" + posts[i].id).html(update);
        count++

        //var word = post.textContent();
        // word= word.replace(/\n/g, "<br/>");
        //now feed it back into the actual one
        //$("#"+post.attr("id")).html(word);
    }

    //http://api.jquery.com/text/
    //http://www.w3schools.com/jsref/jsref_replace.asp
    //http://stackoverflow.com/questions/15433188/r-n-r-n-what-is-the-difference-between-them
});