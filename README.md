# Weather Finder

Weather Finder is a simple React application built with Vite that allows users to search for weather information of a city. The application fetches weather data from the OpenWeatherMap API and displays it in a user-friendly manner.

## Features

- Search for the current weather of any city.
- Displays temperature, humidity, wind speed, and weather icon.
- Alerts for invalid city names and empty search input.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed. You can download them from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    ```

2. Navigate to the project directory:

    ```sh
    cd your-repository-name
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode:

```sh
npm run dev
```
#Environment Variables
```
VITE_API_URL=your_openweathermap_api_key
```

Alert System

The application includes a toast notification system to handle user input errors:

- Invalid City Name: If the user enters an invalid city name, a toast notification will appear with the message "Please enter a valid city name."
- Empty Search Input: If the user tries to search without entering a city name, a toast notification will appear with the message "Please enter a city name."

Dependencies

- axios: For making API requests.
- @mui/material: Material-UI components.
- @mui/icons-material: Material-UI icons.
- react-toastify: For displaying toast notifications.

