const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Up and Running');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD();

let inUse = 0;

function endCycle(machineId) {
  inUse -= 1;
  dogstatsd.set('machines-in-use', inUse);
  console.log(`Cycle ${machineId} ended.`);
}

function startCycle(machineId) {
  inUse += 1;
  dogstatsd.set('machines-in-use', inUse);
  console.log(`Cycle ${machineId} started.`);
  setTimeout(endCycle, 1800000, machineId);
}

startCycle(1);
startCycle(2);



