class Population
{
      constructor(target,mutationRate,maxPop)
      {
        this.population = [];
        this.target=target;
        this.generation=0;
        this.matingPool=[];
        this.matingSize=0;
        this.mutationRate=mutationRate;
        this.finished=false;
        this.toUpdate=false;
        this.velocity=4;

        for(var i=0;i<maxPop;i++)
        {
          this.population[i] = new Rocket(createVector(0,height),new DNA(target),i);
        }
      }

      naturalSelection()
      {
        // Clear the ArrayList
        this.matingPool = [];

        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
          if (this.population[i].fitness > maxFitness) {
            maxFitness = this.population[i].fitness;
          }
        }

        // console.log(maxFitness)

        // Based on fitness, each member will get added to the mating pool a certain number of times
        // a higher fitness = more entries to mating pool = more likely to be picked as a parent
        // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        for (let i = 0; i < this.population.length; i++) {

          let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
          let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
          for (let j = 0; j < n; j++) { // and pick two random numbers
            this.matingPool.push(this.population[i]);
          }
        }
        this.matingSize=this.matingPool.length;
      }

      generate()
      {
        for(var i = 0;i<this.population.length;i++)
        {
          var r1 = floor(random(this.matingSize));
          var r2 = floor(random(this.matingSize));

          var parent1 = this.matingPool[r1];
          var parent2 = this.matingPool[r2];

          var child = parent1.crossover(parent2);

          child.mutate(this.mutationRate);

          this.population[i]=new Rocket(createVector(0,height),child,i)
        }

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
        return maxFitness
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

      evaluate()
      {
        var finish = false;
        for(var i=0;i<this.population.length; i++)
        {
          if(this.target===this.population[i].genes.join(""))
           {
             noLoop();
           }

        }
        this.finished=finish;
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
            fill(255);

          o.draw();
          if(!o.finished)
            up=false;
        }

        this.toUpdate=up;
        // if(up)
      }

      update()
      {
        for(var i=0;i<this.velocity;i++)
        {
          for(var o of this.population)
          {
            o.update();
          }

        }
      }

    allPhrases()
    {
      let everything = "";

      let displayLimit = min(this.population.length, 50);


      for (let i = 0; i < displayLimit; i++) {
        everything += this.population[i].genes.join("") + "<br>";
      }
      return everything;
    }
}
