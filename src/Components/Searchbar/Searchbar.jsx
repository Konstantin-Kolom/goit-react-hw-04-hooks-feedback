import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import s from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const hendleChange = e => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const hendleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast('Please, enter photo title.');
      return;
    }
    onSubmit(value);
    //   setValue({ value: '' });
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={hendleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_buttonLabel}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={hendleChange}
        />
      </form>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </header>
  );
}
