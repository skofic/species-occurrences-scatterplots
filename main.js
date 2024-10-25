'use strict'

const { context } = require('@arangodb/locals')

context.use('/info', require('./routes/info'), 'info')
