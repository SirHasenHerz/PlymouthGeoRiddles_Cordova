let overlayState = 0; // 0 = Startbildschirm, 1 = Erklärung, 2 = Spiel

updateOverlay();

document.getElementById('overlayWindow').addEventListener('click', nextOverlayState);

document.getElementById('infoButton').addEventListener('click', function () {
    overlayState = 1;
    updateOverlay();
});

document.getElementById('restartButton').addEventListener('click', function () {
    location.reload();
});


function nextOverlayState() {
    overlayState++;
    updateOverlay();
}

function updateOverlay() {
    const overlayContent = document.getElementById('overlayContent');
    const startScreen = document.getElementById('startScreen');
    const instructionScreen = document.getElementById('instructionScreen');

    if (overlayState === 0) {
        // Shows Start screen
        overlayContent.style.display = 'flex';
        startScreen.style.display = 'flex';
        instructionScreen.style.display = 'none';
    } else if (overlayState === 1) {
        // Shows Instruction screen
        overlayContent.style.display = 'flex';
        startScreen.style.display = 'none';
        instructionScreen.style.display = 'flex';
    } else if (overlayState === 2) {
        // Hides overlay
        overlayContent.style.display = 'none';
        instructionScreen.style.display = 'none';
    }
}

