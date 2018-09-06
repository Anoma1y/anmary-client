import React from 'react';
import NumberFormat from 'react-number-format';

export default (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      decimalScale={2}
      allowNegative={false}
      thousandSeparator
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );
}
