const videoElement = document.getElementById('video');
const canvas = document.getElementById('canvas');
const bg = document.getElementById('image');
canvas.width  = 640;
canvas.height = 480;

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const blurBtn = document.getElementById('blur-btn');
const unblurBtn = document.getElementById('unblur-btn');

const ctx = canvas.getContext('2d');

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

  loadBodyPix();
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

function loadBodyPix() {
  options = {
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  }
  bodyPix.load(options)
    .then(net => perform(net))
    .catch(err => console.log(err))
}

function getPixel(url, x, y) {
  var img = new Image();
  img.src = url;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  return context.getImageData(x, y, 1, 1).data;
}

async function perform(net) {

  while (startBtn.disabled && blurBtn.hidden) {
    const segmentation = await net.segmentPerson(video);

    // Convert the segmentation into a mask to darken the background.
    const foregroundColor = {r: 255, g: 255, b: 255, a: 0};
    const backgroundColor = {r: 124, g: 252, b: 0, a: 255};
    const backgroundDarkeningMask = bodyPix.toMask(
        segmentation, foregroundColor, backgroundColor);

    for(var i=0; i<backgroundDarkeningMask.data.length; i+=4) {
      if(backgroundDarkeningMask.data[i+3] == 255){
        backgroundDarkeningMask.data[i] = 255;
        backgroundDarkeningMask.data[i+1] = 255;
        backgroundDarkeningMask.data[i+2] = 255;
      }
    }

    console.log(getPixel('https://s1.1zoom.me/b5050/940/Sky_Moon_Branches_586696_640x480.jpg',1,1))

    const opacity = 1;
    const maskBlurAmount = 3;
    const flipHorizontal = true;
    // Draw the mask onto the image on a canvas.  With opacity set to 0.7 and
    // maskBlurAmount set to 3, this will darken the background and blur the
    // darkened background's edge.
    bodyPix.drawMask(
        canvas, videoElement, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
  }
}
