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
    try {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('text-output').innerText += transcript + ' ';
        };

        recognition.onstart = () => {
            isRecording = true;
            console.log("Recording started");
            document.getElementById('start-recording').disabled = true;
            document.getElementById('stop-recording').disabled = false;
        };

        recognition.onend = () => {
            isRecording = false;
            console.log("Recording stopped");
            document.getElementById('start-recording').disabled = false;
            document.getElementById('stop-recording').disabled = true;
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error detected: ' + event.error);
            alert("Speech recognition error: " + event.error);
        };

    } catch (error) {
        console.error("Speech recognition is not supported in this browser: " + error);
        alert("Speech recognition is not supported in this browser.");
    }
}

function stopRecording() {
    if (recognition) {
        recognition.stop();
    }
}

