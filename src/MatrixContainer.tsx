import * as React from 'react';
import MatrixInput from "./MatrixInput";
import {Data} from "./interface";

interface MatrixContainerP {
  matrix: Data;
}
export default class MatrixContainer extends React.Component<MatrixContainerP, any> {

  constructor(props) {
    super(props);
  }

  renderMatrix() {
    const {matrix} = this.props;
    const el = [];
    matrix.getAll().forEach(e => {
      el.push(<MatrixInput key={e.id} value={e.id} matrix={matrix}/>);
    });
    return el;
  }

  render() {
    return <div className="matrixContainer">
      {this.renderMatrix()}
    </div>
  }
}