/**
 * Created by vaio on 21.04.2016.
 */
var config = require('./../config');
var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://localhost:'+config.api_port+'/api');

describe('forum test', function(){
    it('create valid message, should return status 201', function(done){
        server
            .put('/message')
            .send({title:'sampletitle', body:'samplebody'})
            .end(function(err,res){
                res.status.should.equal(201);
                done();
            });

    });
    it('create invalid message, should return status 400', function(done){
        server
            .put('/message')
            .send({})
            .end(function(err,res){
                res.status.should.equal(400);
                done();
            });

    });
    it('get all messages, should return status 200', function(done){
        server
            .get('/messages')
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });

    });
    it('get one message, should return status 200', function(done){
        server
            .get('/message')
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });

    });
    it('delete one message, should return status 200', function(done){
        server
            .delete('/message')
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });

    });
    it('update one message without id, should return status 404', function(done){
        server
            .post('/message')
            .send({title:'sampletitle', body:'samplebody'})
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });

    });
});
