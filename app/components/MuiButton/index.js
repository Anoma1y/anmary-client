import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './style.scss';

export default (props) => {

  const {
    isLoading, // boolean - состояние загрузки
    size = 24 // размер
  } = props;

  return (
    <div className={'mui-btn'}>
      {props.children}
      {isLoading && <CircularProgress size={size} className={`mui-btn_progress mui-btn_progress__${size}`} />}
    </div>
  )
}
