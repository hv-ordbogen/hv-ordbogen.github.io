import { myObject } from "./app.js";

let lastRandom;

function Random() {
  root.innerHTML = `
    <h1>Generér tilfeldigt hv-ord</h1>
    <button id="random">Generér Ord</button>
    <article class="bomb"></article>
  `;
  const article = document.querySelector("article");
  if (localStorage.getItem("randomWordIndex")) {
    addWord(myObject[localStorage.getItem("randomWordIndex")], article);
  } else {
    generateWord(article);
  }
  document.querySelector("#random").addEventListener("click", () => {
    generateWord(article);
  });
}

function generateWord(article) {
  const randomWord = randomizeWord();

  localStorage.setItem("randomWordIndex", myObject.indexOf(randomWord));
  console.log("index: ", localStorage.getItem("randomWordIndex"));

  if (!document.startViewTransition) {
    addWord(randomWord, article);
    return;
  }
  document.startViewTransition(() => addWord(randomWord, article));
}

function addWord(randomWord, article) {
  article.innerHTML = `
      <h2>${randomWord.ord}</h2>
      <em>${randomWord.endelse}</em>
      <p>${randomWord.betydning}</p>
    `;
  console.log("word generated");
}

function randomNumber() {
  const number = Math.random();
  const t = number * Object.keys(myObject).length;
  const rounded = Math.floor(t);
  return rounded;
}

function randomizeWord() {
  let rounded = randomNumber();
  if (lastRandom === rounded) {
    rounded = randomNumber();
  }
  lastRandom = rounded;
  console.log(rounded);

  return myObject[rounded];
}

export default Random;
