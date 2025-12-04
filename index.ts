// Example express application adding the parse-server module to expose Parse
// compatible API routes.

import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';
import http from 'http';
import { config } from './config.js';

const __dirname = path.resolve();
const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
const server = new ParseServer(config);
await server.start();
app.use(mountPath, server.app);

// إعداد Parse Dashboard
const dashboard = new ParseDashboard({
  apps: [
    {
      appId: process.env.APP_ID || 'APP1',
      masterKey: process.env.MASTER_KEY || 'MASTER1',
      serverURL: process.env.SERVER_URL || 'https://parse-server-example-vs24.onrender.com/parse',
      appName: 'My App',
    },
  ],
  users: [
    { user: 'admin', pass: '123456' }, // عدّل اسم المستخدم وكلمة المرور كما تريد
  ],
}, { allowInsecureHTTP: true });

// ضع الداشبورد على مسار معين
app.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website. Please star the parse-server repo on GitHub!');
});

// Test page
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.PORT || 1337;
const httpServer = http.createServer(app);

httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
  console.log(`Visit http://localhost:${port}/test to check the Parse Server`);
  console.log(`Visit http://localhost:${port}/dashboard to access Parse Dashboard`);
});

// Enable the Live Query real-time server
await ParseServer.createLiveQueryServer(httpServer);
