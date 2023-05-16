function home() {
  return /*HTML*/ `
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
          <input type="textarea" name="haiku">
          <label>Poet's name</label>
          <input type="text" name="poet">
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

function validate(dataSubmitted) {
  const alertMessage = "Field cannot be empty";

  return dataSubmitted === "" ? alertMessage : dataSubmitted;
}

function sanitise(dirtyData) {
  let unsafeData = {
    "<": "&lt;",
    ">": "&gt;",
  };

  return dirtyData.replace(/<|>/g, (matched) => unsafeData[matched]);
}

module.exports = { home, haikuBoard, validate, sanitise };
