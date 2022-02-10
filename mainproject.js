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
var particles = [];
function preload(){
  song = loadSound('DRAMATIC.mp3');
}

function setup() {
    window.alert("Welcome to Dramatic blues by Chason. We will be using the work to examine sadness and ice. Move your mouse around or click to make the squares become like ice. Have fun dragging your mouse across the screen or click to make the squares dance in a random pattern. Press H if you would like to check out the different shades and hues of blue. You see that big circle in the middle. Press D once to hear a song and vibe. Press F to pause. PLEASE ONLY PRESS ONCE. THANK YOU");
  createCanvas(1600, 1600);
  angleMode(DEGREES);
  fft = new p5.FFT();
  song.setVolume(.5);
  noStroke();
  
}

function draw() {
    clear();
    fill(r,g,b,c);
    strokeWeight(3);
fft.analyze();
    amp =fft.getEnergy(20, 200);

  
  
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

var p = new Particle();
particles.push(p);


for (var i= particles.length - 1; i >= 0; i--){
   if(!particles[i].edges()){
    particles[i].update(amp >230);
    particles[i].show(); 
} else{
    particles.splice(i,1);
}

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
class Particle{
constructor(){

    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0,0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    this.w = random(3,5);
    this.color =[random(200,255),random(200,255), random(200,255),];
}
update(cond){
this.vel.add(this.acc);
this.pos.add(this.vel);
if (cond){
    this.pos.add(this.vel);
    this.pos.add(this.vel);
    this.pos.add(this.vel);

}
}

edges(){
 if (this.pos.x< -width/2 || this.pos.x> width/2||this.pos.y < - height || this.pos.y >height /2){
     return true; 
 } else {
   return false;
 }
}
show(){
    noStroke(); 
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 4)
}
}
