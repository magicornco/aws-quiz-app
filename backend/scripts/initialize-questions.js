const database = require('../src/database');
require('dotenv').config();

async function initializeQuestions() {
  try {
    console.log('Connecting to DynamoDB...');
    await database.connect();
    
    console.log('Initializing questions...');
    await database.initializeQuestions();
    
    console.log('Questions initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing questions:', error);
    process.exit(1);
  }
}

initializeQuestions();
