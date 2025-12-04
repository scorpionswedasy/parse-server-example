import { schemaDefinitions } from './cloud/schema.js';

export const config = {
  databaseURI:
    process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
  cloud: () => import('./cloud/main.js'),
  appId: process.env.APP_ID || 'APP1',
  masterKey: process.env.MASTER_KEY || 'MASTER1', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://parse-server-example-vs24.onrender.com/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
  schema: {
  definitions: schemaDefinitions,
  lockSchemas: false,
  strict: false,
},

};
