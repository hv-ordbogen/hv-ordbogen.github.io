let myObject;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    myObject = data;
  })
  .then(() => {
    const count = Object.keys(myObject).length;
    for (let i = 1; i <= count; i++) {
      const article = document.createElement("article");
      const header = document.createElement("h2");
      header.innerText = myObject[i].ord;
      const endings = document.createElement("em");
      endings.innerText = myObject[i].endelse;
      const description = document.createElement("p");
      description.innerText = myObject[i].betydning;
      article.appendChild(header);
      article.appendChild(endings);
      article.appendChild(description);
      document.querySelector("#root").appendChild(article);
      console.log(myObject[i].word);
      console.log(myObject[i].description);
    }

    console.log(count);
  });
