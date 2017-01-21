import * as React from 'react';
import MatrixInput from "./MatrixInput";
import {Data} from "./MatrixInput";

interface MatrixContainerP {
  data: Data;
  onAdd: (e) => any;
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
      let dataI = data[id];
      el.push(<MatrixInput value={dataI} onChange={onChange.bind(null, id)} onRemove={onRemove.bind(null, id)}/>);
    }
    return el;
  }

  render() {
    const {onAdd} = this.props;
    return <div>
      {this.renderMatrix()}
      <button onClick={onAdd}>+</button>
      <button>Apply</button>
    </div>
  }
}