import * as React from 'react';
import MatrixInput from "./MatrixInput";
import {Data} from "./MatrixInput";

interface MatrixContainerP {
  data: Data;
  onRemove: (e) => any;
  onChange;
}
export default class MatrixContainer extends React.Component<MatrixContainerP, any> {

  constructor(props) {
    super(props);
  }

  renderMatrix() {
    const {data, onChange, onRemove} = this.props;
    const el = [];
    for (let id in data) {
      if (data.hasOwnProperty(id)) {
        let dataI = data[id];
        el.push(<MatrixInput key={id} value={dataI} onChange={onChange.bind(null, id)} onRemove={onRemove.bind(null, +id)}/>);
      }
    }
    return el;
  }

  render() {
    return <div className="matrixContainer">
      {this.renderMatrix()}
    </div>
  }
}