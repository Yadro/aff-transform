
interface ToolsDefault {
  isArray;
  isObject;
}

interface ToolsArray {
  invert: () => any;
  include: (value) => any;
  forEach;
  map;
  reduce;
  filter;
  find;
}

interface ToolsObject {
  forEach;
  merge;
}

export default function t(value: Array<any>): ToolsDefault & ToolsArray;
export default function t(value: Object): ToolsDefault & ToolsObject;
export default function t(value: any): any {
  this.value = value;
  let add;
  let obj = {
    isArray,
    isObject
  };
  if (isObject(value)) {
    add = {
      forEach() {

      },
      merge
    };
  } else if (isArray(value)) {
    let array: any[] = this.value;
    add = {
      forEach: array.forEach,
      map: array.map,
      reduce: array.reduce,
      filter: array.filter,
      find: array.find,
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

function merge(orig, add): any {
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
