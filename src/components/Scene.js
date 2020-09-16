import React from 'react';
import styles from './Scene.module.scss';
import Character from './Character';

const Scene = (props) => {
    return (
        <div className={styles.scene}>
          <Count total={props.total} />
          <Character position={'10%'}/>
        </div>
    )
}

const Count = (props) => {
  const total = props.total;
  if(total > 0){
    // positive for userId: 0
    return <div className={`${styles.total} ${styles.positive}`}>{total}</div>
  }else if(total < 0){
    // negative for userId: 1
    return <div className={`${styles.total} ${styles.negative}`}>{Math.abs(total)}</div>
  }else{
    return <div className={styles.total}>0</div>
  }
}

export default Scene;
