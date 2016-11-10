//dashboard specific functions here?
$("#showRated").click(function(){

$.get("/allposts/",function(data){
    console.log(data)
    d= JSON.parse(data);
    console.log(d);
    d.sort(function(a,b){
        return b.id-a.id;
    });
    console.log(d)

});

});