import * as React from 'react';
import {spring, Motion} from "react-motion";
import {merge} from "../animationTools";
import {invert} from "../tools";

interface MotionMenuP {
  up?: boolean;
  btnSize?: number;
  distance?: number;
  onOpen?;
  onClose?;
  onClick?;
  style?;
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
    let {children, distance, btnSize, up} = this.props;
    btnSize = btnSize ? btnSize : 20;
    distance = distance ? distance : 50;
    const begin = (i) => 0;
    const end = (i) => i * distance + btnSize;
    let dStyle, style;
    if (isShowTrigger) {
      dStyle = begin;
      style =  end;
    } else {
      dStyle = end;
      style =  begin;
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
          return <div className="itemStyle" onClick={this.onClick} style={style}>{e}</div>;
        }}
      </Motion>
    });
    return <div style={merge(this.props.style, {position: 'absolute'})}>
      {up ? invert(items) : null}
      <div onClick={this.onClick}>
        {button}
      </div>
      {!up ? items : null}
    </div>
  }
}

const itemStyle = {
  position: 'absolute',
};

const springConfig = {
  precision: 1,
  stiffness: 200,
  damping: 14
};

