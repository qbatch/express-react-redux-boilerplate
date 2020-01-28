import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory as createHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createHistory(),
});

export const store = createStore(
  combineReducers({
    ...rootReducer,
    router: routerReducer,
  }),
  initialState,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export const history = createReduxHistory(store);
