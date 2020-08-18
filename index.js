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
    database: 'EmployeeDB',
    multipleStatements: true
    
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



//DELETE an EMPLOYEES
app.delete('/employees/:id', (req, res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',(req.params.id), (err, rows, fields)=>{
        if(!err){
            //console.log(rows[0].EmpID)
            res.send('Delete sucessfully')
        }else{
            console.log(err)
        }
    })
}) 


//Insert an EMPLOYEES
app.post('/employees', (req, res)=>{
    let emp = req.body
    const sql = "SET @EmpID = ?;SET @Name= ?;SET @EmpCode = ?; SET @Salary = ?; \
     CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);"
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields)=>{
        if(!err){
            rows.forEach(element =>{
                if(element.constructor == Array){
                    res.send('Inserted employee id: ' + element[0].EmpID)
                }
            })
        }else{
            console.log(err)
        }
    })
})


//Update an EMPLOYEES
app.put('/employees', (req, res)=>{
    let emp = req.body
    const sql = "SET @EmpID = ?;SET @Name= ?;SET @EmpCode = ?; SET @Salary = ?; \
     CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);"
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields)=>{
        if(!err){
           res.send('Update sucessfully')
        }else{
            console.log(err)
        }
    })
})