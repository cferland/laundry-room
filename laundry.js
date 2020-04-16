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

let washer1 = 'Washer_1';
let washer2 = 'Washer_2';
let dryer1 = 'Dryer_1';
let dryer2 = 'Dryer_2';

let running = 0;

function endCycle(machineId) {
  running -= 1;
  console.log(`Cycle finished on ${machineId}.`);
  console.log(running);
  dogstatsd.gauge('machines-in-use', running);
  dogstatsd.gauge(`${machineId}`, 0);
}

function startCycle(machineId) {
  running += 1;
  console.log(`Cycle started on ${machineId}.`);
  console.log(running);
  dogstatsd.gauge('machines-in-use', running);
  dogstatsd.gauge(`${machineId}`, 1);
  setTimeout(endCycle, 18000, machineId);
}

startCycle(washer1);
startCycle(washer2);
setTimeout(startCycle, 20000, dryer1);
setTimeout(startCycle, 30000, dryer2);
setInterval(startCycle, 180000, washer1);
setInterval(startCycle, 200000, washer2);
setInterval(startCycle, 300000, dryer1);



