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
import FilterOperation from './components/FilterOperation';
import {
  pullOperations,
  resetOperationsList,
  changeNumOnPage,
  applyFilter,
  changePage,
} from './store/actions';
import { amountOutput } from 'lib/amount';
import { parseParams } from 'lib/utils';
import Storage from 'lib/storage';
import moment from 'moment';
import _ from 'lodash';

@connect(({ routing, Dashboard, Dashboard_Operations, Operations_List }) => ({ routing, Dashboard, Dashboard_Operations, Operations_List }), ({
  pullOperations,
  resetOperationsList,
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
    const { search } = this.props.routing.location;

    this.initialData(search);
  }

  componentDidUpdate(prevProps) {
    if (this.props.routing.location.search !== prevProps.routing.location.search) {
      this.initialData(this.props.routing.location.search);
    }
  }

  componentWillUnmount() {
    this.props.resetOperationsList();
  }

  initialData = (searchParam) => {
    const parse = parseParams(searchParam);
    const shift = (parse && parse.shift) ? parse.shift : false;

    this.props.pullOperations(shift)
      .finally(() => this.setState({ ready: true }));
  };

  handleChangePage = (event, page) => {
    const { num_on_page } = this.props.Operations_List;

    this.props.changePage(page);
    this.props.applyFilter(page, num_on_page);
  };

  handleChangeRowsPerPage = event => {
    const { page } = this.props.Operations_List;
    const { value } = event.target;

    this.props.changeNumOnPage(value);
    this.props.applyFilter(page);
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderLoaderTable = () => (
    <TableRow>
      <TableCell colSpan={8} className={'table-loading_wrapper'}>
        <CircularProgress size={24} className={'table-loading_spinner'} />
      </TableCell>
    </TableRow>
  )

  renderTableContent = (permissions) => this.props.Operations_List.operations
    .map((operation) => {

      const { id, type, category, sum, currency, created_at, shift, tags, files } = operation;
      const operation_type = _.find(this.props.Dashboard.operation_type, { id: type }).label;
      const operation_sum = `${new Intl.NumberFormat('en-US').format(amountOutput(sum).value)} ${currency.symbol}`;
      const operation_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');
      const operation_shift_started = moment(shift.started_at * 1000).format('HH:mm DD/MM/YYYY');
      const operation_shift_ended = moment(shift.ended_at * 1000).format('HH:mm DD/MM/YYYY');
      const operation_tags = tags.length === 0 ? '-' : (tags.length >= 1 && tags.length <= 5) ? tags.reduce((a, b, i) => i === 0 ? `${a}${b.name}` : `${a}, ${b.name}`, '')
        : `${tags.slice(0, 5).reduce((a, b, i) => i === 0 ? `${a}${b.name}` : `${a}, ${b.name}`, '')} и еще ${tags.slice(5).length}`;
      const operation_files = files.length === 0 ? 'Нет' : 'Есть';

      return (
        <TableRow key={id} className={'operations-list_row'}>
          <TableCell className={'operations-list-table_item'}>
            {
              permissions.includes('operations-single') ? (
                <Link to={`/dashboard/operations/${id}`}>{id}</Link>
              ) : id
            }
          </TableCell>
          <TableCell className={'operations-list-table_item'}>{operation_type}</TableCell>
          <TableCell className={'operations-list-table_item'}>{category.name}</TableCell>
          <TableCell className={'operations-list-table_item'}>{operation_sum}</TableCell>
          <TableCell className={'operations-list-table_item'}>{operation_created}</TableCell>
          <TableCell className={'operations-list-table_item'}>
            {
              shift.ended_at ? (
                <div>
                  <p>Начало: {operation_shift_started}</p>
                  <p>Конец: {operation_shift_ended}</p>
                </div>
              ) : <span>Текущая смена</span>
            }
          </TableCell>
          <TableCell className={'operations-list-table_item'}>
            <span>{operation_tags}</span>
          </TableCell>
          <TableCell className={'operations-list-table_item'}>{operation_files}</TableCell>
        </TableRow>
      );
    })

  renderContent = () => {
    const {
      num_on_page,
      page,
      total_records
    } = this.props.Operations_List;
    const { permissions } = Storage.get('permissions');
    const params = parseParams(this.props.location.search);
    const shift = _.has(params, 'shift') ? params.shift : null;

    return (
      <Grid item xs={12} className={'operations-list'}>

        <Grid container>
          {
            permissions.includes('operations-create') && (
              <Fragment>
                <Grid item xs={12} className={'operations-list_add'}>
                  <Grid container justify={'flex-start'}>
                    <Grid item xs={12} md={5} lg={3}>
                      <Button
                        fullWidth
                        variant={'raised'}
                        color={'primary'}
                        disabled={!this.props.Dashboard.hasActiveShift}
                        onClick={() => this.props.replace('/dashboard/operations/new')}
                      >
                        Добавить операцию
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
            <ExpansionPanel className={'operations-filter_toggle-panel'}>
              <ExpansionPanelSummary expandIcon={<FilterListIcon className={'operations-filter_toggle-icon'} />} >
                {
                  shift && <span className={'filter_shift-id'}>Смена с ID: {shift}</span>
                }
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FilterOperation />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} className={'dashboard-table'}>

            <Table className={'operations-list-table'}>
              <TableHead>
                <TableRow className={'operations-list-table_header'}>
                  <TableCell>ID</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Дата создания</TableCell>
                  <TableCell>Смена</TableCell>
                  <TableCell style={{ width: '5%' }}>Теги</TableCell>
                  <TableCell>Файлы</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={'operations-list-table_body'}>
                {this.props.Operations_List.isLoadingTable ? this.renderLoaderTable() : this.renderTableContent(permissions)}
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
