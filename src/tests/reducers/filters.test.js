import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should set up default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  // Set state to sort by amount so that we can test the change.
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filterReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const action = {text: 'something', type: 'SET_TEXT_FILTER' };
  const state = filterReducer(undefined, action);
  expect(state.text).toBe('something');
});

test('should set start date', () => {
  const startDate = moment();
  const action = {startDate, type: 'SET_START_DATE' };
  const state = filterReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

test('should set end date', () => {
  const endDate = moment();
  const action = {endDate, type: 'SET_END_DATE' };
  const state = filterReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
