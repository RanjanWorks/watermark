if (navigator.serviceWorker) {
  navigator.serviceWorker.register (
    'sw.js',
    {scope: '/watermark/'}
  )
}

let canContainer = document.getElementById("canvasContainer");
let AllImages = [];
let fonts = "Arial";
let position = "x";
let x;
let y;
let canVVs;
let waterMarkText = "WaterMark";
let opacity = "rgba(255, 255, 255, 0.5)";
let fontSize = 50;
let mains = document.querySelectorAll("main");
let rangeInput = document.getElementById("rangeInput");
let rangeText = document.getElementById("rangeText");
rangeInput.addEventListener("input", changeValue);
rangeText.addEventListener("input", changeValue);

function changeValue(e) {
  let value = e.target.value;
  rangeInput.value = value;
  rangeText.value = value;
  fontSize = value;
  generateWaterMark();
}

function updateWaterMark(e) {
  waterMarkText = e.value;
  generateWaterMark();
}

function updateOpacity(e) {
  opacity = e.value;
  generateWaterMark();
}

function updateFonts(e) {
  fonts = e.value;
  generateWaterMark();
}
function updatePostition(e) {
  position = e.value;
  generateWaterMark();
}

// Function to add watermark text to an image
function addWatermarkWithText(imageUrl, watermarkText) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canVVs = canvas;
  var img = new Image();

  // When the image is loaded
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);

    ctx.font = `${fontSize}px ${fonts}`;
    ctx.fillStyle = opacity;

    var textWidth = ctx.measureText(watermarkText).width;

    switch (position) {
      case "tl":
        x = 0;
        y = fontSize - 10;
        break;
      case "tc":
        x = (canvas.width - textWidth) / 2;
        y = fontSize; // Adjust if needed
        break;
      case "tr":
        x = canvas.width - textWidth;
        y = fontSize; // Adjust if needed
        break;
      case "bl":
        x = 0;
        y = canvas.height - fontSize; // Adjust if needed
        break;
      case "bc":
        x = (canvas.width - textWidth) / 2;
        y = canvas.height - fontSize; // Adjust if needed
        break;
      case "br":
        x = canvas.width - textWidth;
        y = canvas.height - fontSize - 5;
        break;
      default:
        x = (canvas.width - textWidth) / 2;
        y = canvas.height / 2;
        break;
    }
    ctx.fillText(watermarkText, x, y);
    canContainer.appendChild(canvas);
  };

  img.src = imageUrl;
}

function cancelImage(){
  mains[0].style.display = "flex";
  mains[1].style.display = "none";
  AllImages.length= 0
}

function generateWaterMark() {
  removeAllImages();
  AllImages.forEach((imgs) => {
    addWatermarkWithText(imgs, waterMarkText);
  });
}
// Function to handle file upload
document.querySelectorAll("#uploadInput").forEach((inputs) => {
  inputs.addEventListener("change", function (event) {
    mains[0].style.display = "none";
    mains[1].style.display = "grid";

    var files = event.target.files;

    // Clear existing canvases
    document.getElementById("canvasContainer").innerHTML = "";
    document.getElementById("downloadButton").disabled = true;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();

      reader.onload = function (event) {
        var imageUrl = event.target.result;

        AllImages.push(imageUrl);
        addWatermarkWithText(imageUrl, waterMarkText);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
generateWaterMark()
    document.getElementById("downloadButton").disabled = false;
  });
});

// Function to download all images as a ZIP file
document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    var zip = new JSZip();
    var images = document.querySelectorAll("canvas");

    images.forEach(function (canvas, index) {
      var imageUrl = canvas.toDataURL("image/jpeg");
      zip.file(
        "image" + index + ".jpg",
        imageUrl.substr(imageUrl.indexOf(",") + 1),
        { base64: true }
      );
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "watermarked_images.zip");
    });
  });

function removeAllImages() {
  while (canContainer.firstChild) {
    canContainer.removeChild(canContainer.firstChild);
  }
}
