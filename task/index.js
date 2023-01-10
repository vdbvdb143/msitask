const express = require('express')

const database = require('./db')

const app = express()
app.use(express.json())
app.listen(3000)

app.get('/api/get',(req,res) =>{
    c=0
    let tocken=req.header("temp")
    database.query("SELECT * FROM tocken;", function (err, data) {
        if(!err){
            var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
            for(var i=0;i<resultArray.length;i++){
                if(resultArray[i].tockenid==tocken){
                    c=1
                }
            }
            if(c==1){
                database.query("SELECT * FROM students;", function (err, results){
                    if(!err)
                        res.send(results);
                });
            }
            else
                res.json({message : "404 Error"})
        }
    });
})

app.post('/api/post',(req,res) =>{
    c=0
    let first_name=req.body.first_name
    let last_name=req.body.last_name
    let email=req.body.email
    let gender=req.body.gender

    let tocken=req.header("temp")

    database.query("SELECT * FROM tocken;", function (err, data) {
        if(!err){
            var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
            for(var i=0;i<resultArray.length;i++){
                if(resultArray[i].tockenid==tocken){
                    c=1
                }
            }
            if(c==1){
                var sql = "INSERT INTO students (first_name,last_name,email,gender) VALUES ('"+first_name+"','"+last_name+"','"+email+"','"+gender+"')";  
                database.query(sql, function (err, result) {  
                    if(!err){
                        database.query("SELECT * FROM students;", function (err, results){
                            if(!err)
                                res.send(results);
                        });
                    }
                });  
            }
            else
                res.json({message : "404 Error"})
        }
    });
})
app.put('/api/put/:id',(req,res) =>{
    
    let id=req.params.id
    let tocken=req.header("temp")
    let fn=req.body.first_name
    id=parseInt(id)
    
    database.query("SELECT * FROM tocken;", function (err, data) {
        if(!err){
            var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
            for(var i=0;i<resultArray.length;i++){
                if(resultArray[i].tockenid==tocken){
                    c=1
                }
            }
            if(c==1){
                var sql = "UPDATE students SET first_name = ? WHERE id= ?";
                database.query(sql, [fn,id],function (err, result){
                    if(!err){
                        database.query("SELECT * FROM students;", function (err, results){
                            if(!err)
                                res.send(results);
                        });
                    }
                });
            }
            else
                res.json({message : "404 Error"})
        }
    });
})

app.delete('/api/delete/:id',(req,res) =>{
    let id=req.params.id
    let tocken=req.header("temp")
    id=parseInt(id)

    database.query("SELECT * FROM tocken;", function (err, data) {
        if(!err){
            var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
            for(var i=0;i<resultArray.length;i++){
                if(resultArray[i].tockenid==tocken){
                    c=1
                }
            }
            if(c==1){
                var sql = "DELETE FROM students WHERE id = ?";
                database.query(sql, [id],function (err, result){
                    if(!err){
                        database.query("SELECT * FROM students;", function (err, results){
                            if(!err)
                                res.send(results);
                        });
                    }
                });
            }
            else
                res.json({message : "404 Error"})
        }
    });
})