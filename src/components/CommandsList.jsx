import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './CommandsList.css';

const CommandList = ({ commands }) => {
  return (
    <div className="command-list">
      {commands.map(command => (
        <div className="command-preview" key={command.id} >
        <Link to={"/generate"} state={{fromCommand: command}}>
            <h2>{ command.name }</h2>
            <p>{ command.desc }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default CommandList;