// Task1: initiate app and run server at 3000
const express=require("express")
const Cors=require("cors")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const {empModel}=require("./model/employee")
const app=express()
app.use(Cors())
app.use(Bodyparser.json())
app.use(Bodyparser.urlencoded({extended:true}))

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.listen(3000,()=>{
    console.log('Server started')
})
// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://Aswin:Add2023@cluster0.qrgymrt.mongodb.net/employeeDB?retryWrites=true&w=majority",{useNewUrlParser:true})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async(req,res)=>{
    let data=await empModel.find()
    res.json(data)
})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist:id', async(req,res)=>{
    let data=await empModel.findOne({"id":req.body.id}, req.body)
    res.json(data)
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    var data =new empModel(req.body)
    data.save()
    res.json({status:"Success"})
    
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req,response)=>{
    let data=await empModel.deleteOne({"id":req.body.id},req.body)
    response.json(data)
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async (req,res)=>{
  
    let data=await empModel.findOneAndUpdate({"id":req.body.id},req.body)
    res.json(data)
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



