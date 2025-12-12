import path = require('path');
const __dirname = path.resolve();

export const config = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  cloud: path.join(__dirname, 'dist/cloud/main.js'), // بعد التحويل
  appId: process.env.APP_ID || 'APP1',
  clientKey: process.env.CLIENT_KEY || 'CLIENT1',
  masterKey: process.env.MASTER_KEY || 'MASTER1',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  allowClientClassCreation: true,
  enforcePrivateUsers: false,
  allowClientClassUpdate: true,
  enableAnonymousUsers: true,
  liveQuery: {
    classNames: ['Posts', 'Comments']
  }
};
