const videoElement = document.getElementById('video');
const canvas = document.getElementById('canvas');
canvas.width  = 640;
canvas.height = 480;

//load model
loadBodyPix();

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const blurBtn = document.getElementById('blur-btn');
const unblurBtn = document.getElementById('unblur-btn');

const ctx = canvas.getContext('2d');
//placeholder variable for user uploaded image
var imageData;

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

startBtn.addEventListener('click', e => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  unblurBtn.disabled = false;
  blurBtn.disabled = false;

  startVideoStream();
});

stopBtn.addEventListener('click', e => {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  unblurBtn.disabled = true;
  blurBtn.disabled = true;

  unblurBtn.hidden = true;
  blurBtn.hidden = false;

  videoElement.hidden = false;
  canvas.hidden = true;

  stopVideoStream();
});

blurBtn.addEventListener('click', e => {
  blurBtn.hidden = true;
  unblurBtn.hidden = false;

  videoElement.hidden = true;
  canvas.hidden = false;
});

unblurBtn.addEventListener('click', e => {
  blurBtn.hidden = false;
  unblurBtn.hidden = true;

  videoElement.hidden = false;
  canvas.hidden = true;
});

videoElement.onplaying = () => {
  canvas.height = videoElement.videoHeight;
  canvas.width = videoElement.videoWidth;
};

function startVideoStream() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
      videoElement.srcObject = stream;
      videoElement.play();
    })
    .catch(err => {
      startBtn.disabled = false;
      blurBtn.disabled = true;
      stopBtn.disabled = true;
      alert(`Following error occured: ${err}`);
    });
}

function stopVideoStream() {
  const stream = videoElement.srcObject;

  stream.getTracks().forEach(track => track.stop());
  videoElement.srcObject = null;
}

//loading lightweight mobile version of BodyPix model
//outputStride: 8, 16;  A larger value results in a smaller model and faster prediction time but lower accuracy.
//multiplier: 0.5, 0.75, 1;  A smaller value results in a smaller model and faster prediction time but lower accuracy.
//quantBytes: 1,2,4; Size of bytes used for weight quantization.
function loadBodyPix() {
  options = {
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 1,
    quantBytes: 2
  }
  bodyPix.load(options)
    .then(net => perform(net))
    .catch(err => console.log(err))
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
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
}

//takes in a segmented mask and a boolean to indicate whether the user has uploaded an image
//segemented mask should be what is returned from segmentPerson()
//the flag boolean is True when imageData == null and False when imageData != null
//the function returns the background image with transparent pixels where there is a segmented person
function toMask(segment, flag){
  //obtain size of mask
  const width = segment.width;
  const height = segment.height;
  //create blank image array
  const bytes = new Uint8ClampedArray(width * height * 4);
  //if user didn't upload image
  if(flag == true) {
    //iterate through image
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        //index for pixel
        const n = i * width + j;
        //if this pixel is part of the foreground
        if(segment.data[n] == 1) {
          //set pixel to be transparent
          bytes[4 * n + 3] = 0;
        }
        //if this pixel is part of the background
        else {
          //set this pixel to be white canvas
          bytes[4 * n + 0] = 255;
          bytes[4 * n + 1] = 255;
          bytes[4 * n + 2] = 255;
          bytes[4 * n + 3] = 255;
        }
      }
    }
  }
  //if user uploaded image
  else {
    //iterate through image
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        //index for pixel
        const n = i * width + j;
        //if this pixel is part of the foreground
        if(segment.data[n] == 1) {
          //set pixel to be transparent
          bytes[4 * n + 3] = 0;
        }
        //if this pixel is part of the background
        else {
          //set this pixel to be imageData
          bytes[4 * n + 0] = imageData[4 * n + 0] ;
          bytes[4 * n + 1] = imageData[4 * n + 1];
          bytes[4 * n + 2] = imageData[4 * n + 2];
          bytes[4 * n + 3] = imageData[4 * n + 3];
        }
      }
    }
  }
  //return background image with transparent pixels where there is a segemented person
  return new ImageData(bytes, width, height);
}
//this function segments a frame and outputs the masked image to the canvas
//this function continiously runs every frame
async function perform(net) {
  //if the correct buttons are selected
  while (startBtn.disabled && blurBtn.hidden) {
    // segment the person from the background, returning a mask of 0s and 1s
    const segmentation = await net.segmentPerson(video);
    //boolean to see if user has uploaded image
    flag = (imageData == null)
    //obtain background image cutout
    const mask = toMask(segmentation, flag);
    //parameters for drawMask function
    const opacity = 1;
    const maskBlurAmount = 1;
    const flipHorizontal = false;
    //replace the pixels of the video with cutout of background
    bodyPix.drawMask(
        canvas, video, mask, opacity, maskBlurAmount, flipHorizontal);
  }
}
