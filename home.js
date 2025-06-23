import { myObject } from "./app.js";
import Discover from "./discover.js";

function Home() {
  root.innerHTML = `
      <section id="welcome">
      
        <div class="text">
          <h1 style="text-align:left;">Velkommen til Danmarks eneste HV-ordbog</h1>
          <p>Her kan du finde 
            <strong> alle ${Object.keys(myObject).length}
            </strong> hv-ord fra <q>Ordbog over det Danske Sprog</q> og <q>Den Danske Ordbog</q>, så du kan irritere din lærer.</p>
        </div>
        <div id="overlay"></div>
      </section>

    <div class="vertical-space"></div>

    <section class="card" id="discover">
      <div class="display">
        <div class="scroll left" id="os0"></div>
        <div class="scroll right" id="os30"></div>
        <div class="scroll left offset" id="os60"></div>
        <div class="scroll right offset" id="os90"></div>
      </div>
      <div class="text">
        <h2>Opdag hv-ord</h2>
        <p>I HV-ordbogen kan du finde alle dokumenterede hv-ord i det danske sprog</p>
        <button class="accent-btn" onclick="location.hash='#/opdag';">Prøv det</button>
      </div>
    </section>
    <section>
      <canvas id="canvas"></canvas>
    </section>
  `;

  const discoverCard = document.querySelector("#discover");
  setTimeout(() => {
    // console.log(Object.keys(myObject).length);
    for (let i = 0; i < 7; i++) {
      if (i > 100) {
        break;
      }
      const scrollItems = discoverCard.querySelectorAll(".display > .scroll");
      for (let scrollItem of scrollItems) {
        // if (i > 3) {
        //   scrollItem.innerHTML += `
        //   <div class="scroll-item invisible" style="--n: ${i}">
        //   </div>
        // `;
        // } else {
        const offset = JSON.parse(scrollItem.getAttribute("id").slice(2));
        let index = i * 2 + offset;

        while (index >= Object.keys(myObject).length) {
          index = index - Object.keys(myObject).length;
        }
        scrollItem.innerHTML += `
          <button class="scroll-item" style="--n: ${i}" onclick="localStorage.setItem('focusElem', '${myObject[index].ord}'); location.hash = '#/opdag'">
            <h3>${myObject[index].ord}</h3>
            <em>${myObject[index].endelse}</em>
            <p>${myObject[index].betydning}</p>
          </button>
        `;
        // }
      }
    }
  }, []);
  let tooSmall = window.innerWidth + 50 < screen.width;

  window.addEventListener("resize", () => {
    tooSmall = window.innerWidth + 50 < screen.width;
    console.log(window.innerWidth, tooSmall);
  });

  const welcome = document.querySelector("#welcome");
  const overlay = document.querySelector("#overlay");
  welcome.addEventListener("mouseenter", () => {
    if (!tooSmall) {
      overlay.style.opacity = 1;
      welcome.addEventListener("mousemove", getCord);
    }
  });
  welcome.addEventListener("mouseleave", () => {
    overlay.style.opacity = 0;
  });
}

function getCord(event) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - bounds.left + "px";

  const y = event.clientY - bounds.top + "px";
  document.querySelector(":root").style.setProperty("--hero-mask-x", x);
  document.querySelector(":root").style.setProperty("--hero-mask-y", y);

  // ANIMATIONS!!!

  const r = new rive.Rive({
    src: "/assets/animations/tutorial.riv",
    // OR the path to a discoverable and public Rive asset
    // src: '/public/example.riv',
    canvas: document.querySelector("canvas#canvas"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
  });
  window.addEventListener("resize", () => {
    r.resizeDrawingSurfaceToCanvas();
  });
}

export default Home;
