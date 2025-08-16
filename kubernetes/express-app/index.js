const express = require('express')
const os = require('os');
const cluster = require('cluster');
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  const hostname = os.hostname();
  const ip = req.socket.localAddress;
  console.log(`Request received on ${hostname}`);

  res.setHeader('Content-Type', 'text/plain');  
  res.send(`Hello, World! we are running in a Kubernetes cluster! : ${hostname}\n and ip: ${ip}\n`);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;