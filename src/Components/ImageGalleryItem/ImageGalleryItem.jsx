import React from 'react';

import s from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ gallery, modalImageData }) {
  const hendleClickImage = e => {
    modalImageData(e.target.parentNode.getAttribute('srcmodal'));
  };

  return (
    <>
      {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li
          key={id}
          className={s.ImageGalleryItem}
          onClick={hendleClickImage}
          srcmodal={largeImageURL}
        >
          <img
            id={id}
            src={webformatURL}
            alt={tags}
            loading="lazy"
            className={s.ImageGalleryItemImage}
          />
        </li>
      ))}
    </>
  );
}
