var target;
var mutationRate = 0.001;
var maxPop = 20;
var people;
var roc;

function setup()
{

  createCanvas(800,600);
  background(0)
  target = new Circle(0,20,15);

  people = new Population(target,mutationRate,maxPop)

  fitP = createP('max fitness: 0<br>speed:'+people.velocity);
  generationP = createP();
  velSlider = createSlider(1,100,4);

  fitP.position(10, 670);
  generationP.position(10,610);
  velSlider.position(10,720);


}

function draw()
{
  background(1)
  translate(width/2,0);
  people.draw();
  people.update();

  people.calculateFitness();
  if(people.toUpdate)
  {
    fitP.html("max fitnes: "+people.maxFitness()+"<br> speed:"+people.velocity)

    people.naturalSelection();
    people.generate();
    people.toUpdate=false;
  }

  target.draw();

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
