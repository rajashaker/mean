// var express = require('express');
// var app = express();
// var Rate = require('../Schemas/rate.schema');
// var Rate = require('../schemas/product.schema');
var Analysisf = require('../Schemas/analysisf.schema');
// var Try = require('../Schemas/tryy.schema');
var A = require('../Schemas/product.schema');
// var B = require('../schemas/product.schema');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/cms1";
var mongoose= require('mongoose');
// var Sr2007= require('../Schemas/srrates.schema');
// mongoose.connect(' mongodb://localhost:27017/cms',{ useNewUrlParser: true}); 
// mongoose.set('useFindAndModify',false);
var async=require('async')
de=""
x=[]
j=0
t="";
d=[]
cal=""
finres=""
id =""
civ =""
  sch =""
  a=""
  e=0
  fcommoncode=""
   array = [];


var api={

  sto:function(req,res){
    id =""
    civ =""
      sch =""
  
  // console.log(req.body);
     id =req.body.id;
     civ =req.body.as.Civ_Elec;
       sch =req.body.as.year;
     console.log(id);
     console.log( civ );
     console.log (sch);
    res.status(200).send({"message":"data received"});
 
   },



   tdt:function(req,res){
 console.log(req.body)
 de=req.body.a
    res.status(200).send({"message":"data received"});
 
   },



  



   upe:function(req,res,next){


a=0;
cal="",


Analysisf.aggregate([{$match:{ItemCode:id,schyear:sch,Civ_Elec:civ}},
  {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
  pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
  {$eq:["$Civ_Elec","$$civil"]}]},}},{$match:{Schyear:sch,Civ_Elec:civ}},
  {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},{$project:{q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
  lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
  Quantity:{$cond:{if:{$eq:["$Quantity",'NULL']},then:1,else:"$Quantity"}},
  cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
  Water:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Water"}},
  Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:0,else:"$Overheads"}},
  Rate:{$cond:{if:{$eq:["$Rate",'NULL']},then:0,else:"$Rate"}},
  CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue",'NULL']},then:0,else:"$CalUnitvalue"}},
  Unit:{$cond:{if:{$eq:["$Unit",'NULL']},then:0,else:"$Unit"}},
  _id:0,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Calquantityvalue:1,Code:1,Stages:1,
  wastage:1,Wastage_desc:1,Civ_Elec:1,schyear:1,CalUnitvalue:1}},{$unwind:"$q"},{$project:
 {
 _id:0,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Calquantityvalue:1,Water:1,CalUnitvalue:1,
wastage:1,Wastage_desc:1,Quantity:1,Civ_Elec:1,schyear:1,lab:1,Overheads:1,q:1,cartage:1,Stages:1,Code:1, CalUnitvalue:1,Rate:1

  }}],function(err,result1) { 

         var i;
              for(i=0;i<result1.length;i++)
              {
                 if(result1[i].Icode == "" && result1[i].Code!=0)
             
                 {
                  // cal=result1[i].Calquantityvalue/result1[i].CalUnitvalue;
                  cal=result1[i].CalUnitvalue/result1[i].Calquantityvalue;

                  var product = new A({
                    commoncode:id,
                    ItemCode:result1[i].ItemCode,
                    Description:result1[i].Description,
                    Code:result1[i].Code,
                    Quantity:result1[i].Quantity,
                    Rate:result1[i].q.Rate,
                    std:result1[i].Rate,
                    Unit:result1[i].Unit,
                    Unitvalue:result1[i].Unitvalue,
                    Calquantityvalue:result1[i].Calquantityvalue,
                    Water:result1[i].Water,
                    Overheads:result1[i].Overheads,
                    Amount:((result1[i].Quantity*result1[i].q.Rate/result1[i].Unitvalue)),
                    labour_facor:result1[i].lab,
                    CalUnitvalue:result1[i].CalUnitvalue,
                    cartage:result1[i].cartage,
                    Civ_Elec:result1[i].Civ_Elec,
                    schyear:result1[i].schyear,
                    Stages:result1[i].Stages,
                    Ratestype:result1[i].q.Ratestype
                   
                
                    
                
                    // Icode:result[i].Icode
                   
                });
      product.save(function(error){
        
      });
             

              }
            
                 else if(result1[i].Icode != "" ){ 
                  cal=result1[i].Calquantityvalue;
                   console.log(result1[i].Icode)
                  // console.log(result1[i].Calquantityvalue)
                
                  //  console.log(i)
                    console.log(result1[i].Quantity)


                      Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:sch,Civ_Elec:civ,}},
                        {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
                        pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
                        {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
                        {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
                        {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                        lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
                        q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
                        cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
                        Water:{$cond:{if:{$eq:["$Water",""]},then:result1[i].Water,else:"$Water"}},
                        Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result1[i].Overheads,else:"$Overheads"}},
                        CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
                        Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
                       Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
                        wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,
                        }},{$unwind:"$q"},
                        {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result1[i].Quantity,"$CalUnitvalue","$Quantity"]},result1[i].CalUnitvalue]},"$Calquantityvalue"]}
                      ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
                      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1,_id:0}},

                      {$project:{Quantity:1,
                      Code:1,ItemCode:1,Rate:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
                      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0
                      }}
                      
                       ],function(err,result2){ 
                        // console.log(result1[0].Icode)
                    // console.log(result2.length)

                    // console.log(result2[0].ItemCode)

                      for(i=0;i<result2.length;i++){
                       
                        if(result2[i].Icode == "" && result2[i].Code!=0 ){
                          // console.log(result2[i].ItemCode)
                
                           
                          var product = new A({
                            commoncode:id,
                            ItemCode:result2[i].ItemCode,
                            Description:result2[i].Description,
                            Code:result2[i].Code,
                            Rate:result2[i].q.Rate,
                            Unit:result2[i].Unit,
                            Unitvalue:result2[i].Unitvalue,
                            Calquantityvalue:result2[i].Calquantityvalue,
                            Quantity:result2[i].Quantity,
                            Water:result2[i].Water,
                            Overheads:result2[i].Overheads,
                            Amount:((result2[i].Quantity*result2[i].q.Rate)/result2[i].Unitvalue),
                            labour_facor:result2[i].lab,
                            CalUnitvalue:result2[i].CalUnitvalue,
                            std:result2[i].Rate,
                            cartage:result2[i].cartage,
                            Civ_Elec:result2[i].Civ_Elec,
                            schyear:result2[i].schyear,
                            Stages:result2[i].Stages,
                              Ratestype:result2[i].q.Ratestype
                            // Icode:result[i].Icode
                            
                           
                        });
              product.save(function(error){
                  if(!error){
                      // res.status(200).json(product);
                  }
                  else{
                      // res.status(500).send({error:error});
                  }
              });
            




          }
          


          
          //5.9.5
          else if(result2[i].Icode != ""  ){
            // console.log(result2[i].Icode)
            // console.log(result2[i].Quantity)
            Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:sch,Civ_Elec:civ,}},
              {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
              pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
              {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
              {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
              {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
              lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
              q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
              cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
              CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
              Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
              Water:{$cond:{if:{$eq:["$Water",""]},then:result2[i].Water,else:"$Water"}},
              Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result2[i].Overheads,else:"$Overheads"}},
             Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Rate:1,
              wastage:1,Wastage_desc:1,Stages:1,Code:1,Civ_Elec:1,schyear:1
              }},{$unwind:"$q"},
              {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result2[i].Quantity,"$CalUnitvalue","$Quantity"]},result2[i].CalUnitvalue]},"$Calquantityvalue"]}
            ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
            Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0}},

            {$project:{Quantity:1,
            Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
            Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,Rate:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0
            }}
            
             ],function(err,result3){ 
              // console.log(result3[0].ItemCode)
// console.log(result3)
            for(i=0;i<result3.length;i++){
           
              
               
                  if(result3[i].Icode == "" && result3[i].Code!=0){
                var product = new A({
                  commoncode:id,
                  ItemCode:result3[i].ItemCode,
                  Description:result3[i].Description,
                  Code:result3[i].Code,
                  Rate:result3[i].q.Rate,
                  Unit:result3[i].Unit,
                  Unitvalue:result3[i].Unitvalue,
                  Calquantityvalue:result3[i].Calquantityvalue,
                  Quantity:result3[i].Quantity,
                  Water:result3[i].Water,
                  Overheads:result3[i].Overheads,
                  Amount:((result3[i].Quantity*result3[i].q.Rate)/result3[i].Unitvalue),
                  labour_facor:result3[i].lab,
                  CalUnitvalue:result3[i].CalUnitvalue,
                  std:result3[i].Rate,
                  cartage:result3[i].cartage,
                  Stages:result3[i].Stages,
                  Civ_Elec:result3[i].Civ_Elec,
                  schyear:result3[i].schyear,
                  Ratestype:result3[i].q.Ratestype
                  // Icode:result[i].Icode
                  
                 
              });
    product.save(function(error){
        if(!error){
            // res.status(200).json(product);
        }
        else{
            // res.status(500).send({error:error});
        }
    });
  }
 else if(result3[i].Icode!=""){
  // console.log(result3[i].Icode)
  // console.log(result3[i].Quantity)

  Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:sch,Civ_Elec:civ,}},
    {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
    pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
    {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
    {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
    {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
    q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
    CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
    Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
    Water:{$cond:{if:{$eq:["$Water",""]},then:result3[i].Water,else:"$Water"}},
    cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
    Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result3[i].Overheads,else:"$Overheads"}},
   Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
    wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,Civ_Elec:1,schyear:1
    }},{$unwind:"$q"},
    {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result3[i].Quantity,"$CalUnitvalue","$Quantity"]},result3[i].CalUnitvalue]},"$Calquantityvalue"]}
  ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0}},
  {$project:{Quantity:1,
  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Rate:1,Civ_Elec:1,schyear:1
  }}
  
   ],function(err,result4){ 
    console.log(result4[0].ItemCode)
// console.log(result3)
  for(i=0;i<result4.length;i++){
 
    
     
        if(result4[i].Icode == "" && result4[i].Code!=0){
      var product = new A({
        commoncode:id,
        ItemCode:result4[i].ItemCode,
        Description:result4[i].Description,
        Code:result4[i].Code,
        Rate:result4[i].q.Rate,
        Unit:result4[i].Unit,
        Unitvalue:result4[i].Unitvalue,
        Calquantityvalue:result4[i].Calquantityvalue,
        Quantity:result4[i].Quantity,
        Water:result4[i].Water,
        Overheads:result4[i].Overheads,
        Amount:((result4[i].Quantity*result4[i].q.Rate)/result4[i].Unitvalue),
        labour_facor:result4[i].lab,
        CalUnitvalue:result4[i].CalUnitvalue,
        std:result4[i].Rate,
        cartage:result4[i].cartage,
        Stages:result4[i].Stages,
        Civ_Elec:result4[i].Civ_Elec,
        schyear:result4[i].schyear,
        Ratestype:result4[i].q.Ratestype
        // Icode:result[i].Icode
        
       
    });
product.save(function(error){
if(!error){
  // res.status(200).json(product);
}
else{
  // res.status(500).send({error:error});
}
});









 }


else if(result4[i].Icode!=""){
    // console.log(result4[i].Icode)
    // console.log(result4[i].Quantity)
  
    Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:sch,Civ_Elec:civ,}},
      {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
      pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
      {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
      {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
      q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
      Water:{$cond:{if:{$eq:["$Water",""]},then:result4[i].Water,else:"$Water"}},
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result4[i].Overheads,else:"$Overheads"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Rate:1,Civ_Elec:1,schyear:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,
      }},{$unwind:"$q"},
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result4[i].Quantity,"$CalUnitvalue","$Quantity"]},result4[i].CalUnitvalue]},"$Calquantityvalue"]}
    ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0}},
    {$project:{Quantity:1,
    Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0
    }}
    
     ],function(err,result5){ 
      // console.log(result5[0].ItemCode)
  // console.log(result3)
    for(i=0;i<result5.length;i++){
   
      
       
          if(result5[i].Icode == "" && result5[i].Code!=0){
        var product = new A({
          commoncode:id,
          ItemCode:result5[i].ItemCode,
          Description:result5[i].Description,
          Code:result5[i].Code,
          Rate:result5[i].q.Rate,
          Unit:result5[i].Unit,
          Unitvalue:result5[i].Unitvalue,
          Calquantityvalue:result5[i].Calquantityvalue,
          Quantity:result5[i].Quantity,
          Water:result5[i].Water,
          Overheads:result5[i].Overheads,
          Amount:((result5[i].Quantity*result5[i].q.Rate)/result5[i].Unitvalue),
          labour_facor:result5[i].lab,
          CalUnitvalue:result5[i].CalUnitvalue,
          std:result5[i].Rate,
          cartage:result5[i].cartage,
          Stages:result5[i].Stages,
          Civ_Elec:result5[i].Civ_Elec,
          schyear:result5[i].schyear,
          Ratestype:result5[i].q.Ratestype
          // Icode:result[i].Icode
          
         
      });
  product.save(function(error){
  if(!error){
    // res.status(200).json(product);
  }
  else{
    // res.status(500).send({error:error});
  }
  });
  

}

else if(result5[i].Icode!=""){
  // console.log(result5[i].Icode)
  // console.log(result5[i].Quantity)

  Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:sch,Civ_Elec:civ,}},
    {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
    pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
    {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
    {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
    {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
    q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
    CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
    Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
    Water:{$cond:{if:{$eq:["$Water",""]},then:result5[i].Water,else:"$Water"}},
    cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Rate:1,
    Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result5[i].Overheads,else:"$Overheads"}},
   Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
    wastage:1,Wastage_desc:1,Stages:1,Code:1,Civ_Elec:1,schyear:1
    }},{$unwind:"$q"},
    {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result5[i].Quantity,"$CalUnitvalue","$Quantity"]},result5[i].CalUnitvalue]},"$Calquantityvalue"]}
  ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Civ_Elec:1,schyear:1}},
  {$project:{Quantity:1,
  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Civ_Elec:1,schyear:1
  }}
  
   ],function(err,result6){ 
    console.log(result6[0].ItemCode)
// console.log(result3)
  for(i=0;i<result6.length;i++){
 
    
     
        if(result6[i].Icode == "" && result6[i].Code!=0){
      var product = new A({
        commoncode:id,
        ItemCode:result6[i].ItemCode,
        Description:result6[i].Description,
        Code:result6[i].Code,
        Rate:result6[i].q.Rate,
        Unit:result6[i].Unit,
        Unitvalue:result6[i].Unitvalue,
        Calquantityvalue:result6[i].Calquantityvalue,
        Quantity:result6[i].Quantity,
        Water:result6[i].Water,
        Overheads:result6[i].Overheads,
        Amount:((result6[i].Quantity*result6[i].q.Rate)/result6[i].Unitvalue),
        labour_facor:result6[i].lab,
        CalUnitvalue:result6[i].CalUnitvalue,
        std:result6[i].Rate,
        cartage:result6[i].cartage,
        Stages:result6[i].Stages,
        Civ_Elec:result6[i].Civ_Elec,
        schyear:result6[i].schyear,
        Ratestype:result6[i].q.Ratestype
        // Icode:result[i].Icode
        
       
    });
product.save(function(error){
if(!error){
  // res.status(200).json(product);
}
else{
  // res.status(500).send({error:error});
}
});


}


}
// console.log(result4);
   }
  )}






  




}
               
// console.log(result3);
}
)}
}
});
}}

//console.log()

})
 }
              }
              // res.json(result1) 
             }
)}  } 

res.json(result1)  

}


)
},








allright:function(req,res){
  ide=[id]
  async.eachSeries(ide,function(item,callback){

console.log(item)
Analysisf.aggregate([{$match:{ItemCode:item,schyear:sch,Civ_Elec:civ}},
  {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
  pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
  {$eq:["$Civ_Elec","$$civil"]}]},}},{$match:{Schyear:sch,Civ_Elec:civ}},
  {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},{$project:{q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
  lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
  Quantity:{$cond:{if:{$eq:["$Quantity",'NULL']},then:1,else:"$Quantity"}},
  cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
  Water:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Water"}},
  Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:0,else:"$Overheads"}},
  Rate:{$cond:{if:{$eq:["$Rate",'NULL']},then:0,else:"$Rate"}},
  CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue",'NULL']},then:0,else:"$CalUnitvalue"}},
  Unit:{$cond:{if:{$eq:["$Unit",'NULL']},then:0,else:"$Unit"}},
  _id:0,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Calquantityvalue:1,Code:1,Stages:1,
  wastage:1,Wastage_desc:1,Civ_Elec:1,schyear:1,CalUnitvalue:1}},{$unwind:"$q"},{$project:
 {
 _id:0,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Calquantityvalue:1,Water:1,CalUnitvalue:1,
wastage:1,Wastage_desc:1,Quantity:1,Civ_Elec:1,schyear:1,lab:1,Overheads:1,q:1,cartage:1,Stages:1,Code:1, CalUnitvalue:1,Rate:1

  }}],function(err,result1) { 

         var i;
              for(i=0;i<result1.length;i++)
              {
                 if(result1[i].Icode == "" && result1[i].Code!=0)
             
                 {
                  cal=result1[i].Calquantityvalue/result1[i].CalUnitvalue;

                  var product = new A({
                    commoncode:item,
                    ItemCode:result1[i].ItemCode,
                    Description:result1[i].Description,
                    Code:result1[i].Code,
                    Quantity:result1[i].Quantity,
                    Rate:result1[i].q.Rate,
                    std:result1[i].Rate,
                    Unit:result1[i].Unit,
                    Unitvalue:result1[i].Unitvalue,
                    Calquantityvalue:result1[i].Calquantityvalue,
                    Water:result1[i].Water,
                    Overheads:result1[i].Overheads,
                    Amount:((result1[i].Quantity*result1[i].q.Rate/result1[i].Unitvalue)),
                    labour_facor:result1[i].lab,
                    CalUnitvalue:result1[i].CalUnitvalue,
                    cartage:result1[i].cartage,
                    Civ_Elec:result1[i].Civ_Elec,
                    schyear:result1[i].schyear,
                    Stages:result1[i].Stages,
                    Ratestype:result1[i].q.Ratestype
                   
                
                    
                
                    // Icode:result[i].Icode
                   
                });
      product.save(function(error){
        
      });
             

              }
            
                 else if(result1[i].Icode != "" ){ 
                  cal=result1[i].Calquantityvalue;
                   console.log(result1[i].Icode)
                  // console.log(result1[i].Calquantityvalue)
                
                  //  console.log(i)
                    console.log(result1[i].Quantity)


                      Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:sch,Civ_Elec:civ,}},
                        {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
                        pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
                        {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
                        {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
                        {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                        lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
                        q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
                        cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
                        Water:{$cond:{if:{$eq:["$Water",""]},then:result1[i].Water,else:"$Water"}},
                        Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result1[i].Overheads,else:"$Overheads"}},
                        CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
                        Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
                       Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
                        wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,
                        }},{$unwind:"$q"},
                        {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result1[i].Quantity,"$CalUnitvalue","$Quantity"]},result1[i].CalUnitvalue]},"$Calquantityvalue"]}
                      ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
                      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1,_id:0}},

                      {$project:{Quantity:1,
                      Code:1,ItemCode:1,Rate:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
                      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0
                      }}
                      
                       ],function(err,result2){ 
                        // console.log(result1[0].Icode)
                    // console.log(result2.length)

                    // console.log(result2[0].ItemCode)

                      for(i=0;i<result2.length;i++){
                       
                        if(result2[i].Icode == "" && result2[i].Code!=0 ){
                          // console.log(result2[i].ItemCode)
                
                           
                          var product = new A({
                            commoncode:item,
                            ItemCode:result2[i].ItemCode,
                            Description:result2[i].Description,
                            Code:result2[i].Code,
                            Rate:result2[i].q.Rate,
                            Unit:result2[i].Unit,
                            Unitvalue:result2[i].Unitvalue,
                            Calquantityvalue:result2[i].Calquantityvalue,
                            Quantity:result2[i].Quantity,
                            Water:result2[i].Water,
                            Overheads:result2[i].Overheads,
                            Amount:((result2[i].Quantity*result2[i].q.Rate)/result2[i].Unitvalue),
                            labour_facor:result2[i].lab,
                            CalUnitvalue:result2[i].CalUnitvalue,
                            std:result2[i].Rate,
                            cartage:result2[i].cartage,
                            Civ_Elec:result2[i].Civ_Elec,
                            schyear:result2[i].schyear,
                            Stages:result2[i].Stages,
                              Ratestype:result2[i].q.Ratestype
                            // Icode:result[i].Icode
                            
                           
                        });
              product.save(function(error){
                  if(!error){
                      // res.status(200).json(product);
                  }
                  else{
                      // res.status(500).send({error:error});
                  }
              });
            




          }
          


          
          //5.9.5
          else if(result2[i].Icode != ""  ){
            // console.log(result2[i].Icode)
            // console.log(result2[i].Quantity)
            Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:sch,Civ_Elec:civ,}},
              {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
              pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
              {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
              {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
              {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
              lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
              q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
              cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
              CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
              Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
              Water:{$cond:{if:{$eq:["$Water",""]},then:result2[i].Water,else:"$Water"}},
              Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result2[i].Overheads,else:"$Overheads"}},
             Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Rate:1,
              wastage:1,Wastage_desc:1,Stages:1,Code:1,Civ_Elec:1,schyear:1
              }},{$unwind:"$q"},
              {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result2[i].Quantity,"$CalUnitvalue","$Quantity"]},result2[i].CalUnitvalue]},"$Calquantityvalue"]}
            ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
            Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0}},

            {$project:{Quantity:1,
            Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
            Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,Rate:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0
            }}
            
             ],function(err,result3){ 
              // console.log(result3[0].ItemCode)
// console.log(result3)
            for(i=0;i<result3.length;i++){
           
              
               
                  if(result3[i].Icode == "" && result3[i].Code!=0){
                var product = new A({
                  commoncode:item,
                  ItemCode:result3[i].ItemCode,
                  Description:result3[i].Description,
                  Code:result3[i].Code,
                  Rate:result3[i].q.Rate,
                  Unit:result3[i].Unit,
                  Unitvalue:result3[i].Unitvalue,
                  Calquantityvalue:result3[i].Calquantityvalue,
                  Quantity:result3[i].Quantity,
                  Water:result3[i].Water,
                  Overheads:result3[i].Overheads,
                  Amount:((result3[i].Quantity*result3[i].q.Rate)/result3[i].Unitvalue),
                  labour_facor:result3[i].lab,
                  CalUnitvalue:result3[i].CalUnitvalue,
                  std:result3[i].Rate,
                  cartage:result3[i].cartage,
                  Stages:result3[i].Stages,
                  Civ_Elec:result3[i].Civ_Elec,
                  schyear:result3[i].schyear,
                  Ratestype:result3[i].q.Ratestype
                  // Icode:result[i].Icode
                  
                 
              });
    product.save(function(error){
        if(!error){
            // res.status(200).json(product);
        }
        else{
            // res.status(500).send({error:error});
        }
    });
  }
 else if(result3[i].Icode!=""){
  // console.log(result3[i].Icode)
  // console.log(result3[i].Quantity)

  Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:sch,Civ_Elec:civ,}},
    {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
    pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
    {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
    {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
    {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
    q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
    CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
    Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
    Water:{$cond:{if:{$eq:["$Water",""]},then:result3[i].Water,else:"$Water"}},
    cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
    Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result3[i].Overheads,else:"$Overheads"}},
   Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
    wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,Civ_Elec:1,schyear:1
    }},{$unwind:"$q"},
    {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result3[i].Quantity,"$CalUnitvalue","$Quantity"]},result3[i].CalUnitvalue]},"$Calquantityvalue"]}
  ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0}},
  {$project:{Quantity:1,
  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Rate:1,Civ_Elec:1,schyear:1
  }}
  
   ],function(err,result4){ 
    console.log(result4[0].ItemCode)
// console.log(result3)
  for(i=0;i<result4.length;i++){
 
    
     
        if(result4[i].Icode == "" && result4[i].Code!=0){
      var product = new A({
        commoncode:item,
        ItemCode:result4[i].ItemCode,
        Description:result4[i].Description,
        Code:result4[i].Code,
        Rate:result4[i].q.Rate,
        Unit:result4[i].Unit,
        Unitvalue:result4[i].Unitvalue,
        Calquantityvalue:result4[i].Calquantityvalue,
        Quantity:result4[i].Quantity,
        Water:result4[i].Water,
        Overheads:result4[i].Overheads,
        Amount:((result4[i].Quantity*result4[i].q.Rate)/result4[i].Unitvalue),
        labour_facor:result4[i].lab,
        CalUnitvalue:result4[i].CalUnitvalue,
        std:result4[i].Rate,
        cartage:result4[i].cartage,
        Stages:result4[i].Stages,
        Civ_Elec:result4[i].Civ_Elec,
        schyear:result4[i].schyear,
        Ratestype:result4[i].q.Ratestype
        // Icode:result[i].Icode
        
       
    });
product.save(function(error){
if(!error){
  // res.status(200).json(product);
}
else{
  // res.status(500).send({error:error});
}
});









 }


else if(result4[i].Icode!=""){
    // console.log(result4[i].Icode)
    // console.log(result4[i].Quantity)
  
    Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:sch,Civ_Elec:civ,}},
      {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
      pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
      {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
      {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
      q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
      Water:{$cond:{if:{$eq:["$Water",""]},then:result4[i].Water,else:"$Water"}},
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result4[i].Overheads,else:"$Overheads"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Rate:1,Civ_Elec:1,schyear:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,
      }},{$unwind:"$q"},
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result4[i].Quantity,"$CalUnitvalue","$Quantity"]},result4[i].CalUnitvalue]},"$Calquantityvalue"]}
    ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0}},
    {$project:{Quantity:1,
    Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0
    }}
    
     ],function(err,result5){ 
      // console.log(result5[0].ItemCode)
  // console.log(result3)
    for(i=0;i<result5.length;i++){
   
      
       
          if(result5[i].Icode == "" && result5[i].Code!=0){
        var product = new A({
          commoncode:item,
          ItemCode:result5[i].ItemCode,
          Description:result5[i].Description,
          Code:result5[i].Code,
          Rate:result5[i].q.Rate,
          Unit:result5[i].Unit,
          Unitvalue:result5[i].Unitvalue,
          Calquantityvalue:result5[i].Calquantityvalue,
          Quantity:result5[i].Quantity,
          Water:result5[i].Water,
          Overheads:result5[i].Overheads,
          Amount:((result5[i].Quantity*result5[i].q.Rate)/result5[i].Unitvalue),
          labour_facor:result5[i].lab,
          CalUnitvalue:result5[i].CalUnitvalue,
          std:result5[i].Rate,
          cartage:result5[i].cartage,
          Stages:result5[i].Stages,
          Civ_Elec:result5[i].Civ_Elec,
          schyear:result5[i].schyear,
          Ratestype:result5[i].q.Ratestype
          // Icode:result[i].Icode
          
         
      });
  product.save(function(error){
  if(!error){
    // res.status(200).json(product);
  }
  else{
    // res.status(500).send({error:error});
  }
  });
  

}

else if(result5[i].Icode!=""){
  // console.log(result5[i].Icode)
  // console.log(result5[i].Quantity)

  Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:sch,Civ_Elec:civ,}},
    {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
    pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
    {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
    {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
    {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
    q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
    CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
    Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
    Water:{$cond:{if:{$eq:["$Water",""]},then:result5[i].Water,else:"$Water"}},
    cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Rate:1,
    Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result5[i].Overheads,else:"$Overheads"}},
   Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
    wastage:1,Wastage_desc:1,Stages:1,Code:1,Civ_Elec:1,schyear:1
    }},{$unwind:"$q"},
    {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result5[i].Quantity,"$CalUnitvalue","$Quantity"]},result5[i].CalUnitvalue]},"$Calquantityvalue"]}
  ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Civ_Elec:1,schyear:1}},
  {$project:{Quantity:1,
  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
  Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Civ_Elec:1,schyear:1
  }}
  
   ],function(err,result6){ 
    console.log(result6[0].ItemCode)
// console.log(result3)
  for(i=0;i<result6.length;i++){
 
    
     
        if(result6[i].Icode == "" && result6[i].Code!=0){
      var product = new A({
        commoncode:item,
        ItemCode:result6[i].ItemCode,
        Description:result6[i].Description,
        Code:result6[i].Code,
        Rate:result6[i].q.Rate,
        Unit:result6[i].Unit,
        Unitvalue:result6[i].Unitvalue,
        Calquantityvalue:result6[i].Calquantityvalue,
        Quantity:result6[i].Quantity,
        Water:result6[i].Water,
        Overheads:result6[i].Overheads,
        Amount:((result6[i].Quantity*result6[i].q.Rate)/result6[i].Unitvalue),
        labour_facor:result6[i].lab,
        CalUnitvalue:result6[i].CalUnitvalue,
        std:result6[i].Rate,
        cartage:result6[i].cartage,
        Stages:result6[i].Stages,
        Civ_Elec:result6[i].Civ_Elec,
        schyear:result6[i].schyear,
        Ratestype:result6[i].q.Ratestype
        // Icode:result[i].Icode
        
       
    });
product.save(function(error){
if(!error){
  // res.status(200).json(product);
}
else{
  // res.status(500).send({error:error});
}
});


}


}
// console.log(result4);
   }
  )}






  




}
               
// console.log(result3);
}
)}
}
});
}}

//console.log()

})
 }
              }
              // res.json(result1) 
             }
)}  } 
callback()

// console.log(result1)  

})





  },function(){
    console.log('wow')


     res.json("success")

})},





display:function(req,res){
  {
 
    
 
   A.aggregate([{$match:{commoncode:id,Civ_Elec:civ,schyear:sch,Code:{$ne:0}}},
    { $sort : { Code : 1}}
     
  
    ],function(err,result){
      console.log(result)
     res.json(result)
     
   })
 
 
 
     
 }

},


total:function(req,res){
 {
  cal;
   console.log(cal)

  A.aggregate([{$facet:{
   
labour:[{$match:{commoncode:id,Civ_Elec:civ,schyear:sch,Code:{$ne:0}}},
  {$project:{la:{$divide:[{$multiply:["$Amount","$labour_facor"]},100]},labour_facor:1,Amount:1,Water:1,Overheads:1,cartage:1}},
  {$project:{labt:{$add:["$Amount","$la"]},la:1,Amount:1,Water:1,cartage:1,Overheads:1}},
  {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,Overheads:1,labt:1,cartage:1}},
  {$project:{tot1:{$add:["$labt","$cart"]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1}},
  {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,tot1:1}},
  {$project:{wattot:{$add:["$wat","$tot1"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,}},
  {$project:{gst:{$multiply:["$wattot",0.1405]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1}},
  {$project:{gstplustot:{$add:["$gst","$wattot"]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,gst:1}},




//gst+total+water+overheads
  {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattot:1,gst:1,gstplustot:1}},
  {$project:{fintot:{$add:["$wattotove","$gstplustot"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,gst:1,gstplustot:1}},
//cess
  {$project:{cessmulfintot:{$multiply:["$fintot",0.01]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,gst:1,fintot:1,gstplustot:1}},
  {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,gst:1,fintot:1,cessmulfintot:1,gstplustot:1}},

  {$project:{fintotcal:{$divide:["$cessplusfintot",cal]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,fintot:1,gst:1,cessplusfintot:1,cessmulfintot:1,gstplustot:1}},

  // {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
  {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
  ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
     gstt:{$sum:"$gst"},  gsttot:{$sum:"$gstplustot"},
  over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
  cesst:{$sum:"$cessplusfintot"},
  totaldivcal:{$sum:"$fintotcal"}}},


],
  }},
 
   ],function(err,result){
     console.log(result)
     var i
   finres=result[0].labour[0].totaldivcal
    
     var myquery = { ItemCode: id,schyear:sch,Civ_Elec:civ };
     var new_values = { Rate:finres };
   
    
     mongoose.connection.collection("sr").updateOne(myquery,  {$set: new_values})
     mongoose.connection.collections.a.drop(function(err){
      
      console.log("deleted")
    })
     console.log(finres)
    res.json(result)
    
  })



    
}

},

del:function(err,res){
 

    mongoose.connection.collections.a.drop(function(err){
      
      console.log("deleted")
    })
    res.json("deleted")


},


// update2:function(err, res,req) {
//  console.log(req.body)
  
//   var myquery = { ItemCode:id,schyear:sch};
//   var new_values = { Rate:finres };
//   var values = { Rate:78787 };


 
//   mongoose.connection.collection("sr").updateMany(myquery,  {$set: new_values},{multi: true}, function(err, res) {
//     if (err) throw err;
//     mongoose.connection.collection("rate").updateMany({Code:367},  {$set:values},{multi: true})
//   console.log(res.result.nModified + " record updated");
  
// });
// res.json("updated in all years")
// },





update3:function(req,res){
  // if(!ObjectId.isValid(req.params._id)){
  //     return res.status(400).send(`no records with given id :${req.params.id}`);
  // }  
  var emp ={
      // name:req.body.name,
          Rate:req.body.Marketrate,
          // quantity:req.body.quantity,
          // status:req.body.status,};
  };
  var query={

    Code:parseInt(req.body.rew),
    Schyear:parseInt(req.body.sch),
    Civ_Elec:req.body.civelec
  }
  console.log(req.body);
  console.log(emp);
  mongoose.connection.collection("rate").updateOne(query,{$set:emp},{new:true},(err,result)=>{
      if(err){
                      res.status(500).json({error:err});
                  }
                  else{
                      // res.status(200).json({result:'ok'});
                      console.log('up')
                      mongoose.connection.collection("a").update({Code:req.body.rew},{$set:emp},{new:true})
                      
                      var myquery = { ItemCode: id,schyear:sch,Civ_Elec:civ };
    var new_values = { Rate:finres };
  
   
    mongoose.connection.collection("sr").update(myquery,  {$set: new_values})
                  }
  });
 res.json("updated")
  },




update1:function(err, res) {
   
    var myquery = { ItemCode: id,schyear:sch,Civ_Elec:civ };
    var new_values = { Rate:finres };
  
   
    mongoose.connection.collection("sr").updateOne(myquery,  {$set: new_values}, function(err, res) {
      if (err) throw err;
    console.log(res.result.nModified + " record updated");
    
  });
res.json("updated")
  },




//   rt:  function(req,res){
  
//  var we=Sr2007.aggregate([{$match:{SubHeadCode:20,schyear:2012,SR_NSR : "SR",Civ_Elec:"CIVIL",Rate:{$ne:0}}},
//     {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
//     {$project:{Itemcode:1,_id:0}}], function(err,result){
// res.json(result)

//     })


// console.log(we)

//   },


  rt: async function(req,res){
    
    sd= (new Date()).toLocaleDateString()
    t="ba"
    const finalResults = await new Promise((resolve, reject) => {
      mongoose.connection.collection("sr2007").aggregate([{$match:{SubHeadCode:20,schyear:2012,SR_NSR : "SR",Civ_Elec:"CIVIL",Rate:{$ne:0}}},
    {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
    {$project:{Itemcode:1,_id:0}}]).toArray(  function(err,result){
      resolve(result);
      // console.log(result)
    })
  })
  console.log(finalResults.length) 
 
   
  for(i=0;i<finalResults.length;i++){
    var a = finalResults[i].Itemcode;
        array.push(a);
   console.log( finalResults[i].Itemcode)
  }
// var a = finalResults[i].Itemcode;
//         array.push(a);
       
  



   
res.json(array)
    },
















//test
tst:function(req,res,next){
sch=2018;
civ="CIVIL"
  a=0;
  cal="",
  
  
  Analysisf.aggregate([{$match:{ItemCode:de,schyear:sch,Civ_Elec:civ}},
    {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
    pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
    {$eq:["$Civ_Elec","$$civil"]}]},}},{$match:{Schyear:sch,Civ_Elec:civ}},
    {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},{$project:{q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
    lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
    Quantity:{$cond:{if:{$eq:["$Quantity",'NULL']},then:1,else:"$Quantity"}},
    cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
    Water:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Water"}},
    Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:0,else:"$Overheads"}},
    Rate:{$cond:{if:{$eq:["$Rate",'NULL']},then:0,else:"$Rate"}},
    CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue",'NULL']},then:0,else:"$CalUnitvalue"}},
    Unit:{$cond:{if:{$eq:["$Unit",'NULL']},then:0,else:"$Unit"}},
    _id:0,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Calquantityvalue:1,Code:1,Stages:1,
    wastage:1,Wastage_desc:1,Civ_Elec:1,schyear:1}},{$unwind:"$q"},{$project:
   {
   _id:0,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Calquantityvalue:1,Water:1,
  wastage:1,Wastage_desc:1,Quantity:1,Civ_Elec:1,schyear:1,lab:1,Overheads:1,q:1,cartage:1,Stages:1,Code:1, CalUnitvalue:1,Rate:1
  
    }}],function(err,result1) { 
  
           var i;
                for(i=0;i<result1.length;i++)
                {
                   if(result1[i].Icode == "" && result1[i].Code!=0)
               
                   {
                    cal=result1[i].Calquantityvalue;
                    var product = new A({
                      commoncode:de,
                      ItemCode:result1[i].ItemCode,
                      Description:result1[i].Description,
                      Code:result1[i].Code,
                      Quantity:result1[i].Quantity,
                      Rate:result1[i].q.Rate,
                      std:result1[i].Rate,
                      Unit:result1[i].Unit,
                      Unitvalue:result1[i].Unitvalue,
                      Calquantityvalue:result1[i].Calquantityvalue,
                      Water:result1[i].Water,
                      Overheads:result1[i].Overheads,
                      Amount:((result1[i].Quantity*result1[i].q.Rate/result1[i].Unitvalue)),
                      labour_facor:result1[i].lab,
                      CalUnitvalue:result1[i].CalUnitvalue,
                      cartage:result1[i].cartage,
                      Civ_Elec:result1[i].Civ_Elec,
                      schyear:result1[i].schyear,
                      Stages:result1[i].Stages,
                      Ratestype:result1[i].q.Ratestype
                     
                  
                      
                  
                      // Icode:result[i].Icode
                     
                  });
        product.save(function(error){
          
        });
               
  
                }
              
                   else if(result1[i].Icode != "" ){ 
                    cal=result1[i].Calquantityvalue;
                    // console.log(result1[i].Icode)
                    // console.log(result1[i].Calquantityvalue)
                  
                    //  console.log(i)
                      console.log(result1[i].Quantity)
  
  
                        Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:sch,Civ_Elec:civ,}},
                          {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
                          pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
                          {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
                          {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
                          {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                          lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
                          q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
                          cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
                          Water:{$cond:{if:{$eq:["$Water",""]},then:result1[i].Water,else:"$Water"}},
                          Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result1[i].Overheads,else:"$Overheads"}},
                          CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
                          Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
                         Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
                          wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,
                          }},{$unwind:"$q"},
                          {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result1[i].Quantity,"$CalUnitvalue","$Quantity"]},result1[i].CalUnitvalue]},"$Calquantityvalue"]}
                        ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
                        Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1,_id:0}},
  
                        {$project:{Quantity:1,
                        Code:1,ItemCode:1,Rate:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
                        Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0
                        }}
                        
                         ],function(err,result2){ 
                          // console.log(result1[0].Icode)
                      // console.log(result2.length)
  
                      // console.log(result2[0].ItemCode)
  
                        for(i=0;i<result2.length;i++){
                         
                          if(result2[i].Icode == "" && result2[i].Code!=0 ){
                            // console.log(result2[i].ItemCode)
                  
                             
                            var product = new A({
                              commoncode:de,
                              ItemCode:result2[i].ItemCode,
                              Description:result2[i].Description,
                              Code:result2[i].Code,
                              Rate:result2[i].q.Rate,
                              Unit:result2[i].Unit,
                              Unitvalue:result2[i].Unitvalue,
                              Calquantityvalue:result2[i].Calquantityvalue,
                              Quantity:result2[i].Quantity,
                              Water:result2[i].Water,
                              Overheads:result2[i].Overheads,
                              Amount:((result2[i].Quantity*result2[i].q.Rate)/result2[i].Unitvalue),
                              labour_facor:result2[i].lab,
                              CalUnitvalue:result2[i].CalUnitvalue,
                              std:result2[i].Rate,
                              cartage:result2[i].cartage,
                              Civ_Elec:result2[i].Civ_Elec,
                              schyear:result2[i].schyear,
                              Stages:result2[i].Stages,
                                Ratestype:result2[i].q.Ratestype
                              // Icode:result[i].Icode
                              
                             
                          });
                product.save(function(error){
                    if(!error){
                        // res.status(200).json(product);
                    }
                    else{
                        // res.status(500).send({error:error});
                    }
                });
              
  
  
  
  
            }
            
  
  
            
            //5.9.5
            else if(result2[i].Icode != ""  ){
              // console.log(result2[i].Icode)
              // console.log(result2[i].Quantity)
              Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:sch,Civ_Elec:civ,}},
                {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
                pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
                {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
                {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
                {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
                q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
                cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
                CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
                Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
                Water:{$cond:{if:{$eq:["$Water",""]},then:result2[i].Water,else:"$Water"}},
                Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result2[i].Overheads,else:"$Overheads"}},
               Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Rate:1,
                wastage:1,Wastage_desc:1,Stages:1,Code:1,Civ_Elec:1,schyear:1
                }},{$unwind:"$q"},
                {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result2[i].Quantity,"$CalUnitvalue","$Quantity"]},result2[i].CalUnitvalue]},"$Calquantityvalue"]}
              ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
              Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0}},
  
              {$project:{Quantity:1,
              Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
              Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,Rate:1,cartage:1,Stages:1,Code:1,q:1,lab:1,Civ_Elec:1,schyear:1, _id:0
              }}
              
               ],function(err,result3){ 
                console.log(result3[0].ItemCode)
  // console.log(result3)
              for(i=0;i<result3.length;i++){
             
                
                 
                    if(result3[i].Icode == "" && result3[i].Code!=0){
                  var product = new A({
                    commoncode:de,
                    ItemCode:result3[i].ItemCode,
                    Description:result3[i].Description,
                    Code:result3[i].Code,
                    Rate:result3[i].q.Rate,
                    Unit:result3[i].Unit,
                    Unitvalue:result3[i].Unitvalue,
                    Calquantityvalue:result3[i].Calquantityvalue,
                    Quantity:result3[i].Quantity,
                    Water:result3[i].Water,
                    Overheads:result3[i].Overheads,
                    Amount:((result3[i].Quantity*result3[i].q.Rate)/result3[i].Unitvalue),
                    labour_facor:result3[i].lab,
                    CalUnitvalue:result3[i].CalUnitvalue,
                    std:result3[i].Rate,
                    cartage:result3[i].cartage,
                    Stages:result3[i].Stages,
                    Civ_Elec:result3[i].Civ_Elec,
                    schyear:result3[i].schyear,
                    Ratestype:result3[i].q.Ratestype
                    // Icode:result[i].Icode
                    
                   
                });
      product.save(function(error){
          if(!error){
              // res.status(200).json(product);
          }
          else{
              // res.status(500).send({error:error});
          }
      });
    }
   else if(result3[i].Icode!=""){
    // console.log(result3[i].Icode)
    // console.log(result3[i].Quantity)
  
    Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:sch,Civ_Elec:civ,}},
      {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
      pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
      {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
      {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
      q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
      Water:{$cond:{if:{$eq:["$Water",""]},then:result3[i].Water,else:"$Water"}},
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result3[i].Overheads,else:"$Overheads"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,Civ_Elec:1,schyear:1
      }},{$unwind:"$q"},
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result3[i].Quantity,"$CalUnitvalue","$Quantity"]},result3[i].CalUnitvalue]},"$Calquantityvalue"]}
    ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0}},
    {$project:{Quantity:1,
    Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Rate:1,Civ_Elec:1,schyear:1
    }}
    
     ],function(err,result4){ 
      console.log(result4[0].ItemCode)
  // console.log(result3)
    for(i=0;i<result4.length;i++){
   
      
       
          if(result4[i].Icode == "" && result4[i].Code!=0){
        var product = new A({
          commoncode:de,
          ItemCode:result4[i].ItemCode,
          Description:result4[i].Description,
          Code:result4[i].Code,
          Rate:result4[i].q.Rate,
          Unit:result4[i].Unit,
          Unitvalue:result4[i].Unitvalue,
          Calquantityvalue:result4[i].Calquantityvalue,
          Quantity:result4[i].Quantity,
          Water:result4[i].Water,
          Overheads:result4[i].Overheads,
          Amount:((result4[i].Quantity*result4[i].q.Rate)/result4[i].Unitvalue),
          labour_facor:result4[i].lab,
          CalUnitvalue:result4[i].CalUnitvalue,
          std:result4[i].Rate,
          cartage:result4[i].cartage,
          Stages:result4[i].Stages,
          Civ_Elec:result4[i].Civ_Elec,
          schyear:result4[i].schyear,
          Ratestype:result4[i].q.Ratestype
          // Icode:result[i].Icode
          
         
      });
  product.save(function(error){
  if(!error){
    // res.status(200).json(product);
  }
  else{
    // res.status(500).send({error:error});
  }
  });
  
  
  
  
  
  
  
  
  
   }
  
  
  else if(result4[i].Icode!=""){
      // console.log(result4[i].Icode)
      // console.log(result4[i].Quantity)
    
      Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:sch,Civ_Elec:civ,}},
        {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
        pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
        {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
        {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
        {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
        lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
        q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
        CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
        Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
        Water:{$cond:{if:{$eq:["$Water",""]},then:result4[i].Water,else:"$Water"}},
        cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},
        Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result4[i].Overheads,else:"$Overheads"}},
       Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,Rate:1,Civ_Elec:1,schyear:1,
        wastage:1,Wastage_desc:1,Stages:1,Code:1,
        }},{$unwind:"$q"},
        {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result4[i].Quantity,"$CalUnitvalue","$Quantity"]},result4[i].CalUnitvalue]},"$Calquantityvalue"]}
      ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0}},
      {$project:{Quantity:1,
      Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,Civ_Elec:1,schyear:1,
      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0
      }}
      
       ],function(err,result5){ 
        // console.log(result5[0].ItemCode)
    // console.log(result3)
      for(i=0;i<result5.length;i++){
     
        
         
            if(result5[i].Icode == "" && result5[i].Code!=0){
          var product = new A({
            commoncode:de,
            ItemCode:result5[i].ItemCode,
            Description:result5[i].Description,
            Code:result5[i].Code,
            Rate:result5[i].q.Rate,
            Unit:result5[i].Unit,
            Unitvalue:result5[i].Unitvalue,
            Calquantityvalue:result5[i].Calquantityvalue,
            Quantity:result5[i].Quantity,
            Water:result5[i].Water,
            Overheads:result5[i].Overheads,
            Amount:((result5[i].Quantity*result5[i].q.Rate)/result5[i].Unitvalue),
            labour_facor:result5[i].lab,
            CalUnitvalue:result5[i].CalUnitvalue,
            std:result5[i].Rate,
            cartage:result5[i].cartage,
            Stages:result5[i].Stages,
            Civ_Elec:result5[i].Civ_Elec,
            schyear:result5[i].schyear,
            Ratestype:result5[i].q.Ratestype
            // Icode:result[i].Icode
            
           
        });
    product.save(function(error){
    if(!error){
      // res.status(200).json(product);
    }
    else{
      // res.status(500).send({error:error});
    }
    });
    
  
  }
  
  else if(result5[i].Icode!=""){
    // console.log(result5[i].Icode)
    // console.log(result5[i].Quantity)
  
    Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:sch,Civ_Elec:civ,}},
      {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
      pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
      {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:sch,Civ_Elec:civ}},
      {$project:{_id:0,Rate:1,Ratestype:1}}],as:"mrate"}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      lab:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
      q:{$cond:{if:{$eq:["$mrate",[]]},then:1,else:"$mrate"} },
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:0,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
      Water:{$cond:{if:{$eq:["$Water",""]},then:result5[i].Water,else:"$Water"}},
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Rate:1,
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result5[i].Overheads,else:"$Overheads"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,Civ_Elec:1,schyear:1
      }},{$unwind:"$q"},
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result5[i].Quantity,"$CalUnitvalue","$Quantity"]},result5[i].CalUnitvalue]},"$Calquantityvalue"]}
    ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Civ_Elec:1,schyear:1}},
    {$project:{Quantity:1,
    Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,
    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,q:1,lab:1, _id:0,Civ_Elec:1,schyear:1
    }}
    
     ],function(err,result6){ 
      console.log(result6[0].ItemCode)
  // console.log(result3)
    for(i=0;i<result6.length;i++){
   
      
       
          if(result6[i].Icode == "" && result6[i].Code!=0){
        var product = new A({
          commoncode:de,
          ItemCode:result6[i].ItemCode,
          Description:result6[i].Description,
          Code:result6[i].Code,
          Rate:result6[i].q.Rate,
          Unit:result6[i].Unit,
          Unitvalue:result6[i].Unitvalue,
          Calquantityvalue:result6[i].Calquantityvalue,
          Quantity:result6[i].Quantity,
          Water:result6[i].Water,
          Overheads:result6[i].Overheads,
          Amount:((result6[i].Quantity*result6[i].q.Rate)/result6[i].Unitvalue),
          labour_facor:result6[i].lab,
          CalUnitvalue:result6[i].CalUnitvalue,
          std:result6[i].Rate,
          cartage:result6[i].cartage,
          Stages:result6[i].Stages,
          Civ_Elec:result6[i].Civ_Elec,
          schyear:result6[i].schyear,
          Ratestype:result6[i].q.Ratestype
          // Icode:result[i].Icode
          
         
      });
  product.save(function(error){
  if(!error){
    // res.status(200).json(product);
  }
  else{
    // res.status(500).send({error:error});
  }
  });
  
  
  }
  
  
  }
  // console.log(result4);
     }
    )}
  
  
  
  
  
  
    
  
  
  
  
  }
                 
  // console.log(result3);
  }
  )}
  }
  });
  }}
  
  //console.log()
  
  })
   }
                }
                // res.json(result1) 
               }
  )}  } 
  
  res.json(result1)  
  
  }
  
  
  )
  },





















  


  


}
              module.exports = api;



          





              // labour:[{$match:{commoncode:id,Civ_Elec:civ,schyear:sch,Code:{$ne:0}}},
              //   {$project:{la:{$divide:[{$multiply:["$Amount","$labour_facor"]},100]},labour_facor:1,Amount:1,Water:1,Overheads:1,cartage:1}},
              //   {$project:{labt:{$add:["$Amount","$la"]},la:1,Amount:1,Water:1,cartage:1,Overheads:1}},
              //   {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,Overheads:1,labt:1,cartage:1}},
              //   {$project:{tot1:{$add:["$labt","$cart"]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1}},
              //   {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,tot1:1}},
              //   {$project:{wattot:{$add:["$wat","$tot1"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,}},
              //   {$project:{wattotove:{$divide:[{$multiply:["$wattot","$Overheads"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattot:1}},
              //   {$project:{fintot:{$add:["$wattotove","$wattot"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1}},
              //   {$project:{fintotcal:{$divide:["$fintot",cal]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,fintot:1}},
              
              //   // {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
              //   {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
              //   ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},
              //   totaldivcal:{$sum:"$fintotcal"}}},
              
              
              // ]