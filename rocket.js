class Rocket
{
  constructor(pos,dna,id)
  {
    this.velocity=createVector(0,1);
    this.position=pos.copy();
    this.angle=radians(0);
    this.fitness=0;
    this.prob=0;
    this.dna=dna;
    this.r=5;
    this.genesIndex=0;
    this.finished=false;
    this.id=id;
    this.collision=false;
    this.hitTarget=false;
    this.time=100000;
  }

  update()
  {
    if(!this.finished)
     {
       this.velocity.rotate(this.dna.genes[this.genesIndex]);
       this.position.sub(this.velocity);

       if(this.genesIndex<this.dna.genes.length-1)
         this.genesIndex++;
       else
         this.finished=true;
     }
  }

  draw()
  {
      stroke(0)
      let theta = this.velocity.heading() + PI / 2;
      let r = this.r;

      push();
      translate(this.position.x, this.position.y);
      rotate(theta);

      // Rocket body
      beginShape(TRIANGLES);
      vertex(0, r * 2);
      vertex(r, -r * 2);
      vertex(-r, -r * 2);
      endShape(CLOSE);

      pop();
  }

  crossover(parent2)
  {
    return this.dna.crossover(parent2.dna);
  }

  calculateFitness()
  {
    let vel = this.time;
    if(vel<1) vel=1;

    let mult = 1;

    let d = dist(this.position.x, this.position.y, target.x, target.y);

    //reaches the target
    if(this.hitTarget)
    {
      mult=2;
      this.finished=true;
    }
    //hits the margins
    if(this.position.x<-(width/2)||this.position.x>(width/2)||this.position.y>height||this.position.y<0)
    {
      mult=0.01;
      vel=1000000;
      this.finished=true;
    }
    //hits the obstacle
    if(this.collision)
    {
      vel=1000000;
      mult=0.01;
      this.finished=true;
    }

    this.fitness = pow( 1/(d*(this.time)), 4)*mult;
  }


}
