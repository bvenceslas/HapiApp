const Hapi = require('hapi');
const mongoose = require('mongoose');
const joi = require('joi');

// initialise server
const server = new Hapi.Server({
    port: 8000,
    host: 'localhost'
});

// connect to the mongo DB
mongoose.connect('mongodb+srv://brain:Brain@we-skill-cluster.wkejp.mongodb.net/db_hapi?retryWrites=true&w=majority', 
    {useCreateIndex:true, useFindAndModify:false, useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('connected to mongoDB ...');
});

// create person model
const Person = mongoose.model('persons', {
    firstname: String,
    lastname:String,
    phone:String
});

server.route({
    method:'POST',
    path:'/persons',
    handler: async(request, h) => {        
        try{
            const pers = new Person(request.payload);
            const result = await pers.save();
            return h.response(result);
        }catch(err){
            return h.response(err).code(500);
        }
    }
});

// get all the persons
server.route({
    method:'GET',
    path:'/persons',
    handler: async(request, h) => {
        try{
            const persons = await Person.find().exec();
            return h.response(persons);
        }catch(err){
            return h.response(err).code(500);
        }
    }
});

//get one person by his id
server.route({
    method:'GET',
    path:'/person/{id}',
    handler: async (request, h) => {
        try{
            const person = await Person.findById(request.params.id).exec();
            return h.response(person);
        }catch(err){
            return h.response(err).code(500);
        }
    }

})

// edit person's data
server.route({
    method:'PUT',
    path:'/person/{id}',
    handler: async (request, h) => {
        try{
            const person = await Person.findByIdAndUpdate(request.params.id, request.payload, {new: true});
            return h.response(person);
        }catch(err){
            return h.response(err).code(500);
        }
    }
});

server.route({
    method:'DELETE',
    path:'/person/{id}',
    handler: async (request, h) => {
        const result = await Person.findByIdAndDelete(request.params.id);
        return h.response(result);
    }
})

server.start()
    .then(console.log(`Hapi Server running at ${server.info.uri} ...`))
    .catch(err => console.log({msg: err}));