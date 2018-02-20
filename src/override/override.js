// This file contains all the core functionalities of the new tab.


// A function to fetch a random wallpaper url from the JSON file.


function fetchWallpaperURL(){
    $.getJSON("images.json", function(data){
        var images = data['images'];
        randomImageUrl = images[Math.floor(Math.random()*images.length+0)];
    })
    .done(function(){
        document.body.style.background = "#f3f3f3 url('"+ randomImageUrl + "') no-repeat center center fixed";
        $('body').css('background-size','cover');
    })
}

// Handle onclick event to Google Search

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submitButton');
    link.addEventListener('click', function() {
        var query = document.getElementById("query").value;
        var URL  = "https://www.google.com/search?q=" + query;
        window.location.href = URL;
    });
});

fetchWallpaperURL();


