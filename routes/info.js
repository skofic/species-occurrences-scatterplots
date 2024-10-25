'use strict'

const joi = require('joi')
const dd = require('dedent')
const httpError = require('http-errors')
const status = require('statuses')
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
const ModelCollectionNames = require('../models/CollectionNamesList')
const ModelPairParameter = require('../models/CollectionPairKeyParameter')
const ModelTypeParameter = require('../models/CollectionTypeParameter')
const ModelDomainParameter = require('../models/CollectionDomainParameter')

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
 * Return collection names.
 */
router
	.get(
		function (request, response) {
			response.send(getPairCollectionNames(request, response))
		},
		'list'
	)
	.summary('Get pair collection names')
	.description(dd`
		Get list of collection names according to provided pair key, domain and type.
	`)
	
	.queryParam('pair', ModelPairParameter)
	.queryParam('type', ModelTypeParameter)
	.queryParam('domain', ModelDomainParameter)
	
	.response(ModelCollectionNames)

/**
 * FUNCTIONS
 */

/**
 * Return list of pair collection names.
 */
function getPairCollectionNames(theRequest, theResponse)
{
	return helpers.getPairCollectionNames(
		theRequest.queryParams.pair,
		theRequest.queryParams.domain,
		theRequest.queryParams.type
	)                                                                   // ==>
	
} // getPairCollectionNames()
