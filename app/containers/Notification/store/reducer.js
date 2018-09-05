import {
  SEND_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from './types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return [
        action.payload,
        ...state.filter((notification) => notification.id !== action.payload.id)
      ];
    case REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== action.payload);
    case CLEAR_ALL_NOTIFICATION:
      return INITIAL_STATE;
    default:
      return state;
  }
};
