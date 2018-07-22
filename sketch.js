var target;
var mutationRate = 0.01;
var maxPop = 200;
var people;
var roc;
var obstacle;
var precMax=0;
function setup()
{

  createCanvas(800,600);

  target = new Circle(0,20,15);
  obstacle = new Obstacle(0-200,(height/2),400,10);
  people = new Population(target,obstacle,mutationRate,maxPop)

  fitP = createP('max fitness: 0<br>speed:'+people.velocity);
  generationP = createP();
  velSlider = createSlider(1,100,4);

  fitP.position(10, 670);
  generationP.position(10,610);
  velSlider.position(10,720);


}

function draw()
{
  background(60)
  translate(width/2,0);
  people.draw();
  people.update();

  people.calculateFitness();
  if(people.toUpdate)
  {
    var maxF=people.maxFitness();
    //fitnes>1 its getting better, <1 its getting badder
    fitP.html("max fitnes: "+map(maxF,0,precMax,0,1)+"<br> speed:"+people.velocity)
    precMax=maxF;

    people.generate();
    people.toUpdate=false;
  }

  target.draw();
  obstacle.draw();

  generationP.html("PRESS ON THE CANVAS TO MOVE THE TARGET!<br>generation: "+people.generation+"<br> mutation rate: "+(mutationRate*100)+"%");

  people.velocity=velSlider.value();

  updateTargetPosition();
}

function updateTargetPosition()
{
    if(mouseIsPressed)
    {
      var x = mouseX;
      var y = mouseY;
      if(x>=0&&x<=width&&y>=0&&y<=height)
      {
        target = new Circle(mouseX-(width/2),mouseY,15);
        people.target = target;
      }
    }
}
