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

let washer1 = false;
let washer2 = false;
let dryer1 = false;
let dryer2 = false;

let running = 0;

function endCycle(machineId) {
  machineId = false;
  running -= 1;
  console.log(`Cycle running is ${machineId}.`);
  console.log(running);
  dogstatsd.gauge('machines-in-use', running);
}

function startCycle(machineId) {
  machineId = true;
  running += 1;
  console.log(`Cycle running is ${machineId}.`);
  console.log(running);
  dogstatsd.gauge('machines-in-use', running);
  setTimeout(endCycle, 18000, machineId);
}

startCycle(washer1);
startCycle(washer2);
setTimeout(startCycle, 20000, dryer1);
setTimeout(startCycle, 30000, dryer2);



