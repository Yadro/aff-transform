import * as React from 'react';
import MatrixContainer from "./MatrixContainer";
import {Data, MatrixData} from "./MatrixInput";


interface InterfaceS {
  lastId?: number;
  matrix?: {
    id: number;
    value: MatrixData
  }[];
  data?: Data;
}
export default class Interface extends React.Component<any, InterfaceS> {

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
      'onChange'
    ].forEach(fn => this[fn] = this[fn].bind(this));
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
    let {matrix} = this.state;
    matrix = matrix.filter(e => e.id != i);
    this.setState({matrix});
  }

  onChange(id, row, pos, e) {
    const {data} = this.state;
    data[id][row][pos] = e.target.value;
    this.setState({data});
  }

  apply() {

  }

  render() {
    const {data} = this.state;
    return <div>
      <h3>Affin transformations</h3>
      <MatrixContainer data={data} onAdd={this.add} onRemove={this.remove} onChange={this.onChange}/>
    </div>;
  }
}