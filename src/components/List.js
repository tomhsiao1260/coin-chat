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
                  <Item item={item}/>
                  <div className={styles.date}>
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

// conditionally render items
const Item = (props) => {
  if(props.item.price && props.item.message){
    return (
      <div className={styles.main}>
        <div>$ {props.item.price}</div>
        <div>{props.item.message}</div>
      </div>
    )
  }else if(props.item.price){
    return (
      <div className={styles.main}>
        <div>$ {props.item.price}</div>
      </div>
    )
  }else if(props.item.message){
    return (
      <div className={styles.main}>
        <div>{props.item.message}</div>
      </div>
    )
  }
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
