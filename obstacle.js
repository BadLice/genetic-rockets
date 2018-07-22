class Obstacle
{
  constructor(x,y,w,h)
  {
    this.x=x;
    this.y=y;
    this.w=w;//100
    this.h=h;//10
    console.log(this.h+" "+this.w)
  }

  draw()
  {
    rect(this.x,this.y,this.w,this.h);
  }

  collision(o)
  {
    if(o.x>=this.x && o.x <=this.x+this.w && o.y >= this.y && o.y <= this.y + this.h)
        return true;
      else
        return false;
  }
}
