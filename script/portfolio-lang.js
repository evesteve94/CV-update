document.addEventListener("DOMContentLoaded", function() {
    const isEnglish = localStorage.getItem('isEnglish') === 'true';
    const engImg = document.querySelector('.eng');
    const sweImg = document.querySelector('.swe');
    const introTextEng = document.getElementById('intro-text-eng');
    const introTextSwe = document.getElementById('intro-text-swe');
    const headerTextEng = document.getElementById('header-text-eng');
    const headerTextSwe = document.getElementById('header-text-swe');

    if (isEnglish) {
        engImg.style.width = '50px'; // Ändra bredden till 50px
        sweImg.style.width = '30px'; // Återställ bredden till 30px
        introTextEng.style.display = 'block';
        introTextSwe.style.display = 'none';
        headerTextEng.style.display = 'block';
        headerTextSwe.style.display = 'none';
    } else {
        sweImg.style.width = '50px'; // Ändra bredden till 50px
        engImg.style.width = '30px'; // Återställ bredden till 30px
        introTextEng.style.display = 'none';
        introTextSwe.style.display = 'block';
        headerTextEng.style.display = 'none';
        headerTextSwe.style.display = 'block';
    }

    // Kontrollera om localStorage stöds
    if (typeof(Storage) !== "undefined") {
        // Kontrollera om 'isEnglish' redan är inställt i localStorage
        if (localStorage.getItem('isEnglish') === null) {
            // Ange 'isEnglish' till true om det inte är inställt
            localStorage.setItem('isEnglish', 'true');
        }
        
        // Lägg till klickhändelselyssnare för språkbilderna för att byta språk
        const engImg = document.querySelector('.eng');
        const sweImg = document.querySelector('.swe');
        
        engImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'true');
            location.reload();
        });
        
        sweImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'false');
            location.reload();
        });
    } else {
        console.log("Tyvärr stöder din webbläsare inte Web Storage...");
    }
});
