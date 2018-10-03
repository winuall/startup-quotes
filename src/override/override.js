// This file contains all the core functionalities of the new tab.

// A function to fetch a random wallpaper url from the JSON file.

const randomize = length => Math.floor(Math.random() * length + 0);

const showPicture = url => {
  $("body").css({
    background: "#f3f3f3 url('" + url + "') no-repeat center center fixed",
    "background-size": "cover"
  });
};

const fetchWallpaperURL = callback => {
  let randomImageUrl;

  $.getJSON("images.json", data => {
    const images = data["images"];
    randomImageUrl = images[randomize(images.length)];
  }).done(() => {
    if (callback) callback();

    showPicture(randomImageUrl);
  });
};

chrome.storage.local.get(["config", "pictures"], result => {
  config = result.config ? JSON.parse(result.config) : {};
  pictures = result.pictures ? JSON.parse(result.pictures) : [];

  let url;
  let placeholder;

  switch (config.search) {
    case "google":
      url = "https://www.google.com/search?q=";
      placeholder = "Google";
      break;

    case "yahoo":
      url = "https://www.yahoo.com/search?p=";
      placeholder = "Yahoo";
      break;

    case "duckduckgo":
      url = "https://www.duckduckgo.com/?q=";
      placeholder = "DuckDuckGo";
      break;

    default:
      break;
  }

  if (config.source === "built-in") {
    fetchWallpaperURL(() => {
      setInterval(fetchWallpaperURL, config.interval * 1000);
    });
  } else {
    const randomImageUrl = pictures[randomize(pictures.length)];
    showPicture(randomImageUrl);

    setInterval(() => {
      const randomImageUrl = pictures[randomize(pictures.length)];
      showPicture(randomImageUrl);
    }, config.interval * 1000);
  }

  $("#query").attr("placeholder", placeholder);

  $("#submitButton").on("click", function() {
    const query = $("#query").val();

    window.location.href = url + query;
  });
});
