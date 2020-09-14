import React from 'react';
import styles from './List.module.scss';
import p from 'prop-types';

const List = (props) => {

    // remove selected item
    const remove = (e) => {
      const id = e.target.id;
      props.removeItem(id);
    }

    return (
        <ul className={styles.list}>
          {
            props.items.map( item => {
              return (
                <li key={item.id}>
                  <div>
                    <div>{item.price}</div>
                    <div>{item.message}</div>
                  </div>
                  <div>
                    <div>{item.date}</div>
                    <button id={item.id} onClick={remove}>remove</button>
                  </div>
                </li>
              )
            })
          }
        </ul> 
    )
}

List.propTypes = {
  items: p.arrayOf(p.shape({
    id: p.number.isRequired,
    price: p.oneOfType([p.string, p.number]),
    message: p.string,
    date: p.string.isRequired,
  })).isRequired,
  removeItem: p.func.isRequired,
};

export default List; 
