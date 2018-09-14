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
} from '@material-ui/core';
import {
  pullNews,
  resetNewsList,
} from './store/actions';
import Storage from 'lib/storage';
import moment from 'moment';

@connect(({ Admin_News_List }) => ({ Admin_News_List }), ({
  pullNews,
  resetNewsList,
  replace
}))
export default class List extends Component {

  state = {
    ready: false,
  };

  componentDidMount() {
    this.initialData();
  }

  componentWillUnmount() {
    this.props.resetNewsList();
  }

  initialData = () => {
    this.props.pullNews()
      .finally(() => this.setState({ ready: true }));
  };

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderLoaderTable = () => (
    <TableRow>
      <TableCell colSpan={8} className={'table-loading_wrapper'}>
        <CircularProgress size={24} className={'table-loading_spinner'} />
      </TableCell>
    </TableRow>
  )

  renderTableContent = (permissions) => this.props.Admin_News_List.news
    .map((news) => {

      const { id, name, content, created_at } = news;

      const news_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');

      return (
        <TableRow key={id} className={'news-list_row'}>
          <TableCell className={'news-list-table_item'}>
            {
              permissions.includes('news-single') ? (
                <Link to={`/admin/news/${id}`}>{id}</Link>
              ) : id
            }
          </TableCell>
          <TableCell className={'news-list-table_item'}>{name}</TableCell>
          <TableCell className={'news-list-table_item'}>{content}</TableCell>
          <TableCell className={'news-list-table_item'}>{news_created}</TableCell>
        </TableRow>
      );
    })

  renderContent = () => {
    const { permissions } = Storage.get('permissions');

    return (
      <Grid item xs={12} className={'news-list'}>

        <Grid container>
          {
            permissions.includes('news-create') && (
              <Fragment>
                <Grid item xs={12} className={'news-list_add'}>
                  <Grid container justify={'flex-start'}>
                    <Grid item xs={12} md={5} lg={3}>
                      <Button
                        fullWidth
                        variant={'raised'}
                        color={'primary'}
                        onClick={() => this.props.replace('/admin/news/new')}
                      >
                        Добавить новость
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

          <Grid item xs={12} className={'admin-table'}>

            <Table className={'news-list-table'}>
              <TableHead>
                <TableRow className={'news-list-table_header'}>
                  <TableCell>ID</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>Контент</TableCell>
                  <TableCell>Дата создания</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={'news-list-table_body'}>
                {this.props.Admin_News_List.isLoadingTable ? this.renderLoaderTable() : this.renderTableContent(permissions)}
              </TableBody>

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
