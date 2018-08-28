let express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {employee} = require('./../model/employee');
let {mongoose} = require('./../DB/mongo_connection');

let PORT = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send({"message":"server_started"});
});


app.get('/employee',(req,res)=>{

    employee.find().then((docs)=>{
        res.send(docs);
    }),(err) => {
        res.send(err);
    }
});

app.post('/employee',(req,res)=>{
    let emp1 = new employee({
        name:req.body.name,
        age:req.body.age
    });

    res.send(emp1);
    emp1.save().then((docs)=>{
        res.send(docs);
    }),((err)=>{
        res.send(err);
    });

});

app.get('/employee/:id',(req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({message:"Invalied id"});
    }
    employee.findById(id).then((docs)=>{
        if(!docs){
            return res.status(404).send({message:"Invalied id"})
        }
        res.send(docs);
    },(err)=>{
        res.send(err);
    });
});

app.listen (PORT || 3000,()=>{
    console.log(`server started on port $ `);
});