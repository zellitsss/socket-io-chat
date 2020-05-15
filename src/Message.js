import React from 'react'

class Message extends React.Component {
    render() {
        let className = 'message';
        if (this.props.isMine) {
            className += ' by-me'
        } else {
            className += ' by-other'
        }
        return (
            <div className={className}>
                <div className="sender-name">{this.props.by}</div>
                <div className="message-text">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Message