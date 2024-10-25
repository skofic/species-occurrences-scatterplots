'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * CollectionPairKeyParameter.js
 *
 * Model for pair key.
 */
module.exports = joi
	.string()
	.valid(...K.pairs.list, 'all')
	.default('all')
	.required()
	.description(dd`
		Pair key.
		The pair key corresponds to the property name in the globals pair \
		section that contains the information regarding the indicator pairs. \
		Valid values are:
		- \`tas_pr\`: X: Mean daily air temperature, Y: Monthly precipitation amount.
		- \`bio01_bio12\`: X: Mean annual air temperature, Y: Annual precipitation amount.
		- \`tas_bio12\`: X: Mean daily air temperature, Y: Annual precipitation amount.
		- \`bio06_vpd\`: X: Mean daily minimum air temperature of coldest month, Y: Mean monthly vapor pressure deficit.
		- \`bio14_bio15\`: X: Mean daily maximum air temperature of warmest month, Y: Mean monthly vapor pressure deficit.
		- \`all\`: All pairs.
	`)
