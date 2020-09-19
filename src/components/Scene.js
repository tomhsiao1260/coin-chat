import React from 'react';
import styles from './Scene.module.scss';
import Role from './Role';

const Scene = (props) => {
    return (
        <div className={styles.scene}>
          <Count total={props.total} />
          <Role id={'char1'} role={'A'} position={'70%'} scale={0.8} delay={2000}/>
          {/* <Role id={'char2'} role={'A'} position={'90%'} scale={1.0} delay={3000}/> */}
          {/* <Role id={'char3'} role={'A'} position={'10%'} scale={1.2} delay={0}/>   */}
          <Role id={'char4'} role={'B'} position={'34%'} scale={0.5} delay={0}/>
          <Role id={'char5'} role={'B'} position={'15%'} scale={0.7} delay={3000}/>
          <Role id={'char6'} role={'B'} position={'93%'} scale={0.7} delay={1000}/>
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
