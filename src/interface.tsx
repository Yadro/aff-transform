import * as React from 'react';
import MatrixContainer from "./MatrixContainer";
import {Data, MatrixData} from "./MatrixInput";
import {Draw, Matrix22, Rect, Operation} from "./Transformations";


interface InterfaceS {
  lastId?: number;
  matrix?: {
    id: number;
    value: MatrixData
  }[];
  data?: Data;
}
export default class Interface extends React.Component<any, InterfaceS> {

  drawControl = new Draw();

  constructor(props) {
    super(props);
    this.state = {
      lastId: -1,
      matrix: [],
      data: {}
    };
    [
      'add',
      'remove',
      'onChange',
      'apply'
    ].forEach(fn => this[fn] = this[fn].bind(this));
    this.drawControl.draw();
  }

  add() {
    let {matrix, lastId, data} = this.state;
    lastId++;
    data[lastId] = [['0', '0'], ['0', '0']];
    matrix.push({
      id: lastId,
      value: data[lastId]
    });
    this.setState({
      matrix,
      lastId
    })
  }

  remove(i) {
    let {matrix, data} = this.state;
    delete data[i];
    matrix = matrix.filter(e => e.id != i);
    this.setState({
      matrix,
      data
    });
  }

  onChange(id, row, pos, e) {
    const {data} = this.state;
    data[id][row][pos] = e.target.value;
    this.setState({data});
  }

  apply() {
    const {drawControl, state} = this;
    const {data} = state;
    let transforms: Operation[] = [];
    for (let id in data) {
      if (data.hasOwnProperty(id)) {
        let matrix = data[id];
        let transform = matrix.map(e => e.map(e => +e));
        transforms.push({mul: new Matrix22(transform)});
      }
    }

    drawControl.clear();
    drawControl.add(new Rect(0, 0, 50, 50).apply(transforms));
    drawControl.draw();
  }

  render() {
    const {data} = this.state;
    return <div className="interface">
      <h3>Affine transformations</h3>
      <div className="btns">
        <button onClick={this.add}>+</button>
        <button onClick={this.apply}>Apply</button>
      </div>
      <MatrixContainer data={data} onRemove={this.remove} onChange={this.onChange}/>
    </div>;
  }
}