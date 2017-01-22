import * as React from 'react';


import MatrixContainer from "./MatrixContainer";
import {Operation, Rect} from "./Logic/Figures";
import Draw from "./Logic/Draw";
import Matrix22 from "./Logic/Matrix22";
import {parseInputData} from "./Logic/tool";
import {Data} from "./Data";

interface InterfaceS {
  matrix: Data;
}

export default class Interface extends React.Component<any, InterfaceS> {
  drawControl = new Draw();

  constructor(props) {
    super(props);
    this.state = {
      matrix: new Data(this.forceUpdate.bind(this))
    };
    [
      'apply'
    ].forEach(fn => this[fn] = this[fn].bind(this));
    this.drawControl.draw();
  }

  apply() {
    const {drawControl, state} = this;
    const {matrix} = state;
    let transforms: Operation[] = [];
    const data = matrix.getAll();
    for (let id in data) {
      if (data.hasOwnProperty(id)) {
        let matrix = data[id].value;
        let transform = matrix.map(e => e.map(e => parseInputData(e)));
        transforms.push({mul: new Matrix22(transform)});
      }
    }

    drawControl.clear();
    drawControl.add(new Rect(0, 0, 50, 50).apply(transforms));
    drawControl.draw();
  }

  render() {
    const {matrix} = this.state;
    return <div className="interface">
      <h3>Affine transformations</h3>
      <div className="btns">
        <span>Templates:</span>
        <div>
          <button onClick={matrix.addType.bind(this, 'simmetr')}>simmetr</button>
          <button onClick={matrix.addType.bind(this, 'scale')}>scale</button>
          <button onClick={matrix.addType.bind(this, 'shift')}>shift</button>
          <button onClick={matrix.addType.bind(this, 'rotate')}>rotate</button>
        </div>
        <span>Actions:</span>
        <div>
          <button onClick={matrix.add}>+</button>
          <button onClick={this.apply}>Apply</button>
        </div>
      </div>
      <MatrixContainer matrix={matrix}/>
    </div>;
  }
}