import React, { Component } from 'react';
import Carousel from 'nuka-carousel';

export default class Slider extends Component {

  componentDidMount() {
    this.autoSlide();
  }

  componentWillUnmount() {
    this.stopAutoSlide();
  }

  setCarouselRef = (node) => this.carousel = node;

  autoSlide = () => {
    if (this.props.autoTime) {
      const { carousel } = this;

      const carouselState = carousel.state;

      let nextSlide = carouselState.currentSlide + 1;

      if (nextSlide >= carouselState.slideCount) {
        nextSlide = 0;
      }

      this.stopAutoSlide();
      this.autoPlayTimeout = setTimeout(carousel.goToSlide.bind(null, nextSlide), this.props.autoTime);
    }
  };

  stopAutoSlide = () => {
    clearTimeout(this.autoPlayTimeout);
  };

  handleLoadImage = () => {
    this.carousel.setDimensions();
  };

  render() {
    return (
      <Carousel
        afterSlide={this.autoSlide}
        autoplay
        initialSlideHeight={800}
        pauseOnHover={false}
        ref={this.setCarouselRef}
        renderCenterRightControls={() => null}
        renderCenterLeftControls={() => null}
        renderBottomCenterControls={() => null}
        transitionMode={'fade'}
        wrapAround
      >
        <img onLoad={this.handleLoadImage} src={'/static/images/slider/first.jpg'} />
        <img onLoad={this.handleLoadImage} src={'/static/images/slider/second.jpg'} />
        <img onLoad={this.handleLoadImage} src={'/static/images/slider/third.jpg'} />
      </Carousel>
    );
  }
}
