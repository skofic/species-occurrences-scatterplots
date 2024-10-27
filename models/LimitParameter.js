'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * LimitParameter.js
 *
 * Model for number of records per page.
 */
module.exports = joi
	.number()
	.integer()
	.required()
	.description(dd`
**Page records**.

This parameter indicates the number of records to be returned.

When scanning the data, you should set this parameter to the number \
of records you want to receive for each call to the service, and add \
the value to the *start* parameter value, until the service returns an \
empty array.
	`)
