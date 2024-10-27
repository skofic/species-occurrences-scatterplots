'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * IncludeCountParameter.js
 *
 * Model for number of records per page.
 */
module.exports = joi
	.boolean()
	.required()
	.default(true)
	.description(dd`
**Include count in results**.

This parameter can be used to request or ignore the *count* field in \
the response.
	`)
