const mongoose = require('mongoose');
require('dotenv').config();

// connect to the mongo DB
mongoose.connect(process.env.DB_URI, {
    useCreateIndex:true, 
    useFindAndModify:false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true
    },() => {
        console.log('connected to mongoDB ...');
    }
);