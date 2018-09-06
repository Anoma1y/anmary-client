import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

export default ({ input, label }) => (
  <FormControlLabel
    control={
      <Switch
        checked={!!input.value}
        color={'primary'}
        onChange={input.onChange}
      />
    }
    label={label}
  />
);
