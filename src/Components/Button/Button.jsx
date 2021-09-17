import s from './Button.module.css';

export function Button({ page, onLoadMore, search }) {
  const hendleClick = e => {
    e.preventDefault();
    onLoadMore(page + 1);
  };
  return (
    <button
      type="button"
      className={s.Button}
      onClick={hendleClick}
      // ref={ref => (this.myRef = ref)}
    >
      Load more
    </button>
  );
}
