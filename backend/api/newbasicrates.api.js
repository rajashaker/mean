var express = require('express');

var Newitems = require('../Schemas/userrates.schema');
var Rate = require('../Schemas/rate.schema');

civ=""
sch=""
type=""
user=""

civ1=""
sch1=""
type1=""
user1=""
code1=""
var b;
var  NewitemsAPI={ 
//storing
post:function(req,res){
console.log(req.body)
civ=req.body.Civ_Elec;
sch=req.body.schyear;
type=req.body.type;
user=req.body.username

res.json('ok')
},





//year in rates for elect and civil
yearciv:function(req,res){

    Rate.aggregate([{$match:{Civ_Elec:"CIVIL",Username:'123'}}, {$group:{ _id:{as:"$Schyear"}}},{$sort:{"_id.as":1}}],
    function(err,result){
        if(err){
            res.json('error')
        }
        else{
            res.json(result)
        }
    })
   

},

yearelec:function(req,res){

    Rate.aggregate([{$match:{Civ_Elec:"ELECT",Username:'123'}}, {$group:{ _id:{as:"$Schyear"}}},{$sort:{"_id.as":1}}],
    function(err,result){
        if(err){
            res.json('error')
        }
        else{
            res.json(result)
        }
    })
   

}
,
//Ratestype
typeciv:function(req,res){

    Rate.aggregate([{$match:{Civ_Elec:"CIVIL",Username:'123'}}, {$group:{ _id:{as:"$Ratestype"}}},{$sort:{"_id.as":1}}],
    function(err,result){
        if(err){
            res.json('error')
        }
        else{
            res.json(result)
        }
    })
},

typeelec:function(req,res){

    Rate.aggregate([{$match:{Civ_Elec:"ELECT",Username:'123'}}, {$group:{ _id:{as:"$Ratestype"}}},{$sort:{"_id.as":1}}],
    function(err,result){
        if(err){
            res.json('error')
        }
        else{
            res.json(result)
        }
    })
},

//group finding
group:function(req,res){
    sch=parseInt(sch)
    Rate.aggregate([{$match:{Civ_Elec:civ,Ratestype:type,Schyear:sch,Username:'123'}},  
     {$group:{ _id:{as:"$GroupM"}}},{$sort:{"_id.as":1}}],
     function(err,result){
         if(err){
             res.json('error')
         }
         else{
             res.json(result)
         }
     })
},

//unit
unit:function(req,res){
    sch=parseInt(sch)
    Rate.aggregate([{$match:{Civ_Elec:civ,Ratestype:type,Schyear:sch,Username:'123'}},  
     {$group:{ _id:"$Unit"}},{$sort:{"_id":1}}],
     function(err,result){
         if(err){
             res.json('error')
         }
         else{
             res.json(result)
         }
     })
},

//unit for update newitem rates
unitup:function(req,res){
    console.log(req.body)
   
    var a=req.body.Civ_Elec
    var b=req.body.schyear
    var c=req.body.type
    sch=parseInt(b)
    Rate.aggregate([{$match:{Civ_Elec:a,Ratestype:c,Schyear:sch,Username:'123'}},  
     {$group:{ _id:"$Unit"}},{$sort:{"_id":1}}],
     function(err,result){
         if(err){
             res.json('error')
         }
         else{
             res.json(result)
         }
     })
},








newcode:function(req,res){ 

    Rate.aggregate([{$match:{Ratestype:type,Civ_Elec:civ,Username:'123'}}, {$group:{ _id:"$Code"}},{$sort:{_id:-1}}],
    function(err,result){
        if(err){
            res.json(err)
        }
        else{
            console.log(result)
            res.json(result[0])
        }
    })
},
comparecode:function(req,res){ 
    Rate.aggregate([{$match:{Civ_Elec:civ,Username:'123'}}, {$group:{ _id:"$Code"}},{$sort:{_id:-1}}],
    function(err,result){
        if(err){
            res.json(err)
        }
        else{
            console.log(result)
            res.json(result)
        }
    })
},

save:function(request,res){
    console.log(request.body)
  
        //  console.log( request.body.rate)
        
          var newsavetwo =  new Rate({
            Slno : 0,
            Code:parseInt(request.body.code) ,
            Code1:parseInt(request.body.code) ,
            Description :request.body.description,
            Description1 :request.body.description,
            Unitvalue :request.body.unit,
            Unit :request.body.unitvalue,
            Rate : parseFloat(request.body.stdrate),
            Marketate:parseFloat(request.body.currate),
            Edit : request.body.Edit,
            Pub_pri : request.body.pub,
            Username : request.body.username,
            Civ_Elec :request.body.Civ_Elec,
            Schyear:  request.body.schyear,
            Ratestype:request.body.type,
            GroupM:request.body.group,
            test:request.body.test,
            GID:request.body.gid,
            eq_fac:request.body.eq_fac,
            eq_fac_phy:request.body.eq_fac_phy,
            Stages:request.body.stage

           });
           
           
           newsavetwo.save(function(error,result){
               if(error){
                   res.json("error in saving new item rates /bas")
                   console.log(result)
               }
               else{
                res.status(200).send({"msg":"Saved Successfully"});
               

               }
             
             
           });
           
        
          
        
        },


        newcode1:function(req,res){ 
var b=0
            Rate.aggregate([{$match:{Ratestype:type,Civ_Elec:civ,Username:'123'}}, {$group:{ _id:"$Code"}},{$sort:{_id:-1}}],
            function(err,result){
                if(err){
                    res.json(err)
                }
                else{
                    console.log(result)
                    // res.json(result[0])
        a=result[0]._id+1
        
                    Rate.aggregate([{$match:{Username:'123'}}, {$group:{ _id:"$Code"}},{$sort:{_id:-1}}],
                    function(err,result1){
                       
                        if(err){
                            res.json(err)
                        }
                        else{
                            console.log(result1)
                           for( i=0;i<result1.length;i++){
                               console.log(a)
                               console.log(result1[i]._id)
        if(a==result1[i]._id){
            this.b=result1[0]._id+1
            // console.log(this.b)
            console.log('hu')
            break
        
        }
        else {
            this.b=this.a
            
            console.log('2')
        }
        
                  }
                  console.log(this.b)
                  res.json(this.b)  
                        }
                    })
        
      
                }
            })
        },

   
     
     //standard and new only the userenters
standardnew:function(req,res){

 Rate.aggregate([{$match:{Schyear:sch,Civ_Elec:civ,Ratestype:type,Username:user,Edit:"Yes"}},
        {$project:{ss:{$cond:{if:{$eq:["$Edit","NO"]},then:"Standard",else:"New"}},
        Code:1,Description:1,Unit:1,Unitvalue:1,Marketate:1,Rate:1,Description1:1,Schyear:1,Civ_Elec:1,Ratestype:1,Username:1}}],
        function(err,result){
            if(err){
                res.json('error in new basic rates')
            }
            else{
                console.log(result)
                res.json(result)
            }
        })

},

   //view tab in new item rates
   view:function(req,res){
      


    
      console.log(req.body)

    Rate.aggregate([{$match:{Schyear:req.body.schyear,Civ_Elec:req.body.Civ_Elec,Ratestype:req.body.type,Username:req.body.username } 
    },
           {$project:{ss:{$cond:{if:{$eq:["$Edit","NO"]},then:"Standard",else:"New"}},
           Code:1,Description:1,Unit:1,Unitvalue:1,Marketate:1,Rate:1,Description1:1,Schyear:1,Civ_Elec:1,Ratestype:1,Username:1}},
           {$sort:{"Code":1}}],
           function(err,result){
               if(err){
                   res.json('error in new basic rates')
               }
               else{
                   console.log(result)
                   res.json(result)
               }
           })
 
   
   },
   


//delete query for  user's data
delete:function(req,res){
    // console.log(req.body)
    Rate.findByIdAndRemove(req.params.id,function(err, result) {
        if (err) throw err;
        // console.log("1 document deleted");
        res.json('Deleted Successfully')
      
      })
    },


    //post and update
    postand:function(req,res){
        console.log(req.body)
       code1=req.body.Code;
        civ1=req.body.Civ_Elec;
        sch1=req.body.Schyear;
        user1=req.body.Username
        type1=req.body.Ratestype

        res.json('ok1')
    },

    displaying1:function(req,res){
        console.log(code1)
        Rate.findOne({Code:code1,Schyear:sch1,Username:user1,Civ_Elec:civ1,Ratestype:type1},
        function(err,result){
            console.log(result)
            res.json(result)
          })
        },


        //update query
updatedata:function(req,res){
    
 
    
  var myquery={ Code:parseInt(req.body.code) ,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,
   Schyear:parseInt(req.body.schyear)};
    var newvalues = { $set: {Description:req.body.description,Description1:req.body.description, 
     Marketate:parseFloat(req.body.currate),Unitvalue:parseInt(req.body.unit),Unit:req.body.unitvalue } };
 Rate.updateOne(myquery, newvalues, function(err, result) {
     if (err) throw err;
        console.log("1 document updated");
     res.json('Updated Successfully')
   
   })
  
   },



}
    
module.exports =  NewitemsAPI;
