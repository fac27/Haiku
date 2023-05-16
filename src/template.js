function home() {
  return /*HTML*/ `
  <head>
  <link rel="stylesheet" href="/styles.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
  <header>
      <img src="/assets/logo-demo.JPG" alt="A logo which says Haiku Daily" class="logo-header"> 
      <h1 class="heading-main hidden">Haiku board</h1>
  </header>
  <main class="grid-container">
      <section class="linkbox-read">
        <h2>Looking for inspiration?</h2>
          <figure>
            <button type="button" class="button-circle">
              <img src="/assets/icon-read.png" alt="An icon showing a book" class="icon-button">
            </button>
            <figcaption class="text-general">Read haikus</figcaption>
          </figure>
      </section>
      <section class="infobox-haikus">
        <p class="text-general">A haiku is a Japanese verse form most often composed, in English versions, of three unrhymed lines of five, seven, and five syllables. It often features an image, or a pair of images, meant to depict the essence of a specific moment in time.</p>
        <p class="text-general haiku"> On a bobbing branch <br>
          floating slowly downriver <br>
          a cricket, singing.
          </p>
      </section>
      <section class="form-haikus stack-sm">
        <form method="POST" class="column">
          <label for="haikuInput" class="text-general">Enter your Haiku</label>
          <textarea id="haikuInput" name="haiku" rows="4" cols="30"></textarea>
          <label for="poetName" class="text-general">Poet's name</label>
          <input type="text" id="poetName" name="poet">
          <button type="submit" class="button-circle"><img src="/assets/icon-submit.png" alt="An icon showing a writing being submitted" class="icon-button"></button>
        </form>
      </section>
  </main>
</body>
`;
}

function haikuBoard(haikus) {
  return /*HTML*/ `
  <body>
  <link rel="stylesheet" href="/styles.css">
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

module.exports = { home, haikuBoard };
