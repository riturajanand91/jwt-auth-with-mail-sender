const mongoose = require('mongoose');
const config = require('../configs/configurations');//fetching global constants

mongoose.connect(process.env.MONGO_DB_URL,{
    
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})