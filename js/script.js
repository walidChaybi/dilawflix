const global = { currentPgae: window.location.pathname };

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  console.log(links);
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPgae) {
      link.classList.add("active");
    }
  });
}

function init() {
  switch (global.currentPgae) {
    case "/":
    case "/index.html":
      highlightActiveLink();
      break;
    case "/shows.html":
      highlightActiveLink();
      break;
    case "/movie-details.html":
      console.log("movies details");
      break;
    case "/tv-details.html":
      console.log("Tv details");
      break;
    case "/search.html":
      console.log("search");
      break;
  }
}
document.addEventListener("DOMContentLoaded", init());
