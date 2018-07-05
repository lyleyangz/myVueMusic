const fs = require('fs')
const path = require('path')

module.exports = getEntries = (viewsPath) => {
  let entries = {}
  fs.readdirSync(viewsPath).forEach(entryName => {
    let entryFolder = path.join(viewsPath, entryName)
    let stats = fs.lstatSync(entryFolder)
    if (stats.isDirectory()) {
      let entryMain = `${viewsPath}/${entryName}/main.js`
      fs.existsSync(entryMain) && (entries[entryName] = ['babel-polyfill', entryMain])
    }
  })
  return entries
}
