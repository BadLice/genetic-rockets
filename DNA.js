class DNA
{
  constructor(target)
  {
    this.genes = [];
    this.target=target;
    this.fitness=0;
    this.maxMoves=2000;

    for(var i=0;i<this.maxMoves;i++)
    {
      this.genes[i] = DNA.newAngle();
    }

  }

  crossover(parent2)
  {
    var child = [];
    var r = random(this.genes.length);

    for(var i=0;i<this.genes.length;i++)
    {
      if(i<=r)
        child.push(this.genes[i]);
      else
        child.push(parent2.genes[i]);
    }

    var temp = new DNA(this.target);
    temp.genes=child;

    return temp;
  }

  mutate(mr)
  {
      for(var i=0;i<this.genes.length;i++)
      {
        if(random(1)<mr)
        {
          this.genes[i]=DNA.newAngle();
        }
      }
  }

  static newAngle()
  {
    return radians(random(-10,10));
  }

}
