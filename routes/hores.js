const express = require('express');
const heroes = express.Router();
const db = require('../db/conn');

heroes.post('',(req, res)=>{


    let params =[

      req.body.nombre,
      req.body.identidad_secreta

    ];

    let sql = `insert into tbl_heroes 
                (nombre, identidad_secreta) 
                values 
                ($1, $2)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, nombre : params[0], identidad_secreta : params[1] };

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

heroes.get('',(req, res)=>{
 
  let sql = "select * from tbl_heroes where activo = true";


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
      req.body.identidad_secreta,
      req.body.activo,
      req.body.fecha_borra
  ];

  let sql = ` update tbl_heroes 
               set  nombre =  $2, 
                  identidad_secreta = $3,
                  activo = false ,
                  fecha_borra = current_timestamp ,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
                                      nombre : req.body.nombre, 
                                      identidad_secreta : req.body.identidad_secreta,
                                    activo : req.body.activo,
                                  fecha_borra : req.body.fecha_borra };
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
heroes.delete('/:id', (req, res) => {


  let sql = ` update tbl_heroes
                 set id = $1,
                nombre = $2,
                identidad_secreta =$3,
                 activo = false , 
            Where  fecha_borrar = current_timestamp `;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, nombre :req.params.nombre,identidad_secreta : req.params.identidad_secreta,
                                      activo : false
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = heroes;