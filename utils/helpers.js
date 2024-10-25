'use strict'

/**
 * helpers.js
 *
 * A set of helper functions.
 */

///
// Globals.
///
const K = require("../globals.js")


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
	// Normalise domain.
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
	// Normalise type.
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
	getPairCollectionNames
}
