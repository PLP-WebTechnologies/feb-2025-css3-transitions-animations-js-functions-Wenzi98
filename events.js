// Load preferences or set defaults
let preferences;
try {
    preferences = JSON.parse(localStorage.getItem('preferences')) || {
        clickCount: 0,
        isDarkMode: false,
        boxColor: '#ff6b6b'
    };
} catch {
    preferences = {
        clickCount: 0,
        isDarkMode: false,
        boxColor: '#ff6b6b'
    };
}

const messages = [
    "Wheee! I love spinning!",
    "Again! Again!",
    "You're making me dizzy! 😵‍💫",
    "I'm having so much fun!",
    "Keep clicking! 🎈"
];

// Initialize display
function updateDisplay() {
    document.getElementById('clickCount').textContent = preferences.clickCount;
    document.querySelector('.spinny').style.backgroundColor = preferences.boxColor;
    document.body.classList.toggle('dark-mode', preferences.isDarkMode);
    document.querySelector('.stats').classList.toggle('dark-mode', preferences.isDarkMode);
}

// Click handler
document.getElementById('animationBox').addEventListener('click', function() {
    this.classList.remove('spin');
    void this.offsetWidth; // Trigger reflow
    this.classList.add('spin');
    
    preferences.clickCount++;
    document.getElementById('clickCount').textContent = preferences.clickCount;
    document.querySelector('.message').textContent = messages[Math.floor(Math.random() * messages.length)];
    savePreferences();
});

// Color changer
function changeColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === preferences.boxColor);
    
    preferences.boxColor = newColor;
    document.querySelector('.spinny').style.backgroundColor = newColor;
    document.querySelector('.message').textContent = "Look at my new color! 🎨";
    savePreferences();
}

// Dark mode toggle
function toggleDarkMode() {
    preferences.isDarkMode = !preferences.isDarkMode;
    document.body.classList.toggle('dark-mode', preferences.isDarkMode);
    document.querySelector('.stats').classList.toggle('dark-mode', preferences.isDarkMode);
    document.querySelector('.message').textContent = 
        preferences.isDarkMode ? "Getting sleepy... 🌙" : "Rise and shine! ☀️";
    savePreferences();
}

// Reset counter
function resetCount() {
    preferences.clickCount = 0;
    document.getElementById('clickCount').textContent = 0;
    document.querySelector('.spinny').style.transform = 'scale(1.1)';
    setTimeout(() => {
        document.querySelector('.spinny').style.transform = 'scale(1)';
    }, 200);
    document.querySelector('.message').textContent = "All fresh and new! 🌟";
    savePreferences();
}

// Save to storage
function savePreferences() {
    localStorage.setItem('preferences', JSON.stringify(preferences));
}

// Initial setup
document.addEventListener('DOMContentLoaded', updateDisplay);