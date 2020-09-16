import React, { Component } from 'react';
import character from '../assets/character.png';
import styles from './Character.module.scss';
// import styles_app from './App.module.scss';

// const move = '15px';
const move_right = `${styles.character} ${styles.channel1}`
const move_left = `${styles.character} ${styles.channel2}`

class Character extends Component {
    componentDidMount() {
        this.timerID = setInterval(() => this.handleMove(), 2000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }  
    handleMove = () => {
        const char = document.querySelector(`.${styles.character}`);
        // const char_width = getComputedStyle(char).width;

        // const container = document.querySelector(`.${styles_app.container}`);
        // const road_length = getComputedStyle(container).width;

        // const leftBound = '0px';
        // const rightBound = pixelMinus(road_length, char_width);

        // 0: move left 1: move right
        // const direction = Math.round(Math.random());

        // char.style.left = '0px';

        if (char.className === move_left){
            char.className = move_right;
        }else if (char.className === move_right){
            char.className = move_left;
        }
    }
    render() {
        const style = {left: this.props.position}
        return (
            <div className={move_right} style={style}>
                <img className={styles.spriteSheet} src={character} alt="character"/>
            </div>
        )
    }
}

// const pixelMinus = (p1, p2) => {
//     const pixel_1 = Number(p1.split('px')[0]);
//     const pixel_2 = Number(p2.split('px')[0]);
//     const result = String(pixel_1 - pixel_2) + 'px'; 
//     return result;
// }

// const pixelPlus = (p1, p2) => {
//     const pixel_1 = Number(p1.split('px')[0]);
//     const pixel_2 = Number(p2.split('px')[0]);
//     const result = String(pixel_1 + pixel_2) + 'px'; 
//     return result;
// }

export default Character;
