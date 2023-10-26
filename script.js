document.addEventListener("DOMContentLoaded", function () {
    const statusElement = document.getElementById("status");
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const cycleSelect = document.getElementById("cycle");
    const temperatureInput = document.getElementById("temperature");
    const spinSpeedInput = document.getElementById("spin-speed");
    const waterLevelInput = document.getElementById("water-level");
    const backgroundElement = document.querySelector(".background");

    let isRunning = false;
    let currentStep = 0;
    const steps = [
        { text: "Water is being filled..", delay: 2000 },
        { text: "Clothes Washing..", delay: 3000 },
        { text: "Rinsing...", delay: 2000 },
        { text: "Spinning...", delay: 2500 },
        { text: "Dried and Washed", delay: 1000 },
    ];
    const finishSound = document.getElementById("finishSound");

    // Array of background images
    const backgroundImages = [
        'washer-filling.jpg',
        'washing.jpg',
        'rinsing.jpg',
        'spinning.jpg',
        'finished.jpeg'
    ];

    function updateStatus(step) {
        statusElement.textContent = steps[step].text;
        backgroundElement.style.backgroundImage = `url(${backgroundImages[step]})`;

        if (step < steps.length - 1) {
            setTimeout(() => {
                if (isRunning) {
                    currentStep++;
                    updateStatus(currentStep);
                }
            }, steps[step].delay);
        } else {
            isRunning = false;
            finishSound.play();
        }
    }

    startButton.addEventListener("click", function () {
        if (!isRunning) {
            isRunning = true;
            currentStep = 0;
            updateStatus(currentStep);
        }
    });

    stopButton.addEventListener("click", function () {
        if (isRunning) {
            isRunning = false;
            statusElement.textContent = "Idle";
            backgroundElement.style.backgroundImage = `url('idle.jpg')`; // Set the idle background image
        }
    });
});