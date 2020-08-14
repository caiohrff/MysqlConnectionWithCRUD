const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { json } = require('body-parser')

app.use(bodyParser.json())

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EmployeeDB'
})
mysqlConnection.connect((err) =>{
    if(!err){
        console.log('sucessfied connection')
    }else{
        console.log('Fail connection: ' + json.stringify(err, undefined, 2))
    }
})

app.listen(3000, ()=>console.log("Express server is running at port 3000"))

//GET ALL EMPLOYEES
app.get('/employees', (req, res)=>{
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields)=>{
        if(!err){
            //console.log(rows[0].EmpID)
            res.send(rows)
        }else{
            console.log(err)
        }
    })
})

//GET ALL EMPLOYEES
app.get('/employees/:id', (req, res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',(req.params.id), (err, rows, fields)=>{
        if(!err){
            //console.log(rows[0].EmpID)
            res.send(rows)
        }else{
            console.log(err)
        }
    })
}) 