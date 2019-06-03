const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    countryId: Joi.string().required(),
    leagueId: Joi.string().required(),
    captainId: Joi.string().optional(),
    shortFKId: Joi.string().optional(),
    longFKId: Joi.string().optional(),
    leftCornerId: Joi.string().optional(),
    rightCornerId: Joi.string().optional(),
    penaltiesId: Joi.string().optional(),
    rivalTeamId: Joi.string().required(),
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
