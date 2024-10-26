'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * Statistics.js
 *
 * Model for list of domain statistics.
 */
module.exports = joi
	.alternatives()
	.try(
		joi.object(),
		joi.array().items(joi.string())
	)
	.required()
	.description(dd`
Indicator domain statistics.
The result is a dictionary whose key is the domain name: *Chelsa* for Chelsa data, \
*EU-Forest* for EU-Forest data, and *EUFGIS* for EUFGIS data. The value is a dictionary \
whose keys are the selected indicators and the value are their statistics.

If you provided the \`species\` key you will get \`species_list\` containing an \
array with the list of species.
	`)
