'use strict'

///
// Includes.
///
const { db } = require('@arangodb')
const { context } = require('@arangodb/locals')

///
// Local includes.
///
const helpers = require("../utils/helpers.js")
const K = require("../globals");


///
// Collection names.
///
const documentCollections = [
  "Stats"
]
const edgeCollections = [
]

///
// Handle document collections.
///
for (const name of documentCollections) {
  if (!db._collection(name)) {
	console.debug(`Creating document collection ${name}.`)
	db._createDocumentCollection(name)
  } else if (context.isProduction) {
	console.debug(`Document collection ${name} already exists. Leaving it untouched.`)
  }
}

///
// Handle edge collections.
///
for (const name of edgeCollections) {
  if (!db._collection(name)) {
	console.debug(`Creating edge collection ${name}.`)
	db._createEdgeCollection(name)
  } else if (context.isProduction) {
	console.debug(`Edge collection ${name} already exists. Leaving it untouched.`)
  }
}

///
// Handle pair collections.
///
for (const pair of K.pairs.list)
{
  ///
  // Iterate domains.
  ///
  for (const domain of K.domains.list)
  {
	///
	// Iterate types.
	///
	for (const type of K.types.list)
	{
	  ///
	  // Iterate pair collection names.
	  ///
	  for (const name of helpers.getPairCollectionNames(pair, domain, type))
	  {
        ///
		// Create collection.
		///
		if(!db._collection(name)) {
          console.debug(`Creating document collection ${name}.`)
          db._createDocumentCollection(name)
		} else if (context.isProduction) {
          console.debug(`Document collection ${name} already exists. Leaving it untouched.`)
		}

        ///
        // Reference collection.
        ///
        const collection = db._collection(name)

        ///
        // Create general indexes.
        ///
        for (const field of K.domains[domain].types[type].indexes.fields) {
          if (context.isProduction) {
            console.debug(`Ensuring index idx_${field.name} for collection ${name}.`)
          }
          collection.ensureIndex({
            name: `idx_${field.name}`,
            type: "persistent",
            fields: field.fields,
            estimates: true,
            cacheEnabled: false,
            deduplicate: false,
            sparse: false,
            unique: false
          })
        }

		///
		// Create indicator indexes.
		///
		if(K.domains[domain].types[type].indexes.indicators)
		{
		  for (const axis of ['X', 'Y']) {
            if (context.isProduction) {
              console.debug(`Ensuring index idx_${K.pairs[pair][axis].term} for collection ${name}.`)
            }
            collection.ensureIndex({
              name: `idx_${K.pairs[pair][axis].term}`,
              type: "persistent",
              fields: [K.pairs[pair][axis].term],
              estimates: true,
              cacheEnabled: false,
              deduplicate: false,
              sparse: false,
              unique: false
            })
		  }
		}
	  }
	}
  }
}
