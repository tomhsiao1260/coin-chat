import React from 'react';
import p from 'prop-types';
import styles from './List.module.scss';
import User from '../user.json';

const List = (props) => {
  // display date
  const newDate = (date) => {
    const result = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return result;
  };

  // remove selected item
  const remove = (e) => {
    const { id } = e.target;
    props.removeItem(id);
  };

  // open or close the list when clicking
  const openList = (e) => {
    if (!e.currentTarget.classList.contains(styles.open)) {
      e.currentTarget.classList.add(styles.open);
    } else {
      e.currentTarget.classList.remove(styles.open);
    }
  };

  const { items } = props;

  return (
    <ul className={styles.list}>
      {
        items.map((item) => (
          <li
            key={item.id}
            onClick={openList}
            userid={item.userId}
          >
            <Item item={item} />
            <div className={styles.date}>
              <div>{newDate(item.date)}</div>
              <button type="button" id={item.id} onClick={remove}>remove</button>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

// conditionally render items
const Item = (props) => {
  const { item } = props;

  if (item.price && item.message) {
    return (
      <div className={styles.main}>
        <div>
          $&nbsp;
          {item.price}
        </div>
        <div>
          <span>
            {User[item.userId].name}
            &nbsp;先付&nbsp;
          </span>
          {item.message}
        </div>
      </div>
    );
  }
  if (item.price) {
    return (
      <div className={styles.main}>
        <div>
          $&nbsp;
          {item.price}
        </div>
        <div>
          <span>
            {User[item.userId].name}
            &nbsp;先付&nbsp;
          </span>
        </div>
      </div>
    );
  }
  if (item.message) {
    return (
      <div className={styles.main}>
        <div>{item.message}</div>
      </div>
    );
  }

  return null;
};

List.propTypes = {
  items: p.arrayOf(p.shape({
    id: p.number.isRequired,
    price: p.oneOfType([p.string, p.number]),
    message: p.string,
    userId: p.number,
    date: p.object.isRequired,
  })).isRequired,
  removeItem: p.func.isRequired,
};

export default List;
