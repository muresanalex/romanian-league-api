process.env.NODE_ENV = "test";

const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const server = require( "../index" );
const db = require( "../dataBases" ).db;

const should = chai.should(); // eslint-disable-line

chai.use( chaiHttp );

describe( "Leagues", () => {
    beforeEach( ( done ) => {
        db.leagues.remove( {}, { multi: true }, ( err, numRemoved ) => { // eslint-disable-line
            done();
        } );
    } );

    describe( "/GET leagues", () => {
        it( "it should GET all leagues", ( done ) => {
            chai.request( server )
                .get( "/api/leagues" )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.leagues.length.should.be.eql( 0 );
                    done();
                } );
        } );
    } );

    describe( "/POST league", () => {
        it( "it should not post a league without name", ( done ) => {
            const league = {
                country: "Romania",
            };
            chai.request( server )
                .post( "/api/leagues" )
                .send( league )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "error" );
                    res.body.error.should.have.property( "name" );
                    done();
                } );
        } );

        it( "it should not post a league without country", ( done ) => {
            const league = {
                name: "Liga I",
            };
            chai.request( server )
                .post( "/api/leagues" )
                .send( league )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "error" );
                    done();
                } );
        } );

        it( "it should post a league", ( done ) => {
            const league = {
                name: "Liga I",
                countryId: "asdf1",
            };
            chai.request( server )
                .post( "/api/leagues" )
                .send( league )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "countryId" );
                    res.body.payload.should.have.property( "_id" );
                    done();
                } );
        } );
    } );
    describe( "/GET/:id league", () => {
        it( "should GET a league by the given id", ( done ) => {
            const league = {
                name: "Liga 1",
                countryId: "asdf1",
            };
            let leagueId;

            chai.request( server )
                .post( "/api/leagues" )
                .send( league )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "countryId" );
                    res.body.payload.should.have.property( "_id" );
                    leagueId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .get( `/api/leagues/${ leagueId }` )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.leagues[ 0 ].should.have.property( "name" ).eql( "Liga 1" );
                    res.body.leagues[ 0 ].should.have.property( "countryId" ).eql( "asdf1" );
                    res.body.leagues[ 0 ].should.have.property( "_id" ).eql( leagueId );
                    done();
                } );
        } );
    } );
    describe( "/PUT/:id league", () => {
        it( "it should UPDATE a league given the id", ( done ) => {
            const league = {
                name: "Liga 1",
                countryId: "asdf1",
            };
            let leagueId;

            chai.request( server )
                .post( "/api/leagues" )
                .send( league )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "countryId" );
                    res.body.payload.should.have.property( "_id" );
                    leagueId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .put( `/api/leagues/${ leagueId }` )
                .send( {
                    name: "Liga I Betano",
                    countryId: "asdf1",
                } )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
    describe( "/DELETE/:id league", () => {
        it( "it should DELETE a league given the id", ( done ) => {
            const league = {
                name: "Liga 1",
                countryId: "asdf1",
            };
            let leagueId;

            chai.request( server )
                .post( "/api/leagues" )
                .send( league )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "countryId" );
                    res.body.payload.should.have.property( "_id" );
                    leagueId = res.body.payload._id; // eslint-disable-line
                    done();
                } );

            chai.request( server )
                .delete( `/api/leagues/${ leagueId }` )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
} );
