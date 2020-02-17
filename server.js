const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/mxgraphmeetsangular'));

ngApp.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, '/dist/mxgraphmeetsangular/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
