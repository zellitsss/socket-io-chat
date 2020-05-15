import React from 'react';
import Message from './Message'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onInputChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    onSubmitHandler(event) {
        this.props.newMessageCallback(this.state.text)
        this.setState({
            text: ''
        })
        event.preventDefault()
    }

    render() {
        let messages = this.props.data.map((m) => {
            return <Message by={m.name} isMine={m.isMine}>{m.message}</Message>
        })
        return (
            <div>
                <div className="bg-gray-900 text-pink-500">
                    <h1 className="uppercase p-4 font-bold">Chat with myself</h1>
                </div>
                <div className="messages-container">
                    {messages}
                </div>
                <div className="message-input">
                    <div>
                        <form onSubmit={this.onSubmitHandler}>
                            <input className="w-full p-2 rounded" type="text" placeholder="Type your message..." onChange={this.onInputChange} value={this.state.text}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;