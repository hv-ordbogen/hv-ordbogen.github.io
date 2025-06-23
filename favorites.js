function Favorites() {
  root.innerHTML = `
    <h1>Favoritter</h1>
  `;

  const favoriteWords = JSON.parse(localStorage.getItem("favoriteWords"));
  console.log(
    favoriteWords,
    favoriteWords.length,
    JSON.parse(favoriteWords[0]).ord
  );

  for (let i = 0; i < favoriteWords.length; i++) {
    root.innerHTML += `
      <article class="bomb">
        <h2>${JSON.parse(favoriteWords[i]).ord}</h2>
        <em>${JSON.parse(favoriteWords[i]).endelse}</em>
        <p>${JSON.parse(favoriteWords[i]).betydning}</p>
        <span id='del${JSON.stringify(
          favoriteWords[i]
        )}' class="button-right material-symbols-rounded">
          delete
        </span>
      </article>
    `;
  }

  const deleteButtons = document.querySelectorAll(".button-right");
  console.log(1);
  for (let deleteButton of deleteButtons) {
    console.log(1);
    deleteButton.addEventListener("click", () => {
      console.log("clicked");
      console.log(1);
      const index = favoriteWords.indexOf(
        JSON.parse(deleteButton.getAttribute("id").replace("del", ""))
      );
      console.log("index:", index);
      if (index > -1) {
        favoriteWords.splice(index, 1);
        if (!document.startViewTransition) {
          deleteButton.parentElement.remove();
          return;
        }
        document.startViewTransition(() => deleteButton.parentElement.remove());
        localStorage.setItem("favoriteWords", favoriteWords);
      }
    });
  }
}

export default Favorites;
