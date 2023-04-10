const global = {
  currentPgae: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
  },
};

async function displayPopularMovies() {
  const swiper = new Swiper(".swiper", {
    speed: 400,
    spaceBetween: 100,
  });
  const { results } = await fetchData("movie/popular");
  const grid = document.querySelector(".grid");
  results.forEach((movie) => {
    if (!movie.adult) {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
                  />`
                : `<img
                  src="../images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
      grid.appendChild(div);
    }
  });
}
async function displayPopularShows() {
  const { results } = await fetchData("/tv/popular");
  const grid = document.querySelector("#popular-shows");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
                  />`
                : `<img
                  src="../images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        `;
    grid.appendChild(div);
  });
}

//fetch data from TMDB api
async function fetchData(endpoint) {
  const API_KEY = "b5f35cc338d4766e64dbe6d07a1854ab";
  const API_URL = "https://api.themoviedb.org/3";

  if (global.search.term) {
    const res = await fetch(
      `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
    );
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(
      `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    return data;
  }
}

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  console.log(links);
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPgae) {
      link.classList.add("active");
    }
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchData(`/movie/${movieId}`);
  const container = document.querySelector("#movie-details");
  const div = document.createElement("div");
  const overlay = document.querySelector(".overlay");
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;

  if (!movie.adult) {
    div.innerHTML = `
        <div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.name}"
                  />`
                : `<img
                  src="../images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.name}"
                />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)}
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}

            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString(
              "en-US"
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString(
              "en-US"
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${timeChanger(
              movie.runtime
            )}

    </li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
            .map((prod) => `<span>${prod.name}</span>`)
            .join(" ,")}

          </div>
        </div>
      `;
    container.appendChild(div);
  }
}

async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchData(`/tv/${showId}`);
  console.log(show);
  if (!show.adult) {
    const container = document.querySelector("#show-details");
    const overlay = document.querySelector(".overlay");
    overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${show.poster_path})`;
    const div = document.createElement("div");
    div.innerHTML = `
                <div class="details-top">
          <div>
           ${
             show.poster_path
               ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
                  />`
               : `<img
                  src="../images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
           }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)}
            </p>
            <p class="text-muted">Release Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.air_date
              }
            </li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((prod) => prod.name)
            .join(", ")}</div>
        </div>
      `;
    container.appendChild(div);
  }
}

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  const results = await fetchData(`search/${global.search.type}`);
  console.log(results);

  results.results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href=${
            global.search.type === "tv"
              ? `tv-details.html?id=${result.id}`
              : `movie-details.html?id=${result.id}`
          }

          >
             ${
               result.poster_path
                 ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              "
                  />`
                 : `<img
                  src="../images/no-image.jpg"
                  class="card-img-top"
                  "
                />`
             }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${result.release_date}</small>
            </p>
          </div>
        `;
    document.querySelector(".grid").appendChild(div);
  });
}

async function displaySlider() {
  const { results } = await fetchData("movie/now_playing");
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
 <div class="swiper-zoom-container">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
              </div>
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i>${movie.vote_average}</h4>
          `;
    swiperWrapper.appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

function timeChanger(time) {
  return `${Math.floor(time / 60)} H ${time % 60} Min`;
}

function init() {
  switch (global.currentPgae) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      displaySlider();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      search();
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init());
