import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import AutoReducers from './_reducers';

export const RESET_ALL = 'RESET_ALL';

const appReducer = combineReducers({
  form: reduxFormReducer,
  routing: routerReducer,
  ...AutoReducers
});

const reducer = (state, action) => {
  switch (action.type) {
    case RESET_ALL:
      return appReducer(state = undefined, action);
    default:
      return appReducer(state, action);
  }
};

export default reducer;

