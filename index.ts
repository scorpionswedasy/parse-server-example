// index.ts
import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';
import http from 'http';
import { config } from './config.js';

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 1337;
const mountPath = process.env.PARSE_MOUNT || '/parse';

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Async IIFE لتشغيل Parse Server بأمان
(async () => {
  try {
    // إنشاء Parse Server
    const server = new ParseServer(config);
    await server.start();
    app.use(mountPath, server.app);

    // إعداد Parse Dashboard
    const dashboard = new ParseDashboard({
      apps: [
        {
          appId: process.env.APP_ID || 'APP1',
          masterKey: process.env.MASTER_KEY || 'MASTER1',
          serverURL: process.env.SERVER_URL || 'htt_
