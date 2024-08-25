// app.js

let recognition;
let isRecording = false;

document.getElementById('start-recording').addEventListener('click', () => {
    if (!isRecording) {
        startRecording();
    }
});

document.getElementById('stop-recording').addEventListener('click', () => {
    if (isRecording) {
        stopRecording();
    }
});

function startRecording() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true; // Allow continuous recognition

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        document.getElementById('text-output').innerText += transcript + ' ';
    };

    recognition.onstart = () => {
        isRecording = true;
        console.log("Recording started");
        document.getElementById('start-recording').disabled = true;
        document.getElementById('stop-recording').disabled = false;
    };

    recognition.onend = () => {
        if (isRecording) {
            recognition.start(); // Restart recognition if still recording
        } else {
            console.log("Recording stopped");
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
        alert("Speech recognition error: " + event.error);
    };
}

function stopRecording() {
    if (recognition) {
        isRecording = false;
        recognition.stop();
    }
}
