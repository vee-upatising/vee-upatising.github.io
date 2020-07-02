const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
canvas.width  = 64;
canvas.height = 64;
canvas2.width  = 128;
canvas2.height = 128;

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
    console.log('1')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('2')
    x = tf.browser.fromPixels(imageData)
    console.log('3')
    x = x.mul(1/255)
    x = tf.reshape(x,[1,64,64,3])
    console.log('4')
    output = model.predict(x)
    console.log('5')
    output = tf.squeeze(output,)
    console.log('6')
    output = output.mul(255)
    console.log('7')
    data = output.dataSync()
    console.log('8')
    //create a buffer array
    const buffer = new Uint8ClampedArray(128 * 128 * 4)
    //create an Image data var 
    im = new ImageData(128, 128);
    console.log('9')

    //map the values to the buffer
    var i = 0;
    for(var y = 0; y < 128; y++) {
      for(var x = 0; x < 128; x++) {
        var pos = (y * 128 + x) * 4;      // position in buffer based on x and y
        buffer[pos  ] = data[i]             // some R value [0, 255]
        buffer[pos+1] = data[i+1]           // some G value
        buffer[pos+2] = data[i+2]           // some B value
        buffer[pos+3] = 255;                // set alpha channel
        i+=3
      }
    }
    console.log('10')

    //set the buffer to the image data
    im.data.set(buffer)
    //show the image on canvas
    console.log('11')
    const ctx2 = canvas2.getContext('2d');
    ctx2.putImageData(im, 0, 0); 
    console.log('12')
    var x = document.getElementById("t1");
    x.style.display = "block";
    var y = document.getElementById("t2");
    y.style.display = "block";

}

//update model variable
function setvariable(net){
  model = net;
}

async function load_model(){
  const net = await tf.loadLayersModel('https://raw.githubusercontent.com/vee-upatising/Super-Resolution-GAN/566ece6b5bb0e7cc556b1859d7122dd3e397bd2c/model.json').then(net => setvariable(net))
}


