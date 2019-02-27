'use strict'

module.exports = function toJSONLoader (code) {
  const result = this.exec(code, this.resourcePath)

  if (typeof result !== 'function') {
    return toJSON(result)
  }

  const returned = result();

  if (!returned.then) {
    return toJSON(returned);
  }

  const callback = this.async()
  returned
    .then(asyncResult => callback(null, toJSON(asyncResult)))
    .catch(error => callback(error));
}

module.exports.pitch = function pitch () {
  this.clearDependencies()
}

function toJSON (result) {
  return 'module.exports = ' + JSON.stringify(result) + '\n'
}
