class Population
{
      constructor(target,obstacle,mutationRate,maxPop)
      {
        this.population = [];
        this.target=target;
        this.generation=0;
        this.mutationRate=mutationRate;
        this.finished=false;
        this.toUpdate=false;
        this.velocity=4;
        this.obstacle=obstacle;

        for(var i=0;i<maxPop;i++)
        {
          this.population[i] = new Rocket(createVector(0,height),new DNA(target),i);
        }
      }

      naturalSelection()
      {
        var sum = 0;
        for(var o of this.population)
        {
          sum+=o.fitness;
        }
        //normalizing the probability into the range 0-1
        for(var i=0;i<this.population.length;i++)
        {
          this.population[i].prob=this.population[i].fitness/sum;
        }
      }

      generate()
      {
        var newPop = []
        for(var i = 0;i<this.population.length;i++)
        {

          var parent1 = this.pickOne();
          var parent2 = this.pickOne();

          var child = parent1.crossover(parent2);

          child.mutate(this.mutationRate);

          newPop[i] = new Rocket(createVector(0,height),child,i);
        }
        this.population=newPop;
        this.generation++;
      }

      calculateFitness()
      {
        for(var i=0;i<this.population.length;i++)
        {
          if(!this.finished)
            this.population[i].calculateFitness();
        }
      }

      maxFitness()
      {
        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
          if (this.population[i].fitness > maxFitness) {
            maxFitness = this.population[i].fitness;
          }
        }
        return maxFitness;
      }

      currentMax()
      {
        let maxFitness = -1;
        var current;
        for (let i = 0; i < this.population.length; i++) {
          if (this.population[i].fitness > maxFitness) {
            maxFitness = this.population[i].fitness;
            current = this.population[i];
          }
        }
        return current;
      }

      getBest()
      {
        var max = -1;
        var maxo;
        for(var o of this.population)
          if(o.fitness>max)
          {
            maxo=o.genes.join("");
            max=o.fitness;
          }

        return maxo;
      }

      draw()
      {
        var current=this.currentMax();
        var up=true;
        for(var o of this.population)
        {
          if(o==current)
            fill(0,0,255)
          else
            fill(200);

          o.draw();
          if(!o.finished)
            up=false;
        }

        this.toUpdate=up;
      }

      update()
      {
        for(var i=0;i<this.velocity;i++)
        {
          for(var o of this.population)
          {

            //check if the rocket collides with the obstacle
            if(this.obstacle.collision(o.position))
            {
              o.collision=true;
              o.finished=true;
            }

            o.update();
          }

        }
      }

    //pick one element of the population basing on its fitness and so to its probability
    pickOne()
    {
      //normalizes the probability
      this.naturalSelection();

      var select = 0;
      var selector = Math.random();
      while(selector > 0)
      {
          selector-=this.population[select].prob;
          /*scores[] is the table containing the percentage of selection of each element,
          for example, if element 3 has a 12 percent chance of being selected, scores[3] = 0.12*/
          select++;
      }
      select--;
      //Here, add element at index select to the new population
      return this.population[select].dna;
    }
}
