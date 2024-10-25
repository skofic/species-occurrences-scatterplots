'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * CollectionPairKeyParameter.js
 *
 * Model for collection domain key.
 */
module.exports = joi
	.string()
	.valid(...K.domains.list, 'all')
	.default('all')
	.required()
	.description(dd`
		Collection domain.
		The collection domain is the source of the data, valid options are:
		- \`chelsa\`: Data from Chelsa.
		- \`eu\`: Data from EU-Forest.
		- \`eufgis\`: Data from EUFGIS.
		- \`all\`: All domains.
	`)
