import React from 'react';
import styles from './Input.module.scss';
import styles_calc from './CalcApp.module.scss';
import {User} from './App';
import p from 'prop-types';

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
          <input type="search" 
                 placeholder="Type something ..."
                 value={props.newMessage} 
                 onChange={handleChange}
          />
          <button className={styles.user0} onClick={(e) => handleSubmit(e,0)}>{User[0]}</button>
          <button className={styles.user1} onClick={(e) => handleSubmit(e,1)}>{User[1]}</button>
        </form>
    )
}

Input.p = {
    newMessage: p.string.isRequired,
    change: p.func.isRequired,
    submit: p.func.isRequired,
};

export default Input;
