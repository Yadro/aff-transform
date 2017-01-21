import * as React from 'react';
import MatrixContainer from "./MatrixContainer";
import Matrix from "./MatrixInput";


export default class Interface extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return <div>
      <h3>Affin transformations</h3>
      <MatrixContainer matrixes={[<Matrix/>, <Matrix/>]}/>
    </div>;
  }
}