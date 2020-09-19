import React from 'react';
import styles from './Scene.module.scss';
import Role from './Role';

// the threshold used to conditionally render the characters (compare to props.total)
const threshold = [0, 300, 1000];

// characters for userId: 0 (dominate when props.total > 0)
const RolesA = [
  // position: horizontal position on search bar
  // scale: smaller or bigger
  // delay: animation phase delay (ms)
  <Role role={'A'} position={'70%'} scale={0.8} delay={1500} id={'char1'} key={'char1'}/>,
  <Role role={'A'} position={'90%'} scale={1.0} delay={1000} id={'char2'} key={'char2'}/>,
  <Role role={'A'} position={'10%'} scale={1.2} delay={0}    id={'char3'} key={'char3'}/>,
]

// characters for userId: 1 (dominate when props.total < 0)
const RolesB = [
  // delay property still cannot be used on characters that won't move
  <Role role={'B'} position={'30%'} scale={0.5} delay={0} id={'char4'} key={'char4'}/>,
  <Role role={'B'} position={'15%'} scale={0.7} delay={0} id={'char5'} key={'char5'}/>,
  <Role role={'B'} position={'93%'} scale={0.7} delay={0} id={'char6'} key={'char6'}/>,
]

const Scene = (props) => {
    return (
        <div className={styles.scene}>
          <Count total={props.total} />
          {
            RolesA.map((role, i) => {
              const total = props.total;
              if (i === 0) {return role; }
              if ( total >= 0 && threshold[i] <= total){ return role; }
              return null;
            })
          }
          {
            RolesB.map((role, i) => {
              const total = props.total;
              if (i === 0) {return role; }
              if ( total <= 0 && threshold[i] <= Math.abs(total)){ return role; }
              return null;
            })
          }
        </div>
    )
}

// render the total number
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
