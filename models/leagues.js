const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    country: Joi.string().required(),
} );

module.exports = { schema };
