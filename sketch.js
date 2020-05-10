var drawing =[];
var Points =[];
var point, path, database;
var isDrawing = false;

function setup() {
  database = firebase.database();
  canvas = createCanvas(1000, 600);
  canvas.mousePressed(start);
  canvas.mouseReleased(end);
}

function draw() {
  background(255);

  if(isDrawing){
    var point = {
      x:mouseX,
      y:mouseY
    }
    Points.push(point);
  }
  
  strokeWeight(4);
  noFill();
  stroke("black");
 
  for(var i=0; i <drawing.length;i++){
    var path = drawing[i];
    beginShape();
    for(var j=0; j<path.length;j++){
      vertex(path[j].x,path[j].y);
      update();
    }
    endShape();
  }
}

function update(){
  var ref = database.ref('draw');
  var data = {
    draw: drawing
  }
  ref.push(data);
    
}

function start() {
  isDrawing = true;
  Points = [];
  drawing.push(Points);
}

function end() {
  isDrawing = false;
}
