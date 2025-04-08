'use strict';

const winston = require('winston');
const openai = require('openai');

const client = new openai.OpenAI({
  api_key: process.env.OPENAI_API_KEY || "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"
});

function warn(msg) {
  if (global.env === 'development') {
    winston.warn(msg);
  }
}

async function getLanguage(post) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Identify the language of this text: ${post}`
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('Error detecting language:', err);
    return 'unknown';
  }
}

async function getTranslation(post) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Translate this text to English: ${post}`
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('Error translating text:', err);
    return post;
  }
}

async function queryLLM(post) {
  try {
    const language = await getLanguage(post);
    if (language.toLowerCase() === "english") {
      return [true, post];
    }
    const translation = await getTranslation(post);
    return [false, translation];
  } catch (err) {
    console.error('Error in LLM query:', err);
    return [false, "[Error handling applied]"];
  }
}

module.exports = {
  ...require('../public/src/modules/translator.common')(require('./utils'), (lang, namespace) => {
    const languages = require('./languages');
    return languages.get(lang, namespace);
  }, warn),
  getLanguage,
  getTranslation,
  queryLLM
};