document.addEventListener("DOMContentLoaded", function() {
const isEnglish = localStorage.getItem('isEnglish') === 'true';
const engImg = document.querySelector('.eng');
const sweImg = document.querySelector('.swe');

if (isEnglish) {
    engImg.style.width = '50px'; // Change width to 50px
    sweImg.style.width = '30px'; // Reset width to 30px
} else {
    sweImg.style.width = '50px'; // Change width to 50px
    engImg.style.width = '30px'; // Reset width to 30px
}

    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Check if 'isEnglish' is already set in localStorage
        if (localStorage.getItem('isEnglish') === null) {
            // Set 'isEnglish' to true if it's not set
            localStorage.setItem('isEnglish', 'true');
        }
        
        // Initial toggle based on isEnglish value
        // toggleLanguageVisibility();
        
        // Add click event listeners to the language images to toggle language
        const engImg = document.querySelector('.eng');
        const sweImg = document.querySelector('.swe');
        
        engImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'true');
            // toggleLanguageVisibility();
            location.reload();
        });
        
        sweImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'false');
            // toggleLanguageVisibility();
            location.reload();
        });
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
});