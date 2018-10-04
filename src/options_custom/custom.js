$(function() {
  let config = {};
  let pictures = [];

  const appendPicture = src => {
    $("#picture-list").append(`
      <div class="picture-wrapper">
        <img src="${src}" class="picture" />
      </div>
    `);
  };

  chrome.storage.local.get(["config", "pictures"], result => {
    const defaultConfig = {
      search: "google",
      interval: 0,
      source: "built-in"
    };

    if (result.config) {
      config = {
        ...defaultConfig,
        ...JSON.parse(result.config)
      };
    } else {
      config = defaultConfig;
    }

    pictures = result.pictures ? JSON.parse(result.pictures) : [];

    $("#search").val(config.search);
    $("#interval").val(config.interval);
    $("#source").val(config.source);
    $("#source").change();

    for (const picture of pictures) {
      appendPicture(picture);
    }
  });

  $("#search").on("change", function() {
    config["search"] = this.value;
  });

  $("#interval").on("change", function() {
    config["interval"] = this.value;
  });

  $("#source").on("change", function() {
    config["source"] = this.value;

    if (this.value === "custom") {
      $("#upload").show();
    } else {
      $("#upload").hide();
      pictures = [];
    }
  });

  $("#file").on("change", function() {
    $("#picture-list").empty();
    pictures = [];

    for (const file of this.files) {
      const reader = new FileReader();

      reader.onload = e => {
        const src = e.target.result;

        pictures.push(src);
        appendPicture(src);
      };

      reader.readAsDataURL(file);
    }
  });

  $("#apply").on("click", function() {
    const data = {
      config: JSON.stringify(config),
      pictures: JSON.stringify(pictures)
    };

    chrome.storage.local.set(data, () => {
      alert("Change has been saved !");
    });
  });
});
