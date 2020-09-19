import React, { useState, useEffect } from 'react';
import styles from './Input.module.scss';
import styles_calc from './CalcApp.module.scss';
import {User} from './App';
import p from 'prop-types';

const holderText = ['Type something ...', 'Click below ...'];

const Input = (props) => {

    // update input text
    const handleChange = (e) => {
        props.change(e);
    }
    
    // submit input text and close the calculator
    const handleSubmit = (e, userId) => {
        e.preventDefault();
        props.submit(userId);
        const calc = document.querySelector(`.${styles_calc.calc}`);
        calc.classList.remove(styles_calc.open);
    }

    return (
        <form className={styles.input}>
          <PlaceHolder newMessage={props.newMessage}/>
          <input type="search" 
                 value={props.newMessage} 
                 onChange={handleChange}
                 // use <PlaceHolder /> background to show text animation
                 style={{background: 'transparent'}}
          />
          <button className={styles.user0} onClick={(e) => handleSubmit(e,0)}>{User[0]}</button>
          <button className={styles.user1} onClick={(e) => handleSubmit(e,1)}>{User[1]}</button>
        </form>
    )
}

// placeHolder animation
const PlaceHolder = (props) => {

    // const [seconds, setSeconds] = useState(0);

    // animation cycle 4s
    useEffect(() => {
      const interval = setInterval(() => {
        // setSeconds(seconds => seconds + 1);
        animation();
      }, 4000);
      return () => clearInterval(interval);
    }, []);

    // process for animation
    const animation = async() => {
        const placeholder = document.querySelector(`.${styles.placeholder}`);
        const first = placeholder.children[0];
        const second = placeholder.children[1];
        const newChild = second.cloneNode(true);
        // gradually shrink the top element (with transition written in CSS)
        first.style.padding = 0;
        first.style.margin = 0;
        first.style.height = 0;
        await new Promise(resolve => setTimeout(resolve, 1000));
        // remove old element at the top
        placeholder.removeChild(first);
        // insert new element at the bottom
        placeholder.appendChild(newChild);
    }

    // hide placeholder effect when the user types
    const textRemove = (props.newMessage) ? {color: 'transparent'} : {};

    return (
        <div className={styles.placeholder} style={textRemove}>
            <div>{holderText[0]}</div>
            <div>{holderText[1]}</div>
            <div>{holderText[0]}</div>
        </div>
    )
}

Input.p = {
    newMessage: p.string.isRequired,
    change: p.func.isRequired,
    submit: p.func.isRequired,
};

export default Input;
