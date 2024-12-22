'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * UnitsData.js
 *
 * Model for species data.
 */

// Schema for the object format
const objectSchema = joi.object({
	count: joi.number().optional(),
	gcu_id_number_list: joi.array().items(joi.string()).optional(),
	// Using joi.number() for any two additional numeric properties
}).pattern(joi.string(), joi.number()).length(4);

// Schema for the array format
const arraySchema = joi.array().items(
	joi.number().required()
).length(4);

// Main schema allowing either an array of objects or an array of arrays
module.exports = joi
	.alternatives()
	.try(
		joi.array().items(objectSchema),
		joi.array().items(arraySchema)
	)
	.required()
	.description(dd`
Unit data.
This is the structure of the scatter-plot data of the units layer, the \
top layer above the species layer. The structure is as follows:

- \`count\`: The number of grid elements that feature the current pair of values.
- \`gcu_id_number_list\`: The list of unit numbers featured by the current pair of values.
- \`[X]\`: The value of the X-axis indicator, the property name will be the variable name.
- \`[Y]\`: The value of the Y-axis indicator, the property name will be the variable name.

If the requested format is \`array\`, the data will be returned as an array of arrays.
	`)
