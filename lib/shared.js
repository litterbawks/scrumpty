const StatusCode = {
  NotStarted: 0,
  InProgress: 1,
  Complete: 2,
  Deleted: 3,
};

const COLOR = {
  red: '#CD5C5C',
  orange: '#FFE4B5',
  yellow: '#FFC0CB',
  green: '#90EE90',
};

const PRIORITY_COLOR = {
  0: COLOR.green,
  1: COLOR.orange,
  2: COLOR.orange,
  3: COLOR.red,
};

const itemTypes = {
  CARD : 'card',
  TASK : 'task'
}


module.exports = { StatusCode, COLOR, PRIORITY_COLOR, itemTypes };
