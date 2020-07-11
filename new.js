const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
title = document.getElementById("title");

//load different model if mobile
window.isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());
if(window.isMobile){
  path = 'https://raw.githubusercontent.com/vee-upatising/DLSS/e903efcd04d584080b5385e7815efe70e2841769/model.json'
  canvas2.width  = 128;
  canvas2.height = 128;
  canvas.width  = 64;
  canvas.height = 64;
  title.innerHTML = "Upload a 64x64 image to increase its resolution to 128x128";

}
else{
  path = 'https://raw.githubusercontent.com/vee-upatising/DLSS/master/model.json'
  canvas.width  = 128;
  canvas.height = 128;
  canvas2.width  = 256;
  canvas2.height = 256;
}



const ctx = canvas.getContext('2d');
//placeholder variable for user uploaded image
var imageData;
var output;
var model;

load_model()

//for reading user uploaded image
document.getElementById('myFile').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => showImage(fr);
        fr.readAsDataURL(files[0]);
    }
}

//helper function for reading user uploaded image
function showImage(fileReader) {
    var img = document.getElementById("myImage");
    img.onload = () => getImageData(img);
    img.src = fileReader.result;
}

//helper function for reading user uploaded image
function getImageData(img) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    x = tf.browser.fromPixels(imageData)
    x = x.mul(1/255)
    x = tf.reshape(x,[1,canvas.width,canvas.height,3])
    try {
      output = model.predict(x)
    }
    catch(err) {
      alert("Error! You do not have enough memory to perform this computation.");
    }
    output = model.predict(x)
    output = tf.squeeze(output,)
    output = output.mul(255)
    data = output.dataSync()
    //create a buffer array
    const buffer = new Uint8ClampedArray(canvas2.width * canvas2.height * 4)
    //create an Image data var 
    im = new ImageData(canvas2.width, canvas2.height);
    //map the values to the buffer
    var i = 0;
    for(var y = 0; y < canvas2.width; y++) {
      for(var x = 0; x < canvas2.height; x++) {
        var pos = (y * canvas2.width + x) * 4;      // position in buffer based on x and y
        buffer[pos  ] = data[i]             // some R value [0, 255]
        buffer[pos+1] = data[i+1]           // some G value
        buffer[pos+2] = data[i+2]           // some B value
        buffer[pos+3] = 255;                // set alpha channel
        i+=3
      }
    }
    //set the buffer to the image data
    im.data.set(buffer)
    //show the image on canvas
    const ctx2 = canvas2.getContext('2d');
    ctx2.putImageData(im, 0, 0); 
    var x = document.getElementById("t1");
    var y = document.getElementById("t2");
    //if using mobile model
    if(window.isMobile){
          x.innerHTML = "Uploaded Image (64x64)";
          y.innerHTML = "Super Sampled Imaged (128x128)";
    }
    x.style.display = "block";
    y.style.display = "block";

}

//update model variable
function setvariable(net){
  model = net;
}

async function load_model(){
  const net = await tf.loadLayersModel(path).then(net => setvariable(net))
}


