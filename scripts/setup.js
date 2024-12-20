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
// Indexes.
///
const idx_fields = {
	idx_units: ["properties.eu.species_list[*]"],
	idx_species: ["properties.eu.species_list[*]"]
}

///
// Results.
///
const results = {
	created: [],
	existing: [],
	indexes: []
}


///
// Handle pair collections.
///
for (const pair of K.pairs.list)
{
	///
	// Iterate types.
	///
	for (const type of K.types.list)
	{
		///
		// Create final collection with indexes for pair.
		///
		const name = `${pair}_${type}`
		if(!db._collection(name)) {
			console.debug(`Creating document collection ${name}.`)
			db._createDocumentCollection(name)
			results.created.push(name)
		} else {
			results.existing.push(name)
			if(context.isProduction) {
				console.debug(`Document collection ${name} already exists. Leaving it untouched.`)
			}
		}

		///
		// Save collection and collect existing indexes.
		///
		const collection = db._collection(name)
		const index_names = collection.getIndexes().map(index => index.name)
		
		///
		// Create indexes.
		///
		Object.entries(idx_fields)
			.forEach(([idx_name, idx_field]) => {
				// Check index.
				if(!index_names.includes(idx_name)) {
					results.indexes.push(`${name}.${idx_name}`)
					if (context.isProduction) {
						console.debug(`Ensuring index ${idx_name} for collection ${name}.`)
					}
					collection.ensureIndex({
						name: idx_name,
						type: "persistent",
						fields: idx_field,
						estimates: true,
						cacheEnabled: false,
						deduplicate: false,
						sparse: false,
						unique: false
					})
				}
			})
	}
}

module.exports = results
