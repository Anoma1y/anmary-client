import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  setFilterValue,
  appendFilterValue,
  removeFilterValue
} from '../../store/actions';
import _ from 'lodash';

@connect(({ Shop_Products_List }) => ({ Shop_Products_List }), ({
  setFilterValue,
  appendFilterValue,
  removeFilterValue
}))
export default class SidebarFilterPanel extends Component {
  render() {
    const {
      data,
      dataItem,
      alterName,
      label
    } = this.props;
    const filterItem = this.props.Shop_Products_List[`filter_${dataItem}`] || [];

    return (
      <ExpansionPanel
        className={'product-filter-sidebar_expansion'}
        onChange={(event, expanded) => !expanded && this.props.setFilterValue(dataItem, [])}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
          <span className={'product-filter-sidebar-item_header-text'}>
            {label}
          </span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

          <List
            className={`product-filter-sidebar-list${data.length > 4 ? ' product-filter-sidebar-list__scroll' : ''}`}
            component={'nav'}
          >
            <ListItem
              button
              onClick={() => this.props.setFilterValue(dataItem, [])}
              className={`product-filter-sidebar-list_item${filterItem.length === 0 ? ' product-filter-sidebar-list_item__selected' : ''}`}
            >
              <ListItemText
                primary={'Все'}
                className={'product-filter-sidebar-list_text'}
              />
            </ListItem>
            {
              data.map((item) => {
                const findItem = _.includes(filterItem, item.id);

                return (
                  <ListItem
                    button
                    key={item.id}
                    onClick={() => findItem ?
                      this.props.removeFilterValue(dataItem, item.id)
                      : this.props.appendFilterValue(dataItem, item.id)
                    }
                    className={`product-filter-sidebar-list_item${findItem ? ' product-filter-sidebar-list_item__selected' : ''}`}
                  >
                    <ListItemText
                      primary={alterName ? `${item[alterName.main]} (${item[alterName.additional]})` : item.name}
                      className={'product-filter-sidebar-list_text'}
                    />
                  </ListItem>
                );
              })
            }
          </List>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
