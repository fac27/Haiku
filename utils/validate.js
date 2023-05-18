function isValidData(dataSubmitted) {
  return !(dataSubmitted === "");
}

function validation(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}

module.exports = { isValidData, validation };
