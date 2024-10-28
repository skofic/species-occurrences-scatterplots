'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * CountTypeParameter.js
 *
 * Model for count or weight value.
 */
module.exports = joi
	.string()
	.valid(...K.constants.countType)
	.required()
	.default('weight')
	.description(dd`
**Return weight or count in results**.

This parameter is relevant if the *count* parameter was selected.

If this parameter is \`weight\`, the returned value in *count* will be the *weight*, \
if the parameter is \`count\`, the returned value will be the *record count*.

The *record count* is the number of original records represented by the pair \
values combination.

The *weight* is a number ranging from zero to 1 that represents the weight of \
this record count as a percentage: this can be used to create heat maps, for example.
	`)
