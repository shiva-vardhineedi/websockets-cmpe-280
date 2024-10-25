# WebSocket Client Tester

## Overview
The **WebSocket Client Tester** is a Python-based application that allows you to test WebSocket request performance through a web interface. This application uses Flask as the web server and a Python-based WebSocket server to simulate real-time communication and log the results. The progress of the requests is displayed in real-time through a dynamic UI, offering users insights into the success of each WebSocket interaction.

This project includes:
- **WebSocket Server**: Handles incoming client messages and responds with a modified version.
- **Flask API**: Serves a simple front-end and handles user input for testing the WebSocket client.
- **Flask-SocketIO**: Provides real-time progress updates for each request.

## Features
- **Interactive Web UI**: Users can specify the number of WebSocket requests to be sent and view the progress of those requests in real-time.
- **Real-time Updates**: Progress bar dynamically shows the current status of requests. Turns red if requests stop responding.
- **Logging**: Each request's result (success or failure) is logged, and users can download the log for reference.
- **Confetti Celebration**: If all requests succeed, confetti animation is triggered to celebrate 100% success.

## Technologies Used
- **Python 3**: Core backend logic.
- **Flask**: Web server for handling the UI and API routes.
- **WebSockets**: Async WebSocket server for receiving and responding to messages.
- **Flask-SocketIO**: Enables real-time bidirectional event-based communication between clients and server.
- **JavaScript/CSS**: Front-end logic and styling for progress bars, animations, and UI elements.

## Installation
1. **Clone the repository**:
   ```sh
   git clone <repository_url>
   cd websocket_client_tester
   ```

2. **Install Dependencies**:
   ```sh
   pip install -r requirements.txt
   ```
   Ensure that the dependencies include Flask, Flask-SocketIO, and any other required libraries.

3. **Run the Server**:
   ```sh
   python app.py
   ```

   This will start both the Flask web server and the WebSocket server concurrently.

## Usage
1. **Access the UI**: Open your web browser and navigate to `http://localhost:5000/`.
2. **Start the Test**: Enter the number of requests you want to send, and click **Start Test**.
3. **Monitor Progress**: Watch the progress bar fill up, showing the percentage of successful responses.
4. **Download Logs**: After the test, you can download the log file to see the details of each request.

## Project Structure
- **app.py**: The main application file containing the Flask and WebSocket server logic.
- **templates/index.html**: HTML file serving the front-end UI.
- **static/style.css**: Styling for the front-end.
- **static/script.js**: JavaScript logic for handling the UI interactions and real-time updates.

## Requirements
- Python 3.x
- Flask
- Flask-SocketIO
- websockets

## Key Points
- The **WebSocket server** echoes back modified messages to simulate real-time communication.
- **Progress updates** are sent using **SocketIO** to ensure the UI remains dynamic and reflects the status of each request.
- The **progress bar** updates dynamically and turns red if any request times out, indicating an error.

## Future Enhancements
- **Authentication**: Add user authentication for more personalized testing.
- **Customizable Messages**: Allow users to send custom WebSocket messages instead of the default "Hello World!".
- **Cloud Deployment**: Deploy the service on a cloud provider like AWS, GCP, or Heroku for easy access.

