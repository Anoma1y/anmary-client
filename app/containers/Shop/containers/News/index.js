import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CircularProgress,
  Grid
} from '@material-ui/core';
import {
  pullNews,
  resetNews
} from './store/actions';
import moment from 'moment';
import './style.scss';

@connect(({ Shop_News }) => ({ Shop_News }), ({
  pullNews,
  resetNews
}))
export default class News extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    this.props.pullNews()
      .then(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetNews();
  }

  renderNewsCard = (news) => {
    const HOST = process.env.API_HOST;
    const { id, name, content, image, created_at } = news;
    const date = moment(created_at * 1000).format('DD.MM.YYYY');

    return (
      <article className={'news-card'} key={id}>
        <div className={'news-card_wrapper'}>

          <figure className={'news-card_feature'}>
            <img
              src={`${HOST}/${image.original_uri}`}
              className={'news-card_img'}
              alt={'News Card Thumb'}
            />
          </figure>

          <div className={'news-card_box'}>

            <header className={'news-card_item news-card__header'}>
              <h6 className={'news-card_item news-card_item__small news-card_label'}>{date}</h6>
              <h2 className={'news-card_item news-card_item__small news-card_title'}>{name}</h2>
            </header>

            <hr className={'news-card_item news-card_divider'} />

            <section className={'news-card_item news-card_body'}>
              <p>
                {content}
              </p>
            </section>

          </div>

        </div>
      </article>
    );
  };

  renderEmptyNews = () => (
    <Grid container>
      <Grid item xs={12}>
        <div className={'news-empty'}>
          <h3 className={'news-empty_content'}>Новостей нет</h3>
        </div>
      </Grid>
    </Grid>
  );

  renderContent = () => (
    <section className={'news'}>
      <Grid item xs={12} className={'container'}>
        <Grid container spacing={40}>
          <Grid item xs={12}>
            {
              this.props.Shop_News.news.length === 0 ?
                this.renderEmptyNews() :
                this.props.Shop_News.news
                  .map((newsItem) => this.renderNewsCard(newsItem))
            }
          </Grid>
        </Grid>

      </Grid>
    </section>
  );

  renderLoader = () => <CircularProgress size={24} className={'shop_loading'} />;

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
