import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import todoAppReducer from './reducers/todoAppReducer.js';

const reducers = combineReducers({
  todoAppStore: todoAppReducer,
});

const Store = createStore(reducers, composeWithDevTools());

export default Store;
