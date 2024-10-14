import { API_KEY } from './config';

function onFormSubmission(event) {
    event.preventDefault(); 
    console.log("Form submitted!"); 
}

function onButtonClick(event) {
    console.log("Button clicked!"); 
}

function setupEventListeners() {
    try {
        const form = document.querySelector('#myForm');
        if (form) {
            form.addEventListener('submit', onFormSubmission); 
        } else {
            console.warn('myForm element was not found.');
        }

        const button = document.querySelector('#myButton');
        if (button) {
            button.addEventListener('click', onButtonClick); 
        } else {
            console.warn('myButton element was not found.');
        }
    } catch (error) {
        console.error("Error setting up event listeners:", error.message);
    }
}

function initializeApplication() {
    console.log("Application initialization complete");
    setupEventListeners(); 
    // Consider calling fetchAPIData here if you intend to fetch data on application start.
    // fetchAPIData(); 
}

document.addEventListener('DOMContentLoaded', (event) => {
    try {
        initializeApplication();
    } catch (error) {
        console.error("Failed to initialize application:", error.message);
    }
});

async function fetchAPIData() {
    try {
        const response = await fetch(`https://api.example.com/data?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json(); 
        console.log(data); 
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error or wrong URL", error.message);
        } else {
            console.error("Failed to fetch API data", error.message);
        }
    }
}