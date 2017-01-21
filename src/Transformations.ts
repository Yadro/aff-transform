
function degToRad(ang) {
  return ang * Math.PI / 180;
}

function sin(ang) {
  return Math.sin(degToRad(ang));
}

function cos(ang) {
  return Math.cos(degToRad(ang));
}

function tan(ang) {
  return Math.tan(degToRad(ang));
}




export class Matrix22 {
  private mtx;

  constructor(a1, a2?, b1?, b2?) {
    if (typeof a1 == "number") {
      this.mtx = [[a1, a2], [b1, b2]]
    } else {
      this.mtx = a1;
    }
  }

  static empty() {
    return new Matrix22(1, 0, 0, 1);
  }

  static rotate(ang) {
    return new Matrix22(cos(ang), sin(ang), -sin(ang), cos(ang));
  }

  static shift(ang) {
    return new Matrix22(1, tan(ang), 0, 1);
  }

  static scale(x, y) {
    return new Matrix22(x, 0, 0, y);
  }

  static simmetr(sym: 'x' | 'y') {
    if (sym == "x") {
      return new Matrix22(-1, 0, 0, 1);
    }
    return new Matrix22(1, 0, 0, -1);
  }

  getMtx() {
    return this.mtx;
  }

  mul(m: Matrix22) {
    const A = this.mtx;
    const B = m.mtx;
    return new Matrix22(
      A[0][0] * B[0][0] + A[0][1] * B[1][0],
      A[0][0] * B[0][1] + A[0][1] * B[1][1],
      A[1][0] * B[0][0] + A[1][1] * B[1][0],
      A[1][0] * B[1][0] + A[1][1] * B[1][1],
    );
  }

  add(vec: number[]) {
    const A = this.mtx;
    return new Matrix22(
      A[0][0] + vec[0],
      A[0][1] + vec[0],
      A[1][0] + vec[1],
      A[1][1] + vec[1],
    );
  }

  mulV(vec: number[]) {
    const A = this.mtx;
    return [
      A[0][0] * vec[0] + A[0][1] * vec[1],
      A[1][0] * vec[0] + A[1][1] * vec[1],
    ];
  }

  log() {
    console.table(this.mtx);
  }
}

export interface Operation {
  mul?: Matrix22;
  add?: number[]
}
abstract class Figure {
  p: number[][];

  transform(mtx: Matrix22) {
    this.p = this.p.map((vec) => {
      return mtx.mulV(vec);
    });
    return this;
  }

  add(vec: number[]) {
    this.p = this.p.map((v) => {
      return [v[0] + vec[0], v[1] + vec[1]];
    });
    return this;
  }

  apply(arr: Operation[]) {
    arr.forEach(op => {
      if (op.hasOwnProperty('mul')) {
        this.transform(op.mul);
      }
      if (op.hasOwnProperty('add')) {
        this.add(op.add);
      }
    });
    return this;
  }
}

export class Rect extends Figure{
  constructor(public x, public y, public h, public w) {
    super();
    this.p = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ]
  }
}

export class Poly extends Figure {
  constructor(public p: number[][]) {
    super();
  }
}

export class Draw {
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
