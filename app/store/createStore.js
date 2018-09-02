import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory as createHistory } from 'history';
import reducers from './reducers';

export const history = createHistory();
const imSt = require('redux-immutable-state-invariant').default();

let middleware = [thunk, routerMiddleware(history)];
const enchancers = [];

if (process.env.NODE_ENV === 'development') {
  const reduxImmutableStateInvariant = imSt;
  const logger = createLogger({ collapsed: true });
  middleware = [...middleware, reduxImmutableStateInvariant, logger];

  const { devToolsExtension } = window;
  if (typeof devToolsExtension === 'function') {
    enchancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enchancers);
const store = createStore(reducers, {}, composedEnhancers);

export default store;
