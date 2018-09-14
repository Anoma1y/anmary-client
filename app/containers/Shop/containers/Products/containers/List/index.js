import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  CircularProgress,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import {
  pullProducts,
  resetProductsList,
  resetFilter
} from './store/actions';

@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }), ({
  pullProducts,
  resetProductsList,
  resetFilter
}))
export default class List extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    this.props.pullProducts()
      .then(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetProductsList();
  }
  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
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
    )
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }

}
