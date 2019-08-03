const restify = require('restify');

const server = restify.createServer({
  name: 'Strictly Bikes',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res) => {
  res.send('~Strictly Bikes~');
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});