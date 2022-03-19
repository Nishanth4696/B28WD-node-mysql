const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const dotenv = require('dotenv')

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});




const app = express();

//parsing middleware
app.use(bodyParser.urlencoded({extended: false}));


//parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));



//router
app.get('/user',(req,res) => {
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        //query
        connection.query('SELECT * from user',(err, result)=>{
            connection.release();

            if(!err){
                res.send(result)
            }else{
                console.log(err)
            }
        })


    })
});

//post
app.post('/user',(req,res) => {
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        //query
        const params = req.body;
        connection.query(' INSERT INTO user SET ?',params,(err, result)=>{
            connection.release();

            if(!err){
                res.send(result)
            }else{
                console.log(err)
            }
        })


    })
});


//put
app.put('/user/:id',(req,res) => {
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        //query
        // const params = req.body;
        // const { id } = req.params
        const { id, Fullname, Profilepic, Mobileno, Emailid, JobType, DOB, PrefLoc} = req.body;
        connection.query(' UPDATE user SET  Fullname = ?, Profilepic = ?, Mobileno = ?, Emailid = ?, JobType = ?, DOB = ?, PrefLoc = ? WHERE id = ?',[Fullname, Profilepic, Mobileno, Emailid, JobType, DOB, PrefLoc, id],(err, result)=>{
            connection.release();

            if(!err){
                res.send(result)
            }else{
                console.log(err)
            }
        })


    })
});
//using id
app.get('/user/:id',(req,res) => {
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        //query
        connection.query('SELECT * from user WHERE id = ?',[req.params.id],(err, result)=>{
            connection.release();

            if(!err){
                res.send(result)
            }else{
                console.log(err)
            }
        })


    })
});

//deletebyid
app.delete('/user/:id',(req,res) => {
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        //query
        connection.query('DELETE from user WHERE id = ?',[req.params.id],(err, result)=>{
            connection.release();

            if(!err){
                res.send(`Deleted the record with ${req.params.id} successfully `)
            }else{
                console.log('No records Found')
            }
        })


    })
});



app.listen(process.env.PORT, ()=> {
    console.log(`Server started in ${process.env.PORT}`)
});