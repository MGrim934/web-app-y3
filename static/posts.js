$(function () {
    
    console.log("triggering function")
   
    var jumboCount = $("#postContainer").children("div div ");
    console.log(jumboCount)

    //get the children of the post container that are paragraph elements
    //trigger a function

    for (var i = 0; i < jumboCount.length; i++) {
        console.log(jumboCount[i].id)
        //now get the p
        var old = $("#" + jumboCount[i].id).find("p").text();
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
        $("#" + jumboCount[i].id).find("p").html(update);
 

        //var word = post.textContent();
        // word= word.replace(/\n/g, "<br/>");
        //now feed it back into the actual one
        //$("#"+post.attr("id")).html(word);
    }

    //http://api.jquery.com/text/
    //http://www.w3schools.com/jsref/jsref_replace.asp
    //http://stackoverflow.com/questions/15433188/r-n-r-n-what-is-the-difference-between-them
});
