/**
 * Created by vaio on 21.04.2016.
 */
var config = require('./../../config');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var collectionName = 'messages';

/**
 * insert {message} to db
 * @param message
 * @param callback
 */
module.exports.createMessage = function(message, callback){

    if(message && message.title && message.body){

        MongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, {}, function (err, db) {
            if(err) return callback(err);
            var collection = db.collection(collectionName);
            collection.insertOne(message,{forceServerObjectId : true},function(err,res){
                if(err) callback(err);
                else callback();
                db.close();
            });
        });
    }
    else callback('validation error');

};

/**
 * return all [messages] from db
 * @param callback
 */
module.exports.getAllMessages = function(callback){
    MongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, {}, function (err, db) {
        if(err) return callback(err);
        var collection = db.collection(collectionName);
        collection.find().project({_id:1,title:1}).toArray(function(err, docs) {
            if(err) callback(err);
            else callback(null, docs);
            db.close();
        });
    });
};

/**
 * return message.body from db
 * @param id
 * @param callback
 */
module.exports.getMessageBody = function(id, callback){
    MongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, {}, function (err, db) {
        if(err) return callback(err);
        var collection = db.collection(collectionName);
        collection.find({_id:new ObjectID(id)}).project({body:1}).limit(1).next(function(err, doc){
            if(err) callback(err);
            else callback(null, doc);
            db.close();
        });
    });
};

/**
 * delete {message} from db
 * @param id
 * @param callback
 */
module.exports.deleteMessage = function(id, callback){
    MongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, {}, function (err, db) {
        if(err) return callback(err);
        var collection = db.collection(collectionName);
        collection.deleteOne({_id:new ObjectID(id)},{},function(err, res){
            if(err) callback(err);
            else callback();
            db.close();
        });
    });
};

/**
 * update {message} in db
 * @param message
 * @param callback
 */
module.exports.updateMessage = function(message, callback){

    if(message && message._id && message.title && message.body){

        MongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, {}, function (err, db) {
            if(err) return callback(err);
            var collection = db.collection(collectionName);
            collection.updateOne({_id:new ObjectID(message._id)},{$set:{title:message.title,body:message.body}},function(err, res){
                if(err) callback(err);
                else callback();
                db.close();
            });
        });
    }
    else callback('validation error');

};

