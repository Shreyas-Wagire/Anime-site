// Function to load the home page with new sections
function loadHome() {
    document.getElementById('content').innerHTML = `
      <div class="hero">
        <h2>Welcome to AnimeCafe</h2>
        <p>AnimeCafe is your ultimate destination for discovering and exploring the vibrant world of anime.<br> Whether you’re a long-time fan or new to the genre, our site offers an extensive collection<br> of anime series and films that cater to every taste and interest.</p>
        
      </div>
      <section class="popular-anime">
        <h2 class="headcolor">Popular Anime</h2>
        <div id="popular-anime-list" class="anime-list"></div>
      </section>
      <section class="upcoming-anime">
        <h2 class="headcolor" >Upcoming Anime</h2>
        <div id="upcoming-anime-list" class="anime-list"></div>
      </section>
    `;
    loadPopularAnime();
    loadUpcomingAnime();
    setActiveLink('home-link');
}

// Function to fetch and display popular anime
async function loadPopularAnime() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const popularAnime = data.data;

        const popularHtml = popularAnime.map(anime => `
            <div class="anime-item" onclick="openModal(${anime.mal_id}, '${anime.title}', '${anime.images.jpg.large_image_url}', '${anime.synopsis}', '${anime.genres.map(genre => genre.name).join(', ')}', '${anime.aired.prop.from}', '${anime.url}')">
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <p class="anime-genres">${anime.genres.map(genre => genre.name).join(', ')}</p>
                    
                </div>
            </div>
        `).join('');

        document.getElementById('popular-anime-list').innerHTML = popularHtml;
    } catch (error) {
        console.error('Error fetching popular anime:', error);
    }
}

// Function to fetch and display upcoming anime
async function loadUpcomingAnime() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/seasons/upcoming');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const upcomingAnime = data.data;

        const upcomingHtml = upcomingAnime.map(anime => `
            <div class="anime-item" onclick="openModal(${anime.mal_id}, '${anime.title}', '${anime.images.jpg.large_image_url}', '${anime.synopsis}', '${anime.genres.map(genre => genre.name).join(', ')}', '${anime.aired.prop.from}', '${anime.url}')">
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <p class="anime-genres">${anime.genres.map(genre => genre.name).join(', ')}</p>
                    <p class="anime-release-date">Release Date: ${anime.aired.prop.from}</p>
                </div>
            </div>
        `).join('');

        document.getElementById('upcoming-anime-list').innerHTML = upcomingHtml;
    } catch (error) {
        console.error('Error fetching upcoming anime:', error);
    }
}

// Function to handle subscription
function subscribe() {
    const email = document.getElementById('subscribe-email').value;
    if (email) {
        alert(`Subscribed with ${email}`);
        // Add subscription logic here
    } else {
        alert('Please enter a valid email address');
    }
}

// Function to open the modal with anime details
function openModal(id, title, image, description, genres, releaseDate, url) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-genres').textContent = `Genres: ${genres}`;
    document.getElementById('modal-release-date').textContent = `Release Date: ${releaseDate}`;
    document.getElementById('anime-modal').style.display = 'flex';
    document.getElementById('anime-modal').setAttribute('data-url', url);
}

// Function to close the modal
function closeModal() {
    document.getElementById('anime-modal').style.display = 'none';
}

// Function to add anime to favorites
function addToFavorites() {
    const title = document.getElementById('modal-title').textContent;
    // Add logic to save to favorites (local storage or backend)
    alert(`${title} added to favorites`);
}

// Function to open the anime link
function openAnimeLink() {
    const url = document.getElementById('anime-modal').getAttribute('data-url');
    if (url) {
        window.open(url, '_blank');
    }
}

// Function to set the active link in the navigation
function setActiveLink(linkId) {
    const links = document.querySelectorAll('#nav-menu a');
    links.forEach(link => link.classList.remove('active'));
    document.getElementById(linkId).classList.add('active');
}

// Initialize the home page
window.onload = loadHome;
