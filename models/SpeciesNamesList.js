'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * SpeciesNamesList.js
 *
 * Model for list of species names, it is an array of strings.
 */
module.exports = joi
	.array()
	.items(joi.string())
	.required()
	.description(dd`
List of species names.

The list of species to be selected by the query.
	`)
