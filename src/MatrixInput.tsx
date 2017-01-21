import * as React from 'react';

export default class Matrix extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  renderMatrix() {
    let inputs = [];
    for (let i = 0; i < 4; i++) {
      inputs.push(<input type="number"/>);
    }
    return inputs;
  }

  render() {
    return <div>
      {this.renderMatrix()}
      <button>x</button>
    </div>
  }
}