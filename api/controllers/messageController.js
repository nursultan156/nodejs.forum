/**
 * Created by vaio on 21.04.2016.
 */
var repository = require('./../repository/messageRepository');

module.exports = function(router){

    /**
     * create message
     */
    router.route('/message').put(function(req,res){
        repository.createMessage(req.body,function(err){
            if(err) res.status(500);
            if(err == 'validation error') res.status(400);
            else res.status(201);
            res.end();
        });
    });

    /**
     * get all messages
     */
    router.route('/messages').get(function(req,res){
        repository.getAllMessages(function(err,docs){
            if(err) res.status(500);
            else res.status(200);
            res.json(docs);
        });
    });

    /**
     * get message body by id
     */
    router.route('/message').get(function(req,res){
        repository.getMessageBody(req.query.id,function(err,doc){
            if(err) res.status(500);
            else res.status(200);
            res.json(doc);
        });
    });

    /**
     * delete message by id
     */
    router.route('/message').delete(function(req,res){
        repository.deleteMessage(req.query.id,function(err){
            if(err) res.status(500);
            else res.status(200);
            res.end();
        });
    });

    /**
     * update message, input - {message}
     */
    router.route('/message').post(function(req,res){
        repository.updateMessage(req.body,function(err){
            if(err) res.status(404);
            else res.status(200);
            res.end();
        })
    });
};