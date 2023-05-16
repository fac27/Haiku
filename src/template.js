function home() {
  const homePage = /*HTML*/ `
    <body>
  <header>
      <img> 
      <h1>Haiku board</h1>
  </header>
  <main>
      <section>
        <h2>Looking for inspiration?</h2>
          <figure>
            <button>
              <img/>
            </button>
            <figcaption>Read haikus</figcaption>
          </figure>
      </section>
      <section>
        <p>A haiku is a Japanese verse form most often composed, in English versions, of three unrhymed lines of five, seven, and five syllables. It often features an image, or a pair of images, meant to depict the essence of a specific moment in time.</p>
        <p> On a bobbing branch <br>
          floating slowly downriver <br>
          a cricket, singing.
          </p>
      </section>
      <section>
        <form method="POST">
          <label>Enter your Haiku</label>
          <input type="textarea">
          <label>Name</label>
          <input type="text">
          <button type="submit"><img></button>
        </form>
      </section>
  </main>
</body>
`;
}

function haikuBoard(haikus) {
  return /*HTML*/ `
  <body>
    <header>
        <img> 
        <h1>Haiku board</h1>
    </header>
    <main>
        <section>
            <h2>Haiku library</h2>
                <ul>
                    ${haikus.map(postHaiku).join("")}
                </ul>
        </section>
            <section>
                <h2>Feeling inspired?</h2>
                  <figure>
                    <button>
                      <img/>
                    </button>
                    <figcaption>Write a haiku</figcaption>
                  </figure>
              </section>
    </main>
</body>
  `;
}

function postHaiku(haikuPost) {
  return /*HTML*/ `
  <li>
    <p>${haikuPost.haiku}</p>
    <p>${haikuPost.poet}</p>
    <p>${haikuPost.timeStamp}</p>
  </li>
  `;
}

module.exports = { home };
module.exports = { haikuBoard };
