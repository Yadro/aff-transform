

const matrixTypes = {
  'default': [['0', '0'], ['0', '0']],
  'simmetr': [['-1', '0'], ['0', '1']],
  'scale': [['2', '0'], ['0', '2']],
  'shift': (deg) => [['1', `tan(${deg})`], ['0', '1']],
  'rotate': (deg) => [[`cos(${deg})`, `-sin(${deg})`], [`sin(${deg})`, `cos(${deg})`]],
};

export interface MatrixInputData {
  id: number;
  value: string[][];
  type?;
  valueType?;
}

export class Data {
  lastId = -1;
  data: MatrixInputData[] = [];
  size = 0;

  constructor(private update) {
    [
      'add',
      'addType',
      'getElem',
      'getAll',
      'onChange',
      'onChangeType',
      'remove',
    ].forEach(fn => this[fn] = this[fn].bind(this));
  }

  getElem(id) {
    const item = this.data.find(e => e.id == id);
    if (item) {
      return item;
    }
  }

  getAll() {
    return this.data;
  }

  add() {
    this.lastId++;
    this.data.push({
      id: this.lastId,
      value: matrixTypes.default,
      type: null,
      valueType: null
    });
    this.size++;
    this.update();
  }

  addType(type) {
    this.lastId++;
    let valueType = ['shift', 'rotate'].indexOf(type) > -1 ? 45 : null;
    this.data.push({
      id: this.lastId,
      value: valueType ? matrixTypes[type](valueType) : matrixTypes[type],
      type: type,
      valueType
    });
    this.size++;
    this.update();
  }

  onChangeType(id, e) {
    const item = this.data.find(e => e.id == id);
    if (!item) {
      return;
    }
    item.valueType = e.target.value;
    item.value = matrixTypes[item.type](item.valueType);
    this.update();
  }

  onChange(id, row, el, e) {
    const item = this.data.find(e => e.id == id);
    if (item) {
      item.value[row][el] = e.target.value;
    }
    this.update();
  }

  remove(id) {
    this.data = this.data.filter(e => e.id != id);
    this.size--;
    this.update();
  }
}