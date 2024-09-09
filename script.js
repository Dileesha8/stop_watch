let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let milliseconds = time % 1000;
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / (1000 * 60)) % 60;
    let hours = Math.floor(time / (1000 * 60 * 60)) % 24;

    milliseconds = milliseconds.toString().padStart(3, '0');
    seconds = seconds.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    isRunning = false;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapElement);
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
