var fs = require('fs')

// read metadata and set global app variables
fs.readFile('package.json', (err, data) => {
    if (err)
      throw err;
  
    var packageData = JSON.parse(data);
  
    global.app.set('name', packageData.name);
    global.app.set('version', packageData.version);
});

var metadataMiddlleware = function(req, res, next) {
    res.append('Server', global.app.get('name') + ' (' + global.app.get('version') + ')');
    next();
}

module.exports = metadataMiddlleware;