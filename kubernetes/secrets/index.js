const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.app_name || 'Express App';

app.get('/', (req, res) => {
  const hostname = require('os').hostname();
  const ip = req.socket.localAddress;
  console.log(`Request received on ${hostname}`);

  res.setHeader('Content-Type', 'text/plain');
  res.send(`Hello, World! we are running in a ${appName} cluster! : ${hostname}\n and ip: ${ip}\n`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
