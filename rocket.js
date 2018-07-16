class Rocket
{
  constructor(pos,dna,id)
  {
    this.velocity=createVector(0,1);
    this.position=pos.copy();
    this.angle=radians(0);
    this.fitness=0;
    this.dna=dna;
    this.r=5;
    this.genesIndex=0;
    this.finished=false;
    this.id=id;
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
         {
           this.finished=true;
         }
       }
       this.temp++;

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
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = pow(1 / d, 2);
    if(target.collision(this.position))
    {
      this.fitness*=1000;
      this.finished=true;
    }

    if(this.position.x<-(width/2)||this.position.x>(width/2)||this.position.y>height)
    {
      this.fitness*=0.1;
      this.finished
    }
  }


}
