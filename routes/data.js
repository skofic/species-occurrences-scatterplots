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
const ModelSpeciesParameter = require('../models/IncludeSpeciesList')
const ModelSpeciesList = require('../models/SpeciesNamesList')
const ModelUnitIdParameter = require('../models/IncludeUnitId')
const ModelUnitNumberParameter = require('../models/IncludeUnitNumber')
const ModelUnitIdentifiersList = require('../models/UnitLists')
const ModelResultFormat = require('../models/ResultFormatParameter')
const ModelSpeciesData = require('../models/SpeciesData')
const ModelUnitsData = require('../models/UnitsData')
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
 * Grid data.
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
 * Species data.
 */
router
	.post(
		'/species',
		function (request, response) {
			response.send(getSpecies(request, response))
		},
		'species'
	)
	.summary('Get species data')
	.description(dd`
**Get species pair data**.

Species data represents the species observed in locations where the climate \
matches the pair of indicators. This layer is above the grid layer and shows \
the species occurring in the region of interest.

Provide the pair key, to select the pair of indicators, and the type, \
to select either the full resolution or rounded data for the grid. \
There are a set of flags that determine what data is returned and in \
what format. Provide the start and limit parameters to select the \
records range.
	`)
	
	.queryParam('pair', ModelPairParameter)
	.queryParam('type', ModelTypeParameter)
	.queryParam('count', ModelCountParameter)
	.queryParam('species', ModelSpeciesParameter)
	.queryParam('weight', ModelUseWeightOrCount)
	.queryParam('format', ModelResultFormat)
	.queryParam('start', ModelStartParameter)
	.queryParam('limit', ModelLimitParameter)
	
	.body(ModelSpeciesList)
	
	.response(ModelSpeciesData)

/**
 * Units data.
 */
router
	.post(
		'/units',
		function (request, response) {
			response.send(getUnits(request, response))
		},
		'units'
	)
	.summary('Get units data')
	.description(dd`
**Get unit pair data**.

Units data represents the conservation units where the climate matches the \
pair of indicators. This layer is above the species layer and shows the \
distribution of conservation units in the region of interest.

Provide the pair key, to select the pair of indicators, and the type, \
to select either the full resolution or rounded data for the grid. \
There are a set of flags that determine what data is returned and in \
what format. Provide the start and limit parameters to select the \
records range.
	`)
	
	.queryParam('pair', ModelPairParameter)
	.queryParam('type', ModelTypeParameter)
	.queryParam('count', ModelCountParameter)
	.queryParam('id', ModelUnitIdParameter)
	.queryParam('number', ModelUnitNumberParameter)
	.queryParam('weight', ModelUseWeightOrCount)
	.queryParam('format', ModelResultFormat)
	.queryParam('start', ModelStartParameter)
	.queryParam('limit', ModelLimitParameter)
	
	.body(ModelUnitIdentifiersList)
	
	.response(ModelUnitsData)

/**
 * FUNCTIONS
 */

/**
 * Return grid data.
 */
function getGrid(theRequest, theResponse)
{
	return helpers.getGridData(
		theRequest.queryParams.pair,
		theRequest.queryParams.type,
		theRequest.queryParams.count,
		theRequest.queryParams.weight,
		theRequest.queryParams.format,
		theRequest.queryParams.start,
		theRequest.queryParams.limit
	)                                                                   // ==>
	
} // getGrid()

/**
 * Return species data.
 */
function getSpecies(theRequest, theResponse)
{
	return helpers.getSpeciesData(
		theRequest.queryParams.pair,
		theRequest.queryParams.type,
		theRequest.body,
		theRequest.queryParams.count,
		theRequest.queryParams.species,
		theRequest.queryParams.weight,
		theRequest.queryParams.format,
		theRequest.queryParams.start,
		theRequest.queryParams.limit
	)                                                                   // ==>
	
} // getSpecies()

/**
 * Return unit data.
 */
function getUnits(theRequest, theResponse)
{
	return helpers.getUnitsData(
		theRequest.queryParams.pair,
		theRequest.queryParams.type,
		theRequest.body,
		theRequest.queryParams.count,
		theRequest.queryParams.id,
		theRequest.queryParams.number,
		theRequest.queryParams.weight,
		theRequest.queryParams.format,
		theRequest.queryParams.start,
		theRequest.queryParams.limit
	)                                                                   // ==>
	
} // getUnits()
