import path from 'path';
const __dirname = path.resolve();

export const config = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  cloud: path.join(__dirname, 'dist/cloud/main.js'), // ملف JS بعد التحويل
  appId: process.env.APP_ID || 'APP1',
  clientKey: process.env.CLIENT_KEY || 'CLIENT1',
  masterKey: process.env.MASTER_KEY || 'MASTER1',
  serverURL: process.env.SERVER_URL || 'https://parse-server-example-vs24.onrender.com/parse',
  allowClientClassCreation: true,
  enforcePrivateUsers: false,
  allowClientClassUpdate: true,
  enableAnonymousUsers: true,
  liveQuery: {
    classNames: ['Posts', 'Comments']
  },
  schema: {
    definitions: require('./dist/cloud/schema.js').schemaDefinitions,
    lockSchemas: false,
    strict: false
  }
};
