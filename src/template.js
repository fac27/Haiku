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
</section>
  <section class="linkbox-read no-top-margin">
  <figure>
  <p class="text-secondary">Looking for inspiration?</p>
    <form action="/read" method="GET" class="button-container">
      <button type="submit" class="button">
        <img 
        src="/assets/icon-read.png" 
        alt="An icon showing a poetry book"
        />
      </button>
    </form>
    <figcaption class="button-label">Read haikus</figcaption>
  </figure>
</section>
  <section class="haiku-form no-top-margin">
          <form method="POST" action="/">
            <label>Enter your Haiku</label>
            <textarea 
              name="haiku"
              rows="4"
              cols="30"
              placeholder=
              " 
              On a bobbing branch 
              floating slowly downriver 
              a cricket, singing"
            >${values.haiku ? sanitise(values.haiku) : ""}</textarea>
            ${validation(errors.haiku)}
            <label>Poet's name</label>
            <input 
              type="text" 
              name="poet"
              value="${values.poet ? sanitise(values.poet) : ""}"
            >
            ${validation(errors.poet)}
            <figure>
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
            <section>
                <h2>Feeling inspired?</h2>
                  <figure>
                    <form action="/" method="GET">
                      <button type="submit" class="button">
                        <img
                        src="/assets/icon-write.png" 
                        alt="An icon showing a poem being written"
                        />
                      </button>
                    </form>
                    <figcaption class="button-label">Write a haiku</figcaption>
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
    <form method="POST" action="/delete/${haikuPost.id}" class="delete-container">
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
<head>
  <link rel="stylesheet" href="/styles.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
</head>
<body>
${content}
</body>
`;
}

module.exports = { home, haikuBoard, isValidData, sanitise };
