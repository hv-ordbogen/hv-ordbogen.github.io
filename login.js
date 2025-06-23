function LogIn() {
  document.body.innerHTML = `
  
    <main id="login">
      <div class="login-card">
        <h1>Login</h1>
        
        <div id="login-input">
          <input id="password" type="password" name="password" placeholder="Adgangskode.." required />
          <button>
            <span class="material-symbols-rounded">
              visibility
            </span>
          </button>
        </div>
        <input type="submit" value="Log ind" />
        
        <!-- <div class="g-signin2" data-onsuccess="onSignIn()">signin</div> -->
      </div>
    </main>
  `;
  const eye = document.querySelector("button > span");
  const input = document.querySelector("input#password");
  document.querySelector("button").addEventListener("click", () => {
    if (input.getAttribute("type") === "password") {
      eye.classList.add("visible");
      changeInputVisibility(input, "text");
    } else {
      eye.classList.remove("visible");
      changeInputVisibility(input, "password");
    }
  });

  document
    .querySelector("input[type='submit']")
    .addEventListener("click", () => checkPassword(input));
  document
    .querySelector("input#password")
    .addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        checkPassword(input);
      }
    });
}

function changeInputVisibility(input, type) {
  if (!document.startViewTransition) {
    input.setAttribute("type", type);
    return;
  }
  document.startViewTransition(() => input.setAttribute("type", type));
}

function checkPassword(input) {
  if (input.value === "Hvalbarde") {
    localStorage.setItem("loggedIn", "true");
    window.location.reload();
  } else {
    alert("Forkert kode");
  }
}

export default LogIn;
