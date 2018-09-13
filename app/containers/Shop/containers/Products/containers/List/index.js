import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }))
export default class List extends Component {
  render() {
    return (
      <Grid container className={'shop products'}>

        <Grid item xs={12}>

          <Grid container>

            <Grid item sm={12} xs={3}>

              <div className={'product-filter'}>

                <div className={'product-filter_item'}>

                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expanded
                      expandIcon={<ExpandMoreIcon />}
                    >
                      Категории
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      Трусики
                    </ExpansionPanelDetails>
                  </ExpansionPanel>

                </div>

              </div>

            </Grid>

            <Grid item sm={12} xs={9}>

            </Grid>

          </Grid>

        </Grid>

      </Grid>
    );
  }
}
