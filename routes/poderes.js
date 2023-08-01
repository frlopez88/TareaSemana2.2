const express = require('express');
const heroes = express.Router();
const db = require('../db/conn');

heroes.post('',(req, res)=>{


    let tmpPoderes =[
    
       req.body.nombre
  
    ];

    let sql = `insert into tbl_poderes (nombre) values ($1)
      returning id` ;
  
      db.one(sql,tmpPoderes, event => event.id)
      .then( data => {
  
        const objetocreador = {id : data, nombre :  req.body.nombre}
  
        res.json(objetocreador);
      })
      .catch((error)=>{
  
        res.json(error);
      });
  
  });
  
  heroes.get('',(req, res)=>{
   
    let sql = "select * from tbl_poderes where activo = true";
  
  
      db.any(sql, e => e.id)
          .then(rows => { res.json(rows); })
          .catch((error) => {
  
              res.json(error);
  
          });
  
  });
  
  heroes.put('/:id', (req, res) => {
  
  
    const parametros = [
      req.params.id,
      req.body.nombre,
        req.body.activo,
        req.body.fecha_borra
    ];
  
    let sql = ` update tbl_poderes 
                set  nombre =  $2,  activo = false ,fecha_borra = current_timestamp ,
                    where id= $1`;
  
    db.result(sql, parametros, r => r.rowCount)
        .then(data => {
  
            const objetoMo = {  id : req.params.id,    nombre : req.body.nombre,  activo : req.body.activo, fecha_borra : req.body.fecha_borra };
            
            res.json(objetoMo);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });
  heroes.delete('/:id', (req, res) => {
  
  
    let sql = ` update tbl_poderes
                   set id = $1,
                  nombre = $2,
                   activo = false , 
              Where  fecha_borrar = current_timestamp `;
  
    db.result(sql, [req.params.id] ,   r => r.rowCount)
        .then(data => {
  
            
            const objetoBorrado     = {  id : req.params.id, nombre :req.params.nombre,
                                        activo : false
                                    };
            
            res.json(objetoBorrado);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });

  module.exports = heroes;