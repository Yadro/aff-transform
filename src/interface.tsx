import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Check from 'material-ui/svg-icons/navigation/check';
import Flip from 'material-ui/svg-icons/image/flip';
import Rotate from 'material-ui/svg-icons/image/rotate-left';
import Transform from 'material-ui/svg-icons/image/transform';
import SizeSelect from 'material-ui/svg-icons/image/photo-size-select-small';
import Shift from 'material-ui/svg-icons/device/network-cell'
import RaisedButton from 'material-ui/IconButton';
// import MotionMenu from '../lib/react-motion/bundle.js';


import MatrixContainer from "./MatrixContainer";
import {Operation, Rect} from "./Logic/Figures";
import Draw from "./Logic/Draw";
import Matrix22 from "./Logic/Matrix22";
import {parseInputData} from "./Logic/tool";
import {Data} from "./Data";
import {CircleBtn, RaisedBtn} from "./Material";
import MotionMenu from "./lib/MotionMenu";

interface InterfaceS {
  matrix: Data;
}

export default class Interface extends React.Component<any, InterfaceS> {
  drawControl = new Draw();

  constructor(props) {
    super(props);
    this.state = {
      matrix: new Data(this.forceUpdate.bind(this))
    };
    [
      'apply'
    ].forEach(fn => this[fn] = this[fn].bind(this));
    this.drawControl.draw();
  }

  apply() {
    const {drawControl, state} = this;
    const {matrix} = state;
    let transforms: Operation[] = [];
    const data = matrix.getAll();
    for (let id in data) {
      if (data.hasOwnProperty(id)) {
        let matrix = data[id].value;
        let transform = matrix.map(e => e.map(e => parseInputData(e)));
        transforms.push({mul: new Matrix22(transform)});
      }
    }

    drawControl.clear();
    drawControl.add(new Rect(0, 0, 50, 50).apply(transforms));
    drawControl.draw();
  }

  render() {
    const {matrix} = this.state;
    return <Drawer width={310} openSecondary={true} open={true}>
      <AppBar title="Affine transformations" showMenuIconButton={false} />
      <div className="btns">
        <span>Templates:</span>
        <div>
          <button onClick={matrix.addType.bind(this, 'simmetr')}>simmetr</button>
          <button onClick={matrix.addType.bind(this, 'scale')}>scale</button>
          <button onClick={matrix.addType.bind(this, 'shift')}>shift</button>
          <button onClick={matrix.addType.bind(this, 'rotate')}>rotate</button>
        </div>


        <MotionMenu>
          <div style={{'margin-bottom': '15px'}}>
            <CircleBtn><ContentAdd/></CircleBtn>
          </div>
          <div className="btn-with-label">
            <CircleBtn mini><Flip/></CircleBtn>
            <Paper className="btn-label" zDepth={2} rounded={true} margin="10">add</Paper>
          </div>
          <div className="btn-with-label">
            <CircleBtn mini><SizeSelect/></CircleBtn>
            <Paper className="btn-label" zDepth={2} rounded={true}>add</Paper>
          </div>
        </MotionMenu>


        <Paper zDepth={2} rounded={false} style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '10px'
        }}>



          <CircleBtn mini onClick={matrix.add} style={{
            float: 'right'
          }}><ContentAdd/></CircleBtn>
          <CircleBtn mini onClick={this.apply}><Check/></CircleBtn>
        </Paper>
      </div>
      <MatrixContainer matrix={matrix}/>
    </Drawer>
  }
}