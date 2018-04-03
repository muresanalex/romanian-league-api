const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    image: Joi.string().allow( "" ).optional(),
} );

module.exports = { schema };
