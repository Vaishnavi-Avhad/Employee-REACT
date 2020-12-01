const mysqlConnection = require("./dbconnection");
const Response = require("./response");
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
const router = express.Router();


var response = new Response();
router.use(bodyparser.json());

//Get all users
router.get('/Getusers', (req, res) => {
    mysqlConnection.query('SELECT * FROM user',(err, rows, fields)=>{
        let returnValue = "";
        if(err){
            returnValue = response.failure('Error');
            res.send(returnValue);
            
        }else{
            returnValue = response.success(rows);
            res.send(returnValue);
        }
    })
});


//Get single user
router.get('/user/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM user WHERE ID = ?',[req.params.id],(err, rows, fields)=>{
        let returnValue = "";
        if(err){
            returnValue = response.failure('Error');
            res.send(returnValue);
        }else{
            returnValue = response.success(rows);
            res.send(returnValue);
        }
    })
});

//Delete user
router.delete('/user/:id', (req, res) => {
    let returnValue = "";
    mysqlConnection.query('DELETE FROM user WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (err){
            returnValue = response.failure('Error');
            res.send(returnValue);
        }
        else{
            returnValue = response.success('True');
            res.send(returnValue);
        }
    })
});

//Insert user
router.post('/adduser', (req, res) => {
    let user = req.body;
    let returnValue = "";
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL UserAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [user.ID, user.FIRSTNAME, user.LASTNAME, user.ADDRESS,user.ORGNAME, user.SALARY], (err, rows, fields) => {
        if (err){
            returnValue = response.failure('Error');
            res.send(returnValue);
        }
        else{
            rows.forEach(element => {
                if(element.constructor == Array){
                    returnValue = response.success('Inserted user id : '+element[0].ID);
                    res.send(returnValue);
                }
            });
        }
    })
});


//Update user
router.put('/updateuser', (req, res) => {
    let user = req.body;
    let returnValue = "";

    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL UserAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [user.ID, user.FIRSTNAME, user.LASTNAME, user.ADDRESS,user.ORGNAME, user.SALARY], (err, rows, fields) => {
        if (err){
            returnValue = response.failure(err);
            res.send(returnValue);
        }
        else{
            returnValue = response.success('Updated successfully');
            res.send(returnValue);
        }
    })
});

module.exports = router;