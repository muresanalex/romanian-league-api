process.env.NODE_ENV = "test";

const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const server = require( "../index" );
const db = require( "../dataBases" ).db;

const should = chai.should(); // eslint-disable-line

chai.use( chaiHttp );

describe( "Teams", () => {
    beforeEach( ( done ) => {
        db.teams.remove( {}, { multi: true }, ( err, numRemoved ) => { // eslint-disable-line
            done();
        } );
    } );

    describe( "/GET teams", () => {
        it( "it should GET all teams", ( done ) => {
            chai.request( server )
                .get( "/api/teams" )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.teams.length.should.be.eql( 0 );
                    done();
                } );
        } );
    } );

    describe( "/POST team", () => {
        it( "it should not post a team without name", ( done ) => {
            const team = {
                country: "Romania",
                stadium: "Stefan cel Mare",
            };
            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "error" );
                    res.body.error.should.have.property( "name" );
                    done();
                } );
        } );

        it( "it should not post a team without country", ( done ) => {
            const team = {
                name: "Dinamo",
                stadium: "Stefan cel Mare",
            };
            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "error" );
                    done();
                } );
        } );

        it( "it should post a team", ( done ) => {
            const team = {
                name: "Dinamo",
                country: "Romania",
                stadium: "Stefan cel Mare",
            };
            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "stadium" );
                    res.body.payload.should.have.property( "_id" );
                    done();
                } );
        } );

        it( "it should post a team without a stadium", ( done ) => {
            const team = {
                name: "Dinamo",
                country: "Romania",
            };
            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "_id" );
                    done();
                } );
        } );
    } );
    describe( "/GET/:id team", () => {
        it( "should GET a team by the given id", ( done ) => {
            const team = {
                name: "Dinamo",
                country: "Romania",
                stadium: "Stefan cel Mare",
            };
            let teamId;

            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "stadium" );
                    res.body.payload.should.have.property( "_id" );
                    teamId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .get( `/api/teams/${ teamId }` )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.teams[ 0 ].should.have.property( "name" ).eql( "Liga 1" );
                    res.body.teams[ 0 ].should.have.property( "country" ).eql( "Romania" );
                    res.body.teams[ 0 ].should.have.property( "stadium" ).eql( "Stefan cel Mare" );
                    res.body.teams[ 0 ].should.have.property( "_id" ).eql( teamId );
                    done();
                } );
        } );
    } );
    describe( "/PUT/:id team", () => {
        it( "it should UPDATE a team given the id", ( done ) => {
            const team = {
                name: "Dinamo",
                country: "Romania",
                stadium: "Stefan cel Mare",
            };
            let teamId;

            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "stadium" );
                    res.body.payload.should.have.property( "_id" );
                    teamId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .put( `/api/teams/${ teamId }` )
                .send( {
                    name: "Dinamo Bucuresti",
                    country: "Romania",
                    stadium: "Stefan cel Mare",
                } )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
    describe( "/DELETE/:id team", () => {
        it( "it should DELETE a team given the id", ( done ) => {
            const team = {
                name: "Dinamo",
                country: "Romania",
                stadium: "Stefan cel Mare",
            };
            let teamId;

            chai.request( server )
                .post( "/api/teams" )
                .send( team )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "country" );
                    res.body.payload.should.have.property( "stadium" );
                    res.body.payload.should.have.property( "_id" );
                    teamId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .delete( `/api/teams/${ teamId }` )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
} );
