'use strict'

///
// Includes.
///
const { context } = require('@arangodb/locals')

///
// Deploy paths.
///
context.use('/info', require('./routes/info'), 'info')
context.use('/data', require('./routes/data'), 'data')
