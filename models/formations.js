const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    activePositions: Joi.array().required(),
} );

module.exports = { schema };
