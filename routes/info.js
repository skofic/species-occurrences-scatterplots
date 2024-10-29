'use strict'

const joi = require('joi')
const dd = require('dedent')
const status = require('statuses')
const {db, aql} = require('@arangodb')
const httpError = require('http-errors')
const { errors } = require('@arangodb')
const { context } = require('@arangodb/locals')
const createRouter = require('@arangodb/foxx/router')

///
// ArangoDB includes.
///
const ARANGO_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code
const ARANGO_DUPLICATE = errors.ERROR_ARANGO_UNIQUE_CONSTRAINT_VIOLATED.code
const ARANGO_CONFLICT = errors.ERROR_ARANGO_CONFLICT.code
const HTTP_NOT_FOUND = status('not found')
const HTTP_CONFLICT = status('conflict')

///
// Models.
///
const ModelPairParameter = require('../models/CollectionPairParameter')
const ModelTypeParameter = require('../models/CollectionTypeParameter')
const ModelDomainParameter = require('../models/CollectionDomainParameter')
const ModelStatisticsParameter = require('../models/StatisticsParameter')
const ModelsPairsInfos = require('../models/PairInfos')
const ModelStatistics = require('../models/Statistics')

///
// Global includes.
///
const K = require("../globals.js")

///
// Helpers.
///
const helpers = require("../utils/helpers.js")

///
// Create router.
///
const router = createRouter()
module.exports = router
router.tag('info')


/**
 * ROUTES
 */

/**
 * Return statistics.
 */
router
	.get(
		'/stats',
		function (request, response) {
			response.send(getStats(request, response))
		},
		'stats'
	)
	.summary('Get statistics')
	.description(dd`
Get statistics on indicator values and domains.

This service will return one record per domain, Chelsa, EU-Forest and EUFGIS, \
or the list of species represented in thew species layer data.

The domain data is a property named after the domain that contains an object \
featuring one property for each featured indicator. This object contains the \
minimum, average and maximum value for that indicator.

The species information is a property named *Species* containing an array of \
species names.

*The indicator names follow standards defined in the \
[EUFGIS data dictionary](https://github.com/skofic/data-dictionary-service).*
	`)
	
	.queryParam('domain', ModelStatisticsParameter)
	
	.response(ModelStatistics)

/**
 * Return pairs infos.
 */
router
	.get(
		'/pairs',
		function (request, response) {
			response.send(getPairInfos(request, response))
		},
		'pairs'
	)
	.summary('Get pair information')
	.description(dd`
Get pair information according to provided pair key, domain and type.

Use this service to get information and statistics on the indicator pairs \
featured by the database.
	`)
	
	.queryParam('pair', ModelPairParameter)
	.queryParam('type', ModelTypeParameter)
	.queryParam('domain', ModelDomainParameter)
	
	.response(ModelsPairsInfos)

/**
 * FUNCTIONS
 */

/**
 * Return statistics.
 */
function getStats(theRequest, theResponse)
{
	return helpers.getStats(
		theRequest.queryParams.domain
	)                                                                   // ==>
	
} // getStats()

/**
 * Return list of pair information records.
 */
function getPairInfos(theRequest, theResponse)
{
	return helpers.getPairInfos(
		theRequest.queryParams.pair
	)                                                                   // ==>
	
} // getPairInfos()
