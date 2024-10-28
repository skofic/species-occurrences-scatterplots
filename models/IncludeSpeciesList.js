'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * IncludeSpeciesList.js
 *
 * Model for including species in result.
 */
module.exports = joi
	.boolean()
	.required()
	.default(true)
	.description(dd`
**Include species in results**.

This parameter can be used to request the species list in the response.

To include the species in the results, pass *true* in the parameter.
	`)
