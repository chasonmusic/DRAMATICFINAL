var squareCount = 40;
var actRandomSeed = 0;
let clr = 0;
var rectSize = 40;
var r = Math.floor(Math.random() * 30);; 
var g= Math.floor(Math.random() * 30);; 
var b = Math.floor(Math.random() * 256);;
var c = Math.floor(Math.random() * 256);;
var song; 
var fft;
var wave;

function preload(){
  song = loadSound('DRAMATIC.mp3');
}

function setup() {
    window.alert("Welcome to Dramatic blues by Chason. We will be using the work to examine saddness and ice. Move your mouse around or click to make the squares become like ice. Have fun dragging your mouse across the screen or click to make the squares dance in a random pattern. Press H if you would like to check out the different shades and hues of blue. You see that big circle in the middle. Press D once to hear a song and vibe. Press F to pause. PLEASE ONLY PRESS ONCE. THANK YOU");
  createCanvas(1600, 1600);
  angleMode(DEGREES);
  fft = new p5.FFT();
  song.setVolume(.5);
  noStroke();
  
}

function draw() {
    clear();
    fill(r,g,b,c);
    

  
  
  randomSeed(actRandomSeed);

for (var gridY = 0; gridY < squareCount; gridY++) {
    for (var gridX = 0; gridX < squareCount; gridX++) {

      var posX = width / squareCount * gridX;
      var posY = height / squareCount * gridY;

      var shiftX1 = mouseX / 20 * random(-1, 1);
      var shiftY1 = mouseY / 20 * random(-1, 1);
      var shiftX2 = mouseX / 20 * random(-1, 1);
      var shiftY2 = mouseY / 20 * random(-1, 1);
      var shiftX3 = mouseX / 20 * random(-1, 1);
      var shiftY3 = mouseY / 20 * random(-1, 1);
      var shiftX4 = mouseX / 20 * random(-1, 1);
      var shiftY4 = mouseY / 20 * random(-1, 1);

      push();
      translate(posX, posY);
      beginShape();
      vertex(shiftX1, shiftY1);
      vertex(rectSize + shiftX2, shiftY2);
      vertex(rectSize + shiftX3, rectSize + shiftY3);
      vertex(shiftX4, rectSize + shiftY4);
      endShape();
      pop();
    }
  }

  stroke(255);


  translate(width/2, height/2)
wave = fft.waveform() 
for (var t=-1; t<=1; t+= 2){
beginShape()
for (var i = 0; i <= 180; i+= .5){
    var index = floor(map(i, 0, width, 0, wave.length - 1));

    var radius = map(wave[index], -1, 1, 150, 350 )
 var x = radius * sin(i) * t;
 var y = radius*cos(i); 
 vertex (x,y);
}
endShape();
}
}

function mousePressed() {
  actRandomSeed = random(100000);
  
}


function keyPressed() {
if (keyCode === 68){
    song.play();
    loop();
}
if (keyCode === 70){
    song.pause();
    noLoop();
}
  if (keyCode === 72) {
    
 r = Math.floor(Math.random() * 30);; 
 g= Math.floor(Math.random() * 30);; 
 b = Math.floor(Math.random() * 256);;
 c = Math.floor(Math.random() * 256);;
 
  } 
  
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
   
   
  
}

