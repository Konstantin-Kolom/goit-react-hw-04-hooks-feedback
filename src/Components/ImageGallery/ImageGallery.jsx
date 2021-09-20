import React, { useState, useEffect } from 'react';

import { API_KEY, URL } from '../../utilits/KEY_pixabay';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { SpinnerLoader } from '../Loader/Loader';
import s from './ImageGallery.module.css';

export function ImageGallery({ search, modalImage }) {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMore = pageMore => {
    setPage(pageMore);
  };

  const modalImageData = imageSrc => {
    modalImage(imageSrc);
  };

  const clearGallery = () => {
    setGallery([]);
  };

  const loadMoreButton = gallery.length > 0 && !loading;

  useEffect(() => {
    if (search !== '') {
      clearGallery();
      setLoading(true);
      setPage(1);

      return fetch(
        `${URL}?q=${search}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      ).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        response
          .json()
          .then(photo => {
            const data = photo.hits;
            if (data.length > 0) {
              setGallery(data);
              setError(false);
            } else {
              setError(true);
            }
          })
          .catch(() => setError(true))
          .finally(() => setLoading(false));
      });
    }
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      return fetch(
        `${URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      ).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        response
          .json()
          .then(photo => setGallery(g => [...g, ...photo.hits]))
          .finally(() => setLoading(false));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (gallery.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [gallery]);

  return (
    <>
      {error && (
        <h1 className={s.mesageError}>
          No results found for your request '{search}'!
          <br />
          Please search again.
        </h1>
      )}
      {gallery.length > 0 && (
        <ul className={s.ImageGallery}>
          <ImageGalleryItem gallery={gallery} modalImageData={modalImageData} />
        </ul>
      )}
      {loadMoreButton && <Button page={page} onLoadMore={loadMore} search={search} />}
      {loading && <SpinnerLoader />}
    </>
  );
}
