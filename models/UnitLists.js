'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * UnitLists.js
 *
 * Model for list of unit IDs and unit numbers.
 */
module.exports = joi
	.object({
		'gcu_id_unit-id_list':
			joi.array()
				.items(joi.string())
				.optional(),
		gcu_id_number_list:
			joi.array()
				.items(joi.string())
				.optional()
	})
	.required()
	.description(dd`
List of units.

Use this parameter to provide the required selection of units to the query. \
The parameter is an object containing the following properties:

- \`gcu_id_unit-id_list\`: List of unit IDs.
- \`gcu_id_number_list\`: List of unit numbers.

To ignore one of the two properties either omit it or set it to \
an empty array.
	`)
