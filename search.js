import { myObject } from "./app.js";

function Search() {
  console.log("searching...");
  console.log(myObject[40].ord);
  console.log(Object.keys(myObject).length);
  const query = decodeURIComponent(
    window.location.hash.replace("#/" + encodeURIComponent("søg") + "?q=", "")
  );
  document.querySelector(".search-input").value = query;
  console.log(query);
  root.innerHTML = ``;
  // for (let i = 0; i < Object.keys(myObject).length; i++) {
  //   console.log("w" + myObject[i].ord.includes(query));

  //   if (
  //     myObject[i].ord.toLowerCase().includes(query) ||
  //     myObject[i].betydning.toLowerCase().includes(query)
  //   ) {
  //     root.innerHTML += `
  //       <article class="bomb">
  //         <h2>${myObject[i].ord}</h2>
  //         <em>${myObject[i].endelse}</em>
  //         <p>${myObject[i].betydning}</p>
  //       </article>
  //     `;
  //   }
  // }

  let maxWordLength = 0;
  let maxDescriptLength = 0;
  for (let i = 0; i < Object.keys(myObject).length; i++) {
    if (myObject[i].ord.length > maxWordLength)
      maxWordLength = myObject[i].ord.length;
    if (myObject[i].betydning.length > maxDescriptLength)
      maxDescriptLength = myObject[i].betydning.length;
  }
  console.log(": " + maxWordLength + ", " + maxDescriptLength);

  const items = [];
  for (let i1 = 0; i1 < query.length; i1++) {
    for (let i0 = 0; i0 < maxWordLength; i0++) {
      for (let i = 0; i < Object.keys(myObject).length; i++) {
        if (
          !items.includes(myObject[i].ord) &&
          myObject[i].ord.toLowerCase().includes(query)
        ) {
          if (myObject[i].ord.toLowerCase()[i0] === query[i1]) {
            items.push(myObject[i].ord);
            root.innerHTML += `
            <article class="bomb">
              <h2>${myObject[i].ord}</h2>
              <em>${myObject[i].endelse}</em>
              <p>${myObject[i].betydning}</p>
            </article>
          `;
          }
        }
      }
    }
  }
  for (let i1 = 0; i1 < query.length; i1++) {
    for (let i0 = 0; i0 < maxDescriptLength; i0++) {
      for (let i = 0; i < Object.keys(myObject).length; i++) {
        if (
          !items.includes(myObject[i].betydning) &&
          myObject[i].betydning.toLowerCase().includes(query)
        ) {
          if (myObject[i].betydning.toLowerCase()[i0] === query[i1]) {
            items.push(myObject[i].betydning);
            root.innerHTML += `
            <article class="bomb">
              <h2>${myObject[i].ord}</h2>
              <em>${myObject[i].endelse}</em>
              <p>${myObject[i].betydning}</p>
            </article>
          `;
          }
        }
      }
    }
  }
}

export default Search;
