'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * IncludeWeightParameter.js
 *
 * Model for including element weight.
 */
module.exports = joi
	.boolean()
	.required()
	.default(true)
	.description(dd`
**Include weight in results**.

This parameter can be used to request the *count* field in the response.

The count field indicates the number of original values represented in the \
current pair values combination. For instance, for *Chelsa* this would mean \
the number of Chelsa grid elements that have the indicators pair values of the \
current record; for *EUFGIS* it would mean the number of conservation units \
that have the indicators pair values of the current record.

The value is expressed as an interval from zero to 1.

To include the count in the results, pass *true* in the parameter.
	`)
