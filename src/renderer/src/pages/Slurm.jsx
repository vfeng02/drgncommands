import React from 'react';
import { useState } from "react";
import '../App.css';
import './Slurm.css';
import { useLocation } from 'react-router-dom';

async function writeFile() {
    const content = 'print("hello world")';
    fs.writeFile('/Users/vickyfeng/Desktop/Thesis/drgnslurm/src/main/hello.py', content, err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
    });
}


const Slurm = () => {
    const location = useLocation();
    const generated = location.state?.generatedCommand;

    return (
        <div className="slurm">
            {/* <p>{generated}</p> */}
            <button onClick={writeFile}>Click to save script</button>
            <button onClick={() => {window.electronAPI.runScript('hello')}}>Click to run script</button>

        </div>
    );

}

export default Slurm;
