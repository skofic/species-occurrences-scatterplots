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
const ModelPairParameter = require('../models/DataPairParameter')
const ModelTypeParameter = require('../models/DataTypeParameter')
const ModelStartParameter = require('../models/StartParameter')
const ModelLimitParameter = require('../models/LimitParameter')
const ModelCountParameter = require('../models/IncludeCountParameter')
const ModelUseWeightOrCount = require('../models/CountTypeParameter')
const ModelResultFormat = require('../models/ResultFormatParameter')
const ModelGridData = require('../models/GridData')

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
router.tag('data')


/**
 * ROUTES
 */

/**
 * Chelsa data.
 */
router
	.get(
		'/grid',
		function (request, response) {
			response.send(getGrid(request, response))
		},
		'grid'
	)
	.summary('Get grid data')
	.description(dd`
**Get grid pair data**.

Grid data represents the climate combination of the two indicators, \
it is the base layer of the scatter-plot. This layer shows what is the \
climate combination for the selected pair for the region of interest.

Provide the pair key, to select the pair of indicators, and the type, \
to select either the full resolution or rounded data for the grid. \
There are a set of flags that determine what data is returned and in \
what format. Provide the start and limit parameters to select the \
records range.
	`)
	
	.queryParam('pair', ModelPairParameter)
	.queryParam('type', ModelTypeParameter)
	.queryParam('count', ModelCountParameter)
	.queryParam('weight', ModelUseWeightOrCount)
	.queryParam('format', ModelResultFormat)
	.queryParam('start', ModelStartParameter)
	.queryParam('limit', ModelLimitParameter)
	
	.response(ModelGridData)

/**
 * FUNCTIONS
 */

/**
 * Return statistics.
 */
function getGrid(theRequest, theResponse)
{
	return helpers.getGridData(
		theRequest.queryParams.pair,
		theRequest.queryParams.type,
		theRequest.queryParams.start,
		theRequest.queryParams.limit,
		theRequest.queryParams.count,
		theRequest.queryParams.weight,
		theRequest.queryParams.format
	)                                                                   // ==>
	
} // getStats()
