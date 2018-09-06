import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export default ({ input, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={!!input.value}
        color={'primary'}
        onChange={input.onChange}
      />
    }
    label={label}
  />
);
