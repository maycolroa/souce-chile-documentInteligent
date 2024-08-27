require('dotenv').config();

module.exports = {
  key: process.env.AZURE_FORM_RECOGNIZER_KEY,
  endpoint: process.env.AZURE_FORM_RECOGNIZER_ENDPOINT
};