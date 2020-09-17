import React from 'react';
import styles from './Scene.module.scss';
import Character from './Character';

const Scene = (props) => {
    return (
        <div className={styles.scene}>
          <Count total={props.total} />
          <Character id={'char1'} position={'10%'} scale={1.2} delay={0}/>
          <Character id={'char2'} position={'30%'} scale={0.8} delay={2000}/>
          <Character id={'char3'} position={'90%'} scale={1.0} delay={3000}/>
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
