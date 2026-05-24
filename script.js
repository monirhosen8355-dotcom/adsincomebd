// ADS LINKS
const links = [

"https://www.effectivecpmnetwork.com/sz7f6dhx5e?key=3f1f5c52ec8a9d1c9e0038942f8d83b5"

];

// Initial State
let coins = 20;
const coinDisplay = document.getElementById('coin-count');
const wheel = document.getElementById('wheel');
const watchAdBtn = document.getElementById('watch-ad-btn');
const spinBtn = document.getElementById('spin-btn');
const popup = document.getElementById('reward-popup');
const rewardMsg = document.getElementById('reward-msg');

// 1. Particle Background Generator
function createParticles() {
    const container = document.getElementById('bg-animation');
    const coinColors = ['#bc13fe', '#00e5ff', '#ffd700'];
    
    for (let i = 0; i < 20; i++) {
        const coin = document.createElement('div');
        coin.className = 'floating-coin';
        coin.style.left = Math.random() * 10 + 'vw';
        coin.style.animationDelay = Math.random() * 10 + 's';
        coin.style.backgroundColor = coinColors[Math.floor(Math.random() * 3)];
        coin.style.borderRadius = '50%';
        coin.style.height = '5px';
        coin.style.width = '5px';
        container.appendChild(coin);
    }
}

// 2. Watch Ad Logic
watchAdBtn.addEventListener('click', () => {

    // RANDOM ADS

    // RANDOM SELECT
    const smartLink =
    links[Math.floor(Math.random() * links.length)];

    // OPEN AD
    window.open(smartLink, '_blank');

    // REWARD
    setTimeout(() => {

        const reward =
        Math.floor(Math.random() * (50 - 10 + 1)) + 10;

        updateCoins(reward);

        showPopup(`Earned +${reward} Coins!`);

    }, 1000);

});

// 3. Spin Wheel Logic
let currentRotation = 0;

spinBtn.addEventListener('click', () => {

    if(spinBtn.disabled) return;

    // RANDOM ADS

    // RANDOM SELECT
    const smartLink =
    links[Math.floor(Math.random() * links.length)];

    // OPEN AD
    window.open(smartLink, '_blank');

    spinBtn.disabled = true;

    const extraDegrees = Math.floor(Math.random() * 360) + 1440; // 4 full circles + random
    currentRotation += extraDegrees;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {

        const prizes = [50, 10, 5, 0, 10, 20, 0, 10];

        const actualDeg = currentRotation % 360;

        const prizeIndex = Math.floor(actualDeg / 45);

        const win = prizes[prizeIndex];
        
        updateCoins(win);

        showPopup(
            win > 0
            ? `LUCKY! +${win} COINS`
            : "TRY AGAIN!"
        );

        spinBtn.disabled = false;

    }, 4000);

});

// 4. Coin System
function updateCoins(amount) {

    let start = coins;

    coins += amount;
    
    // Count up animation
    let duration = 500;

    let startTime = null;

    function animate(currentTime) {

        if (!startTime) startTime = currentTime;

        let progress =
        Math.min((currentTime - startTime) / duration, 1);

        let currentDisplay =
        Math.floor(progress * (coins - start) + start);

        coinDisplay.innerText =
        currentDisplay.toLocaleString();

        if (progress < 1)
        requestAnimationFrame(animate);

    }

    requestAnimationFrame(animate);

}

// 5. Popup Controls
function showPopup(msg) {

    rewardMsg.innerText = msg;

    popup.classList.remove('hidden');

}

function closePopup() {

    popup.classList.add('hidden');

}

// Initialize
createParticles();

// Simulate Daily Timer
setInterval(() => {

    const timer =
    document.getElementById('timer');

    // Just a visual fake timer
    let time =
    timer.innerText.split(' ')[2].split(':');

    let s = parseInt(time[2]);

    if(s > 0) s--;
    else s = 59;

    timer.innerText =
    `Available in 14:25:${s < 10 ? '0'+s : s}`;

}, 1000);