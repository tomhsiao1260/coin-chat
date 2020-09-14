import React from 'react';
import styles from './Input.module.scss';
import styles_calc from './CalcApp.module.scss';
import p from 'prop-types';

const Input = (props) => {

    // update input text
    const handleChange = (e) => {
        props.change(e);
    }
    
    // submit input text and close the calculator
    const handleSubmit = (e) => {
        e.preventDefault();
        props.submit();
        const calc = document.querySelector(`.${styles_calc.calc}`);
        calc.classList.remove(styles_calc.open);
    }
    return (
        <form className={styles.input}>
          <input type="search" 
                 placeholder="Type something..."
                 value={props.newMessage} 
                 onChange={handleChange}
          />
          <button onClick={handleSubmit}>Send</button>
        </form>
    )
}

Input.p = {
    newMessage: p.string.isRequired,
    change: p.func.isRequired,
    submit: p.func.isRequired,
};

export default Input;
