import React, { Component } from 'react';
import character from '../assets/character.png';
import styles from './Character.module.scss';

// period of the animation 4s
const cycle = 4000;

// the class handling the direction of movement
const move_right = `${styles.character} ${styles.channel1}`;
const move_left = `${styles.character} ${styles.channel2}`; 

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: this.props.scale,
            enable: true,
        }
    
        this.handleMove = this.handleMove.bind(this);
    }
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
    handleMove() {
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
    // handling transition when the character is touched
    async handleScale() {
        if(this.state.enable){
            this.setState( state =>({
                scale: state.scale * 0.7,
                enable: false,
            })); 
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.setState( state =>({
                scale: state.scale / 0.7,
                enable: true,
            })); 
        }
    }

    render() {
        const scale = this.state.scale;
        const lift = String((1-this.state.scale) * 50) + '%';

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
                <div className={styles.scale} 
                     style={style_scale}
                     onClick={this.handleScale.bind(this)}
                >
                    <img className={styles.spriteSheet} src={character} alt="character"/>
                </div>
            </div>
        )
    }
}

export default Character;
