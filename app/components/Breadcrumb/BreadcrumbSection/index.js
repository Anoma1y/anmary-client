import * as React from 'react';
import classnames from 'classnames';

export default class BreadcrumbSection extends React.Component {

  render() {

    const {
      active = false,
      children,
      className,
    } = this.props;

    const classBlockName = 'breadcrumb_section';

    const classes = classnames(
      classBlockName,
      {
        [`${classBlockName}__active`]: active
      },
      className
    );

    return <div className={classes}>{children}</div>;
  }

}
