import * as React from 'react';
import {findDOMNode} from 'react-dom';

import {spring, Motion} from "react-motion";
import {merge, range} from "../animationTools";

interface MotionMenuP {
  up?: boolean;
  btnSize?: number;
  margin?: number;
  distance?: number;
  rotation?: boolean;
  onOpen?;
  onClose?;
  onClick?;
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
    let {children, margin, distance, btnSize, up} = this.props;
    margin = margin ? margin : 10;
    distance = distance ? distance : 10;
    distance = !isShowTrigger ? distance + 30 : distance;
    let begin = (i) => -i * distance;
    let end = (i) => i * distance + margin;
    const dir = up ? -1 : 1;

    const wrapper = (fn) => (i) => fn(i);
    let dStyle, style;
    if (isShowTrigger) {
      dStyle = wrapper(begin);
      style =  wrapper(end);
    } else {
      dStyle = wrapper(end);
      style =  wrapper(begin);
    }

    const [button, ...itemsComp] = children;
    const items = isShow && itemsComp.map((e, i) => {
      i++;
      return <Motion key={i}
                     defaultStyle={{y: dStyle(i)}}
                     style={{y: spring(style(i), springConfig)}}
                     onRest={this.onRect}>
        {({scale, shadow, y}) => {
          const s = up ? {bottom: y} : {top: y};
          let style = merge(itemStyle, s);
          return <div className="itemStyle" style={style}>{e}</div>;
        }}
      </Motion>
    });
    return <div>
      {up ? items : null}
      <div onClick={this.onClick}>
        {button}
      </div>
      {!up ? items : null}
    </div>
  }
}

const itemStyle = {
  position: 'relative',
};

const springConfig = {
  precision: 1,
  stiffness: 120,
  damping: 14
};

