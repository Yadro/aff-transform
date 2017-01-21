import * as React from 'react';

export type MatrixData = string[][];
export type Data = {[id:string]: MatrixData};

interface MatrixContainerP {
  onChange: (row, pos, e) => any;
  onRemove: (e) => any;
  value: MatrixData;
}

export default class MatrixInput extends React.Component<MatrixContainerP, any> {

  constructor(props) {
    super(props);
  }

  renderMatrix() {
    const {value, onChange} = this.props;
    let inputs = [];
    for (let j = 0; j < 2; j++) {
      let row = [];
      for (let i = 0; i < 2; i++) {
        row.push(<input key={i} type="text" value={value[j][i]} onChange={onChange.bind(null, j, i)}/>);
      }
      inputs.push(<div key={j}>{row}</div>);
    }
    return inputs;
  }

  render() {
    const {onRemove} = this.props;
    return <div className="matrix">
      {this.renderMatrix()}
      <button onClick={onRemove}>x</button>
    </div>
  }
}