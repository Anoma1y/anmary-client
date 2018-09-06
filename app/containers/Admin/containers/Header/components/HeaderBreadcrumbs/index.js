import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'components/Breadcrumb';
import {
  getPathInfo,
  upperFirstCase
} from 'lib/pathUtils';
import GetPathname from 'lib/pathName';
import './style.scss';

const renderSection = (list) => {
  return list.map((item, index) => {
    const linkName = upperFirstCase(GetPathname(item.name));

    return (
      <Breadcrumb.Section
        key={item.key}
        className={list.length === index + 2 ? 'breadcrumb_section__last' : ''}
        active={list.length === index + 1}
      >
        {
          index !== list.length - 1 ? <Link to={item.link}> {linkName}</Link> : <div>{linkName}</div>
        }
      </Breadcrumb.Section>
    );
  });
};

const HeaderBreadcrumbs = (props) => {

  const { pathname } = props.routing.location;
  const breadcrumbsList = getPathInfo(pathname);

  return (
    <Breadcrumb className={'breadcrumb-area'}>
      {renderSection(breadcrumbsList)}
    </Breadcrumb>
  );
};

export default connect(({ routing }) => ({ routing }), {})(HeaderBreadcrumbs);

