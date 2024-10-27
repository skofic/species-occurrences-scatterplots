'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * StartParameter.js
 *
 * Model for first record of page.
 */
module.exports = joi
	.number()
	.integer()
	.required()
	.default(0)
	.description(dd`
**Page start**.

This parameter indicates from which record you want to receive data.

The default value is 0, which indicates the first record.

If you want to receive data from the second record, you should set \
the value to 1. When scanning the data, you should add to this value \
the requested number of records, until the service returns an empty array.
	`)
