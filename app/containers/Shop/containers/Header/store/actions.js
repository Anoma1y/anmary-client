import {
  SET_COUNT_ITEMS,
  CHANGE_COUNT_ITEMS
} from './types';

export const setCountItems = (value) => ({
  type: SET_COUNT_ITEMS,
  payload: value,
});

export const changeCountItems = (key, value) => ({
  type: CHANGE_COUNT_ITEMS,
  payload: {
    key,
    value
  },
});

