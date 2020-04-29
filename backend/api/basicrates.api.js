var express = require('express');
var app = express();
var Rate = require('../Schemas/rate.schema');
var Analysisf = require('../Schemas/analysisf.schema');
product="";
rad="";
civ="";
sch="";
ch="";
var RatesAPI={
storing:function(req,res){
  
 

 
    
    //  console.log(req.body);
     rad =req.body.rad;
      civ =req.body.Civ_Elec;
       sch =req.body.product;
    //  console.log(rad);
    //  console.log( civ );
    //  console.log (sch);
    
 
    res.status(200).send({"message":"data received"});

},
basic:function(req,res){
    sch=parseInt(sch);
    // console.log(rad);
    //  console.log( civ );
    // console.log (sch);
    
    Rate.aggregate([{$match:{Schyear:sch,Ratestype:rad,Civ_Elec:civ}},
        {$project:{Ratestype:1,Code:1,Description:1,Unit:1,Unitvalue:1,_id:1,Marketrate:1,Schyear:1,Civ_Elec:1,Rate:1}},
        {$sort:{"Code":1}}],
    function(err,result){
    //    console.log(result);
       res.json(result);
    });
    
        
},









}

module.exports = RatesAPI;