import React, { Component } from 'react';
import io from "socket.io-client";
import Scene from './Scene';
import CalcApp from './CalcApp';
import Input from './Input';
import List from './List';
import styles from './App.module.scss';

const User = ['Yao', 'Tien'];
export {User};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      newPrice: '',
      totalPrice: 0,
      items: [],
      // items: [
      //   {id: 1, price: 20, message: 'dinner', userId: 0, date: new Date()},
      //   {id: 0, price: 10, message: 'breakfast', userId: 1, date: new Date()},
      // ],
    }
    // connect the socket.io
    this.socket = io();

    this.total = this.total.bind(this);
  }

  // add some socket event
  componentDidMount() {
    // get initial data
    this.socket.on("init", data => {
      // convert date string into object
      data.forEach(item => {
        const date = Date.parse(item.date);
        item.date = new Date(date);
      })
      // use reverse to put new data on top
      this.setState({ items: data.reverse() });
      // update total price
      const totalPrice = this.total(data);
      this.setState({ totalPrice });
    });

    // get updated data 
    this.socket.on('output', data => {

      // convert date string into object
      let date = Date.parse(data.date);
      date = new Date(date);

      const item = {
        id: data.id, 
        price: data.price, 
        message: data.message, 
        userId: data.userId,
        date,
      }

      let items = this.state.items;
      items.unshift(item);
      this.setState({ items });

      // update total price
      const totalPrice = this.total(items);
      this.setState({ totalPrice });
    })

    // informed certain data has been removed
    this.socket.on("id cleared", (id) => {
      this.setState( state => ({
        items: state.items.filter( item => item.id !== Number(id))
      }));
      console.log(`id ${id} cleared`)
    });
  }

  // close the socket
  componentWillUnmount() {
    this.socket.close()
  }

  // calculate total price
  total(items){
    // positive for userId: 0 
    // negative for userId: 1
    const factor = [1, -1];
    let total = items.reduce((total, item) => {
      if(item.price){
        total += Number(item.price) * factor[item.userId];
      }
      return total;
    }, 0);
    return total;
  }

  // update the calculation Price
  handlePrice(newPrice){
    this.setState({ newPrice });
  }

  // update input text
  handleChange(e){
    this.setState({ newMessage: e.target.value });
  }

  // update id, price, message, userId, date
  handleSubmit(userId){
    let items = this.state.items;
    let newId;
    let newPrice = this.state.newPrice;
    let newMessage = this.state.newMessage;
    let newUserId = userId;
    let newDate = new Date();

    if(!Number(newPrice) && !newMessage){return;}
    if(Number(newPrice)===Infinity){return;}

    // get id
    if(items[0]){
      newId = items[0].id + 1;
    }else{
      newId =  0;
    } 

    const newItem = {
      id: newId,
      message: newMessage, 
      price: newPrice,
      userId: newUserId,
      date: newDate,
    }
    
    // send new data to the server
    this.socket.emit("input", newItem)

    // update items and clear the message, price
    items.unshift(newItem)

    this.setState({
      items,
      newMessage: '',
      newPrice: '',
    })

    // update total price
    const totalPrice = this.total(items);
    this.setState({ totalPrice });
  }

  // remove selected item
  handleRemove(id){
    this.setState( state => ({
      items: state.items.filter( item => item.id !== Number(id))
    }));
    this.socket.emit("clear id", id);

    // update total price
    this.setState( state => ({
      totalPrice: this.total(state.items)
    }));
  }

  // clear all items (unused)
  clearAll(){
    this.socket.emit("clear all");
    this.setState({ totalPrice: 0 });
  }

  render() {
    return (
      <div className={styles.container}>
        <Scene total={this.state.totalPrice}/>
        <Input newMessage={this.state.newMessage}
               change={this.handleChange.bind(this)}
               submit={this.handleSubmit.bind(this)}
        />
        <CalcApp newPrice={this.state.newPrice} 
                 price={this.handlePrice.bind(this)} 
        />
        <List items={this.state.items} 
              removeItem={this.handleRemove.bind(this)} 
        />
      </div>
    )
  }
}

export default App;
