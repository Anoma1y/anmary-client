import React from 'react';
import classnames from 'classnames';
import BreadcrumbSection from './BreadcrumbSection';
import BreadcrumbDivider from './BreadcrumbDivider';
import './style.scss';

const Breadcrumb = (props) => {

  const {
    children,
    className,
  } = props;

  const classBlockName = 'breadcrumb';

  const classes = classnames(
    classBlockName,
    className
  );

  return <div className={classes}>{children}</div>;
};

Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
