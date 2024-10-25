import asyncio
from random import randint
from websockets import serve
from websockets.sync.client import connect
from flask import Flask, render_template, request, jsonify, send_file
import threading
import time
import os

app = Flask(__name__)
log_file_path = "client_results.log"

# Server side code
async def echo(websocket):
    async for message in websocket:
        # Append a random number between 1 and 100 to the client message
        modified_message = f"{message} [{randint(1, 100)}]"
        await websocket.send(modified_message)

async def start_server():
    # Start the WebSocket server on localhost, port 8765
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # Run the server forever

# Flask route for the client UI
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_client', methods=['POST'])
def start_client():
    total_requests = int(request.json['totalRequests'])
    success_count = 0
    log_entries = []

    try:
        # Connect to the WebSocket server at localhost, port 8765
        with connect("ws://localhost:8765") as websocket:
            for i in range(1, total_requests + 1):
                websocket.send(f"Request [{i}] Hello world!")
                message = websocket.recv()
                if message:
                    success_count += 1
                    log_entries.append(f"Request {i}: SUCCESS - Received: {message}\n")
                else:
                    log_entries.append(f"Request {i}: FAILED\n")
                progress = (i / total_requests) * 100
                # Notify client of the progress (placeholder implementation)
                print(f"Progress: {progress:.2f}%")
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Write the log file
        with open(log_file_path, 'w') as log_file:
            log_file.writelines(log_entries)

    success_percentage = (success_count / total_requests) * 100
    return jsonify({'successCount': success_count, 'totalRequests': total_requests, 'successPercentage': success_percentage})

@app.route('/download_log', methods=['GET'])
def download_log():
    if os.path.exists(log_file_path):
        return send_file(log_file_path, as_attachment=True)
    else:
        return "No log file available", 404

if __name__ == "__main__":
    # Start the server and flask app concurrently
    server_thread = threading.Thread(target=lambda: asyncio.run(start_server()), daemon=True)
    server_thread.start()
    app.run(debug=True, use_reloader=False)
