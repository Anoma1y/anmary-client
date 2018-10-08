import {
  CHANGE_SEARCH_VALUE,
} from './types';
import encodeURL from 'encodeurl';
import { replace } from 'react-router-redux';

export const changeSearchValue = (value) => ({
  type: CHANGE_SEARCH_VALUE,
  payload: value,
});

export const applySearch = () => (dispatch, getState) => {
  const { search } = getState().Shop;

  dispatch(changeSearchValue(''));
  dispatch(replace(`/product?search=${encodeURL(search.trim())}`));
};
