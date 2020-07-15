import React from "react";
import {Socket} from "phoenix";
import UserMessage from './usermessage.component';
import ServerMessage from './serve.component';


class Chat extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputMessage: "",
      messages: []
    }

    let socket = new Socket(props.url);
    socket.connect();
    
    this.channel = socket.channel(`counter_cooler:${props.subtopic}`, {});
  }

  componentWillMount() {
    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response) })

    

    this.channel.on("shout", payload => {
      this.setState({
        messages: this.state.messages.concat(payload.body)
      })
    })
  }

  handleInputMessage(event) {
    this.setState({
      inputMessage: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.channel.push("shout", {body: this.state.inputMessage})/*.receive("ok",(response) => {
      console.log(response);
    });*/

    this.setState({
      messages: this.state.messages.concat(this.state.inputMessage),
      inputMessage: ""
    })
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      if(index % 2 === 0) {
        return (
          <UserMessage
            key = { index }
            username = { "GenericUsername" }
            message = { message }
          />
        )
      } else {
        return (
          <ServerMessage
            key = { index }
            username = { "Server" }
            message = { message }
          />
        )
      }
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <div className="field">
            <label
              className="label"
              style={{
                textAlign: "left"
              }}
            >
            Chat With Phoenix:
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                style={{
                  marginTop: "10px"
                }}
                value = {this.state.inputMessage}
                onChange = {this.handleInputMessage.bind(this)}
              />
            </div>
          </div>
          <button
            type="submit"
            value="Submit"
            className="button is-primary"
            style={{
              marginTop: "10px"
            }}
          >
          Submit
          </button>
        </form>
        <div
          className="flex-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flexStart",
            justifyContent: "flexStart",
            margin: "auto",
            width: "100%"
          }}
        >
        {messages}
        </div>
      </div>
    )
  }
}

export default Chat