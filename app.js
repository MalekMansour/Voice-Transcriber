let recognition;
let isRecording = false;

// js


document.getElementById('record-button').addEventListener('click', () => {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
});

function startRecording() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        document.getElementById('text-output').innerText += transcript + ' ';
    };

    recognition.onstart = () => {
        isRecording = true;
        console.log("Recording started");
        toggleRecordButton(true);
    };

    recognition.onend = () => {
        if (isRecording) {
            recognition.start();
        } else {
            console.log("Recording stopped");
            toggleRecordButton(false);
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

function toggleRecordButton(isRecording) {
    const recordButton = document.getElementById('record-button');
    if (isRecording) {
        recordButton.classList.add('active');
        recordButton.innerText = 'Stop Recording';
    } else {
        recordButton.classList.remove('active');
        recordButton.innerText = 'Start Recording';
    }
}
