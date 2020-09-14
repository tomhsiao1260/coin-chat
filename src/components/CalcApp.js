import React, {Component} from 'react';
import styles from './CalcApp.module.scss';
import p from 'prop-types';

class CalcApp extends Component {

  // open the calculator
  openCalc(e){
    if (!e.currentTarget.classList.contains(styles.open)){
      e.currentTarget.classList.add(styles.open);
      this.props.price('');
    }
  }

  // trigger when number or operator is pressed
  inputKey(x){
    let calcText = this.props.newPrice;
    calcText += x;
    this.props.price(calcText);
  }

  // calculate the price
  async Calc(){
    let calcText = this.props.newPrice;

    calcText = calcText.replaceAll('÷','/')
                       .replaceAll('×','*');

    try{
      calcText = this.myEval(calcText); 
      calcText = Math.round(calcText);
      calcText = String(calcText);
      this.props.price(calcText);
    }catch{
      this.props.price('Error');
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.props.price('');
    }
  }

  // calculate the expression result in string
  myEval(expression){
    let Fn = Function;
    return new Fn('return ' + expression)();
  }  

  // delete the last charactor
  Delete(){
    let calcText = this.props.newPrice;
    calcText = calcText.slice(0, -1);
    this.props.price(calcText);
  }

  render() {
    return (
      <div className={styles.calc} onClick={this.openCalc.bind(this)}>
        <div className={styles.price}>
          <button>堯先付</button>
          <button>恬先付</button>
          <div className={styles.display}>
            <div>{this.props.newPrice}</div>
          </div>
        </div>
        <div className={styles.btn}>
          <div className={styles.number}>
            <button onClick={() => this.inputKey('7')}>7</button>
            <button onClick={() => this.inputKey('8')}>8</button>
            <button onClick={() => this.inputKey('9')}>9</button>
            <button onClick={() => this.inputKey('4')}>4</button>
            <button onClick={() => this.inputKey('5')}>5</button>
            <button onClick={() => this.inputKey('6')}>6</button>
            <button onClick={() => this.inputKey('1')}>1</button>
            <button onClick={() => this.inputKey('2')}>2</button>
            <button onClick={() => this.inputKey('3')}>3</button>
            <button onClick={() => this.inputKey('.')}>.</button>
            <button onClick={() => this.inputKey('0')}>0</button>
            <button onClick={this.Calc.bind(this)}>=</button>
          </div>
          <div className={styles.operator}>
            <button onClick={this.Delete.bind(this)}>DEL</button>
            <button onClick={() => this.inputKey('÷')}>÷</button>
            <button onClick={() => this.inputKey('×')}>×</button>
            <button onClick={() => this.inputKey('-')}>-</button>
            <button onClick={() => this.inputKey('+')}>+</button>
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

export default CalcApp;
