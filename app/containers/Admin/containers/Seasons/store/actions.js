import {
  SET_SEASON,
  SET_SEASONS,
  APPEND_SEASON,
  CHANGE_ADD_SEASON,
  CHANGE_SEASON_INFO,
  SET_SEASON_INFO,
  RESET_SEASON_INFO,
  RESET_SEASON_ADD,
  SET_IS_LOADING,
  RESET,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setSeasons = (value) => ({
  type: SET_SEASONS,
  payload: value,
});

export const setSeason = (index, data) => ({
  type: SET_SEASON,
  payload: {
    index,
    data
  },
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const changeSeasonInfo = (key, value) => ({
  type: CHANGE_SEASON_INFO,
  payload: {
    key,
    value
  },
});

export const appendSeason = (value) => ({
  type: APPEND_SEASON,
  payload: value,
});

export const changeAddSeason = (key, value) => ({
  type: CHANGE_ADD_SEASON,
  payload: {
    key,
    value
  },
});

export const setSeasonInfo = (value) => ({
  type: SET_SEASON_INFO,
  payload: value,
});

export const resetSeasonsList = () => ({ type: RESET });

export const resetSeasonInfo = () => ({ type: RESET_SEASON_INFO });

export const resetSeasonAdd = () => ({ type: RESET_SEASON_ADD });

export const pullSeasons = () => (dispatch) => new Promise((resolve, reject) => {
  api.season.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setSeasons(data.data));
      resolve();
    })
    .catch(() => reject());
})

export const addNewSeason = () => (dispatch, getState) => {
  const { name, description } = getState().Admin_Seasons.addSeason;

  if (name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя сезона', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.season.add(name, description)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(resetSeasonAdd());
      dispatch(appendSeason(data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Категория ${name} была добавлена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const applySeasonName = (index) => (dispatch, getState) => {
  const {
    seasonInfo: {
      name,
      description,
    },
    seasons
  } = getState().Admin_Seasons;
  const season = seasons[index];

  const editSeason = {
    name: name === '' ? season.name : name,
    description: description === season.description ? season.description : description,
  };

  if (editSeason.name === season.name && editSeason.description === season.description) return;

  if (editSeason.name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя сезона', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.season.edit(season.id, editSeason.name, editSeason.description)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setSeason(index, data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Категория ${season.name} была изменена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
