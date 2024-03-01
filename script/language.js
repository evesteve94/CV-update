document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle visibility based on isEnglish value
    function toggleLanguageVisibility() {
        const isEnglish = localStorage.getItem('isEnglish') === 'true';
        const introTextEng = document.getElementById('intro-text-eng');
        const introTextSwe = document.getElementById('intro-text-swe');
        const aboutTextEng = document.getElementById('about-text-eng');
        const aboutTextSwe = document.getElementById('about-text-swe');
        const engImg = document.querySelector('.eng');
        const sweImg = document.querySelector('.swe');

        if (isEnglish) {
            introTextEng.style.display = 'block';
            introTextSwe.style.display = 'none';
            aboutTextEng.style.display = 'block';
            aboutTextSwe.style.display = 'none';
            engImg.style.width = '50px'; // Change width to 50px
            sweImg.style.width = '30px'; // Reset width to 30px
        } else {
            introTextEng.style.display = 'none';
            introTextSwe.style.display = 'block';
            aboutTextEng.style.display = 'none';
            aboutTextSwe.style.display = 'block';
            sweImg.style.width = '50px'; // Change width to 50px
            engImg.style.width = '30px'; // Reset width to 30px
        }
    }

    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Check if 'isEnglish' is already set in localStorage
        if (localStorage.getItem('isEnglish') === null) {
            // Set 'isEnglish' to true if it's not set
            localStorage.setItem('isEnglish', 'true');
        }
        
        // Initial toggle based on isEnglish value
        toggleLanguageVisibility();
        
        // Add click event listeners to the language images to toggle language
        const engImg = document.querySelector('.eng');
        const sweImg = document.querySelector('.swe');
        
        engImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'true');
            toggleLanguageVisibility();
            location.reload();
        });
        
        sweImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'false');
            toggleLanguageVisibility();
            location.reload();
        });
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
});
