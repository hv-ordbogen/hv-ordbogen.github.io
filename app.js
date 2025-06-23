import Home from "./home.js";
import Discover from "./discover.js";
import Random from "./random.js";
import WordOfTheDay from "./word-of-the-day.js";
import About from "./about.js";
import Search from "./search.js";
import Favorites from "./favorites.js";
import LogIn from "./login.js";

// gapi.load("auth2", () => {
//   gapi.auth2.init();
// });

let loggedIn;
let myObject;

const searchbar = document.querySelector("input#search");
console.log(searchbar);
const logout = document.querySelector("#logout");
const theme = document.querySelector("#theme");
const rt = document.body;

document.querySelector("#copy-year").innerHTML = new Date().getFullYear();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    updateTheme();
  });

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    myObject = data;
    loadedSite();
  })
  .then(() => {
    if (!document.startViewTransition) {
      updateContent();
      return;
    }
    document.startViewTransition(() => updateContent());
  });

function loadedSite() {
  updateTheme();
  console.log("site loaded");
  if (localStorage.getItem("loggedIn") === "true") {
    console.log("you are logged in");
    loggedIn = true;
    if (window.location.hash === "#/login") {
      window.location.hash = "#/";
    }
  } else {
    console.log("you are NOT logged in");
    loggedIn = false;
    window.location.hash = "#/login";
  }
}
export { myObject, loadedSite };

searchbar.addEventListener("change", () => {
  if (searchbar.value) {
    window.location.hash =
      "#/søg?q=" + window.encodeURIComponent(searchbar.value);
  }
  console.log(encodeURIComponent("søg"));

  // if (window.location.hash.includes("#/soeg")) {
  //   if (!document.startViewTransition) {
  //     updateContent();
  //     return;
  //   }
  //   document.startViewTransition(() => updateContent());
  // } else {
  //   window.location.hash = "#/soeg";
  // }
});

theme.addEventListener("click", () => {
  if (!document.startViewTransition) {
    themeChange();
    return;
  }
  document.startViewTransition(() => themeChange());
});

function themeChange() {
  if (rt.getAttribute("data-theme") === "light") {
    localStorage.setItem("theme", "dark");
  } else if (rt.getAttribute("data-theme") === "dark") {
    localStorage.setItem("theme", "light");
  }
  updateTheme();
}

function updateTheme() {
  if (!localStorage.getItem("theme")) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.setItem("theme", "dark");
    }
  }
  if (localStorage.getItem("theme") === "dark") {
    rt.setAttribute("data-theme", "dark");
    theme.querySelector("span").innerHTML = "light_mode";
  } else {
    rt.setAttribute("data-theme", "light");
    theme.querySelector("span").innerHTML = "dark_mode";
  }
}

window.addEventListener("hashchange", () => {
  // Fallback for browsers that don't support this API:
  console.log("hash changed", window.location.hash);

  if (!document.startViewTransition) {
    updateContent();
    return;
  }

  // With a View Transition:
  document.startViewTransition(() => updateContent());
});

logout.addEventListener("click", () => {
  console.log("logging out");

  localStorage.setItem("loggedIn", false);
  window.location.hash = "#/login";
});

function updateContent() {
  const hash = window.location.hash;
  console.log(hash);
  console.log(localStorage.getItem("loggedIn"));
  loggedIn = localStorage.getItem("loggedIn");
  console.log(loggedIn);

  if (loggedIn === ("true" || true)) {
    if (hash === "#/") {
      Home();
    } else if (hash.includes("#/opdag")) {
      Discover();
    } else if (hash === "#/" + encodeURIComponent("tilfældigt-ord")) {
      Random();
    } else if (hash === "#/om") {
      About();
    } else if (hash === "#/dagens-ord") {
      WordOfTheDay();
    } else if (hash.includes("#/" + encodeURIComponent("søg"))) {
      Search();
    } else if (hash === "#/favoritter") {
      Favorites();
    } else {
      window.location = "./#/";
    }
  } else {
    LogIn();
  }
}
