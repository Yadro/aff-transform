
import {cos, sin, tan} from "./tool";
export default class Matrix22 {
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