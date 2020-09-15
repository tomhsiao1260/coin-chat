import React, {Component} from 'react';
import styles from './CalcApp.module.scss';
import p from 'prop-types';
import palette from '../palette';
import mini from '../assets/mini.png';

class CalcApp extends Component {

  // open the calculator
  openCalc(e){
    if(e.target.classList.contains(styles.close)){return;}
    const calc = document.querySelector(`.${styles.calc}`);
    if (!calc.classList.contains(styles.open)){
      calc.classList.add(styles.open);
      this.props.price('');
    }
  }

  // close the calculator
  closeCalc(){
    const calc = document.querySelector(`.${styles.calc}`);
    if (calc.classList.contains(styles.open)){
      calc.classList.remove(styles.open);
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
    const color0 = {backgroundColor: palette[0]};
    const color1 = {backgroundColor: palette[1]};
    const color2 = {backgroundColor: palette[2]};
    return (
      <div className={styles.calc} onClick={this.openCalc.bind(this)}>
        <div className={styles.price}>
          {/* <button>堯先付</button>
          <button>恬先付</button> */}
          <div className={styles.display}>
            <img className={styles.close} src={mini} alt='一' onClick={this.closeCalc.bind(this)}/>
            <div>{this.props.newPrice}</div>
          </div>
        </div>
        <div className={styles.btn}>
          <div className={styles.number}>
            <button onClick={() => this.inputKey('7')} style={color1}>7</button>
            <button onClick={() => this.inputKey('8')} style={color0}>8</button>
            <button onClick={() => this.inputKey('9')} style={color2}>9</button>
            <button onClick={() => this.inputKey('4')} style={color0}>4</button>
            <button onClick={() => this.inputKey('5')} style={color1}>5</button>
            <button onClick={() => this.inputKey('6')} style={color0}>6</button>
            <button onClick={() => this.inputKey('1')} style={color2}>1</button>
            <button onClick={() => this.inputKey('2')} style={color0}>2</button>
            <button onClick={() => this.inputKey('3')} style={color2}>3</button>
            <button onClick={() => this.inputKey('.')} style={color0}>.</button>
            <button onClick={() => this.inputKey('0')} style={color1}>0</button>
            <button onClick={this.Calc.bind(this)} style={color0}>=</button>
          </div>
          <div className={styles.operator}>
            <button onClick={this.Delete.bind(this)} style={color1}>DEL</button>
            <button onClick={() => this.inputKey('÷')} style={color0}>÷</button>
            <button onClick={() => this.inputKey('×')} style={color1}>×</button>
            <button onClick={() => this.inputKey('-')} style={color0}>-</button>
            <button onClick={() => this.inputKey('+')} style={color2}>+</button>
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
