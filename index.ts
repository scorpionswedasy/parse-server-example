import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';
import http from 'http';
import { config } from './config'; // بدون .js

const app = express();
const port = process.env.PORT || 1337;
const mountPath = process.env.PARSE_MOUNT || '/parse';

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Async IIFE لتشغيل Parse Server بأمان
(async () => {
  try {
    const server = new ParseServer(config);
    await server.start();
    app.use(mountPath, server.app);

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
        { user: 'admin', pass: '123456' },
      ],
    }, { allowInsecureHTTP: true });

    app.use('/dashboard', dashboard);

    app.get('/', (req, res) => {
      res.status(200).send('I dream of being a website.');
    });

    app.get('/test', (req, res) => {
      res.sendFile(path.join(__dirname, '/public/test.html'));
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
      console.log(`parse-server-example running on port ${port}.`);
    });

    await ParseServer.createLiveQueryServer(httpServer);

  } catch (err) {
    console.error('Error starting Parse Server:', err);
  }
})();
