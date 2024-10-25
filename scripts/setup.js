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
// Results.
///
const results = {
	created: [],
	existing: [],
	indexes: []
}


///
// Handle arguments.
///
const { argv } = module.context

///
// Default collections.
///
const documentCollections = Object.keys(K.collections.default.document)
const edgeCollections = Object.keys(K.collections.default.edge)

///
// Handle document collections.
///
for (const name of documentCollections) {
	if (!db._collection(name)) {
		console.debug(`Creating document collection ${name}.`)
		db._createDocumentCollection(name)
		results.created.push(name)
	} else {
		results.existing.push(name)
		if(context.isProduction) {
			console.debug(`Document collection ${name} already exists. Leaving it untouched.`)
		}
	}
}

///
// Handle edge collections.
///
for (const name of edgeCollections) {
	if (!db._collection(name)) {
		console.debug(`Creating edge collection ${name}.`)
		db._createEdgeCollection(name)
		results.created.push(name)
	} else {
		results.existing.push(name)
		if(context.isProduction) {
			console.debug(`Edge collection ${name} already exists. Leaving it untouched.`)
		}
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
				// Create general indexes.
				///
				for (const field of K.domains[domain].types[type].indexes.fields) {
					const idx_name = `idx_${field.name}`
					if(!index_names.includes(idx_name)) {
						results.indexes.push(`${name}.${idx_name}`)
						if (context.isProduction) {
							console.debug(`Ensuring index ${idx_name} for collection ${name}.`)
						}
						collection.ensureIndex({
							name: idx_name,
							type: "persistent",
							fields: field.fields,
							estimates: true,
							cacheEnabled: false,
							deduplicate: false,
							sparse: false,
							unique: false
						})
					}
				}

				///
				// Create indicator indexes.
				///
				if(K.domains[domain].types[type].indexes.indicators)
				{
					for (const axis of ['X', 'Y']) {
						const idx_name = `idx_${K.pairs[pair][axis].term}`
						const idx_field = `properties.${K.pairs[pair][axis].term}`
						if(!index_names.includes(idx_name)) {
							results.indexes.push(`${name}.${idx_name}`)
							if (context.isProduction) {
								console.debug(`Ensuring index ${idx_name} for collection ${name}.`)
							}
							collection.ensureIndex({
								name: idx_name,
								type: "persistent",
								fields: [idx_field],
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
}

///
// Handle base collections.
///
if(argv.length > 0)
{
	///
	// Parse argument.
	///
	switch(argv[0])
	{
		case 'all':
			
			///
			// Iterate base collections.
			///
			for (const [name, indexes] of Object.entries(K.collections.base))
			{
				///
				// Create collection.
				///
				if(!db._collection(name)) {
					console.debug(`Creating base collection ${name}.`)
					db._createDocumentCollection(name)
					results.created.push(name)
				} else {
					results.existing.push(name)
					if(context.isProduction) {
						console.debug(`Base collection ${name} already exists. Leaving it untouched.`)
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
				for (const index of indexes) {
					const idx_name = index.name
					if(!index_names.includes(idx_name)) {
						collection.ensureIndex(index)
						results.indexes.push(`${name}.${idx_name}`)
						if (context.isProduction) {
							console.debug(`Ensuring index idx_${idx_name} for collection ${name}.`)
						}
					}
				}
				
				///
				// Create indicator indexes.
				///
				for (const indicator of K.indicators) {
					const idx_name = `idx_${indicator}`
					const idx_field = (name === "Chelsa")
						? `properties.\`1981-2010\`.${indicator}`
						: `properties.${indicator}`
					if(!index_names.includes(idx_name)) {
						collection.ensureIndex({
							name: idx_name,
							type: "persistent",
							fields: [idx_field],
							estimates: true,
							cacheEnabled: false,
							deduplicate: false,
							sparse: false,
							unique: false
						})
						results.indexes.push(`${name}.${idx_name}`)
						if (context.isProduction) {
							console.debug(`Ensuring index idx_${idx_name} for collection ${name}.`)
						}
					}
				}
			}
			
			///
			// Iterate work collections.
			///
			for (const [name, indexes] of Object.entries(K.collections.work))
			{
				///
				// Create collection.
				///
				if(!db._collection(name)) {
					console.debug(`Creating work collection ${name}.`)
					db._createDocumentCollection(name)
					results.created.push(name)
				} else {
					results.existing.push(name)
					if(context.isProduction) {
						console.debug(`Work collection ${name} already exists. Leaving it untouched.`)
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
				for (const index of indexes) {
					const idx_name = index.name
					if(!index_names.includes(idx_name)) {
						collection.ensureIndex(index)
						results.indexes.push(`${name}.${idx_name}`)
						if (context.isProduction) {
							console.debug(`Ensuring index idx_${idx_name} for collection ${name}.`)
						}
					}
				}
			}
			
			break
		
	} // Parsing arguments.
	
} // Provided argument.

module.exports = results
