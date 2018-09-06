import React from 'react';
import { Select } from '@material-ui/core';

/**
 * Рендер выпадающего списка для выбора стран
 * @param input - инпут
 * @param touched - хз
 * @param error - текст ошибки
 * @param children - <option></option>
 * @returns {*}
 */
export default ({ input, meta: { touched, error }, children }) => (
  <Select
    native
    error={touched && error}
    {...input}
    onChange={(event) => {
      input.onChange(event.target.value);
    }}
  >
    {children}
  </Select>
);
