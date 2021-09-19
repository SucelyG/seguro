const mysql = require('mysql');
const express=require('express');
const bodyParser= require('body-parser');
const dbconfig= require('./configurations/db-conf');

var app=express();
app.use(bodyParser.json());

var mysqlconnectin= mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    database: dbconfig.database,
    password: dbconfig.password
});

//mostrar todos los estudiante
app.get('/estudiante', (req, res) => {
    console.log('get lista estudiantes');
    mysqlconnectin.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//mostrar estudiante
app.get('/estudiante/:id',(req, res)=>{
    console.log('get estudiante');
    mysqlconnectin.query('select * from estudiante where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

//crear estudiante
app.post('/estudiante',(req, res)=>{
    console.log('crear estudiante');
    let est= req.body;
    mysqlconnectin.query('insert into estudiante (Nombre, Apellido, Edad, Grado) values (?,?,?,?)',[est.Nombre, est.Apellido, est.Edad, est.Grado],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('Creado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });

});

//actualizar estudiante
app.put('/estudiante/:id',(req, res)=>{
    console.log('actualizar estudiante');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update estudiante set Nombre=?, Apellido=?, Edad=?, Grado=? where id=?',[est.Nombre, est.Apellido, est.Edad, est.Grado, req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Actualizado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });

});
     
//eliminar estudiante
app.delete('/estudiante/:id',(req, res)=>{
    console.log('delete estudiante');
    mysqlconnectin.query('delete from estudiante where id=?',[req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Eliminado Correctamente');
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

app.listen(process.env.PORT ||3000);