import React from 'react';
import './App.css';
import Chat from "../src/components/chat.component";

function App() {
  return (
    <div className="container is-fluid">
      <div className="columns">
        <h4>PRIVATE</h4>
        <hr/>
        <div className="column">
          <Chat url={"wss://dea4b85245f8.ngrok.io/socket"} subtopic={"private"}/>
        </div>
        <div className="column">
          <Chat url={"wss://dea4b85245f8.ngrok.io/socket"} subtopic={"private"}/>
        </div>
        
      </div>
      <div className="columns">
        <h4>LOBBY</h4>
        <hr/>
        <div className="column">
          <Chat url={"wss://dea4b85245f8.ngrok.io/socket"} subtopic={"lobby"}/>
        </div>
        <div className="column">
          <Chat url={"wss://dea4b85245f8.ngrok.io/socket"} subtopic={"lobby"}/>
        </div>
      </div>
    </div>
  );
}

export default App;
