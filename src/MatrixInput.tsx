import * as React from 'react';
import {Data} from "./interface";

interface MatrixContainerP {
  value: number;
  matrix: Data;
}

export default class MatrixInput extends React.Component<MatrixContainerP, any> {

  constructor(props) {
    super(props);
  }

  renderMatrix() {
    const {value, matrix} = this.props;
    let inputs = [];
    const data = matrix.getElem(value);
    if (data.valueType != null) {
      inputs.push(
        <div key="edit">
          <span>{data.type + ': '}</span>
          <input value={data.valueType} onChange={matrix.onChangeType.bind(null, value)}/>
          <br/>
        </div>
      );
    }
    for (let j = 0; j < 2; j++) {
      let row = [];
      for (let i = 0; i < 2; i++) {
        row.push(<input key={i} type="text" value={data.value[j][i]} onChange={matrix.onChange.bind(null, value, j, i)}/>);
      }
      inputs.push(<div key={j}>{row}</div>);
    }
    return inputs;
  }

  render() {
    const {value, matrix} = this.props;
    return <div className="matrix">
      {this.renderMatrix()}
      <button onClick={matrix.remove.bind(null, value)}>x</button>
    </div>
  }
}