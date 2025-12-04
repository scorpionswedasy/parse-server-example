import { schemaDefinitions } from './cloud/schema.js';

export const config = {
  databaseURI:
    process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
  cloud: () => import('./cloud/main.js'),
  appId: process.env.APP_ID || 'APP1',
  clientKey: process.env.CLIENT_KEY || 'CLIENT1',
  masterKey: process.env.MASTER_KEY || 'MASTER1', // Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://parse-server-example-vs24.onrender.com/parse',

  // السماح بإنشاء كلاسات من الـ client
  allowClientClassCreation: true,

  // السماح بتجاوز ACL و schema validation
  enforcePrivateUsers: false,   // لمنع قيود خاصة على _User
  allowClientClassUpdate: true, // يسمح للـ client بتعديل الكلاسات الموجودة
  enableAnonymousUsers: true,   // إذا أردت السماح للمستخدمين المجهولين

  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },

  schema: {
    definitions: schemaDefinitions,
    lockSchemas: false, // للسماح بتعديل الكلاسات بعد إنشائها
    strict: false,      // للسماح بإضافة حقول جديدة بدون خطأ
  },
};
