const handler = require('serve-handler');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  console.log('Path: ', path.join(__dirname, 'build'));
    
  return handler(request, response, {
    public: path.join(__dirname, 'build'),
    cleanUrls: true,
    rewrites: [
      {source: '/**', destination: '/index.html'}
    ],
    directoryListing: false
  });
});
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log('Running at http://localhost:' + port);
});
