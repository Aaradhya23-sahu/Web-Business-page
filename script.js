// =========================================================
// IQ BOOST GAME LOGIC (Functional Code)
// =========================================================

const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const startBtn = document.getElementById('game-start-btn');
const submitBtn = document.getElementById('game-submit-btn');
const feedbackEl = document.getElementById('game-feedback');
const scoreEl = document.getElementById('score');

let currentQuestion = {};
let score = 0;
let gameActive = false;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];

    let questionString = `${num1} ${operation} ${num2}`;
    let answer;

    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
    }
    
    currentQuestion = { questionString, answer };
    questionEl.textContent = `What is ${questionString}?`;
    answerInput.value = '';
    feedbackEl.textContent = '';
}

function startGame() {
    gameActive = true;
    score = 0;
    scoreEl.textContent = score;
    startBtn.textContent = 'Next Question';
    submitBtn.disabled = false;
    answerInput.focus();
    generateQuestion();
}

function checkAnswer() {
    if (!gameActive) return;

    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        feedbackEl.textContent = 'Please enter a number.';
        return;
    }

    if (userAnswer === currentQuestion.answer) {
        score++;
        feedbackEl.textContent = 'Correct! Keep going.';
        feedbackEl.style.color = 'green';
    } else {
        score = Math.max(0, score - 1); // Subtract 1, but don't go below 0
        feedbackEl.textContent = `Wrong. The correct answer was ${currentQuestion.answer}.`;
        feedbackEl.style.color = 'red';
    }

    scoreEl.textContent = score;
    setTimeout(generateQuestion, 1500); // Wait 1.5 seconds before next question
}

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);

// Optional: Submit on Enter key press
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && gameActive) {
        checkAnswer();
    }
});


// =========================================================
// MICROPHONE INTEGRATION (Placeholder/Basic Code)
// =========================================================

const micStartBtn = document.getElementById('mic-start-btn');
const micStatusEl = document.getElementById('mic-status');
const micOutputEl = document.getElementById('mic-output');

micStartBtn.addEventListener('click', () => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        micStatusEl.textContent = 'Status: Speech Recognition not supported in this browser.';
        micStatusEl.style.color = 'red';
        return;
    }

    // Attempt to start the microphone stream (Requires HTTPS for real use)
    micStatusEl.textContent = 'Status: Listening... (Check console for API access info)';
    console.log("Attempting to access Microphone via Speech Recognition API...");

    // *** In a real assignment, you would use MediaDevices.getUserMedia or SpeechRecognition here ***
    // Example: SpeechRecognition (limited browser support and often requires HTTPS)
    // let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    // recognition.onresult = (event) => {
    //     micOutputEl.textContent = event.results[0][0].transcript;
    //     micStatusEl.textContent = 'Status: Done.';
    // }
    // recognition.start();
});


// =========================================================
// CAMERA INTEGRATION (Placeholder/Basic Code)
// =========================================================

const cameraStartBtn = document.getElementById('camera-start-btn');
const cameraStreamEl = document.getElementById('camera-stream');

cameraStartBtn.addEventListener('click', async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera API (getUserMedia) not supported by this browser.');
        return;
    }
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStreamEl.srcObject = stream;
        cameraStartBtn.textContent = 'Camera On';
        cameraStartBtn.style.backgroundColor = '#dc3545';
        console.log("Camera access granted. Streaming to video element.");

    } catch (err) {
        console.error("Error accessing camera:", err);
        alert('Could not start camera. Please ensure you granted permission.');
        cameraStartBtn.textContent = 'Start Camera (Error)';
        cameraStartBtn.style.backgroundColor = '#dc3545';
    }
});