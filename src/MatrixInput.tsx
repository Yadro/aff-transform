import * as React from 'react';
import {Data} from "./Data";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {grey500, grey700} from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Eye from 'material-ui/svg-icons/image/remove-red-eye';

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
        <TextField floatingLabelText={data.type + ':'}
                   type="number"
                   className="matrix-input"
                   value={data.valueType} onChange={matrix.onChangeType.bind(null, value)}/>
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
    const color = matrix.getElem(value).show ? grey700 : grey500;
    return <Paper className="matrix">
      {this.renderMatrix()}
      <div className="matrix-btn-remove">
        <div><Delete onClick={matrix.remove.bind(null, value)}/></div>
        <div><Show onClick={matrix.toggleShow.bind(null, value)} color={color}/></div>
      </div>
    </Paper>;
  }
}

const Delete = (props) => <IconButton onClick={props.onClick}><DeleteIcon color={grey700}/></IconButton>;
const Show = (props) => <IconButton onClick={props.onClick}><Eye color={props.color}/></IconButton>;