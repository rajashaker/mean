var express = require('express');
var app = express();
var Rate = require('../Schemas/rate.schema');
// var Rate = require('../schemas/product.schema');
var Analysisf = require('../Schemas/analysisf.schema');
e="";
r="";
d="";
s="";
id="";
civ="";
sch="";

var AccountAPI={


    store:function(req,res){
         e =req.body.Civ_Elec;
         d =req.body.year;
        // console.log(req.body);
    res.status(200).send({"message":"data received"});
         
    },
    

    civdropdown:function(req,res){
       
        Rate.aggregate([{$match:{Civ_Elec:"CIVIL"}},{$group:{_id:"$Schyear"}},{$sort:{"_id":1}}],
         function(err,result){
            // console.log(result);
            res.json(result);
        });
    },
  
    elecdropdown:function(req,res){

        Rate.aggregate([{$match:{Civ_Elec:"ELECT"}},{$group:{_id:"$Schyear"}},{$sort:{"_id":1}}],
        function(err,result){
            // console.log(result);
            res.json(result);
        });
    },
							
																					
					

    Labour:function(req,res){
       
        d=parseInt(d);
        // Rate.find({Schyear:d,Ratestype:"Labour",Civ_Elec:e},{Ratestype:1,Code:1,Description:1,_id:0,Unitvalue:1,Unit:1,Schyear:1,Civ_Elec:1,Rate:1},{sort:{"Code":1}},
              Rate.aggregate([{$match:{Schyear:d,Ratestype:"Labour",Civ_Elec:e}},
              {$project:{    slno:1,Code:1,	Description:1,Unitvalue:1,Unit:1,Rate:1,Ratestype:1,Marketrate:1,Username:1,Stages:1,Edit:1,test:1,	Pub_pri:1,Username:1,GroupM:1,GID:1,Code1:1,
                	Description1:1,	Civ_Elec:1,	eq_fac:1,eq_fac_phy:1,Schyear	:1,	}},{$sort:{"Code":1}}],   
           
              function(err,result){
                
                 if(err){throw new error}
                 else{
                  res.json(result);
                 }
                 
              });
         
                  
          },
          Materials:function(req,res){
             d=parseInt(d);
       
              // Rate.find({Schyear:d,Ratestype:"Materials",Civ_Elec:e},{Ratestype:1,Code:1,Unit:1,Description:1,_id:0,Unitvalue:1,Schyear:1,Civ_Elec:1,Rate:1},{sort:{"Code":1}},
              
              Rate.aggregate([{$match:{Schyear:d,Ratestype:"Materials",Civ_Elec:e}}, {$project:{    slno:1,Code:1,	Description:1,Unitvalue:1,Unit:1,Rate:1,Ratestype:1,Marketrate:1,Username:1,Stages:1,Edit:1,test:1,	Pub_pri:1,Username:1,GroupM:1,GID:1,Code1:1,
                Description1:1,	Civ_Elec:1,	eq_fac:1,eq_fac_phy:1,Schyear	:1,	}},{$sort:{"Code":1}}],
              function(err,result){
                //  console.log(result);
                 res.json(result);
              });
              
                  
          },
      
      
      Plants:function(req,res){
       d=parseInt(d);
       
          Rate.aggregate([{$match:{Schyear:d,Ratestype:"Plants",Civ_Elec:e}}, {$project:{    slno:1,Code:1,	Description:1,Unitvalue:1,Unit:1,Rate:1,Ratestype:1,Marketrate:1,Username:1,Stages:1,Edit:1,test:1,	Pub_pri:1,Username:1,GroupM:1,GID:1,Code1:1,
            Description1:1,	Civ_Elec:1,	eq_fac:1,eq_fac_phy:1,Schyear	:1,	}},{$sort:{"Code":1}}],
             function(err,result){
                //  console.log(result);
                 res.json(result);
              });
              },
          Carriage:function(req,res){
       d=parseInt(d);
    
              Rate.aggregate([{$match:{Schyear:d,Ratestype:"Carriage",Civ_Elec:e}}, {$project:{    slno:1,Code:1,	Description:1,Unitvalue:1,Unit:1,Rate:1,Ratestype:1,Marketrate:1,Username:1,Stages:1,Edit:1,test:1,	Pub_pri:1,Username:1,GroupM:1,GID:1,Code1:1,
                Description1:1,	Civ_Elec:1,	eq_fac:1,eq_fac_phy:1,Schyear	:1,	}},{$sort:{"Code":1}}],
                 function(err,result){
                //  console.log(result);
                 res.json(result);
              });
              },
      
















    update:function(req,res){
        // if(!ObjectId.isValid(req.params._id)){
        //     return res.status(400).send(`no records with given id :${req.params.id}`);
        // }  
        var emp ={
            // name:req.body.name,
                Marketrate:req.body.Marketrate,
                // quantity:req.body.quantity,
                // status:req.body.status,};
        };
        console.log(req.body);
        // console.log(emp);
        Rate.findByIdAndUpdate(req.body._id,{$set:emp},{new:true},(err,result)=>{
            if(err){
                            res.status(500).json({error:err});
                        }
                        else{
                            res.status(200).json({result:'ok'});
                        }
        });
       
        },
    
 
      stor:function(req,res){
  
 

        // e =req.body.Civ_Elec;
        //  d =req.body.product;
        
         console.log(req.body);
         id =req.body.id;
         civ =req.body.as.Civ_Elec;
           sch =req.body.as.product;
        //  console.log(id);
        //  console.log( civ );
        //  console.log (sch);
        
     
        res.status(200).send({"message":"data received"});
        return e;  
        return d;  
        return r;  
    },
    ana:function(req,res){
        sch=parseInt(sch);
        // console.log(id);
        //  console.log( civ );
        // console.log (sch);
        Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:{schyear:sch,ItemCode:id,
    water:{"$ne":"NULL"},Quantity:{"$ne":"NULL"},Rate:{"$ne":"NULL"}}},
    {$project:{tota:{"$divide":[{"$multiply":["$Rate","$Quantity"]},"$Unitvalue"]},
    ItemCode:1,Description:1,Code:1}},
    {$project:{total:{'$divide':[{'$trunc':{'$add':[{'$multiply':['$tota',100]},0.5]}},100]},
    ItemCode:1,Code:1,Description:1,Rate:1,_id:0,tota:1}}],
       
    function(err,result){ 
       
        console.log(result);
        res.json(result);
    });
},
    
      



    //BASICRATES RADIOBUTTON

basciv:function(req,res){
    Rate.aggregate([{$match:{Civ_Elec:"CIVIL"}},{$match:{Ratestype:{"$ne":4}}},{$group:{_id:"$Ratestype"}}],

    function(err,result){
        console.log(result);
        res.json(result);
    });
},
baselec:function(req,res){
    Rate.aggregate([{$match:{Civ_Elec:"ELECT"}},{$group:{_id:"$Ratestype"}}],

    function(err,result){
        console.log(result);
        res.json(result);
    });
} 

    //BASICRATES details
   

//     :function(req,res){
//         console.log(e);
    
//   d=parseInt(d);
 
//    console.log(d);
  
//     console.log(d); 
//     Rate.aggregate([{$match:{Schyear:d,Ratestype:"Plants",Civ_Elec:e}},{$project:{Ratestype:1,Code:1,Description:1,Unit:1,Unitvalue:1,_id:0,Unitvalue:1,Schyear:1,Civ_Elec:1,Rate:1}},{$sort:{"Code":1}}],
        
     
//         function(err,result){
//            console.log(result);
//            res.json(result);
//         });
       
            
//     },
   

    // Sch2007civmat:function(req,res){
    //     Rate .find({"Schyear":2007,Civ_Elec:"CIVIL",Ratestype:"Materials"},
    //     {Ratestype:1,Code:1,Description:1,_id:0,Unitvalue:1,Rate:1,Unit:1},{sort:{"Code":1}},
     
    //     function(err,result){
    //        console.log(result);
    //        res.json(result);
    //     });
    // },
    
    
    // Sch2007civplant:function(req,res){
    //     Rate .find({"Schyear":2007,Ratestype:"Plants"},
    //     {Ratestype:1,Code:1,Description:1,_id:0,Unitvalue:1,Rate:1,Unit:1,Civ_Elec:1},{sort:{"Code":1}},
     
    //     function(err,result){
    //        console.log(result);
    //        res.json(result);
    //     });
    // },
    
    // Sch2014civcarr:function(req,res){
    //     Rate .find({"Schyear":2014,Civ_Elec:"CIVIL",Ratestype:"Carriage"},
    //     {Ratestype:1,Code:1,Description:1,_id:0,Unitvalue:1,Rate:1,Unit:1},{sort:{"Code":1}},
     
    //     function(err,result){
    //        console.log(result);
    //        res.json(result);
    //     });
    // },
   
};

module.exports = AccountAPI;
// db.rate.find({"Schyear":2014,Ratestype:"Labour",Civ_Elec:"ELECT"},{Ratestype:1,Code:1,Description1:1,
//     _id:1,Unitvalue:1,Stages:1,Rate:1,Civ_Elec:1,Schyear:1,_id:0}).sort({"Code":1})
