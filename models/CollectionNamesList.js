'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * CollectionNamesList.js
 *
 * Model for list of collection names, it is an array of strings.
 */
module.exports = joi
	.array()
	.items(joi.string())
	.required()
	.description(dd`
		List of collection names.
	`)
