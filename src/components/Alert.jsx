import React from 'react';
import '../App.css';
import './Alert.css';

const Alert = ({ message }) => {
    return (
        <div class="alert">
        <div class="alert-content">
        <i class="fas fa-solid fa-check check"></i>

        <div class="message">
            <span class="text text-1">Success</span>
            <span class="text text-2">Your changes has been saved</span>
            </div>
            </div>
            <i class="fa-solid fa-xmark close"></i>
        </div>
    );
}

export default Alert;