
var mongoose =require('mongoose');
var Analysisf = require('../Schemas/analysisf.schema');
var Sr2007= require('../Schemas/srrates.schema');

  var d=id;
  id="";
civ="";
sch="";
cal="";
var AcAPI={
    stor:function(req,res){
  
 

        
        //  console.log(req.body);
         id =req.body.itemcode;
         civ =req.body.Civ_Elec;
           sch =req.body.year;
        //  console.log(id);
        //  console.log( civ );
        //  console.log (sch);
        
     
        res.status(200).send({"message":"data received"});
       
    },
    //heading for required item code in sr2007 table displaying it in a analysisf component
Civcosdes:function(req,res){
    sch=parseInt(sch);
 
    // console.log(id);
    //  console.log( civ );
    // console.log (sch);
   
    // console.log(id);
    Sr2007.find({schyear:sch,Civ_Elec:civ,Itemcode:id,SR_NSR:"SR"},
    {Itemcode:1,Unit:1,Unitvalue:1,MasterDesc:1, SubHeadDes :1,
        SubMasterDesc:1,_id:0,SubMasterCode:1,Rate:1,Calquantityvalue:1,CalUnitvalue:1},
    
 
    function(err,result){
    //    console.log(result);
       res.json(result);
    });
   
        
},

//display data from analysisf(costbreakup component->table)

display1:function(req,res){

    sch=parseInt(sch);
   
    Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:{ItemCode:id}}, 
        {$match:{schyear:sch}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},
        {$project:{Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]},100]},
        ItemCode:1,Description:1,
        Unitvalue:1,Code:1,Quantity:1,Unit:1,_id:0,Stages:1, Rate:1,worktype:1,Amount:1,
        Calquantityvalue:1,CalUnitvalue:1}},
        {$sort:{Code:1}}],
    
    function(err,result){
        // console.log(result);
        for(i=0;i<result.length;i++)
{       if(result[i].Code==0 || result[i].Code==""){
    cal=result[i].CalUnitvalue/result[i].Calquantityvalue;
    // console.log(cal)
    // console.log("1")
}
else{
    cal=result[i].CalUnitvalue/result[i].Calquantityvalue;
    // console.log(cal)
    // console.log("2")
}

}
        res.json(result);
        

    });
    
},

total:function(req,res){
    {
//  console.log(cal)
   
        Analysisf.aggregate([{$facet:{
      
   labour:[{$match:{ItemCode:id,Civ_Elec:civ,schyear:sch}},
   
   {$project:{
    lab:{$cond:{if:{$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]},then:0,else:"$labour_facor"}},
    Amount:{$cond:{if:{$or:[{$eq:["$Amount","NULL"]},{$eq:["$Amount",""]}]},then:0,else:"$Amount"}},
    // Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:[1,1]},1]},100]},0.5]},100]},
    cartage:{$cond:{if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]},then:0,else:"$cartage"}},
    Water:{$cond:{if:{$or:[{$eq:["$Water","NULL"]},{$eq:["$Water",""]}]},then:0,else:"$Water"}},
    Overheads:{$cond:{if:{$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]},then:0,else:"$Overheads"}},
    Rate:{$cond:{if:{$or:[{$eq:["$Rate","NULL"]},{$eq:["$Rate",""]}]},then:0,else:"$Rate"}},
    CalUnitvalue:{$cond:{if:{$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]},then:0,else:"$CalUnitvalue"}},
    Unit:{$cond:{if:{$or:[{$eq:["$Unit","NULL"]},{$eq:["$Unit",""]}]},then:0,else:"$Unit"}},

    Unitvalue:{$cond:{if:{$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]}]},then:0,else:"$Unitvalue"}},
    Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    cess:1,gst:1
    

}},

{$project:
//     {
//     cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Quantity:1,  Unitvalue:1,
//   }},


//   {$project:
    // {tot:{$divide:[{$add:[{$multiply:[{$divide:
    // [{$multiply:[1,1]},1]},100]},0.5]},100]}, cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,Quantity:1,  Unitvalue:1,}},
    {labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,
                                 CalUnitvalue:1, Unit:1,lab:1, Unitvalue:1,Amount:1, cess:1,gst:1}},
   
     {$project:{
         la:{$divide:[{$multiply:["$Amount","$lab"]},100]},
         cess:1,gst:1,  cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Unitvalue:1}},
     {$project:{labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,
     cess:1,gst:1, CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
    {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,labt:1, cartage:1, 
    cess:1,gst:1,Unitvalue:1,     Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
  {$project:{tot1:{$add:["$labt","$cart"]},la:1,labt:1,cart:1, cartage:1, 
  cess:1,gst:1,Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
      {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,tot1:1,labt:1,cart:1, cartage:1, 
      cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   {$project:{wattot:{$add:["$wat","$tot1"]},wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
   cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
    {$project:{gsttt:{$multiply:["$wattot","$gst"]},wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
    {$project:{gstplustot:{$add:["$gsttt","$wattot"]},gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   
   
   
   
   //gst+total+water+overheads

    {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
     {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
     cess:1,gst:1, Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},

   //cess

    {$project:{cessmulfintot:{$multiply:["$fintot","$cess"]},fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
   cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   
    {$project:{fintotcal:{$divide:["$cessplusfintot",cal]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1,  Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   
    //  {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
  
  
  
     {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
     ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
        gstt:{$sum:"$gsttt"},  gsttot:{$sum:"$gstplustot"},
     over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
     cesst:{$sum:"$cessplusfintot"},
     totaldivcal:{$sum:"$fintotcal"}}},
   
    
   ],
     }},
    
      ],function(err,result){
        // console.log(result)

       
        // finres=result[0].labour[0].totaldivcal
     
        
      
       
     
        // console.log(finres)
       res.json(result)
       
     })
   
   
   
       
   }
   
   },




























civdropdown2:function(req,res){
    sch=parseInt(sch);
    console.log(id);
     console.log( civ );
    console.log (sch);
   
    Analysisf.aggregate([{$facet:{"first":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},{$project
        :{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]}]},100]}]},Quantity:1,_id:0}},{$group:{_id:null,tot:{$sum:"$total"}}}],
        "second":[{$match:{Civ_Elec:civ}},{$match:{Amount:{"$ne":"NULL"}}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Water"}},_id:0,Amount:1}},{$project:{charge:{$divide:[{$multiply:["$Amount","$five"]},100]},five:1}},{$group:{_id:1,water:{$sum:"$charge"}}},{$project:{addcharge:{$divide:[{$trunc:[{$add:[{$multiply:["$water",100]},0.5]}]},100]}}}],"charge":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
        {$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Amount"}},_id:0,
        Amount:1}},{$group:{_id:1,water:{$sum:"$five"}}}],"cpoh":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Overheads"}},Overheads:1}},{$group:{_id:"$five"}},{$group:{_id:1,over:{$sum:"$_id"}}}]}},{$project:
        {"tot":{$arrayElemAt:["$first.tot",0]},"water":{$arrayElemAt:["$charge.water",0]},"tax":{$arrayElemAt:
            ["$cpoh.over",0]},"sub":{$arrayElemAt:["$second.addcharge",0]}}},{$project:{"res":{$divide:[{$multiply:
                [{$add:["$water","$sub"]},"$tax"]},100]},tot:1,sub:1,water:1,tax:1}},{$project:
                    {"add1":{$divide:[{$add:[{$multiply:[{$add:[{$add:["$tot","$sub"]},"$res"]},100]},0.5]},100]},tot:1,sub:1,water:1,tax:1}}],
        
                   // [{"tot":1218.67,"water":1218.67,"tax":15,"sub":12.19,"add1":1415.494}]
  function(err,result){
      console.log(result);
      res.json(result);
      
  });
},
        
    
 
civdropdown3:function(req,res){
    sch=parseInt(sch);
    console.log(id);
     console.log( civ );
    console.log (sch);
  
        Analysisf.aggregate([{$facet:{"first":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},{$project
            :{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},
            "$Unitvalue"]},100]},0.5]}]},100]}]},Quantity:1,_id:0}},{$group:{_id:null,tot:{$sum:"$total"}}}],
            "second":[{$match:{Civ_Elec:civ}},{$match:{Amount:
                {"$ne":"NULL"}}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]}
            ,then:0,else:"$Water"}},_id:0,Amount:1}},{$project:{charge:{$divide:[{$multiply:["$Amount","$five"]}
            ,100]},five:1}},{$group:{_id:1,water:{$sum:"$charge"}}},{$project:{addcharge:{$divide:[{$trunc:
                [{$add:[{$multiply:["$water",100]},0.5]}]},100]}}}],"charge":[{$match:
            {Civ_Elec:civ}}]}},{$project:{"tot":{$arrayElemAt:["$first.tot",0]},"sub":{$arrayElemAt:
            ["$second.addcharge",0]}}},{$project:{"res":{$add:["$tot","$sub"]},Description:1,tot:1,sub:1}}],    
        
      function(err,result){
          console.log(result);
          res.json(result);
          
      });
     // [{"tot":1218.67,"sub":12.19,"res":1230.8600000000001}]
},
civdropdown4:function(req,res){
    sch=parseInt(sch);
    console.log(id);
     console.log( civ );
    console.log (sch);
    Analysisf.aggregate([{$facet:{"first":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},{$project
        :{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},
        "$Unitvalue"]},100]},0.5]}]},100]}]},Quantity:1,_id:0}},{$group:{_id:null,tot:{$sum:"$total"}}}],
        "second":[{$match:{Civ_Elec:civ}},{$match:{Amount:
            {"$ne":"NULL"}}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]}
        ,then:0,else:"$Water"}},_id:0,Amount:1}},{$project:{charge:{$divide:[{$multiply:["$Amount","$five"]}
        ,100]},five:1}},{$group:{_id:1,water:{$sum:"$charge"}}},{$project:{addcharge:{$divide:[{$trunc:
            [{$add:[{$multiply:["$water",100]},0.5]}]},100]}}}],"charge":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
            {$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Amount"}},_id:0,
            Amount:1}},{$group:{_id:1,water:{$sum:"$five"}}}]}},{$project:{"tot":{$arrayElemAt:["$first.tot",0]},"water":{$arrayElemAt:
        ["$charge.water",0]},"sub":{$arrayElemAt:["$second.addcharge",0]}}},{$project:{"res":{$divide:[{$trunc:[{$add:[{$multiply:[{$add:["$water",
        "$sub"]},100]},0.5]}]},100]},Description:1}}],    
      //  [{"res":1230.86}]
        function(err,result){
            console.log(result);
            res.json(result);
            
        });
      },

      civdropdown5:function(req,res){
        sch=parseInt(sch);
        console.log(id);
         console.log( civ );
        console.log (sch);
        Analysisf.aggregate([{$facet:{"first":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},{$project
            :{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},
            "$Unitvalue"]},100]},0.5]}]},100]}]},Quantity:1,_id:0}},{$group:{_id:null,tot:{$sum:"$total"}}}],
            "second":[{$match:{Civ_Elec:civ}},{$match:{Amount:{"$ne":"NULL"}}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Water"}},_id:0,Amount:1}},{$project:{charge:{$divide:[{$multiply:["$Amount","$five"]},100]},five:1}},{$group:{_id:1,water:{$sum:"$charge"}}},{$project:{addcharge:{$divide:[{$trunc:[{$add:[{$multiply:["$water",100]},0.5]}]},100]}}}],"charge":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
            {$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Amount"}},_id:0,
            Amount:1}},{$group:{_id:1,water:{$sum:"$five"}}}],"cpoh":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Overheads"}},Overheads:1}},{$group:{_id:"$five"}},{$group:{_id:1,over:{$sum:"$_id"}}}]}},{$project:
            {"tot":{$arrayElemAt:["$first.tot",0]},"water":{$arrayElemAt:["$charge.water",0]},"tax":{$arrayElemAt:
            ["$cpoh.over",0]},"sub":{$arrayElemAt:["$second.addcharge",0]}}},{$project:{"res":{$divide:[{$multiply:
            [{$add:["$water","$sub"]},"$tax"]},100]},tot:1,sub:1,water:1,tax:1}}],
          //  [{"tot":1218.67,"water":1218.67,"tax":15,"sub":12.19,"res":184.62900000000002}]
            function(err,result){
                console.log(result);
                res.json(result);
                
            });
          },
          civdropdown6:function(req,res){
            sch=parseInt(sch);
            console.log(id);
             console.log( civ );
            console.log (sch);
            Analysisf.aggregate([{$facet:{"first":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},{$project
                :{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]}]},100]}]},Quantity:1,_id:0}},{$group:{_id:null,tot:{$sum:"$total"}}}],
                "second":[{$match:{Civ_Elec:civ}},{$match:{Amount:{"$ne":"NULL"}}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Water"}},_id:0,Amount:1}},{$project:{charge:{$divide:[{$multiply:["$Amount","$five"]},100]},five:1}},{$group:{_id:1,water:{$sum:"$charge"}}},{$project:{addcharge:{$divide:[{$trunc:[{$add:[{$multiply:["$water",100]},0.5]}]},100]}}}],"charge":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
                {$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Amount"}},_id:0,
                Amount:1}},{$group:{_id:1,water:{$sum:"$five"}}}],"cpoh":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Overheads"}},Overheads:1,Calquantity:1}},{$group:{_id:"$five"}},{$group:{_id:1,over:{$sum:"$_id"}}},{$project:{over:"$over",Calquantity:1}}],
            "calval":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
            {$match:{"Calquantityvalue":{"$ne":""}}},{$match:{"Calquantityvalue":{"$ne":0}}},{$match:{"Calquantityvalue":{"$ne":"NULL"}}},{$match:{ItemCode:id}},{$group:{_id:"$Calquantityvalue"}},
                {$project:{cal:"$_id",_id:0,Calquantity:1}}],"meter":[{$match:{Civ_Elec:civ}},{$match:{Calquantity:{"$ne":"NULL"}}},{$match:{schyear:sch}},{$match:{"Overheads":{"$ne":0}}},{$match:{ItemCode:id}},{$group:{_id:"$Calquantity"}}]}},
            {$project: {"tot":{$arrayElemAt:["$first.tot",0]},"water":{$arrayElemAt:["$charge.water",0]},"tax":{$arrayElemAt:
                    ["$cpoh.over",0]},"caldes":{$arrayElemAt:["$cpoh.Calquantity",0]},"meter":{$arrayElemAt:["$meter._id",0]},"sub":{$arrayElemAt:["$second.addcharge",0]},"quan":{$arrayElemAt:["$calval.cal",0]},"quan1":{$arrayElemAt:["$calval.Calquantity",0]}}},{$project:{"res":{$divide:[{$multiply:
                        [{$add:["$water","$sub"]},"$tax"]},100]},tot:1,sub:1,water:1,tax:1,quan:1,quan1:1,caldes:1,meter:1}},{$project:
                            {"add1":{$divide:[{$divide:[{$trunc:[{$add:[{$multiply:[{$add:[{$add:["$tot","$sub"]},"$res"]},100]},0.5]}]},100]},"$quan"]},quan:1,sub:1,water:1,tax:1,quan1:1,caldes:1,meter:1}}],
                           // [{"water":1218.67,"tax":15,"meter":"Nos","sub":12.19,"quan":10,"add1":141.549}]
            
          function(err,result){
              console.log(result);
              res.json(result);
              
          });
        },
        dropcarriage:function(req,res){
                sch=parseInt(sch);
                    console.log(id);
                     console.log( civ );
                    console.log (sch);
                 Analysisf.aggregate([{$match:{Civ_Elec:civ}},
                {$match:{ItemCode:id}},{$match:{schyear:sch}},{$match:{worktype:"Carriage"}},
                {$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Rate":{"$ne":"NULL"}}},
                {$project:{total:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},
                "$Unitvalue"]},100]},0.5]},100]},ItemCode:1,Code:1,Description:1,Unitvalue:1,Quantity:1,
                _id:0,Rate:1,worktype:1,Amount:1,Unit:1}},{$sort:{_id:1}}],
                function(err,result){
                    console.log(result);
                    res.json(result);
                    
                });
              },

               dropdownmat:function(req,res){
                    sch=parseInt(sch);
                    console.log(id);
                     console.log( civ );
                    console.log (sch);
                    Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:{ItemCode:id}},{$match:{schyear:sch}},
                        {$match:{"worktype":{"$ne":"Labour"}}},{$match:{"worktype":{"$ne":"Carriage"}}},{$match:{"Quantity":{"$ne":"NULL"}}},
                        {$match:{"Rate":{"$ne":"NULL"}}},{$project:{ItemCode:1,Description:1,Unit:1, Code:1,Unitvalue:1,Quantity:1,_id:0,Rate:1,worktype:1,Amount:1}},{$sort:{_id:1}}],
                    
                    function(err,result){
                        console.log(result);
                        res.json(result);
                        
                    });
                },


                d:function(req,res){
                    sch=parseInt(sch);
                        console.log(id);
                         console.log( civ );
                        console.log (sch);

                Analysisf.aggregate([{$facet:{"first":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
                {$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Unit":{"$ne":"NULL"}}},
                {$project:{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},
                "$Unitvalue"]},100]},0.5]}]},100]}]},Quantity:1,_id:0}},{$group:{_id:null,tot:{$sum:"$total"}}}],
                "second":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch,ItemCode:id,Water:{"$ne":"NULL"},
                Water:{"$ne":""},Quantity:{"$ne":"NULL"},Rate:{"$ne":"NULL"}}},
                {$project:{tota:{$multiply:[{"$divide":[{"$multiply":["$Rate","$Quantity"]},"$Unitvalue"]},
                {$divide:["$Water",100]}]},ItemCode:1,Description:1,Code:1}},
                {$project:{total:{'$divide':[{'$trunc':{'$add':[{'$multiply':['$tota',100]},0.5]}},100]},ItemCode:1,Description:1,Code:1,_id:0,tota:1}},                                             {$group:{_id:null,tr:  {$sum:"$tota"}}}  ,{$project:{final:{$divide:[{$trunc:[{$add:[{'$multiply':['$tr',100]},0.5]}]},100]}}}],
                "charge":[{$match:{Civ_Elec:civ}}
                ,{$match:{schyear:sch}},{$match:{ItemCode:id}},{$match:{"Quantity":{"$ne":"NULL"}}},
                {$match:{"Unit":{"$ne":"NULL"}}},{$match:{"Water":{"$ne":1}}},
                {$project:{total:{$add:[{$divide:[{$trunc:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]}]},100]}]},_id:0}}],
                "cpoh":[{$match:{Civ_Elec:civ}},{$match:{schyear:sch}},
                {$match:{"Overheads":{"$ne":""}}},{$match:{ItemCode:id}},{$group:{_id:"$Overheads"}},{$project:{five:"$_id",_id:0}}]}},
                {$project:{"tot":{$arrayElemAt:["$first.tot",0]},"water":{$arrayElemAt:["$charge.total",0]},
                "tax":{$arrayElemAt:["$cpoh.five",0]},"sub":{$arrayElemAt:["$second.final",0]}}},
                {$project:{"res":{$divide:[{$multiply:[{$subtract:[{$add:["$tot","$sub"]},"$water"]},"$tax"]},100]},tot:1,sub:1,water:1,tax:1}},
                {$project:{"add1":{$divide:[{$add:[{$multiply:[{$add:[{$add:["$tot","$sub"]},"$res"]},100]},0.5]},100]},
                tot:1,sub:1,water:1,tax:1}}],


                function(err,result){
                    console.log(result);
                    res.json(result);
                    
                });
            },




            total1:function(req,res){
                sch=parseInt(sch);
                console.log(id);
                 console.log( civ );
                console.log (sch);
               
                Analysisf.aggregate([
                    {$facet:{"lab1":[{$match:{Civ_Elec: civ }},{$match:{schyear:sch}},
                    {$match:{Overheads:15}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$cartage",""]},
                    then:0,else:"$Amount"}}}},{$group: {_id:1,"withoutover1":{"$sum":"$five"}}}],"mat":[{$match:
                        {Civ_Elec: civ }},{$match:{schyear:sch}},{$match:{Overheads:15}},{$match:{ItemCode:id}},{$project:{five:
                        {$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Amount:1}},{$project:{val:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$divide:[
                            {$multiply:["$Amount","$five"]},100]},100]},0.5]}]},100]},_id:0,five:1}},{$group:{_id:1,cartage:{$sum:"$val"}}},{$project:
                                {cartage:{$divide:[{$trunc:[{$add:[{$multiply:["$cartage",100]},0.5]}]},100]}}}],"without":[{$match:
                                    {Civ_Elec: civ }},{$match:{schyear:sch}},{$match:{worktype:"Labour"}},{$match:{Stages:2}},{$match:
                                        {$or:[{Overheads:""},{Overheads:15}]}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:
                                            ["$Overheads",15]},then:0,else:"$Amount"}}}},{$group: {_id:1,"withoutover1":{"$sum":"$five"}}}],"lab2":[
                        {$match:{Civ_Elec: civ }},{$match:{schyear:sch}},{$match:{cartage:""}}
                        ,{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else:"$Amount"}}}
                        },{$group: {_id:1,"withoutover1":{"$sum":"$five"}}}],"water":[{$match:{Civ_Elec: civ }},{$match:
                            {schyear:sch}},{$match:{ItemCode:id}},{$project:{five:{$cond:{if:{$eq:["$Water",""]},then:0,else
                        :"$Water"}},Amount:1}},{$project:{water:{$divide:[{$multiply:["$Amount","$five"]},100]},_id:0}},
                        {$group:{_id:1,water:{$sum:"$water"}}},{$project:{watercharge:{$divide:[{$trunc:[{$add:[{$multiply:
                            ["$water",100]},0.5]}]},100]}}}],"labnocat":[{$match:{Civ_Elec: civ }},{$match:{schyear:sch}},{$match:
                        {ItemCode:id}},{$match:{Overheads:15}},{$match:{cartage:""}},{$project:{five:{$cond:{if:{$eq:["$Water",1]},then:0,else:
                        "$Amount"}},Amount:1}},{$group:{_id:1,water:{$sum:"$five"}}},{$project:{watercharge:{$divide:
                            [{$trunc:[{$add:[{$multiply:["$water",100]},0.5]}]},100]}}}],"overheads":[{$match:{Civ_Elec: civ }},
                            {$match:{schyear:sch}},{$match:{"Overheads":{"$ne":"NULL"}}},{$match:{"Overheads":{"$ne":0}}},
                            {$match:{"Overheads":{"$ne":""}}},{$match:{ItemCode:id}},{$group:{_id:"$Overheads"}}],"calquan":[{$match:
                        {Civ_Elec: civ }},{$match:{schyear:sch}},{$match:{"Calquantityvalue":{"$ne":0}}},{$match:
                            {"Calquantityvalue":{"$ne":""}}},{$match:{"Calquantityvalue":{"$ne":"Labour"}}},{$match:{"Calquantityvalue":
                        {"$ne":"L.S."}}},{$match:{"Calquantityvalue":{"$ne":"NULL"}}},{$match:{ItemCode:id}},{$group:
                            {_id:"$Calquantityvalue"}},{$project:{five:"$_id",_id:0}}]}},{$project:{Materialover:{$arrayElemAt:
                                ["$lab1.withoutover1",0]},cartage:{$arrayElemAt:["$mat.cartage",0]},noheads:{$arrayElemAt:
                                    ["$without.withoutover1",0]},overheads:{$arrayElemAt:["$overheads._id",0]},Labour:{$arrayElemAt:
                                        ["$lab2.withoutover1",0]},"labnocat":{$arrayElemAt:["$labnocat.watercharge",0]},"calquan":{$arrayElemAt:
                                            ["$calquan.five",0]},"water":{$arrayElemAt:["$water.watercharge",0]}}},{$project:{Total1:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$add:[{$add:[{$add:
                                                [{$add:["$Materialover","$cartage"]},"$Labour"]},"$labnocat"]},"$water"]},100]},0.5]}]},100]},Materialover:1,cartage:1,
                                                Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1}},{$project:{Total2:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$add:[{$divide:[{$multiply:[{$add:[{$add:
                        [{$add:[{$add:["$Materialover","$cartage"]},"$Labour"]},"$labnocat"]},"$water"]},"$overheads"]},100]
                        },"$Total1"]},100]},0.5]}]},100]},Total1:1,Materialover:1,cartage:1,Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1}},{$project:{Total3:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$add:["$Total2","$noheads"]},100]},0.5]}]},100]},Total1:1,Total2:1,Materialover:1,cartage:1,Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1}},
                    {$project:{Total3:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$add:["$Total2","$noheads"]},100]},0.5]}]},100]},Total1:1,Total2:1,Materialover:1,cartage:1,Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1}},{$project:{Total4:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$divide:["$Total3","$calquan"]},100]},0.5]}]},100]},Total3:1,Total1:1,Total2:1,Materialover:1,cartage:1,Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1}},
                    {$project:{Totdivover:{'$divide':[{'$trunc':[{'$add':[{'$multiply':[{$divide:[{$multiply:[{$add:[{$add:[{$add:[{$add:["$Materialover",
                    "$cartage"]},"$Labour"]},"$labnocat"]},"$water"]},"$overheads"]},100]},100]},0.5]}]},100]},Total4:1,Total3:1,Total1:1,Total2:1,Materialover:1,cartage:1,Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1}},
                    {$project:{watertoal:{$add:[{$add:["$Materialover","$cartage"]},"$Labour"]},Total4:1,Total3:1,Total1:1,Total2:1,Materialover:1,cartage:1,Labour:1,labnocat:1,water:1,overheads:1,calquan:1,noheads:1,Totdivover:1}}
                    ],
                    
                
              function(err,result){
                  console.log(result);
                  res.json(result);
                  
              });
            },



}
module.exports = AcAPI
























// dropcarriage:function(req,res){
//     sch=parseInt(sch);
//         console.log(id);
//          console.log( civ );
//         console.log (sch);
    // Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:{ItemCode:id}},{$match:{schyear:sch}},{$match:{worktype:"Carriage"}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Rate":{"$ne":"NULL"}}},{$project:{total:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]},100]},ItemCode:1,Description:1,Unitvalue:1,Quantity:1,_id:0,Rate:1,worktype:1}},{$sort:{_id:1}}],
    
    // Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:{schyear:sch,ItemCode:id,
    //     water:{"$ne":"NULL"},Quantity:{"$ne":"NULL"},Rate:{"$ne":"NULL"}}},
    //     // {$project:{tota:{"$divide":[{"$multiply":["$Rate","$Quantity"]},"$Unitvalue"]},
    //     // ItemCode:1,Description:1,Code:1}},
    //     {$project:{total: {'$divide':[{'$trunc':{'$add':[{'$multiply'
    //     :[  {'$divide':[{'$trunc':{'$add':[{'$multiply'
    //     :[{"$divide":[{"$multiply":["$Rate","$Quantity"]},"$Unitvalue"]},100]},0.5]}},100]},100]},0.5]}},100]},
    //     ItemCode:1,Code:1,Description:1,Rate:1,_id:0,worktype:1}}],
           
        
    // Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:
    // {schyear:sch,ItemCode:id,water:{"$ne":"NULL"},Quantity:{"$ne":"NULL"},
    // Rate:{"$ne":"NULL"}}},{$project:{tota:{"$divide":[{"$multiply":["$Rate","$Quantity"]},"$Unitvalue"]},
    // ItemCode:1,Description:1,Code:1,tota:1}},{$project:{total:{'$divide':[{'$trunc':
    // {'$add':[{'$multiply':['$tota',100]},0.5]}},100]},ItemCode:1,Description:1,Code:1,_id:0,total:1,worktype:1}}],
    //     function(err,result){ 
           
    //         console.log(result);
    //         res.json(result);
    //     });
    // },
  
// dropdownmat:function(req,res){
//     sch=parseInt(sch);
//     console.log(id);
//      console.log( civ );
//     console.log (sch);
//     Analysisf.aggregate([{$match:{Civ_Elec:civ}},{$match:{ItemCode:id}},{$match:{schyear:sch}},
//         {$match:{"worktype":{"$ne":"Labour"}}},{$match:{"worktype":{"$ne":"Carriage"}}},{$match:{"Quantity":{"$ne":"NULL"}}},{$match:{"Rate":{"$ne":"NULL"}}},{$project:{total:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]},100]},ItemCode:1,Description:1,Unitvalue:1,Quantity:1,_id:0,Rate:1,worktype:1}},{$sort:{_id:1}}],
    
//     function(err,result){
//         console.log(result);
//         res.json(result);
        
//     });
// },




//total
//{$project:{total:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:["$Quantity","$Rate"]},"$Unitvalue"]},100]},0.5]},100]},ItemCode:1,Description:1,Unit:1, Code:1,Unitvalue:1,Quantity:1,_id:0,Rate:1,worktype:1,Amount:1}},{$sort:{_id:1}}],










//     ana:function(req,res){
       
//         Analysisf.aggregate([{$match:{Civ_Elec:ab}},{$match:{schyear:bc,ItemCode:d,
//     water:{"$ne":"NULL"},Quantity:{"$ne":"NULL"},Rate:{"$ne":"NULL"}}},
//     {$project:{tota:{"$divide":[{"$multiply":["$Rate","$Quantity"]},"$Unitvalue"]},
//     ItemCode:1,Description:1,Code:1}},
//     {$project:{total:{'$divide':[{'$trunc':{'$add':[{'$multiply':['$tota',100]},0.5]}},100]},
//     ItemCode:1,Code:1,Description:1,Rate:1,_id:0}}],
       
//     function(err,result){ 
       
//         console.log(result);
//         res.json(result);
//     });
// },