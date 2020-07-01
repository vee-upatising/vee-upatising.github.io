const videoElement = document.getElementById('video');
const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const startBtn = document.getElementById('start-btn');
const ctx = canvas.getContext('2d');
var slider = document.getElementById("myRange");

//placeholder variable for user uploaded image
var imageData;
var output;
var model;

load_model()

startBtn.addEventListener('click', e => {
    input = Array.from({length: 64}, () => Math.random())
    input = tf.tensor(input,[1,64])
    output = model.predict(input)
    output = tf.squeeze(output,)
    output = output.mul(255)
    data = output.dataSync()
    console.log(data)
    //create a buffer array
    const buffer = new Uint8ClampedArray(64 * 64 * 4)
    //create an Image data var 
    im = new ImageData(64, 64);

    //map the values to the buffer
    var i = 0;
    for(var y = 0; y < 64; y++) {
      for(var x = 0; x < 64; x++) {
        var pos = (y * 64 + x) * 4;      // position in buffer based on x and y
        buffer[pos  ] = data[i]             // some R value [0, 255]
        buffer[pos+1] = data[i+1]           // some G value
        buffer[pos+2] = data[i+2]           // some B value
        buffer[pos+3] = 255;                // set alpha channel
        i+=3
      }
    }

    //set the buffer to the image data
    im.data.set(buffer)
    createImageBitmap(im).then(renderer => ctx.drawImage(renderer, 0,0, 256, 256))
});

//update model variable
function setvariable(net){
  model = net;
}

async function load_model(){
  const net = await tf.loadLayersModel('https://raw.githubusercontent.com/vee-upatising/Anime-DCGAN/master/model.json').then(net => setvariable(net))
}

slider.oninput = function() {
  console.log(this.value)
}


