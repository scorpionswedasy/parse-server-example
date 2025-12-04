// cloud/main.ts
import Parse from 'parse/node.js';

interface AddFieldParams {
  fieldName: string;
  fieldType: 'String' | 'Number' | 'Boolean' | 'Date' | 'Array' | 'Object';
}

Parse.Cloud.define('addFieldToUser', async (request) => {
  const { fieldName, fieldType } = request.params as AddFieldParams;

  if (!fieldName || !fieldType) {
    throw new Error('Missing fieldName or fieldType');
  }

  const schema = new Parse.Schema('_User');

  try {
    // إضافة الحقل باستخدام masterKey داخليًا
    schema.addField(fieldName, fieldType);
    await schema.update({ useMasterKey: true });
    return `Field ${fieldName} added successfully`;
  } catch (error) {
    console.error('Error adding field to _User:', error);
    throw new Error(`Failed to add field: ${(error as Error).message}`);
  }
});
