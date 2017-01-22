import * as React from 'react';
import MatrixInput from "./MatrixInput";
import {Data} from "./interface";
import {Motion, spring} from "react-motion";

const springConfig = {stiffness: 300, damping: 50};

interface MatrixContainerP {
  matrix: Data;
}

interface MatrixContainerS {
  topDeltaY?;
  mouseY?;
  isPressed?;
  originalPosOfLastPressed?;
  order?;
  itemsCount?;
  isMove?;
}

export default class MatrixContainer extends React.Component<MatrixContainerP, MatrixContainerS> {
  constructor(props) {
    super(props);
    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      isMove: false,
      originalPosOfLastPressed: 0,
      order: range(props.matrix.size),
      itemsCount: props.matrix.size,
    };
    [
      'handleMouseUp',
      'handleMouseMove',
      'handleMouseDown',
      'handleTouchStart',
      'handleTouchMove',
    ].forEach(fn => this[fn] = this[fn].bind(this));
  }

  shouldComponentUpdate(nextProps) {
    const itemsCount = nextProps.matrix.size;
    const currentCount = this.state.itemsCount;
    if (itemsCount != currentCount) {
      this.setState({
        itemsCount,
        order: range(itemsCount),
      });
    }
    return true;
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp() {
    this.setState({isPressed: false, isMove: false, topDeltaY: 0});
  }

  handleMouseDown(pos, pressY, {pageY}) {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos,
    });
  }

  handleMouseMove({pageY}) {
    const {isPressed, topDeltaY, order, originalPosOfLastPressed, itemsCount} = this.state;
    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)){
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }
      this.setState({mouseY: mouseY, order: newOrder, isMove: true});
    }
  }

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  renderMatrix() {
    const {matrix} = this.props;
    const el = [];
    matrix.getAll().forEach(e => {
      el.push(<MatrixInput value={e.id} matrix={matrix}/>);
    });
    return el;
  }

  render() {
    const {mouseY, isMove, originalPosOfLastPressed, order} = this.state;
    return <div className="matrixContainer">
      {
        this.renderMatrix().map((e, i) => {
          const style = originalPosOfLastPressed === i && isMove
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: mouseY,
            }
            : {
              scale: spring(1, springConfig),
              shadow: spring(1, springConfig),
              y: spring(order.indexOf(i) * 100, springConfig),
            };

          return <Motion style={style} key={i}>
            {({scale, shadow, y}) =>
              <div onMouseDown={this.handleMouseDown.bind(null, i, y)}
                   onTouchStart={this.handleTouchStart.bind(null, i, y)}
                   style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === originalPosOfLastPressed ? 99 : i,
                  }}
                  className={'matrix' + (isMove ? ' matrix-pressed': '')}>
                {e}
              </div>
            }
          </Motion>;
        })
      }
    </div>
  }
}

function range(size) {
  const arr = [];
  for (let i = 0; i <= size; i++) {
    arr.push(i);
  }
  return arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}