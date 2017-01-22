import * as React from 'react';
import {Data} from "./Data";
import {Delete} from "./Material";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
          <input type="number" value={data.valueType} onChange={matrix.onChangeType.bind(null, value)}/>
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
    return <div>
      <div>
        {this.renderMatrix()}
      </div>
      <div className="matrix-btn-remove">
        <Delete onClick={matrix.remove.bind(null, value)}/>
      </div>
    </div>
  }
}