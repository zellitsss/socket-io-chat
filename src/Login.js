import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    render() {
        return (
            <div className="bg-gray-900 text-pink-500">
                <div className="text-center py-32">
                    <form onSubmit={this.onSubmitHandler}>
                        <div>
                            <input className="w-4/5 p-2 rounded-md" type="text" placeholder="Type your name" value={this.state.name} onChange={this.onNameChange} name="name"/>
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-8 text-xl rounded-lg uppercase">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    onSubmitHandler(event) {
        this.props.loginCallback(this.state.name)
        event.preventDefault()
    }
}

export default Login;