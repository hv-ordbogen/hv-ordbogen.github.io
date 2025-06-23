function About() {
  root.innerHTML = `
    <h1>Om os</h1>
    <q>Dette er et historisk øjeblik</q>
    <cite>– Hugo L. B. Svendsen</cite>

    <div class="vertical-space"></div>

    <section class="card-container">
      <div class="card about">
        <div class="display">
          <img src="/assets/hugo.JPG" />
        </div>
        <div class="text">
          <h1>Hugo Lund Basbøll Svendsen</h1>
        </div>
      </div>
      <div class="card about">
        <div class="display">
          <img src="/assets/claudia.JPG" />
        </div>
        <div class="text">
          <h1>Claudia Astrid Ohlson Cló</h1>
        </div>
      </div>
      <div class="card about">
        <div class="display">
          <img src="/assets/maja.JPG" />
        </div>
        <div class="text">
          <h1>Maja Leth Miller Damkjær</h1>
        </div>
      </div>
      <div class="card about">
        <div class="display">
          <img src="/assets/luffe.JPG" />
        </div>
        <div class="text">
          <h1>Luffe</h1>
        </div>
      </div>
      <div class="card about">
        <div class="display">
          <img src="/assets/just a lil guy.JPG" />
        </div>
        <div class="text">
          <h1>Just a lil Guy</h1>
        </div>
      </div>
    </section>
  `;
}

export default About;
