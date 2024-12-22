'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * DataResolutionParameter.js
 *
 * Model for collection type key.
 */
module.exports = joi
	.string()
	.valid(...K.types.list)
	.required()
	.description(dd`
**Data resolution**.

This parameter indicates the resolution of the data, valid options are:

- \`full\`: Full resolution data.
- \`med\`: Medium resolution data.
- \`low\`: Low resolution data.
	`)
