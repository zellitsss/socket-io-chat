import React from 'react';
import Chat from './Chat';
import Login from './Login';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      messages: [],
      userName: ''
    }    

    this.socket = io.connect('http://localhost:3001')

    this.loginHandler = this.loginHandler.bind(this)
    this.newMessageHandler = this.newMessageHandler.bind(this)
  }

  componentDidMount() {
    this.socket.on('initConnection', (data) => {
      if (data.connected) {
        console.log('Connected to server')
      } else {
        console.log('Cannot connect to server')
      }
    })

    this.socket.on('new message', (data) => {
      let messages = this.state.messages;
      messages.push({
        name: data.name,
        message: data.message,
        isMine: false
      })
      this.setState({
        messages: messages
      })
    })

  }

  render() {
    let fragment
    if (!this.state.isLogged) {
      fragment = <Login loginCallback={this.loginHandler}/>
    } else {
      fragment = <Chat data={this.state.messages} newMessageCallback={this.newMessageHandler}/>
    }
    return (
      <div className="app">
        {fragment}
      </div>
    );
  }

  loginHandler(name) {
    if (name && name !== '') {
      this.setState({
        userName: name
      })
      this.socket.emit('login', {name: name})
      this.setState({
        isLogged: true
      })
    }
  }

  newMessageHandler(message) {
    let messages = this.state.messages;
    messages.push({
      name: this.state.userName,
      message: message,
      isMine: true
    })
    this.setState({
      messages: messages
    })
    this.socket.emit('new message', message)
  }
}

export default App;
