import React from 'react';
import classnames from 'classnames';

export default (props) => {

  const {
    className
  } = props;

  const classBlockName = 'breadcrumb_divider';

  const classes = classnames(
    classBlockName,
    className
  );

  return (
    <div className={classes}> / </div>
  );
};
