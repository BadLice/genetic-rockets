class Circle
{
    constructor(x,y,r)
    {
      this.x=x;
      this.y=y;
      this.r=r;
    }

    draw()
    {
      stroke(255)
      fill(255,0,0);
      ellipse(this.x,this.y,this.r*2)
    }

    collision(o)
    {
      if(dist(o.x,o.y,this.x,this.y)<=this.r)
        return true;
      else
        return false;
    }
}
