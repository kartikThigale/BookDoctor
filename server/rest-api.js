var cors = require('cors');
var express = require('express');
var mongoClient = require('mongodb').MongoClient;

var conString = 'mongodb://127.0.0.1:27017'
var app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routes
//Route for user Registration
app.post('/register-user',(req,res)=>{
    var user = {
        UserId:req.body.UserId,
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Mobile:req.body.Mobile,
        Email:req.body.Email,
        Password:req.body.Password
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('React-todo');
        database.collection('Users').insertOne(user).then(()=>{
            console.log('User registered...')
            res.end();
        })
    })

})

//Route for getting all users 

app.get('/get-users',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('React-todo');
        database.collection('Users').find({}).toArray().then(documents=>{
            res.send(documents);
            console.log('User details fatched successfully');
            res.end();
        })
    })
})

//Appointment Id

app.post('/add-task',(req,res)=>{
    var task = {
        Appointment_Id:parseInt(req.body.Appointment_Id),
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Gender:req.body.Gender,
        Age:req.body.Age,
        DOB:req.body.DOB,
        Mobile:req.body.Mobile,
        Appointment:req.body.Appointment,
        Message:req.body.Message,
        UserId:req.body.UserId
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('React-todo');
        database.collection('Appointments').insertOne(task).then(()=>{
            console.log('Appointment Added...')
            res.end();
        })
    })
})

//View tasks
app.get('/view-tasks/:userid',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database= clientObject.db('React-todo');
        database.collection('Appointments').find({UserId:req.params.userid}).toArray().then(documents=>{
            res.send(documents);
            console.log('Appointment fetched successfully');
            res.end();
        })
    })
})


//Updata task

app.put('/edit-task/:taskid',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('React-todo');
        database.collection('Appointments').updateOne({UserId:req.params.taskid},{
            $set:(
                {Appointment_Id:parseInt(req.body.Appointment_Id),
                Title:req.body.Title,
                Description:req.body.Description,
                Date:req.body.Date,
                UserId:req.body.UserId
            })
        }).then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})

//Delete Tasks
app.delete('/delete-task/:id',(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject=>{
        var task = clientObject.db('React-todo');
        task.collection('Appointments').deleteOne({Appointment_Id:id}).then(documents=>{
            console.log('Appointment deleted successfully');
            res.end();
        })
    })
})


app.listen(5050);
console.log('Server connected...')
