let mongoose = require('mongoose');
let Scema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    }, age: {
        type:Number,
        require:true
    }
});

let employee = mongoose.model('employee',Scema);

module.exports = {
    employee
};