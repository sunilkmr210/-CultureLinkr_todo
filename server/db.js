const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

// console.log(process.env.MongoUrl);

connectToMongo = ()=>{
    mongoose.connect(process.env.MongoUrl)
    .then(()=>{
        console.log("Successfull dbconnection");
    })
    .catch((err)=> console.log(err));
}

module.exports = connectToMongo;
