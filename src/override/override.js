// This file contains all the core functionalities of the new tab.

// A function to fetch a random wallpaper url from the JSON file.

const randomize = length => Math.floor(Math.random() * length + 0);

const fetchWallpaperURL = () => {
  let randomImageUrl;

  $.getJSON("images.json", data => {
    const images = data["images"];
    randomImageUrl = images[randomize(images.length)];
  }).done(() => {
    $("body").css({
      background:
        "#f3f3f3 url('" + randomImageUrl + "') no-repeat center center fixed",
      "background-size": "cover"
    });
  });
};

chrome.storage.local.get(["config", "pictures"], result => {
  config = result.config ? JSON.parse(result.config) : {};
  pictures = result.pictures ? JSON.parse(result.pictures) : [];

  if (config.source === "built-in") {
    fetchWallpaperURL();
  } else {
    let randomImageUrl = pictures[randomize(pictures.length)];

    $("body").css({
      background:
        "#f3f3f3 url('" + randomImageUrl + "') no-repeat center center fixed",
      "background-size": "cover"
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("submitButton");
  link.addEventListener("click", function() {
    var query = document.getElementById("query").value;
    var URL = "https://www.google.com/search?q=" + query;
    window.location.href = URL;
  });
});
