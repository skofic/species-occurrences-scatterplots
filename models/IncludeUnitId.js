'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * IncludeUnitId.js
 *
 * Model for including unit ID in result.
 */
module.exports = joi
	.boolean()
	.required()
	.default(true)
	.description(dd`
**Include unit ID in results**.

This parameter can be used to request the conservation unit IDs list in the response.

To include the list in the results, pass *true* in the parameter.
	`)
