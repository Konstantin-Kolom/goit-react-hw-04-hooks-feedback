import React, { Component } from 'react';

import { API_KEY, URL } from '../../Utilits/KEY_pixabay';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { SpinnerLoader } from '../Loader/Loader';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    loading: false,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.clearGallery();
      this.setState({
        loading: true,
        page: 1,
      });
      return fetch(
        `${URL}?q=${this.props.search}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      ).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        response
          .json()
          .then(photo => {
            const data = photo.hits;
            if (data.length > 0) {
              this.setState(prevState => ({
                gallery: data,
                error: false,
              }));
            } else {
              this.setState({ error: true });
            }
          })
          .catch(() => this.setState({ error: true }))
          .finally(() => this.setState({ loading: false }));
      });
    }

    if (prevState.page !== this.state.page && this.state.page > 1) {
      this.setState({
        loading: true,
      });
      return fetch(
        `${URL}?q=${this.props.search}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      ).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        response
          .json()
          .then(photo =>
            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...photo.hits],
            })),
          )
          .finally(() => this.setState({ loading: false }));
      });
    }
  }

  loadMore = pageMore => {
    this.setState({ page: pageMore });
  };

  modalImageData = imageSrc => {
    this.props.modalImage(imageSrc);
  };

  clearGallery = () => {
    this.setState({
      gallery: [],
    });
  };

  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { gallery, loading, error } = this.state;
    const loadMoreButton = gallery.length > 0 && !loading;
    this.scrollTo();
    return (
      <>
        {error && (
          <h1 className={s.mesageError}>
            No results found for your request '{this.props.search}'!
            <br />
            Please search again.
          </h1>
        )}
        {gallery.length > 0 && (
          <ul className={s.ImageGallery}>
            <ImageGalleryItem gallery={gallery} modalImageData={this.modalImageData} />
          </ul>
        )}
        {loadMoreButton && (
          <Button page={this.state.page} onLoadMore={this.loadMore} search={this.props.search} />
        )}
        {loading && <SpinnerLoader />}
      </>
    );
  }
}

export default ImageGallery;
