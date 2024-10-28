'use strict'

/**
 * helpers.js
 *
 * A set of helper functions.
 */

///
// Globals.
///
const {db, aql} = require('@arangodb')
const K = require("../globals.js")


/**
 * getStats
 *
 * This function will return a set of statistics according to the provided domain.
 *
 * @param theDomain {String}: Which data to return (omit to have all).
 *
 * @return {Object}: List of pair information records.
 */
function getStats(theDomain = "all")
{
	///
	// Handle species.
	///
	if(theDomain === 'species') {
		///
		// Get species list.
		///
		const record =
			db._collection('Stats')
				.document('Species')
		
		///
		// Remove ArangoDB specific info.
		///
		delete record._id
		delete record._key
		delete record._rev
		
		return record                                                   // ==>
	}
	
	///
	// Handle domain.
	///
	const domains = []
	if(theDomain === 'all') {
		domains.push(...K.domains.list, 'species')
	} else if(K.domains.list.includes(theDomain) || theDomain === 'species') {
		domains.push(theDomain)
	} else {
		throw new Error(`Requested a non existing domain key: ${theDomain}.`)
	}
	
	///
	// Iterate domains.
	///
	const result = {}
	for (const item of domains) {
		let record = {}
		let domain = ""
		
		///
		// Parse domain.
		///
		switch(item) {
			case 'chelsa':
				domain = 'Chelsa'
				record = db._collection('Stats').document(domain)
				break
			case 'eu':
				domain = 'EU-Forest'
				record = db._collection('Stats').document(domain)
				break
			case 'eufgis':
				domain = 'EUFGIS'
				record = db._collection('Stats').document(domain)
				break
			case 'species':
				domain = 'Species'
				record = db._collection('Stats').document(domain)
				break
		}
		
		///
		// Remove ArangoDB specific info.
		///
		delete record._id
		delete record._key
		delete record._rev
		
		if(item === 'species') {
			result['Species'] = record['species_list']
		} else {
			result[domain] = record
		}
	}
	
	return result                                                       // ==>
	
} // getStats()

/**
 * getPairInfos
 *
 * This function will return a list of pair information records according to the
 * provided parameters.
 *
 * @param thePair {String}: Pair key (see globals).
 * @param theDomain {String}: Which data to return (omit to have all).
 * @param theType {String}: Which resolution (omit to have all). *
 * @return {Object}: List of pair information records.
 */
function getPairInfos(thePair = "all", theDomain = "all", theType = "all")
{
	///
	// Handle pair.
	///
	const pairs = []
	if(thePair === 'all') {
		pairs.push(...K.pairs.list)
	} else if(K.pairs.list.includes(thePair)) {
		pairs.push(thePair)
	} else {
		throw new Error(`Requested a non existing pair key: ${thePair}.`)
	}
	
	///
	// Handle domain.
	///
	const domains = []
	if(theDomain === 'all') {
		domains.push(...K.domains.list)
	} else if(K.domains.list.includes(theDomain)) {
		domains.push(theDomain)
	} else {
		throw new Error(`Requested a non existing domain key: ${theDomain}.`)
	}
	
	///
	// Handle type.
	///
	const types = []
	if(theType === 'all') {
		types.push(...K.types.list)
	} else if(K.types.list.includes(theType)) {
		types.push(theType)
	} else {
		throw new Error(`Requested a non existing type key: ${theType}.`)
	}
	
	///
	// Iterate pairs.
	///
	const result = []
	for (const pair of pairs) {
		const record = {}
		
		///
		// Set pair information.
		///
		record[pair] = K.pairs[pair]
		record[pair]['collections'] = {}
		
		///
		// Iterate domains.
		///
		const collections = record[pair]['collections']
		for (const domain of domains)
		{
			///
			// Iterate types.
			///
			for (const type of types)
			{
				///
				// Set collection record.
				///
				const collection = `${pair}_${domain}_${type}`
				collections[collection] = {
					name: collection,
					domain: domain,
					type: type
				}
				
				///
				// Get collection stats.
				///
				const X = K.pairs[pair].X
				const Y = K.pairs[pair].Y
				const stats = db._collection('Stats').document(collection)
				collections[collection]['stats'] = {
					items: stats.items,
					X: {
						term: X.term,
						count: stats[X.term].count,
						stats: stats[X.term].weights
					},
					Y: {
						term: Y.term,
						count: stats[Y.term].count,
						stats: stats[Y.term].weights
					}
				}
			}
		}
		
		result.push(record)
	}
	
	return result                                                       // ==>
	
} // getPairInfos()

/**
 * getGridData
 *
 * This function will return a list of pair information records according to the
 * provided parameters.
 *
 * @param thePair {String}: Pair key.
 * @param theType {String}: Which resolution.
 * @param theStart {Number}: Records start.
 * @param theLimit {Number}: Records count.
 * @param doCount {Boolean}: Include count in results.
 * @param theCountType {String}: Weight or record count.
 * @param theFormat {String}: Result format.
 *
 * @return {Object}: Grid level records.
 */
function getGridData(
	thePair,
	theType,
	theStart,
	theLimit,
	doCount,
	theCountType,
	theFormat
) {
	///
	// Init local storage.
	///
	const params = {}
	
	///
	// Handle pair.
	///
	if(K.pairs.list.includes(thePair)) {
		params['pair'] = thePair
	} else {
		throw new Error(`Requested a non existing pair key: ${thePair}.`)
	}
	
	///
	// Handle type.
	///
	if(K.types.list.includes(theType)) {
		params['type'] = theType
	} else {
		throw new Error(`Requested a non existing type key: ${theType}.`)
	}
	
	///
	// Handle limits.
	///
	params['start'] = theStart
	params['limit'] = theLimit
	
	///
	// Get indicators and collection.
	///
	const name = `${params.pair}_chelsa_${params.type}`
	const X = K.pairs[params.pair].X.term
	const Y = K.pairs[params.pair].Y.term
	const collection = db._collection(name)
	
	///
	// Handle count.
	///
	let query = aql``
	if(doCount)
	{
		switch(theCountType)
		{
			case 'weight':
				const stats = db._collection('Stats').document(name)
				switch(theFormat)
				{
					case 'json':
						query = aql`
							FOR doc IN ${collection}
							  LIMIT ${params.start}, ${params.limit}
							RETURN {
							  count: doc.count / ${stats.items.maxWeight},
							  ${X}: doc.properties[${X}],
							  ${Y}: doc.properties[${Y}]
							}
						`
						break
					
					case 'array':
						query = aql`
							FOR doc IN ${collection}
							  LIMIT ${params.start}, ${params.limit}
							RETURN [
							  doc.count / ${stats.items.maxWeight},
							  doc.properties[${X}],
							  doc.properties[${Y}]
							]
						`
						break
				}
				break
			
			case 'count':
				switch(theFormat)
				{
					case 'json':
						query = aql`
							FOR doc IN ${collection}
							  LIMIT ${params.start}, ${params.limit}
							RETURN {
							  count: doc.count,
							  ${X}: doc.properties[${X}],
							  ${Y}: doc.properties[${Y}]
							}
						`
						break
					
					case 'array':
						query = aql`
							FOR doc IN ${collection}
							  LIMIT ${params.start}, ${params.limit}
							RETURN []
							  doc.count,
							  doc.properties[${X}],
							  doc.properties[${Y}]
							]
						`
						break
				}
				break
			
			default:
				throw new Error(`Requested a non existing count type: ${theCountType}.`)
		
		} // Handled count type.

	} else {
		switch(theFormat)
		{
			case 'json':
				query = aql`
					FOR doc IN ${collection}
					  LIMIT ${params.start}, ${params.limit}
					RETURN {
					  ${X}: doc.properties[${X}],
					  ${Y}: doc.properties[${Y}]
					}
				`
				break
			
			case 'array':
				query = aql`
					FOR doc IN ${collection}
					  LIMIT ${params.start}, ${params.limit}
					RETURN [
					  doc.properties[${X}],
					  doc.properties[${Y}]
					]
				`
				break
		}
	}
	
	return db._query(query).toArray()                                   // ==>
	
} // getGridData()

/**
 * getPairCollectionNames
 *
 * This function will return a list of pair collection names according to the
 * provided parameters.
 *
 * Note that the pairs defined in the globals.js script should exist as
 * collections, or this function should be used only to create collections.
 *
 * @param thePair {String}: Pair key (see globals).
 * @param theDomain {String}: Which data to return (omit to have all).
 * @param theType {String}: Which resolution (omit to have all).
 *
 * @return {String[]}: List of collection names.
 */
function getPairCollectionNames(thePair = "all", theDomain = "all", theType = "all")
{
	///
	// Handle pair.
	///
	const pairs = []
	if(thePair === 'all') {
		pairs.push(...K.pairs.list)
	} else if(K.pairs.list.includes(thePair)) {
		pairs.push(thePair)
	} else {
		throw new Error(`Requested a non existing pair key: ${thePair}.`)
	}
	
	///
	// Handle domain.
	///
	const domains = []
	if(theDomain === 'all') {
		domains.push(...K.domains.list)
	} else if(K.domains.list.includes(theDomain)) {
		domains.push(theDomain)
	} else {
		throw new Error(`Requested a non existing domain key: ${theDomain}.`)
	}
	
	///
	// Handle type.
	///
	const types = []
	if(theType === 'all') {
		types.push(...K.types.list)
	} else if(K.types.list.includes(theType)) {
		types.push(theType)
	} else {
		throw new Error(`Requested a non existing type key: ${theType}.`)
	}
	
	///
	// Spell names.
	///
	const result = []
	for(const pair of pairs) {
		for(const domain of domains) {
			for(const type of types) {
				result.push(`${thePair}_${domain}_${type}`)
			}
		}
	}
	
	return result                                                       // ==>
	
} // getPairCollectionNames()



module.exports = {
	getStats,
	getPairInfos,
	getGridData,
	
	getPairCollectionNames
}
