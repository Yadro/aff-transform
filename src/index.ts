
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




class Matrix22 {
  private mtx;

  constructor(a1, a2, b1, b2) {
    this.mtx = [[a1, a2], [b1, b2]]
  }

  static empty() {
    return new Matrix22(1, 0, 0, 1);
  }

  static rotate(ang) {
    return new Matrix22(cos(ang), sin(ang), -sin(ang), cos(ang));
  }

  static shift(ang) {
    return new Matrix22(1, Math.tan(degToRad(ang)), 0, 1);
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

class Figure {
  p: number[][];

  apply(mtx: Matrix22) {
    this.p = this.p.map((vec) => {
      return mtx.mulV(vec);
    });
    return this;
  }
}

class Rect extends Figure{
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

class Poly extends Figure {
  constructor(public p: number[][]) {
    super();
  }
}

class Draw {
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
    this.figures.push(f);
  }

  drawGrid() {
    const {height, width, ctx, from} = this;
    ctx.strokeStyle = '#e9e9e9';
    for (let x = 0.5; x < width; x+=10) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0.5; y < height; y+=10) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
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



const draw = new Draw();
let matrix = Matrix22.empty().mul(Matrix22.shift(10)).mul(Matrix22.rotate(10));

// draw.add(new Rect(0, 0, 50, 50));

// draw.add(new Poly([[50,50], [50, 50], [100, 50], [100, 100]]));
draw.add(new Rect(0, 0, 50, 50).apply(Matrix22.empty()));

draw.draw();
