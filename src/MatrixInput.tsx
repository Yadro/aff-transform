import * as React from 'react';
import {Data} from "./Data";
import {Delete} from "./Material";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

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
          <TextField floatingLabelText={data.type + ':'}
                     type="number"
                     className="matrix-input"
                     value={data.valueType} onChange={matrix.onChangeType.bind(null, value)}/>
        </div>
      );
    }
    let cell;
    for (let j = 0; j < 2; j++) {
      let row = [];
      for (let i = 0; i < 2; i++) {
        cell = data.value[j][i];
        row.push(<TextField key={i} name={i} type='text' className="matrix-input" value={cell}
                        onChange={matrix.onChange.bind(null, value, j, i)}/>);
      }
      inputs.push(<div key={j}>{row}</div>);
    }
    return inputs;
  }

  render() {
    const {value, matrix} = this.props;
    return <Paper className="matrix">
      <div>
        {this.renderMatrix()}
      </div>
      <div className="matrix-btn-remove">
        <Delete onClick={matrix.remove.bind(null, value)}/>
      </div>
    </Paper>;
  }
}