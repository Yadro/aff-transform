import * as React from 'react';
import MatrixInput from "./MatrixInput";
import {Data} from "./Data";

interface MatrixContainerP {
  matrix: Data;
}
interface MatrixContainerS {}

export default class MatrixContainer extends React.Component<MatrixContainerP, MatrixContainerS> {
  constructor(props) {
    super(props);
  }

  renderMatrix() {
    const {matrix} = this.props;
    const el = [];
    matrix.getAll().forEach(e => {
      el.push(<MatrixInput key={e.id} value={e.id} matrix={matrix} deleted={e.deleted}/>);
    });
    return el;
  }

  render() {
    return <div className="matrixContainer">
      {this.renderMatrix()}
    </div>
  }
}
