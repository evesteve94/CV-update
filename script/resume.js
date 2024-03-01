document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle visibility based on isEnglish value
    function toggleLanguageVisibility(isEnglish) {
        const dataFiles = {
            education: isEnglish ? './data/education.json' : './data/utbildning.json',
            work: isEnglish ? './data/work.json' : './data/jobb.json',
            skills: isEnglish ? './data/skills.json' : './data/meriter.json',
            references: isEnglish ? './data/references.json' : './data/referenser.json'
        };

        fetchEducationData(dataFiles.education);
        fetchWorkData(dataFiles.work);
        fetchSkillsData(dataFiles.skills);
        fetchReferencesData(dataFiles.references);
    }

    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Check if 'isEnglish' is already set in localStorage
        if (localStorage.getItem('isEnglish') === null) {
            // Set 'isEnglish' to true if it's not set
            localStorage.setItem('isEnglish', 'true');
        }

        // Initial toggle based on isEnglish value
        const isEnglish = localStorage.getItem('isEnglish') === 'true';
        toggleLanguageVisibility(isEnglish);

        // Add click event listeners to the language images to toggle language
        const engImg = document.querySelector('.eng');
        const sweImg = document.querySelector('.swe');

        engImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'true');
            toggleLanguageVisibility(true);
        });

        sweImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'false');
            toggleLanguageVisibility(false);
        });
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
});

function fetchEducationData(dataFile) {
    const educationBanner = document.getElementById('education');
    let isEducationVisible = false;

    educationBanner.addEventListener('click', function() {
        if (!isEducationVisible) {
            fetch(dataFile)
                .then(response => response.json())
                .then(data => {
                    const educationSection = document.getElementById('education-section');
                    educationSection.innerHTML = ''; // Clear previous content
                    data.forEach(education => {
                        const section = document.createElement('div');
                        section.classList.add('card');

                        const title = document.createElement('h3');
                        title.textContent = education.education;
                        section.appendChild(title);

                        const image = document.createElement('img');
                        image.src = education.image;
                        image.alt = education.alt;
                        section.appendChild(image);

                        const time = document.createElement('h4');
                        time.textContent = education.time;
                        section.appendChild(time);

                        const description = document.createElement('p');
                        description.textContent = education.description;
                        section.appendChild(description);

                        educationSection.appendChild(section);
                    });
                })
                .catch(error => {
                    console.error('Error fetching education data:', error);
                });

            isEducationVisible = true;
        } else {
            const educationSection = document.getElementById('education-section');
            educationSection.innerHTML = ''; // Clear the education section
            isEducationVisible = false;
        }
    });
}

function fetchWorkData(dataFile) {
    const workBanner = document.getElementById('work');
    let isWorkVisible = false;

    workBanner.addEventListener('click', function() {
        if (!isWorkVisible) {
            fetch(dataFile)
                .then(response => response.json())
                .then(data => {
                    const workSection = document.getElementById('work-section');
                    workSection.innerHTML = ''; // Clear previous content
                    data.forEach(work => {
                        const section = document.createElement('div');
                        section.classList.add('card');

                        const title = document.createElement('h3');
                        title.textContent = work.work;
                        section.appendChild(title);

                        const image = document.createElement('img');
                        image.src = work.image;
                        image.alt = work.alt;
                        section.appendChild(image);

                        const time = document.createElement('h4');
                        time.textContent = work.time;
                        section.appendChild(time);

                        const description = document.createElement('p');
                        description.textContent = work.description;
                        section.appendChild(description);

                        workSection.appendChild(section);
                    });
                })
                .catch(error => {
                    console.error('Error fetching work data:', error);
                });

            isWorkVisible = true;
        } else {
            const workSection = document.getElementById('work-section');
            workSection.innerHTML = ''; // Clear the work section
            isWorkVisible = false;
        }
    });
}

function fetchSkillsData(dataFile) {
    const skillsBanner = document.getElementById('skillsBanner');
    let isSkillsVisible = false;

    skillsBanner.addEventListener('click', function() {
        if (!isSkillsVisible) {
            fetch(dataFile)
                .then(response => response.json())
                .then(data => {
                    const skillsSection = document.getElementById('skill-div');
                    skillsSection.innerHTML = ''; // Clear previous content
                    data.forEach(skill => {
                        const tile = createSkillTile(skill);
                        skillsSection.appendChild(tile);
                    });
                })
                .catch(error => {
                    console.error('Error fetching skills data:', error);
                });

            isSkillsVisible = true;
        } else {
            const skillsSection = document.getElementById('skill-div');
            skillsSection.innerHTML = ''; // Clear the skills section
            isSkillsVisible = false;
        }
    });
}

function fetchReferencesData(dataFile) {
    const referencesBanner = document.getElementById('references');
    let isReferencesVisible = false;

    referencesBanner.addEventListener('click', function() {
        if (!isReferencesVisible) {
            fetch(dataFile)
                .then(response => response.json())
                .then(data => {
                    const refDiv = document.getElementById('ref-div');
                    refDiv.innerHTML = ''; // Clear previous content
                    data.forEach(reference => {
                        const section = document.createElement('div');
                        section.classList.add('card');

                        const image = document.createElement('img');
                        image.src = reference.image;
                        image.alt = reference.alt;
                        section.appendChild(image);

                        const name = document.createElement('h3');
                        name.textContent = reference.name;
                        section.appendChild(name);

                        const jobtitle = document.createElement('p');
                        jobtitle.textContent = reference.jobtitle;
                        section.appendChild(jobtitle);

                        const email = document.createElement('p');
                        email.textContent = `Email: ${reference.email}`;
                        section.appendChild(email);

                        const phone = document.createElement('p');
                        phone.textContent = `Phone: ${reference.phone}`;
                        section.appendChild(phone);

                        refDiv.appendChild(section);
                    });
                })
                .catch(error => {
                    console.error('Error fetching references data:', error);
                });

            isReferencesVisible = true;
        } else {
            const refDiv = document.getElementById('ref-div');
            refDiv.innerHTML = ''; // Clear the references section
            isReferencesVisible = false;
        }
    });
}

// Function to create a skill tile
function createSkillTile(skill) {
    const tile = document.createElement('div');
    tile.classList.add('skill-tile');
    tile.innerHTML = `<img alt="${skill.alt}" src="${skill.image}" alt="${skill.title}">`;
    tile.addEventListener('click', () => openModal(skill));
    return tile;
}

// Function to open modal with skill data
function openModal(skill) {
    // Fetch additional data for the skill modal
    fetch('./data/skills.json')
        .then(response => response.json())
        .then(data => {
            // Find the skill data that matches the clicked skill
            const selectedSkill = data.find(s => s.title === skill.title);
            if (selectedSkill) {
                // Use selectedSkill data to populate modal content
                const modalContent = `
                    <div class="modal" id="myModal-${selectedSkill.title.replace(/\s+/g, '-')}">
                        <div class="tile-modal-content">
                            <span class="close">&times;</span>
                            <img alt="${selectedSkill.alt}" src="${selectedSkill.image}">
                            <h4>${selectedSkill.title}</h4>                              
                            <p>Proficiency: ${selectedSkill.skill}</p>
                            <p>Course: ${selectedSkill.course}</p> 
                            <p>${selectedSkill.description}</p>
                        </div>
                    </div>
                `;
                // Append modal content to the document body
                document.body.insertAdjacentHTML('beforeend', modalContent);
                // Show the modal
                const modal = document.getElementById(`myModal-${selectedSkill.title.replace(/\s+/g, '-')}`);
                modal.classList.add('modal-showing');
                // Add event listener to close the modal
                const closeButton = modal.querySelector('.close');
                closeButton.addEventListener('click', () => modal.remove());
            }
        })
        .catch(error => console.error('Error fetching skill details:', error));
}
