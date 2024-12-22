'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * UnitLists.js
 *
 * Model for list of unit IDs and unit numbers.
 */
module.exports = joi
	.array()
	.items(joi.string().required())
	.min(1)
	.required()
	.description(dd`
List of units.

Use this parameter to provide the required selection of units to the query. \
The parameter is an array containing the unit numbers to match.

This parameter is required and the array cannot be empty.
	`)
