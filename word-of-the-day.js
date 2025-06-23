import { myObject } from "./app.js";

function WordOfTheDay() {
  root.innerHTML = `
    <h2>Dagens Ord</h2>
    <article class="bomb"></article>
  `;
  console.log(1);
  const date = new Date();
  console.log(date);

  const day = Math.round(
    (date.setHours(23) - new Date(date.getYear() + 1900, 0, 1, 0, 0, 0)) /
      1000 /
      60 /
      60 /
      24
  );
  // const day = Math.ceil(
  //   (date - new Date(date.getYear() + 1900, 0, 1, 0, 0, 0)) /
  //     1000 /
  //     60 /
  //     60 /
  //     24
  // );

  console.log(day);
  let index = day * 25;
  while (index > Object.keys(myObject).length) {
    index = index - Object.keys(myObject).length;
  }

  console.log(index);
  document.querySelector("article.bomb").innerHTML = `
    <h2>${myObject[index].ord}</h2>
    <em>${myObject[index].endelse}</em>
    <p>${myObject[index].betydning}</p>
  `;
}

export default WordOfTheDay;
