import { API_KEY } from './config';

function handleFormSubmit(event) {
    event.preventDefault(); 

    console.log("Form submitted!"); 
}

function handleButtonClick(event) {
    console.log("Button clicked!"); 
}

function initEventListeners() {
    const formElement = document.querySelector('#myForm');
    if (formElement) {
        formElement.addEventListener('submit', handleFormSubmit);
    }

    const buttonElement = document.querySelector('#myButton');
    if (buttonElement) {
        buttonElement.addEventListener('click', handleButtonClick);
    }
}

function main() {
    console.log("Main function initialized"); 
    initEventListeners(); 
}

document.addEventListener('DOMContentLoaded', main);

async function fetchData() {
    const response = await fetch(`https://api.example.com/data?key=${API_KEY}`);
    const data = await response.json();
    console.log(data); 
}