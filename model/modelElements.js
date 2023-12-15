const nano = require("nano")("http://desouttter:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984");
const dbElements = nano.db.use('elements');

const afficherElement = async (elementId) => {
    const element = await dbElements.get(elementId);
    return element;
  };

  module.exports = {
    afficherElement
  };