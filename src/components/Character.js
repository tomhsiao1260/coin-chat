import React, { Component } from 'react';
import character from '../assets/character.png';
import styles from './Character.module.scss';

// period of the animation 4s
const cycle = 4000;

// the class handling the direction of movement
const move_right = `${styles.character} ${styles.channel1}`;
const move_left = `${styles.character} ${styles.channel2}`; 

class Character extends Component {
    componentDidMount() {
        const char = document.querySelector(`#${this.props.id}`);
        setTimeout(() => {  
            // start to display after the delay time
            char.style.display = 'block';
            // change the direction of movement per half cycle  
            this.timerID = setInterval(() => this.handleMove(), cycle/2);
        }, this.props.delay)
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }  
    // handling character movement
    handleMove = () => {
        const char = document.querySelector(`#${this.props.id}`);

        switch (char.className){
            case move_left:
            case styles.character:
                char.className = move_right;
                break;
            case move_right:
                char.className = move_left;
                break;
            default: break;
        }
    }
    render() {
        const scale = this.props.scale;
        const lift = String((1-scale) * 50) + '%';

        // handling position
        const style_position = {
            left: this.props.position,
            // cannot be seen until the delay time is reached
            display: 'none',
            overflow: 'visible',
        }
        // handling scale
        const style_scale = {
            transform: `translate(-50%,${lift}) scale(${scale})`,
            overflow: 'hidden',
        }

        return (
            <div id={this.props.id} className={styles.character} style={style_position}>
                <div className={styles.scale} style={style_scale}>
                    <img className={styles.spriteSheet} src={character} alt="character"/>
                </div>
            </div>
        )
    }
}

export default Character;
