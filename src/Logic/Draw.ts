import {Figure} from "./Figures";

export default class Draw {
  ctx: CanvasRenderingContext2D;
  width;
  height;
  from;
  figures: Figure[] = [];

  constructor() {
    let canva = document.querySelector('canvas');
    this.ctx = canva.getContext('2d');
    this.width = canva.width;
    this.height = canva.height;
    this.from = [Math.floor(this.width / 2),  Math.floor(this.height / 2)];
  }

  add(f) {
    if (f.length) {
      f.forEach(f => this.figures.push(f));
    } else {
      this.figures.push(f);
    }
  }

  clear() {
    this.figures = [];
  }

  private drawGrid() {
    let grey = '#b7b7b7';
    let light = '#e9e9e9';
    const {height, width, ctx, from} = this;
    for (let x = 0; x < width; x+=10) {
      ctx.moveTo(x + .5, 0);
      ctx.lineTo(x + .5, height);
    }
    ctx.strokeStyle = light;
    ctx.stroke();
    for (let y = 0; y < height; y+=10) {
      if (y % 50 == 0) {
        ctx.strokeStyle = grey;
      } else {
        ctx.strokeStyle = light
      }
      ctx.beginPath();
      ctx.moveTo(0, y + .5);
      ctx.lineTo(width, y + .5);
      ctx.stroke();
    }
    for (let x = 0; x < width; x+=50) {
      ctx.moveTo(x + .5, 0);
      ctx.lineTo(x + .5, height);
    }
    ctx.strokeStyle = grey;
    ctx.stroke();

    ctx.fillStyle = '#3c3c3c';
    ctx.fillRect(from[0] - 1, from[1] - 1, 3, 3);
    ctx.fill();
  }

  draw() {
    const {ctx, height, width} = this;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    this.drawGrid();

    this.figures.forEach(f => {
      const points = f.p;
      ctx.beginPath();
      points.forEach(([x, y]) => {
        ctx.lineTo(x + this.from[0], -y + this.from[1]);
      });
      ctx.fillStyle = 'black';
      ctx.fill();
    });
  }
}
/**
 * Created by yadro on 21.01.2017.
 */
