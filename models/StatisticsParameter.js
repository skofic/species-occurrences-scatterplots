'use strict'

const joi = require('joi')
const dd = require('dedent')

const K = require("../globals.js")

/**
 * StatisticsParameter.js
 *
 * Model for statistics parameter.
 */
module.exports = joi
	.string()
	.valid(...K.domains.list, 'species', 'all')
	.default('all')
	.required()
	.description(dd`
Collection domains and used species.
The collection domain is the source of the data, valid options are:

- \`chelsa\`: Data from Chelsa.
- \`eu\`: Data from EU-Forest.
- \`eufgis\`: Data from EUFGIS.

If you want the list of species provide this option:

- \`species\`: List of species.

If you provide \`all\`, the service will return the statistics for all domains \
and the list of species.
	`)
