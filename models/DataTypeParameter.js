'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * DataTypeParameter.js
 *
 * Model for collection type key.
 */
module.exports = joi
	.string()
	.valid(...K.types.list)
	.required()
	.description(dd`
**Data type**.

The Data type indicates the resolution of the data, valid options are:

- \`full\`: Full resolution data.
- \`round\`: Rounded data.
	`)
