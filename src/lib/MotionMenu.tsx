import * as React from 'react';
import {spring, Motion} from "react-motion";
import {merge, range} from "../animationTools";

interface MotionMenuP {
  margin: number;
  distance: number;
  rotation: boolean;
  onOpen;
  onClose;
  onClick;
}
interface MotionMenuS {
  isShowTrigger?;
  idle?;
  isShow?;
}
export default class MotionMenu extends React.Component<MotionMenuP, MotionMenuS> {

  constructor(props) {
    super(props);
    this.state = {
      isShowTrigger: false,
      isShow: false,
      idle: true
    };
    this.onClick = this.onClick.bind(this);
    this.onRect = this.onRect.bind(this);
  }

  onRect() {
    const {isShowTrigger, idle} = this.state;
    console.log('onRect');
    this.setState({isShow: isShowTrigger || !idle, idle: true});
  }

  onClick() {
    const show = this.state.isShowTrigger;
    const {onClick, onClose, onOpen} = this.props;
    onClick && onClick();
    if (show) {
      onClose && onClose();
    } else {
      onOpen && onOpen();
    }
    this.setState({isShowTrigger: !show, isShow: true, idle: false});
  }

  render() {
    const {isShowTrigger, isShow, idle} = this.state;
    let {children, margin, distance} = this.props;
    margin = margin ? margin : 10;
    distance = distance ? distance : 10;
    let begin = (i) => -i * distance;
    let end = (i) => i * distance + margin;
    return <div>
        <button onClick={this.onClick}>show</button>
        {isShow && range(10).map((e, i) => {
          return <Motion key={i}
                         defaultStyle={{y: isShowTrigger ? begin(i) : end(i)}}
                         style={{y: spring(isShowTrigger ? end(i) : begin(i), springConfig)}}
                         onRest={this.onRect}
          >
            {({scale, shadow, y}) => {
              let style = merge(itemStyle, {top: y});
              return <div className="itemStyle" style={style}>button</div>;
            }}
          </Motion>
        })}
    </div>
  }
}

const itemStyle = {
  position: 'relative',
  top: 0
};

const springConfig = {
  precision: 1
};

