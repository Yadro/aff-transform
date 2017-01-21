import * as React from 'react';

export default class MatrixContainer extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      {this.props.matrixes}
      <button>Add</button>
      <button>Apply</button>
    </div>
  }
}