
export function degToRad(ang) {
  return ang * Math.PI / 180;
}

export function sin(ang) {
  return Math.sin(degToRad(ang));
}

export function cos(ang) {
  return Math.cos(degToRad(ang));
}

export function tan(ang) {
  return Math.tan(degToRad(ang));
}

const operations = {
  tan,
  sin,
  cos
};

export function parseInputData(str: string) {
  let reg = /(-?)(sin|cos|tan)\((-?\d*(.\d+))\)/;
  let res = reg.exec(str);
  if (res) {
    let [, _sign, op, num] = res;
    let sign = _sign == '-' ? -1 : 1;
    if (operations[op]) {
      return sign * operations[op](num);
    } else {
      throw new Error();
    }
  } else {
    return +str;
  }
}