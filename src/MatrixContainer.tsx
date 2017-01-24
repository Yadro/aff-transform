import * as React from 'react';
import MatrixInput from "./MatrixInput";
import {Data} from "./Data";
import {Motion, spring} from "react-motion";

const springConfig = {stiffness: 300, damping: 50};

interface MatrixContainerP {
  matrix: Data;
}
interface MatrixContainerS {}

export default class MatrixContainer extends React.Component<MatrixContainerP, MatrixContainerS> {
  constructor(props) {
    super(props);
  }

  renderMatrix() {
    const {matrix} = this.props;
    const el = [];
    matrix.getAll().forEach(e => {
      el.push(<MatrixInput value={e.id} matrix={matrix}/>);
    });
    return el;
  }

  render() {
    return <div className="matrixContainer">
      {this.renderMatrix()}
    </div>
  }
}

function range(size) {
  const arr = [];
  for (let i = 0; i <= size; i++) {
    arr.push(i);
  }
  return arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}