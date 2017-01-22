
export function range(size) {
  const arr = [];
  for (let i = 0; i <= size; i++) {
    arr.push(i);
  }
  return arr;
}

export function merge(orig: any, add: any) {
  for (let name in orig) {
    if (orig.hasOwnProperty(name) && !add.hasOwnProperty(name)) {
      add[name] = orig[name];
    }
  }
  return add;
}

export function maps( x,  in_min,  in_max,  out_min,  out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}