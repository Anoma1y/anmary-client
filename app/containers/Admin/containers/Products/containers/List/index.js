import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Link } from 'react-router-dom';
import {
  Grid,
  CircularProgress,
  Button,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TablePagination,
} from '@material-ui/core';
import {
  FilterList as FilterListIcon
} from '@material-ui/icons';
import FilterProduct from './components/FilterProduct';
import {
  pullProducts,
  resetProductsList,
  changeNumOnPage,
  applyFilter,
  changePage,
} from './store/actions';
import { amountOutput } from 'lib/amount';
import { parseParams } from 'lib/utils';
import Storage from 'lib/storage';
import moment from 'moment';
import _ from 'lodash';

@connect(({ routing, Admin, Admin_Products, Products_List }) => ({ routing, Admin, Admin_Products, Products_List }), ({
  pullProducts,
  resetProductsList,
  changeNumOnPage,
  changePage,
  applyFilter,
  replace
}))
export default class List extends Component {

  state = {
    ready: false,
  };

  componentDidMount() {
    this.initialData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.routing.location.search !== prevProps.routing.location.search) {
      this.initialData();
    }
  }

  componentWillUnmount() {
    this.props.resetProductsList();
  }

  initialData = () => {
    this.props.pullProducts()
      .finally(() => this.setState({ ready: true }));
  };

  handleChangePage = (event, page) => {
    const { num_on_page } = this.props.Products_List;

    this.props.changePage(page);
    this.props.applyFilter(page, num_on_page);
  };

  handleChangeRowsPerPage = event => {
    const { page } = this.props.Products_List;
    const { value } = event.target;

    this.props.changeNumOnPage(value);
    this.props.applyFilter(page);
  };

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderLoaderTable = () => (
    <TableRow>
      <TableCell colSpan={8} className={'table-loading_wrapper'}>
        <CircularProgress size={24} className={'table-loading_spinner'} />
      </TableCell>
    </TableRow>
  )

  renderTableContent = (permissions) => this.props.Products_List.products
    .map((product) => {

      const { id, name, category, brand, season, price, discount, total_price, created_at } = product;

      const product_price = new Intl.NumberFormat('ru-RU').format(amountOutput(price).value);
      const product_discount = discount === 0 ? 'Нет' : `${discount} %`;
      const product_total_price = new Intl.NumberFormat('ru-RU').format(amountOutput(total_price).value);
      const product_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');

      return (
        <TableRow key={id} className={'products-list_row'}>
          <TableCell className={'products-list-table_item'}>
            {
              permissions.includes('products-single') ? (
                <Link to={`/admin/products/${id}`}>{id}</Link>
              ) : id
            }
          </TableCell>
          <TableCell className={'products-list-table_item'}>{name}</TableCell>
          <TableCell className={'products-list-table_item'}>{category.name}</TableCell>
          <TableCell className={'products-list-table_item'}>{brand.name}</TableCell>
          <TableCell className={'products-list-table_item'}>{season.name}</TableCell>

          <TableCell className={'products-list-table_item'}>{product_price}</TableCell>
          <TableCell className={'products-list-table_item'}>{product_discount}</TableCell>
          <TableCell className={'products-list-table_item'}>{product_total_price}</TableCell>

          <TableCell className={'products-list-table_item'}>{product_created}</TableCell>

        </TableRow>
      );
    })

  renderContent = () => {
    const {
      num_on_page,
      page,
      total_records
    } = this.props.Products_List;
    const { permissions } = Storage.get('permissions');

    return (
      <Grid item xs={12} className={'products-list'}>

        <Grid container>
          {
            permissions.includes('products-create') && (
              <Fragment>
                <Grid item xs={12} className={'products-list_add'}>
                  <Grid container justify={'flex-start'}>
                    <Grid item xs={12} md={5} lg={3}>
                      <Button
                        fullWidth
                        variant={'raised'}
                        color={'primary'}
                        onClick={() => this.props.replace('/admin/products/new')}
                      >
                        Добавить товар
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Fragment>
            )
          }

          <Grid item xs={12}>
            <ExpansionPanel className={'products-filter_toggle-panel'}>
              <ExpansionPanelSummary expandIcon={<FilterListIcon className={'products-filter_toggle-icon'} />} />

              <ExpansionPanelDetails>
                <FilterProduct />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} className={'admin-table'}>

            <Table className={'products-list-table'}>
              <TableHead>
                <TableRow className={'products-list-table_header'}>
                  <TableCell>ID</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Бренд</TableCell>
                  <TableCell>Сезон</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Скидка</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Дата</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={'products-list-table_body'}>
                {this.props.Products_List.isLoadingTable ? this.renderLoaderTable() : this.renderTableContent(permissions)}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={7}
                    count={total_records}
                    rowsPerPage={num_on_page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    page={page}
                  />
                </TableRow>
              </TableFooter>

            </Table>

          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
