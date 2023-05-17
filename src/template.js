function home(errors = {}, values = {}) {
  const title = "Haiku Board - submit";
  const content = /*HTML*/ `
  <header>
      <img src="/assets/logo-demo.JPG" alt="A logo which says Haiku Daily" class="logo-header"> 
      <h1 class="heading-main hidden">Haiku board</h1>
  </header>
  <main class="grid-container">
      <section class="linkbox-read">
        <h2>Looking for inspiration?</h2>
          <figure>
            <form action="/read" method="GET" ariahidden="true">
              <button type="submit" ariahidden="false" arialabel="Read submitted haikus">
                <img 
                src="/assets/icon-read.png" 
                alt="An icon showing a poetry book"
                />
              </button>
            </form>
            <figcaption>Read haikus</figcaption>
          </figure>
        </section>
        <section class="infobox-haikus">
          <p class="text-general">A haiku is a Japanese verse form most often composed, in English versions, of three unrhymed lines of five, seven, and five syllables. It often features an image, or a pair of images, meant to depict the essence of a specific moment in time.</p>
          <p class="text-general haiku"> On a bobbing branch <br>
            floating slowly downriver <br>
            a cricket, singing.
          </p>
        </section>
        <section>
          <form method="POST" action="/home"> <!-- Add action attribute to the form -->
            <label for="haiku">Enter your Haiku</label>
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
            <button type="submit" class="button-circle" arialabel="Submit your haiku">
              <img 
                src="/assets/icon-submit.png" 
                alt="An icon showing a writing being submitted" 
                class="icon-button"
              >
          </button>
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
    <header>
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
            <section>
                <h2>Feeling inspired?</h2>
                  <figure>
                    <form action="/home" method="GET" ariahidden="true">
                      <button type="submit" ariahidden="false" arialabel="Visit the haiku submission page">
                        <img
                        src="/assets/icon-write.png" 
                        alt="An icon showing a poem being written"
                        />
                      </button>
                    </form>
                    <figcaption>Write a haiku</figcaption>
                  </figure>
              </section>
    </main>
</body>
  `;
  return layout(title, content);
}

function postHaiku(haikuPost) {
  return /*HTML*/ `
  <li>
    <form method="POST" action="/delete/${haikuPost.id}">
    <button>X</button>
    </form>
    <p>${haikuPost.haiku}</p>
    <p>${haikuPost.poet}</p>
    <p>${haikuPost.timeStamp}</p>
  </li>
  `;
}

function isValidData(dataSubmitted) {
  return dataSubmitted === "" ? false : true;
}

function validation(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}

function sanitise(dirtyData) {
  let unsafeData = {
    "<": "&lt;",
    ">": "&gt;",
  };

  return dirtyData.replace(/<|>/g, (matched) => unsafeData[matched]);
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

module.exports = { home, haikuBoard, isValidData, sanitise };
