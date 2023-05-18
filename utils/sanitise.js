function sanitise(dirtyData) {
    let unsafeData = {
      "<": "&lt;",
      ">": "&gt;",
    };
  
    return dirtyData.replace(/<|>/g, (matched) => unsafeData[matched]);
  }

  module.exports = { sanitise }