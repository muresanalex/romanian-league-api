const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    countryId: Joi.string().required(),
    leagueId: Joi.string().required(),
    captainId: Joi.string()
        .allow( "" )
        .optional(),
    shortFKId: Joi.string()
        .allow( "" )
        .optional(),
    longFKId: Joi.string()
        .allow( "" )
        .optional(),
    leftCornerId: Joi.string()
        .allow( "" )
        .optional(),
    rightCornerId: Joi.string()
        .allow( "" )
        .optional(),
    penaltiesId: Joi.string()
        .allow( "" )
        .optional(),
    rivalTeamId: Joi.string()
        .allow( "" )
        .optional(),
    stadium: Joi.string(),
    coach: Joi.string(),
    firstColor: Joi.string(),
    secondColor: Joi.string(),
    image: Joi.string()
        .allow( "" )
        .optional(),
    formation: Joi.string(),
    firstEleven: Joi.object(),
} );

module.exports = { schema };
