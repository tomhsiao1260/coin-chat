import React, { Component } from 'react';
import p from 'prop-types';
import styles from './CalcApp.module.scss';
import palette from '../palette';
import mini from '../assets/mini.png';

class CalcApp extends Component {
  constructor(props) {
    super(props);
    this.openCalc = this.openCalc.bind(this);
    this.closeCalc = this.closeCalc.bind(this);
  }

  // open the calculator
  openCalc(e) {
    if (e.target.classList.contains(styles.close)) { return; }
    const calc = document.querySelector(`.${styles.calc}`);
    if (!calc.classList.contains(styles.open)) {
      const { price } = this.props;
      calc.classList.add(styles.open);
      price('');
    }
  }

  // close the calculator
  closeCalc() {
    const calc = document.querySelector(`.${styles.calc}`);
    if (calc.classList.contains(styles.open)) {
      const { price } = this.props;
      calc.classList.remove(styles.open);
      price('');
    }
  }

  // trigger when number or operator is pressed
  inputKey(x) {
    const { price } = this.props;
    let { newPrice } = this.props;
    newPrice += x;
    price(newPrice);
  }

  // calculate the price
  async Calc() {
    const { price } = this.props;
    let { newPrice } = this.props;

    newPrice = newPrice.replaceAll('÷', '/')
                       .replaceAll('×', '*');

    try {
      newPrice = myEval(newPrice);
      newPrice = Math.round(newPrice);
      newPrice = String(newPrice);
      price(newPrice);
    } catch {
      price('Error');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      price('');
    }
  }

  // delete the last charactor
  Delete() {
    const { price } = this.props;
    let { newPrice } = this.props;
    newPrice = newPrice.slice(0, -1);
    price(newPrice);
  }

  render() {
    const color0 = { backgroundColor: palette[0] };
    const color1 = { backgroundColor: palette[1] };
    const color2 = { backgroundColor: palette[2] };
    const { newPrice } = this.props;
    return (
      <div className={styles.calc} onClick={this.openCalc}>
        <div className={styles.price}>
          <div className={styles.display}>
            <img className={styles.close} src={mini} alt="一" onClick={this.closeCalc} />
            <div>{newPrice}</div>
          </div>
        </div>
        <div className={styles.btn}>
          <div className={styles.number}>
            <button type="button" onClick={() => this.inputKey('7')} style={color1}>7</button>
            <button type="button" onClick={() => this.inputKey('8')} style={color0}>8</button>
            <button type="button" onClick={() => this.inputKey('9')} style={color2}>9</button>
            <button type="button" onClick={() => this.inputKey('4')} style={color0}>4</button>
            <button type="button" onClick={() => this.inputKey('5')} style={color1}>5</button>
            <button type="button" onClick={() => this.inputKey('6')} style={color0}>6</button>
            <button type="button" onClick={() => this.inputKey('1')} style={color2}>1</button>
            <button type="button" onClick={() => this.inputKey('2')} style={color0}>2</button>
            <button type="button" onClick={() => this.inputKey('3')} style={color2}>3</button>
            <button type="button" onClick={() => this.inputKey('.')} style={color0}>.</button>
            <button type="button" onClick={() => this.inputKey('0')} style={color1}>0</button>
            <button type="button" onClick={this.Calc.bind(this)} style={color0}>=</button>
          </div>
          <div className={styles.operator}>
            <button type="button" onClick={this.Delete.bind(this)} style={color1}>DEL</button>
            <button type="button" onClick={() => this.inputKey('÷')} style={color0}>÷</button>
            <button type="button" onClick={() => this.inputKey('×')} style={color1}>×</button>
            <button type="button" onClick={() => this.inputKey('-')} style={color0}>-</button>
            <button type="button" onClick={() => this.inputKey('+')} style={color2}>+</button>
          </div>
        </div>
      </div>
    );
  }
}

CalcApp.p = {
    newPrice: p.string.isRequired,
    price: p.func.isRequired,
};

// calculate the expression result in string
function myEval(expression) {
  const Fn = Function;
  return new Fn(`return ${expression}`)();
}

export default CalcApp;
