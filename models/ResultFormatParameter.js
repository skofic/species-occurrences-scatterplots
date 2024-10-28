'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * ResultFormatParameter.js
 *
 * Model for count or weight value.
 */
module.exports = joi
	.string()
	.valid(...K.constants.resultFormats)
	.required()
	.default('json')
	.description(dd`
**Select result format**.

This parameter can be used to select the format of the result:

- \`json\`: JSON format. Each record is a JSON structure.
- \`array\`: Each record is an array of values.
	`)
