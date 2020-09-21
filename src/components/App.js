import React, { Component } from 'react';
import io from 'socket.io-client';
import Scene from './Scene';
import CalcApp from './CalcApp';
import Input from './Input';
import List from './List';
import styles from './App.module.scss';

// calculate total price
const total = (items) => {
  // positive for userId: 0
  // negative for userId: 1
  const factor = [1, -1];
  const total = items.reduce((total, item) => {
    if (item.price) {
      // eslint-disable-next-line no-param-reassign
      total += Number(item.price) * factor[item.userId];
    }
    return total;
  }, 0);
  return total;
};

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
    };
    // connect the socket.io
    this.socket = io();

    // bind this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // add some socket event
  componentDidMount() {
    // get initial data
    this.socket.on('init', (data) => {
      // convert date string into object
      data.forEach((item) => {
        const date = Date.parse(item.date);
        // eslint-disable-next-line no-param-reassign
        item.date = new Date(date);
      });
      // use reverse to put new data on top
      this.setState({ items: data.reverse() });
      // update total price
      const totalPrice = total(data);
      this.setState({ totalPrice });
    });

    // get updated data
    this.socket.on('output', (data) => {
      // convert date string into object
      let date = Date.parse(data.date);
      date = new Date(date);

      const item = {
        id: data.id,
        price: data.price,
        message: data.message,
        userId: data.userId,
        date,
      };

      const { items } = this.state;
      items.unshift(item);
      this.setState({ items });

      // update total price
      const totalPrice = total(items);
      this.setState({ totalPrice });
    });

    // informed certain data has been removed
    this.socket.on('id cleared', (id) => {
      this.setState((state) => ({
        items: state.items.filter((item) => item.id !== Number(id)),
      }));
      console.log(`id ${id} cleared`);
    });
  }

  // close the socket
  componentWillUnmount() {
    this.socket.close();
  }

  // update the calculation Price
  handlePrice(newPrice) {
    this.setState({ newPrice });
  }

  // update input text
  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  // update id, price, message, userId, date
  handleSubmit(userId) {
    const { items, newPrice, newMessage } = this.state;
    const newUserId = userId;
    const newDate = new Date();
    let newId;

    if (!Number(newPrice) && !newMessage) { return; }
    if (Number(newPrice) === Infinity) { return; }

    // get id
    if (items[0]) {
      newId = items[0].id + 1;
    } else {
      newId = 0;
    }

    const newItem = {
      id: newId,
      message: newMessage,
      price: newPrice,
      userId: newUserId,
      date: newDate,
    };
    // send new data to the server
    this.socket.emit('input', newItem);

    // update items and clear the message, price
    items.unshift(newItem);

    this.setState({
      items,
      newMessage: '',
      newPrice: '',
    });

    // update total price
    const totalPrice = total(items);
    this.setState({ totalPrice });
  }

  // remove selected item
  handleRemove(id) {
    this.setState((state) => ({
      items: state.items.filter((item) => item.id !== Number(id)),
    }));
    this.socket.emit('clear id', id);

    // update total price
    this.setState((state) => ({
      totalPrice: total(state.items),
    }));
  }

  // clear all items (unused)
  clearAll() {
    this.socket.emit('clear all');
    this.setState({ totalPrice: 0 });
  }

  render() {
    const {
      items, newPrice, newMessage, totalPrice,
    } = this.state;
    return (
      <div className={styles.container}>
        <Scene total={totalPrice} />
        <Input
          newMessage={newMessage}
          change={this.handleChange}
          submit={this.handleSubmit}
        />
        <CalcApp
          newPrice={newPrice}
          price={this.handlePrice}
        />
        <List
          items={items}
          removeItem={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
