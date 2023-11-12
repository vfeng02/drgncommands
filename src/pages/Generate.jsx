import React from 'react';
import { useState } from "react";
import '../App.css';
import './Generate.css';
// import Alert from '../Alert';
import { useLocation } from 'react-router-dom';

const Generate = () => {
  const location = useLocation();
  const command = location.state?.fromCommand;
  const [generated, setGenerated] = useState("");
  const [argValues, setArgValue] = useState({});
  console.log(argValues)

  function updateArg(argName, newValue) {
    setArgValue({
      ...argValues,
      [argName]: newValue,
    });
  }

  function generate() {
    var result = ""
    var argsList = command.args.required;
    for (let i = 0; i < argsList.length; i++) {
      if ("flags" in argsList[i]) {
        result += argsList[i].flags[0] + " "
      }
      result += argValues[argsList[i].name] + " "
    }
    setGenerated(result);
  }

  return (
    <div>
      <div className="result-bar"> 
        <h3>{generated}</h3>
      </div>
      {command ? (
        <div  className="generate">
          <h2>{command.name}</h2>
          {command.args.required.map(arg => (
            <div>
              <label>{arg.help}</label>
              <input 
                type="text" 
                required 
                value={arg.desc}
                key = {arg.name}
                onChange={(e) => updateArg(arg.name, e.target.value)}
              />
            </div>
          ))}
          <button onClick={generate}>Generate Command</button>
        </div>
      ) : <p>Data for this command does not exist</p>}
      {/* <Alert message="You generated a command for {{command.name}}"/> */}
    </div>
  );
}
 
export default Generate;