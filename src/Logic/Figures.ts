
import Matrix22 from "./Matrix22";

export interface Operation {
  mul?: Matrix22;
  add?: number[]
}
export abstract class Figure {
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