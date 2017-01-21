import * as React from 'react';
import MatrixContainer from "./MatrixContainer";
import {Operation, Rect} from "./Logic/Figures";
import Draw from "./Logic/Draw";
import Matrix22 from "./Logic/Matrix22";
import {parseInputData} from "./Logic/tool";

const matrixTypes = {
  'default': [['0', '0'], ['0', '0']],
  'simmetr': [['-1', '0'], ['0', '1']],
  'scale': [['2', '0'], ['0', '2']],
  'shift': (deg) => [['1', `tan(${deg})`], ['0', '1']],
  'rotate': (deg) => [[`cos(${deg})`, `-sin(${deg})`], [`sin(${deg})`, `cos(${deg})`]],
};

export interface MatrixInputData {
  id: number;
  value: string[][];
  type?;
  valueType?;
}

export class Data {
  lastId = -1;
  data: MatrixInputData[] = [];

  constructor(private update) {
    [
      'add',
      'addType',
      'getElem',
      'getAll',
      'onChange',
      'onChangeType',
      'remove',
    ].forEach(fn => this[fn] = this[fn].bind(this));
  }

  getElem(id) {
    const item = this.data.find(e => e.id == id);
    if (item) {
      return item;
    }
  }

  getAll() {
    return this.data;
  }

  add() {
    this.lastId++;
    this.data.push({
      id: this.lastId,
      value: matrixTypes.default,
      type: null,
      valueType: null
    });
    this.update();
  }

  addType(type) {
    this.lastId++;
    let valueType = ['shift', 'rotate'].indexOf(type) > -1 ? 45 : null;
    this.data.push({
      id: this.lastId,
      value: valueType ? matrixTypes[type](valueType) : matrixTypes[type],
      type: type,
      valueType
    });
    this.update();
  }

  onChangeType(id, e) {
    const item = this.data.find(e => e.id == id);
    if (!item) {
      return;
    }
    item.valueType = e.target.value;
    item.value = matrixTypes[item.type](item.valueType);
    this.update();
  }

  onChange(id, row, el, e) {
    const item = this.data.find(e => e.id == id);
    if (item) {
      item.value[row][el] = e.target.value;
    }
    this.update();
  }

  remove(id) {
    this.data = this.data.filter(e => e.id != id);
    this.update();
  }
}

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
        <button onClick={matrix.addType.bind(this, 'simmetr')}>simmetr</button>
        <button onClick={matrix.addType.bind(this, 'scale')}>scale</button>
        <button onClick={matrix.addType.bind(this, 'shift')}>shift</button>
        <button onClick={matrix.addType.bind(this, 'rotate')}>rotate</button>
        <button onClick={matrix.add}>+</button>
        <button onClick={this.apply}>Apply</button>
      </div>
      <MatrixContainer matrix={matrix}/>
    </div>;
  }
}