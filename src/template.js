const { sanitise } = require("../utils/sanitise.js");
const { validation } = require("../utils/validate.js");

function home(errors = {}, values = {}) {
  const title = "Haiku Board - submit";
  const content = /*HTML*/ `
  <header class="header">
      <img src="/assets/logo-demo.JPG" alt="A logo which says Haiku Daily" class="header--logo"> 
  </header>
  <h1>Post a Haiku</h1>
  <main class="grid-container">
  <section class="infobox-haikus">
  <p class="text-general">A haiku is a three-line, unrhymed Japanese poem with a 5-7-5 syllable pattern, often using imagery to capture a specific moment in time.</p>
  <p class="haiku"> 
  On a bobbing branch 
  floating slowly downriver 
  a cricket, singing
  </p>
</section>
  <section class="linkbox-read no-top-margin">
  <p class="text-secondary">Looking for inspiration?</p>
    <form action="/read" method="GET" class="button-container">
    <figure>
      <button type="submit" class="button">
        <img 
        src="/assets/icon-read.png" 
        alt="An icon showing a poetry book"
        />
      </button>
      <figcaption class="button-label">Read haikus</figcaption>
      </figure>
    </form>

</section>
  <section class="haiku-form no-top-margin">
          <form method="POST" action="/post">
            <label>Enter your Haiku</label>
            <textarea 
              name="haiku"
              id="haiku"
              rows="4"
              cols="30"
            >${values.haiku ? sanitise(values.haiku) : ""}</textarea>
            ${validation(errors.haiku)}
            <label for="poet">Poet's name</label>
            <input 
              type="text" 
              name="poet"
              id="poet"
              value="${values.poet ? sanitise(values.poet) : ""}"
            >
            ${validation(errors.poet)}
            <figure class="no-top-margin">
              <button type="submit" class="button">
                <img 
                  src="/assets/icon-submit.png" 
                  alt="An icon showing a writing being submitted" 
                  class="icon-button"
                >
              </button>
              <figcaption class="button-label">Submit haiku</figcaption>
            </figure>
        </form>
      </section>
  </main>
`;
  return layout(title, content);
}

function haikuBoard(haikus) {
  const title = "Haiku Board - read";
  const content = /*HTML*/ `
  <body>
  <link rel="stylesheet" href="/styles.css">
    <header class="header">
      <img src="/assets/logo-demo.JPG" alt="A logo which says Haiku Daily" class="logo-header"> 
      <h1 class="heading-main hidden">Haiku board</h1>
  </header>
    <main>
        <section>
            <h2>Haiku library</h2>
                <ul>
                    ${haikus.map(postHaiku).join("")}
                </ul>
        </section>
            <section class="no-top-margin">
              <p class="text-secondary">Feeling inspired?</p>
                    <form action="/" method="GET">
                    <figure class="no-top-margin">
                      <button type="submit" class="button no-top-margin">
                        <img
                        src="/assets/icon-write.png" 
                        alt="An icon showing a poem being written"
                        />
                      </button>
                      <figcaption class="button-label">Write a haiku</figcaption>
                      </figure>
                    </form>

              </section>
    </main>
</body>
  `;
  return layout(title, content);
}

function postHaiku(haikuPost) {
  return /*HTML*/ `
  <li>
    <form method="POST" action="/delete/${haikuPost.id}" class="delete-container">
    <button>X</button>
    </form>
    <p>${haikuPost.haiku}</p>
    <p>${haikuPost.poet}</p>
    <p>${haikuPost.timeStamp}</p>
  </li>
  `;
}

function layout(title, content) {
  return /*html*/ `
<html lang="en">
  <head>
    <link rel="stylesheet" href="/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body>
    ${content}
  </body>
</html>
`;
}

module.exports = { home, haikuBoard };
