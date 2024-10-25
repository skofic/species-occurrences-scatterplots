'use strict'

///
// Includes.
///
const { context } = require('@arangodb/locals')

///
// Deploy paths.
///
context.use('/info', require('./routes/info'), 'info')
