
class Matrix22 {
  mtx;

  constructor(a1, a2, b1, b2) {
    this.mtx = [[a1, a2], [b1, b2]]
  }

  static empty() {
    return new Matrix22(1, 0, 0, 1);
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
  figures: Figure[] = [];


  constructor() {
    let canva = document.querySelector('canvas');
    this.ctx = canva.getContext('2d');
    this.width = canva.width;
    this.height = canva.height;
  }

  add(f) {
    this.figures.push(f);
  }

  draw() {
    const {ctx, height, width} = this;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, width, height);

    this.figures.forEach(f => {
      const points = f.p;
      ctx.beginPath();
      points.forEach(([x, y]) => {
        ctx.lineTo(x, y);
      });
      ctx.fillStyle = 'black';
      ctx.fill();
    });
  }
}



const draw = new Draw();
draw.add(new Rect(1, 1, 50, 50));
draw.add(new Poly([[50,50], [50, 50], [100, 50], [100, 100]]));

draw.add(new Rect(1, 1, 50, 50).apply(Matrix22.empty().add([50, 50])));

draw.draw();
