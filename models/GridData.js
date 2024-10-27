'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * GridData.js
 *
 * Model for grid data.
 */
module.exports = joi
	.array()
	.items(joi.object({
		count: joi.number().integer().required()
	}).pattern(
		joi.string().regex(/^(?!count$)/), // Any key except 'count'
		joi.number() // The value for these keys must be a number
	).min(2).max(3) // Ensure two or three properties
	)
	.required()
	.description(dd`
Grid data.
This is the structure of the scatter-plot data of the base layer, the grid layer. \
The structure is as follows:

- \`count\`: The number of grid elements that feature the current pair of values.
- \`[X]\`: The value of the X-axis indicator, the property name will be the variable name.
- \`[Y]\`: The value of the Y-axis indicator, the property name will be the variable name.
	`)
