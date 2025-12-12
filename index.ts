import express = require('express');
import { ParseServer } from 'parse-server';
import ParseDashboard = require('parse-dashboard');
import path = require('path');
import http = require('http');
import { config } from './config';

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 1337;
const mountPath = process.env.PARSE_MOUNT || '/parse';

app.use('/public', express.static(path.join(__dirname, '/public')));

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
          serverURL: process.env.SERVER_URL || `http://localhost:${port}${mountPath}`,
          appName: 'My App'
        }
      ],
      users: [
        { user: 'admin', pass: '123456' }
      ]
    }, { allowInsecureHTTP: true });

    app.use('/dashboard', dashboard);

    app.get('/', (req, res) => {
      res.send('Parse Server is running!');
    });

    app.get('/test', (req, res) => {
      res.sendFile(path.join(__dirname, '/public/test.html'));
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Parse Dashboard: http://localhost:${port}/dashboard`);
      console.log(`Test page: http://localhost:${port}/test`);
    });

    await ParseServer.createLiveQueryServer(httpServer);

  } catch (err) {
    console.error('Error starting server:', err);
  }
})();
