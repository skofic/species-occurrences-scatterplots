'use strict';
const { context } = require('@arangodb/locals');

context.use('/prova', require('./routes/prova'), 'prova');
