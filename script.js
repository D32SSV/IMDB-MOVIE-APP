const apiKeyInput = document.getElementById('apiKey');
const movieTitleInput = document.getElementById('search-text');
const searchButton = document.getElementById('search-btn');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const results = document.getElementById('results');


searchButton.addEventListener('click', () => {
  const apiKey = apiKeyInput.value;
  const movieTitle = movieTitleInput.value;

  if (!apiKey || !movieTitle) {
    error.textContent = 'Both API Key and Movie Title are required.';
    error.style.display = 'block';
    results.innerHTML = '';
    return;
  }

  error.style.display = 'none';
  results.innerHTML = '';
  loader.style.display = 'block';

  fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      if (data.Response === 'True') {
        data.Search.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}"
                        onerror="this.src='https://media.tenor.com/igA-F1cVaWgAAAAM/cat-weird-weird-cat.gif'">
                        <p>${movie.Title} (${movie.Year})</p>
                        <a href="https://www.imdb.com/title/${movie.imdbID}" target                              ="_blank">More Details</a>
                    `;
          results.appendChild(movieCard);
        });
      } else {
        error.textContent = data.Error;
        error.style.display = 'block';
      }
    })
    .catch(err => {
      loader.style.display = 'none';
      error.textContent = 'An error occurred while fetching data.';
      error.style.display = 'block';
    });
});

  // 3cb794f2