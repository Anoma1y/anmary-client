import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid
} from '@material-ui/core';
import {
  pullNews,
  resetNews
} from './store/actions';
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
    return (
      <Card key={news}>
        <CardMedia
          image="/static/images/news-cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <h3>Lizard</h3>
          <p>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </p>
        </CardContent>
      </Card>
    );
  }

  renderContent = () => (
    <section className={'news'}>
      <Grid item xs={12} className={'container'}>
        <div className={'section-title-container'}>
          <div className={'section_subtitle'}>только лучшее</div>
          <div className={'section_title'}>новости</div>
        </div>
      </Grid>

      <Grid item xs={12} className={'container'}>

        <Grid container spacing={40}>

          <article className={'news-card'}>
            <div className={'news-card_wrapper'}>

              <figure className={'news-card_feature'}>
                <img
                  src={'https://www.dropbox.com/s/z7gp2vanse5djxf/waves.jpg?raw=1'}
                  className={'news-card_img'}
                  alt={'News Card Thumb'}
                  width={'275'}
                  height={'240'} />
              </figure>

              <div className={'news-card_box'}>

                <header className={'news-card_item news-card__header'}>
                  <h6 className={'news-card_item news-card_item__small news-card_label'}>2 дн. назад</h6>
                  <h2 className={'news-card_item news-card_item__small news-card_title'}>Название новости</h2>
                </header>

                <hr className={'news-card_item news-card_divider'} />

                <section className={'news-card_item news-card_body'}>
                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem eaque eius inventore quasi quo quod, reiciendis repellat reprehenderit. At deleniti distinctio dolore eveniet, ex fuga maxime perferendis totam. Error, quam?
                  </p>
                </section>

              </div>

            </div>
          </article>

        </Grid>

      </Grid>
    </section>
  )
  renderLoader = () => <CircularProgress size={24} className={'shop_loading'} />;

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
