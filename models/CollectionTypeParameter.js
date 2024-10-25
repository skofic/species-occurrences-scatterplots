'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * CollectionPairKeyParameter.js
 *
 * Model for collection type key.
 */
module.exports = joi
	.string()
	.valid(...K.types.list, 'all')
	.default('all')
	.required()
	.description(dd`
		Collection type.
		The collection type indicates the resolution of the data, valid options are:
		- \`full\`: Full resolution data.
		- \`round\`: Rounded data.
		- \`all\`: All types.
	`)
