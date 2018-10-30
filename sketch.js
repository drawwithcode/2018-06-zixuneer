var myData;

var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];

function preload(){
  myData = loadJSON('assets/name.json');
}


function setup() {
	createCanvas(windowWidth, windowHeight);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(33, 47, 60);

  textSize(30);
  fill(64, 255, 255, 192);
  textAlign(LEFT);
  var t1 = "Popular Baby Names" ;
  text(t1, 50, 100);
  var t2 = "Click or drag your mouse anywhere" ;
  textSize(18);
  fill('pink');
  text(t2, 50, 140);

  for(var i = 0; i < width; i++){
    var name = myData.data[i];
    var l = name[11];
    var num = name[12];

    var col1 = color(241, 15, 39);
    var col2 = color('pink')
    //var col = map(num, 10, 176, 30, 255);
    var coll = lerpColor(col2, col1, (num*2)/frameCount);

    var size = map(num, 0, 176, 15, 80);
    //var size2  = map(num, 5, 176, 0.01, 0.045);

    strokeWeight(1);
    stroke(coll);
    line(i*3, height - 15, i*3, height - size);

    if(num > 110){
    noStroke();
    textFont('Georgia');
    textSize(7);
    fill(64, 255, 255, 192);
    text(l, i*3 + 5, height - size);
  }
    //console.log(num);
}
  ball(l);

}

////////////////////////////////////////////////////////////////

function ball(_l){

  this.l = _l;

  for (var particleA = 0; particleA < mass.length; particleA++) {
    var accelerationX = 0, accelerationY = 0;

    for (var particleB = 0; particleB < mass.length; particleB++) {
      if (particleA != particleB) {
        var distanceX = positionX[particleB] - positionX[particleA];
        var distanceY = positionY[particleB] - positionY[particleA];

        var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 1) distance = 1;

        var force = (distance - 320) * mass[particleB] / distance;
        accelerationX += force * distanceX;
        accelerationY += force * distanceY;
      }
    }

    velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
    velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
  }

  for (particle = 0; particle < mass.length;  particle++) {

    positionX[particle] += velocityX[particle];
    positionY[particle] += velocityY[particle];

    noStroke();
    fill('pink');
    ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);

    textFont('Helvetica');
    textSize(10);
    textAlign(CENTER);
    fill(64, 255, 255, 192);
    text(this.l, positionX[particle], positionY[particle]);
    }

  }


function addNewParticle() {

      mass.push(random(0.01, 0.045));
      positionX.push(mouseX);
      positionY.push(mouseY);
      velocityX.push(0);
      velocityY.push(0);

}


function mouseClicked() {
	addNewParticle();
}


function mouseDragged() {
	addNewParticle();
}
