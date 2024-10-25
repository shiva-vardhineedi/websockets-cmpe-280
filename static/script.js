let progressTimeout;

function startTest() {
    const numRequests = document.getElementById('numRequests').value;
    fetch('/start_client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalRequests: numRequests })
    })
    .then(response => response.json())
    .then(data => {
        clearTimeout(progressTimeout);
        document.getElementById('result').innerText = `Total successful responses: ${data.successCount}/${data.totalRequests} (${data.successPercentage}%)`;
        if (data.successPercentage === 100) {
            launchConfetti();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        progressBarError();
    });

    updateProgress(0, numRequests);
}

function updateProgress(current, total) {
    let progress = (current / total) * 100;
    const progressBarFill = document.getElementById('progress-bar-fill');

    // Simulate progress
    let interval = setInterval(function() {
        if (progress >= 100) {
            clearInterval(interval);
        } else {
            progress += 5;
            progressBarFill.style.width = `${Math.min(progress, 100)}%`;
            if (progress === 100) {
                progressTimeout = setTimeout(progressBarError, 2000); // If no response, turn red after 2 seconds.
            }
        }
    }, 200);
}

function progressBarError() {
    const progressBarFill = document.getElementById('progress-bar-fill');
    progressBarFill.style.backgroundColor = '#dc3545';  // Red for error state.
}

function launchConfetti() {
    const body = document.body;
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * -100 + 'px';
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000); // Remove confetti after 5 seconds
    }
}

function getRandomColor() {
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f7cad0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function downloadLog() {
    window.location.href = '/download_log';
}
