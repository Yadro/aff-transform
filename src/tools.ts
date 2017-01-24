

export default function t<T>(value: T |T[]) {
  this.value = value;
  let add = {};
  let obj = {
    isArray,
    isObject
  };
  if (isObject(value)) {
    add = {
      hey() {

      }
    };
  } else if (isArray(value)) {
    let array: T[] = this.value;
    add = {
      include(value) {
        return array.indexOf(value) > -1;
      },
      invert() {
        let res = [];
        for (let i = array.length - 1; i >= 0; i--) {
          res.push(array[i]);
        }
        return res;
      }
    };
  }
  return merge(obj, add);
}

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

function merge<T, G, R extends T & G>(orig: T, add: G): R {
  let res = {};
  for (let name in orig) {
    if (orig.hasOwnProperty(name)) {
      res[name] = orig[name];
    }
  }
  for (let name in add) {
    if (add.hasOwnProperty(name)) {
      res[name] = add[name];
    }
  }
  return res;
}

export function invert(array) {
  let res = [];
  for (let i = array.length - 1; i >= 0; i--) {
    res.push(array[i]);
  }
  return res;
}