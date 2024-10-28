'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * IncludeUnitNumber.js
 *
 * Model for including unit ID in result.
 */
module.exports = joi
	.boolean()
	.required()
	.default(true)
	.description(dd`
**Include unit number in results**.

This parameter can be used to request the conservation unit numbers list in the response.

To include the list in the results, pass *true* in the parameter.
	`)
