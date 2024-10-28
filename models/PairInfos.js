'use strict'

const joi = require('joi')
const dd = require('dedent')

/**
 * PairInfos.js
 *
 * Model for list of pairs information records.
 */
module.exports = joi
	.object()
	.required()
	.description(dd`
Dictionary of pairs information records:
The keys are the pair keys, and the value is as follows:

- \`KEY\`: The property name is the pair key value.
  - \`X\`: Information on the X-axis:
    - \`term\`: Variable used for the X-axis.
    - \`label\`: Label of the X-axis variable.
    - \`description\`: Description of the X-axis variable.
    - \`unit\`: Unit of the X-axis variable value.
  - \`Y\`: Information on the Y-axis:
    - \`term\`: Variable used for the Y-axis.
    - \`label\`: Label of the Y-axis variable.
    - \`description\`: Description of the Y-axis variable.
    - \`unit\`: Unit of the Y-axis variable value.
  - \`collections\`: Dictionary of pair collection information records.
    - \`KEY\`: The property name is the collection name.
      - \`name\`: The collection name.
      - \`domain\`: The collection domain.
      - \`type\`: The collection type.
      - \`stats\`: Statistics on the collection.
        - \`items\`: Information on the collection element count.
          - \`records\`: The number of records in the collection.
          - \`maxWeight\`: *The maximum number of original elements in a record*.
        - \`X\`: X-axis statistics.
          - \`term\`: The variable used for the X-axis.
          - \`count\`: The number of unique values for the X-axis.
          - \`stats\`: The statistics of the X-axis values.
            - \`min\`: Minimum value of the X-axis.
            - \`avg\`: Average value of the X-axis.
            - \`max\`: Maximum value of the X-axis.
        - \`Y\`: Y-axis statistics.
          - \`term\`: The variable used for the Y-axis.
          - \`count\`: The number of unique values for the Y-axis.
          - \`stats\`: The statistics of the Y-axis values.
            - \`min\`: Minimum value of the Y-axis.
            - \`avg\`: Average value of the Y-axis.
            - \`max\`: Maximum value of the Y-axis.

The \`maxWeight\` property in the \`items\` section of the collection \
refers to the largest number of original records referenced by a value pair. \
This is useful because each record of the collection contains a *count* \
value that divided by \`maxElements\` gives a number ranging from 0 to 1: \
this number represents a weight that can be used to create heatmaps.
	`)
