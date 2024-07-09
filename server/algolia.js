const algoliasearch = require('algoliasearch');
const mongoose = require('mongoose');
require('dotenv').config();

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

let Task = require('./models/task.model');

async function indexDataToAlgolia() {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Not connected to MongoDB');
    }

    const documents = await Task.find({}).lean();

    const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
    const index = algoliaClient.initIndex(ALGOLIA_INDEX_NAME);

    await index.clearObjects();
    console.log('Existing index cleared');

    const algoliaObjects = documents.map(doc => ({
      objectID: doc._id.toString(),
      ...doc
    }));

    const { objectIDs } = await index.saveObjects(algoliaObjects);
    console.log(`Indexed ${objectIDs.length} record(s) to Algolia`);

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = indexDataToAlgolia;