import React, { Component } from 'react';
import s from './Button.module.css';

class Button extends Component {
  hendleClick = e => {
    e.preventDefault();
    this.props.onLoadMore(this.props.page + 1);
  };

  render() {
    return (
      <button
        type="button"
        className={s.Button}
        onClick={this.hendleClick}
        ref={ref => (this.myRef = ref)}
      >
        Load more
      </button>
    );
  }
}

export default Button;
