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

let timer;

function endCycle(machineId) {
  dogstatsd.decrement('machines-in-use');
  dogstatsd.set(`${machineId}.in-use`, 0);
  console.log(`Cycle ${machineId} ended.`)
  clearTimeout(timer);
}

function startCycle(machineId) {
  dogstatsd.increment('machines-in-use');
  dogstatsd.set(`${machineId}.in-use`, 1);
  console.log(`Cycle ${machineId} started.`);
  timer = setTimeout(endCycle(machineId), 1800000);
}



