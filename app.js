import { API_KEY } from './config';

function onFormSubmission(event) {
    event.preventDefault(); 
    console.log("Form submitted!"); 
}

function onButtonClick(event) {
    console.log("Button clicked!"); 
}

function setupEventListeners() {
    const form = document.querySelector('#myForm');
    if (form) {
        form.addEventListener('submit', onFormSubmission); 
    }

    const button = document.querySelector('#myButton');
    if (button) {
        button.addEventListener('click', onButtonClick); 
    }
}

function initializeApplication() {
    console.log("Application initialization complete");
    setupEventListeners(); 
}

document.addEventListener('DOMContentLoaded', initializeApplication);

async function fetchAPIData() {
    try {
        const response = await fetch(`https://api.example.com/data?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json(); 
        console.log(data); 
    } catch (error) {
        console.error("Failed to fetch API data", error.message);
    }
}