document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.images img');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.55;
    let startTime;

    function positionImages() {
        images.forEach((img, index) => {
            const angle = (index / images.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 40;
            const y = centerY + radius * Math.sin(angle) - 40;
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
        });
    }

    positionImages();

    function rotateImages(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsedTime = (timestamp - startTime) / 1000; // Time in seconds

        images.forEach((img, index) => {
            const angle = (index / images.length) * 2 * Math.PI + elapsedTime * 0.1; // Reduced from 0.001 to 0.1
            const x = centerX + radius * Math.cos(angle) - 70;
            const y = centerY + radius * Math.sin(angle) - 70;
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
        });
        requestAnimationFrame(rotateImages);
    }

    requestAnimationFrame(rotateImages);

    window.addEventListener('resize', () => {
        const newCenterX = window.innerWidth / 2;
        const newCenterY = window.innerHeight / 2;
        const newRadius = Math.min(window.innerWidth, window.innerHeight) * 0.55;
        
        centerX = newCenterX;
        centerY = newCenterY;
        radius = newRadius;
        
        positionImages();
        startTime = null; // Reset the start time on resize
    });
});

// Keep the rest of the code (createConfetti, animateConfetti, etc.) as it was

document.getElementById("clickMeButton").addEventListener("click", function() {
    createConfetti();
});

function createConfetti() {
    const colors = ['#f2d74e', '#95c3de', '#ff9a91', '#f2b2f2', '#74d680'];
    const confettiCount = 200;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -20 + 'px';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';

        document.body.appendChild(confetti);

        animateConfetti(confetti);
    }
}

function animateConfetti(confetti) {
    const animation = confetti.animate([
        { transform: 'translate3d(0,0,0)', opacity: 1 },
        { transform: `translate3d(${Math.random() * 300 - 150}px, ${window.innerHeight}px, 0)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 3000,
        easing: 'cubic-bezier(0,0,0.2,1)'
    });

    animation.onfinish = () => confetti.remove();
}