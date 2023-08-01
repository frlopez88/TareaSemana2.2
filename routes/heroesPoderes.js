const express = require('express');
const heroes = express.Router();
const db = require('../db/conn');

heroes.post('/api/HeroesPoder',(req, res)=>{


    let tmpheroes_poder = [

      req.body.id_poder, 
      req.body.id_heroe

    ];
  
    let sql = `insert into tblheroes_poder (id_poder, id_heroe) values ($1, $2)
      returning id ` ;
  
      db.one(sql,tmpheroes_poder, event => event.id)
      .then( data => {
  
        const objetoscreador = {  id : data, 
                                  id_poder :tmpheroes_poder[0], 
                                  id_heroe : tmpheroes_poder[1],
                                };
  
        res.json(objetoscreador);
      })
      .catch((error)=>{
  
        res.json(error);
      });
  
  });
  
  
  heroes.get('/api/HeroesPoder',(req, res)=>{
    let sql = "select * from tblheroes_poder where activo = true";
  
  
    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {
  
            res.json(error);
  
        });
  
  });
  
  heroes.put('/api/HeroesPoder/:id', (req, res) => {
  
  
    const parametros = [
      req.params.id,
       req.body.id_poder,
       req.body.id_heroe,
        req.body.activo,
        req.body.fecha_borra
    ];
  
    let sql = ` update tblheroes_poder 
                  set id_poder=$2, id_heroe =$3 , activo = false ,fecha_borra = current_timestamp ,
                    where id= $1`;
  
    db.result(sql, parametros, r => r.rowCount)
        .then(data => {
  
            const objetoMo = {  id : req.params.id, nombre : req.body.nombre, 
              id_poder : req.body.id_poder, id_heroe :req.body.id_heroe, 
              activo : req.body.activo,
               fecha_borra : req.body.fecha_borra };
            
            res.json(objetoMo);
  
        })
        .catch((error) => {
            res.json(error);
        });
  });
  heroes.delete('/api/HeroesPoder/:id', (req, res) => {
  
  
    let sql = ` update tblheroes_poder
                   set id_poder =$2,
                   id_heroe = $3,
                   activo = false , 
                    fecha_borrar = current_timestamp ,
                where id = $1 `;
  
    db.result(sql, [req.params.id] ,   r => r.rowCount)
        .then(data => {
  
            
            const objetoBorrado     = {  id : req.params.id, id_poder :req.params.id_poder, id_heroe : req.params.id_heroe,
                                        activo : false
                                    };
            
            res.json(objetoBorrado);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });
  

module.exports = heroes;