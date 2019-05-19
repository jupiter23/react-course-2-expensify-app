import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisible from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill', amount: 5000, createdAt: 456 }));
store.dispatch(addExpense({ description: 'Gaz bill', amount: 700, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 123 }));

let state = store.getState(); 

let expenses, filters;
({ expenses, filters } = store.getState());

const visibleExpenses = getVisible(state.expenses, state.filters);

// console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
