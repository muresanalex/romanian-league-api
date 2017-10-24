process.env.NODE_ENV = "test";

const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const server = require( "../index" );
const db = require( "../dataBases" ).db;

const should = chai.should(); // eslint-disable-line

const defaultPlayer = {
    name: "New Player",
    country: "Romania",
    dateOfBirth: new Date( "05/18/1992" ),
    height: 187,
    weight: 79,
    teamId: 1,
    position: "GK",
    jerseyNumber: 18,
    preferredFoot: "right",
    internationalReputation: 1,
    weakFoot: 2,
    skillMoves: 1,
    crossing: 50,
    finishing: 50,
    headingAccuracy: 50,
    shortPassing: 50,
    volleys: 50,
    dribbling: 50,
    curve: 50,
    freeKickAccuracy: 50,
    longPassing: 50,
    ballControl: 50,
    acceleration: 50,
    sprintSpeed: 50,
    agility: 50,
    reactions: 50,
    balance: 50,
    shotPower: 50,
    jumping: 50,
    stamina: 50,
    strength: 50,
    longShots: 50,
    aggression: 50,
    interceptions: 50,
    positioning: 50,
    vision: 50,
    penalties: 50,
    composure: 50,
    marking: 50,
    standingTackle: 50,
    slidingTackle: 50,
    gkDiving: 50,
    gkHandling: 50,
    gkKicking: 50,
    gkPositioning: 50,
    gkReflexes: 50,
};

chai.use( chaiHttp );

describe( "Players", () => {
    beforeEach( ( done ) => {
        db.players.remove( {}, { multi: true }, ( err, numRemoved ) => { // eslint-disable-line
            done();
        } );
    } );

    describe( "/GET players", () => {
        it( "it should GET all players", ( done ) => {
            chai.request( server )
                .get( "/api/players" )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.players.length.should.be.eql( 0 );
                    done();
                } );
        } );
    } );

    describe( "/POST player", () => {
        it( "it should not post a player without name", ( done ) => {
            const player = {
                country: "Romania",
                dateOfBirth: new Date( "05/18/1992" ),
                height: 187,
                weight: 79,
                teamId: 1,
                position: "GK",
                jerseyNumber: 18,
                preferredFoot: "right",
                internationalReputation: 1,
                weakFoot: 2,
                skillMoves: 1,
                crossing: 50,
                finishing: 50,
                headingAccuracy: 50,
                shortPassing: 50,
                volleys: 50,
                dribbling: 50,
                curve: 50,
                freeKickAccuracy: 50,
                longPassing: 50,
                ballControl: 50,
                acceleration: 50,
                sprintSpeed: 50,
                agility: 50,
                reactions: 50,
                balance: 50,
                shotPower: 50,
                jumping: 50,
                stamina: 50,
                strength: 50,
                longShots: 50,
                aggression: 50,
                interceptions: 50,
                positioning: 50,
                vision: 50,
                penalties: 50,
                composure: 50,
                marking: 50,
                standingTackle: 50,
                slidingTackle: 50,
                gkDiving: 50,
                gkHandling: 50,
                gkKicking: 50,
                gkPositioning: 50,
                gkReflexes: 50,
            };
            chai.request( server )
                .post( "/api/players" )
                .send( player )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "error" );
                    res.body.error.should.have.property( "name" );
                    done();
                } );
        } );

        it( "it should post a player", ( done ) => {
            chai.request( server )
                .post( "/api/players" )
                .send( defaultPlayer )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "dateOfBirth" );
                    res.body.payload.should.have.property( "height" );
                    res.body.payload.should.have.property( "weight" );
                    res.body.payload.should.have.property( "teamId" );
                    res.body.payload.should.have.property( "position" );
                    res.body.payload.should.have.property( "jerseyNumber" );
                    res.body.payload.should.have.property( "preferredFoot" );
                    res.body.payload.should.have.property( "_id" );
                    done();
                } );
        } );
    } );

    describe( "/GET/:id player", () => {
        it( "should GET a player by the given id", ( done ) => {
            let playerId;

            chai.request( server )
                .post( "/api/players" )
                .send( defaultPlayer )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "dateOfBirth" );
                    res.body.payload.should.have.property( "height" );
                    res.body.payload.should.have.property( "weight" );
                    res.body.payload.should.have.property( "teamId" );
                    res.body.payload.should.have.property( "position" );
                    res.body.payload.should.have.property( "jerseyNumber" );
                    res.body.payload.should.have.property( "preferredFoot" );
                    res.body.payload.should.have.property( "_id" );
                    playerId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .get( `/api/players/${ playerId }` )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.players[ 0 ].should.have.property( "name" ).eql( "New Player" );
                    res.body.players[ 0 ].should.have.property( "country" ).eql( "Romania" );
                    res.body.players[ 0 ].should.have.property( "dateOfBirth" ).eql( "18-5-1992" );
                    res.body.players[ 0 ].should.have.property( "height" ).eql( 187 );
                    res.body.players[ 0 ].should.have.property( "weight" ).eql( 79 );
                    res.body.players[ 0 ].should.have.property( "teamId" ).eql( 1 );
                    res.body.players[ 0 ].should.have.property( "position" ).eql( "GK" );
                    res.body.players[ 0 ].should.have.property( "jerseyNumber" ).eql( 18 );
                    res.body.players[ 0 ].should.have.property( "preferredFoot" ).eql( "right" );
                    res.body.players[ 0 ].should.have.property( "_id" ).eql( playerId );
                    done();
                } );
        } );
    } );
    describe( "/PUT/:id player", () => {
        it( "it should UPDATE a player given the id", ( done ) => {
            let playerId;

            chai.request( server )
                .post( "/api/players" )
                .send( defaultPlayer )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "dateOfBirth" );
                    res.body.payload.should.have.property( "height" );
                    res.body.payload.should.have.property( "weight" );
                    res.body.payload.should.have.property( "teamId" );
                    res.body.payload.should.have.property( "position" );
                    res.body.payload.should.have.property( "jerseyNumber" );
                    res.body.payload.should.have.property( "preferredFoot" );
                    res.body.payload.should.have.property( "_id" );
                    playerId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .put( `/api/players/${ playerId }` )
                .send( {
                    name: "Alex Muresan",
                    country: "Romania",
                    dateOfBirth: new Date( "05/18/1992" ),
                    height: 187,
                    weight: 79,
                    teamId: 1,
                    position: "GK",
                    jerseyNumber: 18,
                    preferredFoot: "right",
                    internationalReputation: 1,
                    weakFoot: 2,
                    skillMoves: 1,
                    crossing: 50,
                    finishing: 50,
                    headingAccuracy: 50,
                    shortPassing: 50,
                    volleys: 50,
                    dribbling: 50,
                    curve: 50,
                    freeKickAccuracy: 50,
                    longPassing: 50,
                    ballControl: 50,
                    acceleration: 50,
                    sprintSpeed: 50,
                    agility: 50,
                    reactions: 50,
                    balance: 50,
                    shotPower: 50,
                    jumping: 50,
                    stamina: 50,
                    strength: 50,
                    longShots: 50,
                    aggression: 50,
                    interceptions: 50,
                    positioning: 50,
                    vision: 50,
                    penalties: 50,
                    composure: 50,
                    marking: 50,
                    standingTackle: 50,
                    slidingTackle: 50,
                    gkDiving: 50,
                    gkHandling: 50,
                    gkKicking: 50,
                    gkPositioning: 50,
                    gkReflexes: 50,
                } )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
    describe( "/DELETE/:id player", () => {
        it( "it should DELETE a player given the id", ( done ) => {
            let playerId;

            chai.request( server )
                .post( "/api/players" )
                .send( defaultPlayer )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "dateOfBirth" );
                    res.body.payload.should.have.property( "height" );
                    res.body.payload.should.have.property( "weight" );
                    res.body.payload.should.have.property( "teamId" );
                    res.body.payload.should.have.property( "position" );
                    res.body.payload.should.have.property( "jerseyNumber" );
                    res.body.payload.should.have.property( "preferredFoot" );
                    playerId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .delete( `/api/players/${ playerId }` )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
} );
