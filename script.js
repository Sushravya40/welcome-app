document.getElementById('welcomeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const submitBtn = document.getElementById('submitBtn');
    const resultMessage = document.getElementById('resultMessage');
    const form = document.getElementById('welcomeForm');

    const name = nameInput.value.trim();
    if (!name) return;

    // Show loading state
    submitBtn.textContent = 'Preparing Party...';
    submitBtn.disabled = true;

    try {
        // Simulate backend delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Save name to localStorage (simulated backend)
        let savedNames = JSON.parse(localStorage.getItem('namesList') || '[]');
        savedNames.push(name);
        localStorage.setItem('namesList', JSON.stringify(savedNames));

        const data = {
            success: true,
            message: `hello ${name}, welcome`
        };

        if (data.success) {
            // Hide form and show message
            form.classList.add('fade-out');
            setTimeout(() => {
                form.style.display = 'none';
                resultMessage.textContent = data.message;
                resultMessage.classList.remove('hidden');
                resultMessage.classList.add('show');

                // Trigger Party Blast!
                fireConfetti();
            }, 500);
        }
    } catch (error) {
        console.error('Error:', error);
        submitBtn.textContent = 'Celebrate';
        submitBtn.disabled = false;
        alert('Something went wrong!');
    }
});

function fireConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#e94560', '#fca311', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#e94560', '#fca311', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Middle burst
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#e94560', '#fca311', '#ffffff']
        });
    }, 500);
}
