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
    try {
        console.log("Application initialization complete");
        setupEventListeners(); 
    } catch (error) {
        console.error("Failed to initialize application:", error.message);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    try {
        initializeApplication();
    } catch (error) {
        console.error("Failed to initialize application on DOMContentLoaded:", error.message);
    }
});

async function fetchAPIData() {
    const url = `https://api.example.com/data?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json(); 
        console.log(data); 
    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Network error or wrong URL:", error.message);
        } else if (error.message.includes('API call failed with status')) {
            console.error("API call failed:", error.message);
        } else {
            console.error("Unexpected error during fetchAPI:", error.message);
        }
    }
}