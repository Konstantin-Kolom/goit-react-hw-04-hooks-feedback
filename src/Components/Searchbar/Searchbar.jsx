import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  hendleChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value: value });
  };

  hendleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast('Please, enter photo title.');
      return;
    }
    this.props.onSubmit(this.state.value);
    //  this.setState({ value: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_buttonLabel}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.hendleChange}
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
}

export default Searchbar;
