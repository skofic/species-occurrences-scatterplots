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
const K = require("../globals")

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
  if (db._collection(name)) {
    console.debug(`Dropping document collection ${name}.`)
    db._drop(name)
  } else if (context.isProduction) {
    console.debug(`Document collection ${name} does not exist.`)
  }
}

///
// Handle edge collections.
///
for (const name of edgeCollections) {
  if (db._collection(name)) {
    console.debug(`Dropping edge collection ${name}.`)
    db._drop(name)
  } else if (context.isProduction) {
    console.debug(`Edge collection ${name} does not exist.`)
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
        // Drop collection.
        ///
        if(db._collection(name)) {
          const collection = db._collection(name)
          console.debug(`Dropping document collection ${name}.`)
          collection.drop(name)
        } else if (context.isProduction) {
          console.debug(`Document collection ${name} does not exist.`)
        }
      }
    }
  }
}
