import { myObject } from "./app.js";

function Discover() {
  root.innerHTML = ``;
  const count = Object.keys(myObject).length;
  for (let i = 0; i < count; i++) {
    root.innerHTML += `
      <article class="bomb" id="${myObject[i].ord}">
        <div class="preview">
          <span class="button-left material-symbols-rounded">
            arrow_drop_down
          </span>
          <h2>${myObject[i].ord}</h2>
          <em>${myObject[i].endelse}</em>
          <p>${myObject[i].betydning}</p>
          <span id='fav${JSON.stringify(
            myObject[i]
          )}' class="button-right material-symbols-rounded">
            star
          </span>
        </div>
        <div class="dropDown">
          <h1>
            ALT<br>MULIGT<br>SPÆNDENDE
          </h1>
        </div>
      </article>
    `;
  }
  const favoriteWords = localStorage.getItem("favoriteWords")
    ? JSON.parse(localStorage.getItem("favoriteWords"))
    : [];

  console.log(favoriteWords);

  const favoriteButtons = document.querySelectorAll(".button-right");
  const dropDownButtons = document.querySelectorAll(".button-left");

  for (let dropDownButton of dropDownButtons) {
    dropDownButton.addEventListener("click", () => {
      dropDownButton.classList.toggle("active");
    });
  }

  for (let favoriteButton of favoriteButtons) {
    if (
      favoriteWords.includes(
        favoriteButton.getAttribute("id").replace("fav", "")
      )
    ) {
      favoriteButton.classList.add("active");
    }
    favoriteButton.addEventListener("click", () => {
      console.log("clicked");
      if ([...favoriteButton.classList].includes("active")) {
        favoriteButton.classList.remove("active");
        const index = favoriteWords.indexOf(
          favoriteButton.getAttribute("id").replace("fav", "")
        );
        if (index > -1) {
          favoriteWords.splice(index, 1);
        }
      } else {
        favoriteButton.classList.add("active");
        favoriteWords.push(
          favoriteButton.getAttribute("id").replace("fav", "")
        );
      }
      localStorage.setItem("favoriteWords", JSON.stringify(favoriteWords));
      console.log(localStorage.getItem("favoriteWords"));

      console.log(JSON.parse(localStorage.getItem("favoriteWords")));
    });
  }
  if (localStorage.getItem("focusElem")) {
    document
      .querySelector(`#${localStorage.getItem("focusElem")}`)
      .scrollIntoView();
    window.scrollBy(0, -100);
  }
}

export default Discover;
