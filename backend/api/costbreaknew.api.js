var Analysisf = require('../Schemas/analysisf.schema');
var Sr2007= require('../Schemas/srrates.schema');
var Rate = require('../Schemas/rate.schema');
var async = require('async');
var A = require('../Schemas/product.schema');
var mongoose= require('mongoose');
var Analysisfnsr = require('../Schemas/analysisfnsr.schema');
 var ss;
var cosbreakAPI={
    civ:function(req,res){

        Sr2007.aggregate([{$match:{Civ_Elec:"CIVIL",Username:"123",SR_NSR:'NSR'}},{$group:{_id:"$schyear"}},{$sort:{"_id":1}}],
        function(err,result){
        
    
            if(err){
                // throw err
            console.log('error in costbreaknew')
            res.json('error in costbreaknew civil')
                
            }
            else{
                
console.log(result)
res.json(result)
            }
        })
    },

    elect:function(req,res){
        
        Sr2007.aggregate([{$match:{Civ_Elec:"ELECT",Username:"123",SR_NSR:'NSR'}},{$group:{_id:"$schyear"}},{$sort:{"_id":1}}],
        function(err,result){
   if(err){
                // throw err
                console.log('error in costbreaknew electyear')
                res.json('error in costbreaknew elect')
                
                
            }
            else{
console.log(result)
res.json(result)
            }
        })
    },

//subheads
sub:function(req,res){
    console.log(req.body)
   let  sess = req.session;
    
    sess.year=req.body.schyear;
    sess.civ=req.body.Civ_Elec
 Sr2007.aggregate([{$match:{schyear:req.body.schyear,Civ_Elec:req.body.Civ_Elec,Username:req.body.username,SR_NSR:'NSR'}},{$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},
 {$project:{SubHeadDes:1}},{$sort:{"_id":1}}],
 function(err,result){
           // console.log(result);
           if(err){
         res.json('error in new costbreakup')
           }
          else{
            res.json(result);
          }
       });
},

//showing the sr  item in table (user's data)
showsr:function(req,res){
//     let  sess = req.session;

//     sess.year=req.body.schyear;
//     sess.civ=req.body.Civ_Elec
// sess.subheads=req.body.subheads
req.session.subheads=req.body.subheads

// console.log(req.session)

    Sr2007.aggregate([{$match:{schyear:req.body.schyear,Civ_Elec:req.body.Civ_Elec,Username:req.body.username,SR_NSR:'NSR' ,
    SubHeadCode:req.body.subheads, }},{$sort:{SubHeadCode:1,MasterCode1:1,SubMasterCode1:1,
        SSubCode:1,SubCode1:1}}],
        function(req,result){
            console.log(result)
            res.json(result)

        })

},

//getsubheads for  newcost break up component for Itemcode
subhead:function(req,res){ 
    console.log(req.body)
    console.log(req.session)
Sr2007.aggregate([{$match:{"Username":req.session.user1,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec}},
{$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},{$project:{SubHeadDes:1}},{$sort:{"_id":1}}],

function(err,result){
    if(err){
        console.log(err)
    }
    else{
        res.json(result)
    }

})
},

//byclicking subhead and get srtable
// want to put username=req.session.user1
srtable:function(req,res){
    console.log(req.body)
    Sr2007.aggregate([{$match:{schyear:req.session.year,Civ_Elec:req.body.Civ_Elec,
    Username:'123',SubHeadCode:parseInt(req.body.subheads1) }}, 
  {$sort:{ "SubHeadCode": 1, "MasterCode1": 1, "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1 }},
  ],
  function(err,result){
      if(err){
          res.json(err)
      }
      else{
          res.json(result)
      }
  })
},

//posting sr data
postsr:function(req,res){


    async.eachSeries(req.body.user, function (item, next) {
        console.log(item)
        console.log("1")
        var savecost =  new Analysisf({
                    slno:0,
                    Username:req.session.user1,
                    Islno:0,
                    ItemCode:req.body.Itemcode,
                    MLCode:req.body.Itemcode,
                    Icode:item.Itemcode,
                    Code:0,
                    Description:item.Description,
                    Calquantityvalue:parseInt(req.body.calquan),
                    CalUnitvalue:parseInt(req.body.calunit),
                    Unitvalue:item.Unitvalue,
                    weightage:0,
                    Unit:item.Unit,
                    Quantity:0,
                    particularqty:0,
                    Actualquantity:0,
                    Rate:item.Rate,
                    Rate2007:0,
                    Amount:0,
                    Amount1:0,
                    worktype:"",
                    Stages:0,
                    Water:0,
                    watercost: 0,
                    Overheads: 0,
                    overheadcost: 0,
                    Total:0,
                    Itemtotal:0,
                    Calquantity: req.body.unit,
                    Caltotal:0,
                    sno: 0,
                    cartage: 0,
                    cartagecost:0,
                    Civ_Elec:item.Civ_Elec,
                    labour_facor:0,
                    labourcost:0,
                    eq_fac: 0,
                    eq_fac_phy:0,
                    schyear:item.schyear ,
                    Wastage_desc:"",
                    Wastage:0,
                    gst:0,
                    gstcost:0,
                    cesscost:0,
                    cess:0,
                    sr_nsr:"NSR"
            
                });
              
            
            
            
                savecost.save(function(error,result){
                 console.log(result)
                 console.log('2')
                 next()
                 
               });
            

   
    
    }, function (err, result) {
        console.log('AllWorkDone');
        var myquery={  Username:req.session.user1,ItemCode:req.body.Itemcode ,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec}
        var newvalues = { $set: {
        Calquantityvalue:parseFloat(req.body.calquan)}};

        var myquery1 = {Username:req.session.user1,Itemcode:req.body.Itemcode ,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec};
        var newvalues1= { $set: {
        Calquantity:parseFloat(req.body.calquan)}};
      
        Analysisf.updateMany(myquery, newvalues, function(err, result) {
            if (err) {res.json('error')}
            else{
             console.log("1 document updated");


                Sr2007.updateOne(myquery1, newvalues1, function(err, result) {
            if (err) {res.json('error')}
            else{
             console.log("updated in sr");

        res.json('saved')
    }})
          

       
    }})
})
},


//saving useer itemcode with the code
postcode:function(req,res){


    async.eachSeries(req.body.user, function (item, next) {
        console.log(item)
        console.log("1")
        var savecost =  new Analysisf({
                    slno:0,
                    Username:req.session.user1,
                    Islno:0,
                    ItemCode:req.body.Itemcode,
                    MLCode:req.body.Itemcode,
                    Icode:'',
                    Code:item.Code,
                    Description:item.Description,
                    Calquantityvalue:parseInt(req.body.calquan),
                    CalUnitvalue:parseInt(req.body.calunit),
                    Unitvalue:item.Unitvalue,
                    weightage:0,
                    Unit:item.Unit,
                    Quantity:0,
                    particularqty:0,
                    Actualquantity:0,
                    Rate:item.Rate,
                    Rate2007:item.Rate,
                    Amount:0,
                    Amount1:0,
                    worktype:item.Ratestype,
                    Stages:0,
                    Water:0,
                    watercost: 0,
                    Overheads: 0,
                    overheadcost: 0,
                    Total:0,
                    Itemtotal:0,
                    Calquantity: req.body.unit,
                    Caltotal:0,
                    sno: 0,
                    cartage: 0,
                    cartagecost:0,
                    Civ_Elec:item.Civ_Elec,
                    labour_facor:0,
                    labourcost:0,
                    eq_fac: 0,
                    eq_fac_phy:0,
                    schyear:item.Schyear ,
                    Wastage_desc:"",
                    Wastage:0,
                    gst:0,
                    gstcost:0,
                    cesscost:0,
                    cess:0,
                    sr_nsr:"NSR"
            
                });
              
            
            
            
                savecost.save(function(error,result){
                 console.log(result)
                 console.log('2')
                 next()
                 
               });
            

   
    
    }, function (err, result) {
        console.log('AllWorkDone');
       
        var myquery={  Username:req.session.user1,ItemCode:req.body.Itemcode ,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec}
        var newvalues = { $set: {
        Calquantityvalue:parseFloat(req.body.calquan)}};

        var myquery1 = {Username:req.session.user1,Itemcode:req.body.Itemcode ,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec};
        var newvalues1= { $set: {
        Calquantity:parseFloat(req.body.calquan)}};
      
        Analysisf.updateMany(myquery, newvalues, function(err, result) {
            if (err) {res.json('error')}
            else{
             console.log("1 document updated");
            //  console.log(result);
  
          
          Sr2007.updateOne(myquery1, newvalues1, function(err, result) {
            if (err) {res.json('error')}
            else{
             console.log("updated in sr");

        res.json('saved')
    }})
    }})
     
    })
},






//view of data 

viewdata:function(req,res){
    Analysisf.aggregate([{$match:{schyear:req.session.year,Civ_Elec:req.body.Civ_Elec,
        Username:req.session.user1,ItemCode:req.body.Itemcode }}, 
     
      ],function(err,result){
// console.log(result)
res.json(result)
      }
    )
},


//updating cost break up data
updatecos:function(req,res){


    console.log('oooooooooooooooooooo')
     console.log(req.body)


    var myquery={ _id:req.body.id };

    var newvalues = { $set: {Quantity:req.body.Qty,labour_facor:req.body.labour,
        labourcost:req.body.labourcost,cartage:req.body.cartage,cartagecost:req.body.cartagetot,
    Water:req.body.water,watercost:req.body.watertot,gst:req.body.gst,gstcost:req.body.gsttot,
    Overheads:req.body.overhead,overheadcost:req.body.overtot,cess:req.body.cess,cesscost:req.body.cesstot,
Amount:req.body.amount,Total:req.body.fintotal} };
    Analysisf.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      else{
res.json('updated successfully')
      }})}

        
  
  ,

  updatecal:function(req,res){
      console.log(req.body)

      var myquery={  Username:req.session.user1,ItemCode:req.body.itemcode ,schyear:req.session.year,Civ_Elec:req.body.civ}
      var newvalues = { $set: {
      Calquantityvalue:parseFloat(req.body.calquan)}};
    
      Analysisf.updateMany(myquery, newvalues, function(err, result) {
          if (err) throw err;
          else{
           console.log("1 document updated");
           console.log(result);
        
    
          

          
    
    
        
            Analysisf.aggregate([
                { $match: { Username:req.body.username,ItemCode:req.body.itemcode,schyear:req.body.sch,Civ_Elec:req.body.civ} },
                { $group: { _id: {calquan:"$Calquantityvalue",calunit:"$CalUnitvalue"}, total: { $sum: "$Total" } } }
             ],function(err,result){
                 console.log(result)
                 if(result!=""){ 
                 console.log(result[0]._id.calunit)
                 var x=((result[0].total)*(result[0]._id.calunit/result[0]._id.calquan))
                 console.log(parseFloat(x.toFixed(2)))
                 var myquery={ Username:req.body.username,Itemcode:req.body.itemcode,schyear:req.body.sch,Civ_Elec:req.body.civ}
                 var newvalues = { $set: {
                    Rate:parseFloat(x.toFixed(2))}};
                 Sr2007.updateOne(myquery, newvalues, function(err, result) {
                    if (err) throw err;
                    else{
                     console.log("1 document updated");
                     
                     res.json(parseFloat(x.toFixed(2)));
                    
                    }
                     })

                    }else if(result==""){
                        res.json(0)
                    }
                 
             })
    
        }
        
    
      })

  },

//delete query for   new cosbreak up data
delete:function(req,res){
    // console.log(req.body)
    Analysisf.findByIdAndRemove(req.params.id,function(err, result) {
        if (err) throw err;
        // console.log("1 document deleted");
        res.json('Deleted Successfully')
      
      })
    
    
  
  },

//for code via (inserting data in add cost breakup)
ratestype:function(req,res){
    console.log(req.body)
    Rate.aggregate([
        { $match: { Schyear:req.body.schyear,Civ_Elec:req.body.Civ_Elec,Username:"123"} },
        { $group: { _id:"$Ratestype",} },{$sort:{_id:-1}}
     ],
     function(err,result){
         res.json(result)
         console.log(result)
     })
    
},

//getting data from rates with ratestype in userraterecords
//want to change in usename
data:function(req,res){
    console.log(req.body)
   Rate.aggregate([{$match:{Schyear:req.session.year,Civ_Elec:req.session.civ,Username:req.session.user1,Ratestype:req.body.type}},
        {$project:{ss:{$cond:{if:{$eq:["$Edit","NO"]},then:"Standard",else:"New"}},
        Code:1,Description:1,Unit:1,Unitvalue:1,Marketate:1,Rate:1,Description1:1,
        Schyear:1,Civ_Elec:1,Ratestype:1,Username:1}},{$sort:{Code:1}}],
        function(err,result){
            // console.log(result)
            res.json(result)
        })
    
},


//getting data from analysisf
analysisfcode:function(req,res){
    console.log('iiiiiiiiiiiiiiiiiiiiiiii')
    console.log(req.body)
    // res.json(req. body)

    async.eachSeries(req.body.user,function(item,next){

    Analysisf.aggregate([{$match:{ItemCode:item.Itemcode,schyear:req.session.year,Username:req.session.user1}},

    ],async function(err,result){
         
            console.log('aaaaa')
       
for(i=0;i<result.length;i++){

    if(result[i].Icode=="" && result[i].Code!=0){ 
   


    var savecost =  new Analysisf({
        slno:0,
        Username:req.session.user1,
        Islno:0,
        ItemCode:req.body.Itemcode,
        MLCode:req.body.Itemcode,
        Icode:'',
        Code:result[i].Code,
        Description:result[i].Description,
        Calquantityvalue:parseInt(req.body.calquan),
        CalUnitvalue:parseInt(req.body.calunit),
        Unitvalue:result[i].Unitvalue,
        weightage:0,
        Unit:result[i].Unit,
        Quantity:0,
        particularqty:0,
        Actualquantity:0,
        Rate:result[i].Rate,
        //want to add market rate in rate2007
        Rate2007:result[i].Rate,
        Amount:0,
        Amount1:0,
        worktype:result[i].Ratestype,
        Stages:result[i].Satges,
        Water:0,
        watercost: 0,
        Overheads: 0,
        overheadcost: 0,
        Total:0,
        Itemtotal:0,
        Calquantity:result[i].unit,
        Caltotal:0,
        sno: 0,
        cartage: 0,
        cartagecost:0,
        Civ_Elec:result[i].Civ_Elec,
        labour_facor:0,
        labourcost:0,
        eq_fac: 0,
        eq_fac_phy:0,
        schyear:result[i].schyear ,
        Wastage_desc:"",
        Wastage:0,
        gst:0,
        gstcost:0,
        cesscost:0,
        cess:0,
        sr_nsr:"NSR"

    });
  



    savecost.save(function(error,result){
    //  console.log(result)
    //  console.log('2')
    //  next()
     
   });


    
}
else if(result[i].Icode != "" ){ 

    // console.log(result[i].Icode)
    Analysisf.aggregate([{$match:{ItemCode:result[i].Icode,schyear:req.session.year,Username:req.session.user1}},

],function(err,result1){
    console.log('second')
    for(i=0;i<result1.length;i++){   

        if(result1[i].Icode=="" && result1[i].Code!=""){ 
            console.log(result1[i].Code)
            var savecost =  new Analysisf({
                slno:0,
                Username:req.session.user1,
                Islno:0,
                ItemCode:req.body.Itemcode,
                MLCode:req.body.Itemcode,
                Icode:'',
                Code:result1[i].Code,
                Description:result1[i].Description,
                Calquantityvalue:parseInt(req.body.calquan),
                CalUnitvalue:parseInt(req.body.calunit),
                Unitvalue:result1[i].Unitvalue,
                weightage:0,
                Unit:result1[i].Unit,
                Quantity:0,
                particularqty:0,
                Actualquantity:0,
                Rate:result1[i].Rate,
                //want to add market rate in rate2007
                Rate2007:result1[i].Rate,
                Amount:0,
                Amount1:0,
                worktype:result1[i].Ratestype,
                Stages:result1[i].Satges,
                Water:0,
                watercost: 0,
                Overheads: 0,
                overheadcost: 0,
                Total:0,
                Itemtotal:0,
                Calquantity: result1[i].unit,
                Caltotal:0,
                sno: 0,
                cartage: 0,
                cartagecost:0,
                Civ_Elec:result1[i].Civ_Elec,
                labour_facor:0,
                labourcost:0,
                eq_fac: 0,
                eq_fac_phy:0,
                schyear:result1[i].schyear ,
                Wastage_desc:"",
                Wastage:0,
                gst:0,
                gstcost:0,
                cesscost:0,
                cess:0,
                sr_nsr:"NSR"
                
            });
          
        
        
        
            savecost.save(function(error,result){
            //  console.log(result)
            //  console.log('2')
            //  next()
             
           });
        }
        else if(result1[i].Icode != "" ) {
         
            console.log(result1[i].Icode)


            Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:req.session.year,Username:req.session.user1}},

            ],function(err,result2){
                console.log('third')
                for(i=0;i<result2.length;i++){


                    if(result2[i].Icode=="" && result2[i].Code!=""){ 
                        // console.log(result1[i].Code)
                        var savecost =  new Analysisf({
                            slno:0,
                            Username:req.session.user1,
                            Islno:0,
                            ItemCode:req.body.Itemcode,
                            MLCode:req.body.Itemcode,
                            Icode:'',
                            Code:result2[i].Code,
                            Description:result2[i].Description,
                            Calquantityvalue:parseInt(req.body.calquan),
                            CalUnitvalue:parseInt(req.body.calunit),
                            Unitvalue:result2[i].Unitvalue,
                            weightage:0,
                            Unit:result2[i].Unit,
                            Quantity:0,
                            particularqty:0,
                            Actualquantity:0,
                            Rate:result2[i].Rate,
                            //want to add market rate in rate2007
                            Rate2007:result2[i].Rate,
                            Amount:0,
                            Amount1:0,
                            worktype:result2[i].Ratestype,
                            Stages:result2[i].Satges,
                            Water:0,
                            watercost: 0,
                            Overheads: 0,
                            overheadcost: 0,
                            Total:0,
                            Itemtotal:0,
                            Calquantity: result2[i].unit,
                            Caltotal:0,
                            sno: 0,
                            cartage: 0,
                            cartagecost:0,
                            Civ_Elec:result2[i].Civ_Elec,
                            labour_facor:0,
                            labourcost:0,
                            eq_fac: 0,
                            eq_fac_phy:0,
                            schyear:result2[i].schyear ,
                            Wastage_desc:"",
                            Wastage:0,
                            gst:0,
                            gstcost:0,
                            cesscost:0,
                            cess:0,
                            sr_nsr:"NSR"                   
                        });
                      
                    
                    
                    
                        savecost.save(function(error,result){
                        //  console.log(result)
                        //  console.log('2')
                        //  next()
                         
                       });
                    }
                    else if(result2[i].Icode != "" ) {
                     console.log(result2[i].Icode)



                     Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:req.session.year,Username:req.session.user1}},

                     ],function(err,result3){
                         console.log('four')
                         for(i=0;i<result3.length;i++){
         
         
                             if(result3[i].Icode=="" && result3[i].Code!=""){ 
                                 // console.log(result1[i].Code)
                                 var savecost =  new Analysisf({
                                    slno:0,
                                    Username:req.session.user1,
                                    Islno:0,
                                    ItemCode:req.body.Itemcode,
                                    MLCode:req.body.Itemcode,
                                    Icode:'',
                                    Code:result3[i].Code,
                                    Description:result3[i].Description,
                                    Calquantityvalue:parseInt(req.body.calquan),
                                    CalUnitvalue:parseInt(req.body.calunit),
                                    Unitvalue:result3[i].Unitvalue,
                                    weightage:0,
                                    Unit:result3[i].Unit,
                                    Quantity:0,
                                    particularqty:0,
                                    Actualquantity:0,
                                    Rate:result3[i].Rate,
                                    //want to add market rate in rate2007
                                    Rate2007:result3[i].Rate,
                                    Amount:0,
                                    Amount1:0,
                                    worktype:result3[i].Ratestype,
                                    Stages:result3[i].Satges,
                                    Water:0,
                                    watercost: 0,
                                    Overheads: 0,
                                    overheadcost: 0,
                                    Total:0,
                                    Itemtotal:0,
                                    Calquantity: result3[i].unit,
                                    Caltotal:0,
                                    sno: 0,
                                    cartage: 0,
                                    cartagecost:0,
                                    Civ_Elec:result3[i].Civ_Elec,
                                    labour_facor:0,
                                    labourcost:0,
                                    eq_fac: 0,
                                    eq_fac_phy:0,
                                    schyear:result3[i].schyear ,
                                    Wastage_desc:"",
                                    Wastage:0,
                                    gst:0,
                                    gstcost:0,
                                    cesscost:0,
                                    cess:0,
                                    sr_nsr:"NSR"
                             
                                 });
                               
                             
                             
                             
                                 savecost.save(function(error,result){
                                 //  console.log(result)
                                 //  console.log('2')
                                 //  next()
                                  
                                });
                             }

                             else if(result3[i].Icode != ""){
// console.log(result3[i].Icode)



Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:req.session.year,Username:req.session.user1}},

],function(err,result4)
{
    console.log('four')
    for(i=0;i<result4.length;i++){


        if(result4[i].Icode=="" && result4[i].Code!=""){ 
            // console.log(result1[i].Code)
            var savecost =  new Analysisf({
                slno:0,
        Username:req.session.user1,
        Islno:0,
        ItemCode:req.body.Itemcode,
        MLCode:req.body.Itemcode,
        Icode:'',
        Code:result4[i].Code,
        Description:result4[i].Description,
        Calquantityvalue:parseInt(req.body.calquan),
        CalUnitvalue:parseInt(req.body.calunit),
        Unitvalue:result4[i].Unitvalue,
        weightage:0,
        Unit:result4[i].Unit,
        Quantity:0,
        particularqty:0,
        Actualquantity:0,
        Rate:result4[i].Rate,
        //want to add market rate in rate2007
        Rate2007:result4[i].Rate,
        Amount:0,
        Amount1:0,
        worktype:result4[i].Ratestype,
        Stages:result4[i].Satges,
        Water:0,
        watercost: 0,
        Overheads: 0,
        overheadcost: 0,
        Total:0,
        Itemtotal:0,
        Calquantity: result4[i].unit,
        Caltotal:0,
        sno: 0,
        cartage: 0,
        cartagecost:0,
        Civ_Elec:result4[i].Civ_Elec,
        labour_facor:0,
        labourcost:0,
        eq_fac: 0,
        eq_fac_phy:0,
        schyear:result4[i].schyear ,
        Wastage_desc:"",
        Wastage:0,
        gst:0,
        gstcost:0,
        cesscost:0,
        cess:0,
        sr_nsr:"NSR"

            });
          
        


        
        
            savecost.save(function(error,result){
            //  console.log(result)
            //  console.log('2')
            //  next()
             
           });
        }
       
    }})



                             }
                  
                            }})




                    }



                }}
            )

        }
            

    }
       


})
}


        }
     next()
       
     
    }
    )
   
    

},function(){
   
    console.log('done')
    var myquery={  Username:req.session.user1,ItemCode:req.body.Itemcode ,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec}
        var newvalues = { $set: {
        Calquantityvalue:parseFloat(req.body.calquan)}};

        var myquery1={  Username:req.session.user1,Itemcode:req.body.Itemcode ,schyear:req.session.year,Civ_Elec:req.body.Civ_Elec}
        var newvalues1 = { $set: {
        Calquantity:parseFloat(req.body.calquan)}};
   
      
        Analysisf.updateMany(myquery, newvalues, function(err, result) {
            if (err) {res.json('error')}
            else{
             console.log("1 document updated");
            //  console.log(result);

            Sr2007.updateOne(myquery1, newvalues1, function(err, result) {
                if (err) {res.json('error')}
                else{
                 console.log("1 document updated");
                 res.json('er')
                }})
          

           
    }})

})


},



viewcos:function(req,res){
    console.log(req.body)
    Analysisf.aggregate([
        { $match: {ItemCode:req.body.itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec}}],
    function(err,result){
        if(err){
            res.json('error')
        }
        else{
            console.log(result)
             a=result
            res.json(result)

      

        }
    })
   
},
    



totalfornewcos:function(req,res){
    {
console.log(req.body)
console.log('ppppppppppppppppppppppppppppppp')
   
        Analysisf.aggregate([{$facet:{
      
   labour:[ { $match: {ItemCode:req.body.itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec}},
   
   {$project:{
    lab:{$cond:{if:{$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]},then:0,else:"$labour_facor"}},
    Amount:{$cond:{if:{$or:[{$eq:["$Amount","NULL"]},{$eq:["$Amount",""]}]},then:0,else:"$Amount"}},
    // Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:[1,1]},1]},100]},0.5]},100]},
    cartage:{$cond:{if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]},then:0,else:"$cartage"}},
    Water:{$cond:{if:{$or:[{$eq:["$Water","NULL"]},{$eq:["$Water",""]}]},then:0,else:"$Water"}},
    Overheads:{$cond:{if:{$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]},then:0,else:"$Overheads"}},
    Rate:{$cond:{if:{$or:[{$eq:["$Rate","NULL"]},{$eq:["$Rate",""]}]},then:0,else:"$Rate"}},
    CalUnitvalue:{$cond:{if:{$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]},then:0,else:"$CalUnitvalue"}},
    Calquantityvalue:{$cond:{if:{$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]}]},then:0,else:"$Calquantityvalue"}},
    Unit:{$cond:{if:{$or:[{$eq:["$Unit","NULL"]},{$eq:["$Unit",""]}]},then:0,else:"$Unit"}},

    Unitvalue:{$cond:{if:{$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]}]},then:0,else:"$Unitvalue"}},
    Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    cess:1,gst:1
    

}},


   
     {$project:{
         la:{$divide:[{$multiply:["$Amount","$lab"]},100]},Calquantityvalue:1,
         cess:1,gst:1,  cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Unitvalue:1}},
     {$project:{labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,Calquantityvalue:1,
     cess:1,gst:1, CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
    {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,labt:1, cartage:1, Calquantityvalue:1,
    cess:1,gst:1,Unitvalue:1,     Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
  {$project:{tot1:{$add:["$labt","$cart"]},la:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
  cess:1,gst:1,Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},


  
      {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,tot1:1,labt:1,cart:1, cartage:1, 
      Calquantityvalue:1, cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   {$project:{wattot:{$add:["$wat","$tot1"]},wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
   cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},
   
    {$project:{gsttt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1}},
    {$project:{gstplustot:{$add:["$gsttt","$wattot"]},gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1}},
   
   
   
   
   //gst+total+water+overheads

    {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1}},
     {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
     cess:1,gst:1, Unitvalue:1, Calquantityvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1}},

   //cess

    {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Calquantityvalue:1}},
   {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
   cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1}},
   
    {$project:{fintotcal:{$multiply:[{$divide:["$CalUnitvalue","$Calquantityvalue"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
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
          if(err){
              console.log('error')
          }
       
        if(result!=""){

        
    
       console.log(parseFloat(result[0].labour[0].totaldivcal.toFixed(2)))



       var myquery={ ItemCode:req.body.itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec}
       var newvalues = { $set: {
       Rate:parseFloat(result[0].labour[0].totaldivcal)}};

      
       
     
       Sr2007.updateOne(myquery, newvalues, function(err, result1) {
           if (err) {res.json('error')}
           else{
            console.log("1 document updated");


            
    res.json(result) 
       
     }}
    )
    }
    else{
       
    }  
   
   
   
       
   })}
   
   },



   balaji:function(req,res){

    console.time()
    
    
      console.log(req.body);
        Sr2007.aggregate([{$match:{SubHeadCode:2,schyear:2007,Username:'123',Civ_Elec:'CIVIL',SR_NSR:"NSR",Rate:{$ne:0},Calquantity:{$ne:0}}},
        {$sort:{"SubHeadCode": 1, "MasterCode1": 1,"SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
        {$project:{ Unitvalue:{$cond:{if:{$eq:["$Unitvalue",0]},then:1,else:"$Unitvalue"}},
        Calquantity:{$cond:{if:{$eq:["$Calquantity",0]},then:1,else:"$Calquantity"}},
            Itemcode:1,Username:1,SubHeadCode:1,_id:0}}], function(err,result){
      if(err){
        res.status(500).json({code: 500, message: 'Internal server error'});
      }
      else{
        
        async.eachSeries(result, function (item, outerCallback) {
          console.log(item.Itemcode)
        
          Analysisf.aggregate([{$match:{ItemCode:item.Itemcode,schyear:2007,Username:'123',Civ_Elec:'CIVIL',sr_nsr:'SR'}},
          ],function(err,result1){
            console.log('1')
            // console.log(result1)
            for(i=0;i<result1.length;i++)
            {
               if(result1[i].Icode == "" && result1[i].Code!=0)
           
               {
                   cal=item.Unitvalue/item.Calquantity
                console.log(item.Unitvalue)
                console.log(item.Calquantity);
      
                var product = new A({
                  commoncode:item.Itemcode,
                  ItemCode:result1[i].ItemCode,
                  Description:result1[i].Description,
                  Code:result1[i].Code,
                  Quantity:result1[i].Quantity,
                  Rate:result1[i].Rate2007,
                  std:result1[i].Rate,
                  Unit:result1[i].Unit,
                  Unitvalue:result1[i].Unitvalue,
                  Calquantityvalue:item.Calquantity,
                  Water:result1[i].Water,
                  Overheads:result1[i].Overheads,
                  Amount:((result1[i].Quantity*result1[i].Rate2007 )/result1[i].Unitvalue),
                  labour_facor:result1[i].labour_facor,
                  CalUnitvalue:item.Unitvalue,
                  cartage:result1[i].cartage,
                  Civ_Elec:result1[i].Civ_Elec,
                  schyear:result1[i].schyear,
                  Stages:result1[i].Stages,
                  Ratestype:result1[i].Ratestype,
                  cess:result1[i].cess,
                  gst:result1[i].gst,
                  Username:item.Username,
                  subheads:item.SubHeadCode
                 
              
                  
              
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
                //   console.log(result1[i].Quantity)
      
      
                    Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL',sr_nsr:'SR'}},
                    {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                    labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
                   
                    cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
                    Water:{$cond:{if:{$eq:["$Water",""]},then:result1[i].Water,else:"$Water"}},
                    Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result1[i].Overheads,else:"$Overheads"}},
                    CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
                    Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
                   Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
                    wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
                    }},
                    {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result1[i].Quantity,"$CalUnitvalue","$Quantity"]},result1[i].CalUnitvalue]},"$Calquantityvalue"]},
                    Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
                    Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}                         
                     ],function(err,result2){ 
                  
                        console.log('2')
                    for(i=0;i<result2.length;i++){
                     
                      if(result2[i].Icode == "" && result2[i].Code!=0 ){
                        // console.log(result2[i].ItemCode)
              
                         
                        var product = new A({
                          commoncode:item.Itemcode,
                          ItemCode:result2[i].ItemCode,
                          Description:result2[i].Description,
                          Code:result2[i].Code,
                          Rate:result2[i].Rate,
                          Unit:result2[i].Unit,
                          Unitvalue:result2[i].Unitvalue,
                          Calquantityvalue:item.Calquantity,
                          Quantity:result2[i].Quantity,
                          Water:result2[i].Water,
                          Overheads:result2[i].Overheads,
                          Amount:((result2[i].Quantity*result2[i].Rate)/result2[i].Unitvalue),
                          labour_facor:result2[i].labour_facor,
                          CalUnitvalue:item.Unitvalue,
                          std:result2[i].Rate,
                          cartage:result2[i].cartage,
                          Civ_Elec:result2[i].Civ_Elec,
                          schyear:result2[i].schyear,
                          Stages:result2[i].Stages,
                            Ratestype:result2[i].Ratestype,
                            cess:result2[i].cess,
                  gst:result2[i].gst,
                  Username:item.Username,
                  subheads:item.SubHeadCode
                          // Icode:result[i].Icode
                          
                         
                      });
            product.save(function(error){
                if(!error){
                    // res.status(200).json(product);
                    console.log('saved icode1')
                }
                else{
                    // res.status(500).send({error:error});
                  
                }
            });
          
      
      
      
      
        }
    
    
        
      
      
        
    //     //5.9.5
        else if(result2[i].Icode != ""  ){
          // console.log(result2[i].Icode)
          // console.log(result2[i].Quantity)
          Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
          {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
          labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
         
          cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
          Water:{$cond:{if:{$eq:["$Water",""]},then:result2[i].Water,else:"$Water"}},
          Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result2[i].Overheads,else:"$Overheads"}},
          CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
          Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
         Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
          wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
          }},
          {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result2[i].Quantity,"$CalUnitvalue","$Quantity"]},result2[i].CalUnitvalue]},"$Calquantityvalue"]}
          ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
          Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}       
           ],function(err,result3){ 
       
          for(i=0;i<result3.length;i++){
         
            
             
                if(result3[i].Icode == "" && result3[i].Code!=0){
              var product = new A({
                commoncode:item.Itemcode,
                ItemCode:result3[i].ItemCode,
                Description:result3[i].Description,
                Code:result3[i].Code,
                Rate:result3[i].Rate,
                Unit:result3[i].Unit,
                Unitvalue:result3[i].Unitvalue,
                Calquantityvalue:item.Calquantity,
                Quantity:result3[i].Quantity,
                Water:result3[i].Water,
                Overheads:result3[i].Overheads,
                Amount:((result3[i].Quantity*result3[i].Rate)/result3[i].Unitvalue),
                labour_facor:result3[i].labour_facor,
                CalUnitvalue:item.Unitvalue,
                std:result3[i].Rate,
                cartage:result3[i].cartage,
                Stages:result3[i].Stages,
                Civ_Elec:result3[i].Civ_Elec,
                schyear:result3[i].schyear,
                Ratestype:result3[i].Ratestype,
                cess:result3[i].cess,
                  gst:result3[i].gst,
                  Username:item.Username,
                  subheads:item.SubHeadCode
                // Icode:result[i].Icode
                
               
            });
      product.save(function(error){
      if(!error){
          // res.status(200).json(product);
          console.log('savedicode2')
      }
      else{
          // res.status(500).send({error:error});
      }
      });
      }
        
    
      else if(result3[i].Icode!=""){
      // console.log(result3[i].Icode)
      // console.log(result3[i].Quantity)
      
      Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
     
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
      Water:{$cond:{if:{$eq:["$Water",""]},then:result3[i].Water,else:"$Water"}},
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result3[i].Overheads,else:"$Overheads"}},
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
      }},
      
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result3[i].Quantity,"$CalUnitvalue","$Quantity"]},result3[i].CalUnitvalue]},"$Calquantityvalue"]}
      ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}
      
      ],function(err,result4){ 
      console.log('3')
      // console.log(result3)
      for(i=0;i<result4.length;i++){
      
      
      
      if(result4[i].Icode == "" && result4[i].Code!=0){
      var product = new A({
        commoncode:item.Itemcode,
      ItemCode:result4[i].ItemCode,
      Description:result4[i].Description,
      Code:result4[i].Code,
      Rate:result4[i].Rate,
      Unit:result4[i].Unit,
      Unitvalue:result4[i].Unitvalue,
      Calquantityvalue:item.Calquantity,
      Quantity:result4[i].Quantity,
      Water:result4[i].Water,
      Overheads:result4[i].Overheads,
      Amount:((result4[i].Quantity*result4[i].Rate)/result4[i].Unitvalue),
      labour_facor:result4[i].labour_facor,
      CalUnitvalue:item.Unitvalue,
      std:result4[i].Rate,
      cartage:result4[i].cartage,
      Stages:result4[i].Stages,
      Civ_Elec:result4[i].Civ_Elec,
      schyear:result4[i].schyear,
      Ratestype:result4[i].Ratestype,
      cess:result4[i].cess,
                  gst:result4[i].gst,
                  Username:item.Username,
                  subheads:item.SubHeadCode
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
      
      Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
     
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
      Water:{$cond:{if:{$eq:["$Water",""]},then:result4[i].Water,else:"$Water"}},
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result4[i].Overheads,else:"$Overheads"}},
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
      }},
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result4[i].Quantity,"$CalUnitvalue","$Quantity"]},result4[i].CalUnitvalue]},"$Calquantityvalue"]}
      ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}} 
      ],function(err,result5){ 
      // console.log(result5[0].ItemCode)
      // console.log(result3)
      console.log('4')
      for(i=0;i<result5.length;i++){
      
      
      
        if(result5[i].Icode == "" && result5[i].Code!=0){
      var product = new A({
        commoncode:item.Itemcode,
        ItemCode:result5[i].ItemCode,
        Description:result5[i].Description,
        Code:result5[i].Code,
        Rate:result5[i].Rate,
        Unit:result5[i].Unit,
        Unitvalue:result5[i].Unitvalue,
        Calquantityvalue:item.Calquantity,
        Quantity:result5[i].Quantity,
        Water:result5[i].Water,
        Overheads:result5[i].Overheads,
        Amount:((result5[i].Quantity*result5[i].Rate)/result5[i].Unitvalue),
        labour_facor:result5[i].labour_facor,
        CalUnitvalue:item.Unitvalue,
        std:result5[i].Rate,
        cartage:result5[i].cartage,
        Stages:result5[i].Stages,
        Civ_Elec:result5[i].Civ_Elec,
        schyear:result5[i].schyear,
        Ratestype:result5[i].Ratestype,
        cess:result5[i].cess,
                  gst:result5[i].gst,
                  Username:item.Username,
                  subheads:item.SubHeadCode
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
      
      Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
      {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
      labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
     
      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
      Water:{$cond:{if:{$eq:["$Water",""]},then:result5[i].Water,else:"$Water"}},
      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result5[i].Overheads,else:"$Overheads"}},
      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
      wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
      }},
      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result5[i].Quantity,"$CalUnitvalue","$Quantity"]},result5[i].CalUnitvalue]},"$Calquantityvalue"]}
      ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}
      
      ],function(err,result6){ 
      console.log(result6[0].ItemCode)
      // console.log(result3)
      for(i=0;i<result6.length;i++){
      
      
      
      if(result6[i].Icode == "" && result6[i].Code!=0){
      var product = new A({
        commoncode:item.Itemcode,
      ItemCode:result6[i].ItemCode,
      Description:result6[i].Description,
      Code:result6[i].Code,
      Rate:result6[i].Rate,
      Unit:result6[i].Unit,
      Unitvalue:result6[i].Unitvalue,
      Calquantityvalue:item.Calquantity,
      Quantity:result6[i].Quantity,
      Water:result6[i].Water,
      Overheads:result6[i].Overheads,
      Amount:((result6[i].Quantity*result6[i].Rate)/result6[i].Unitvalue),
      labour_facor:result6[i].labour_facor,
      CalUnitvalue:item.Unitvalue,
      std:result6[i].Rate,
      cartage:result6[i].cartage,
      Stages:result6[i].Stages,
      Civ_Elec:result6[i].Civ_Elec,
      schyear:result6[i].schyear,
      Ratestype:result6[i].Ratestype,
      cess:result6[i].cess,
                  gst:result6[i].gst,
                  Username:item.Username,
                  subheads:item.SubHeadCode
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
      )} 
    
      } 
    
      
      
          outerCallback()
            
          })
          
        },function(){
           
     
    
    
    
    Sr2007.aggregate([{$match:{SubHeadCode:9,schyear:req.body.schyear,schyear:2007,Username:'',Civ_Elec:'CIVIL',SR_NSR:'SR',Rate:{$ne:0}}},
    {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
    {$project:{Itemcode:1,Calquantity:1,_id:0}}], function(err,result){
    if(err){
    res.status(500).json({code: 500, message: 'Internal server error'});
    }
    else{
    async.eachSeries(result, function (item, outerCallbac) {
    
    //  cal= item.Calquantity
      console.log(item.Itemcode)
     console.log(cal)
    
     A.aggregate([{$facet:{
      
    labour:[{$match:{commoncode:item.Itemcode,schyear:2007,Civ_Elec:'CIVIL'}},
     {$project:{la:{$divide:[{$multiply:["$Amount","$labour_facor"]},100]},labour_facor:1,Amount:1,Water:1,Overheads:1,cartage:1,
     Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{labt:{$add:["$Amount","$la"]},la:1,Amount:1,Water:1,cartage:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,Overheads:1,labt:1,cartage:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{tot1:{$add:["$labt","$cart"]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,tot1:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{wattot:{$add:["$wat","$tot1"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{gstt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
     {$project:{gstplustot:{$add:["$gstt","$wattot"]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
    
    
    
    
    
     {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
     {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
    
     {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
     {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
    
     {$project:{fintotcal:{$multiply:[{$divide:["$CalUnitvalue","$Calquantityvalue"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
    
     //{$project:{fintotcal:{$divide:["$cessplusfintot",cal]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,lwattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
    
     {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
     ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
        gstt:{$sum:"$gstt"},  gsttot:{$sum:"$gstplustot"},
     over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
     cesst:{$sum:"$cessplusfintot"},
     totaldivcal:{$sum:"$fintotcal"}}}],
    
    
    
     }},
    
      ],function(err,result){
        console.log(result)
        console.log(result[0].labour[0])
    
    
    if(result[0].labour[0]=="" || result[0].labour[0]==undefined ){
        finres=0
    }
    else{ 
    
       
      finres=parseFloat(result[0].labour[0].totaldivcal.toFixed(2))
    }
       
        var myquery = { Itemcode: item.Itemcode,schyear:2007,Username:'',Civ_Elec:'CIVIL',SR_NSR:'SR'};
        var new_values = {currentrate:finres };
      
       
    Sr2007.updateOne(myquery,  {$set: new_values},function(err,result){
        if(err ){
            console.log(error)
        }
        else{
            console.log(finres)
      
            outerCallbac()
        }
    })
      
     
     })
    }, function(){
      A.deleteMany({schyear:2007,Civ_Elec:'CIVIL',},function(err){
        
        console.log("deleted")
      })
      console.timeEnd()
      res.json("update and deleted")
    
    })
    
    }})
    
    
    
    
          
        })
      }
      console.log(result)
      }
       )
      
      },
    

 








//user current rate calculation for sr and datas from analysif with usernamae

marketrate:async function(req,res){
    console.time()
    console.log(req.body)
    
    try {





let a = await Analysisf.aggregate([{ $match: { ItemCode: req.body.itemcode, 
    schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username,sr_nsr:req.body.srnsr } },
    
{$project: {
  
                
    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]}, then: 0, else: "$labour_facor" } },
    Quantity: { $cond: { if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
    cartage: { $cond: { if: {$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]}, then: 0, else: "$cartage" } },
    Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]}]}, then: 0, else: "$Water" } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]}, then: 0, else: "$Overheads" } },
     Rate2007: { $cond: { if: {$or:[{$eq:["$lRate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
     CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]}, then: 1, else: "$CalUnitvalue" } },
    Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]}]}, then: 0, else: "$gst" } },
    cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]}]}, then: 0, else: "$cess" } },
    _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Calquantityvalue: 1, Code: 1, Stages: 1,
    wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1, CalUnitvalue: 1,Username:1,Rate:1
            }
        }], async function (err, result) {
        
 

            for (const qw of result) {




                if (qw.Icode == "" && qw.Code != 0) {
                   

                    console.log('firsticode==empty')
                    var product = new A({
         commoncode: req.body.itemcode,
        ItemCode: qw.ItemCode,
        Description: qw.Description,
        Code: qw.Code,
        Quantity: parseFloat(qw.Quantity.toFixed(4)),
        Rate: qw.Rate2007,
        std: qw.Rate,
        Unit: qw.Unit,
        Unitvalue: qw.Unitvalue,
        Calquantityvalue: qw.Calquantityvalue,
        Water: qw.Water,
        Overheads: qw.Overheads,
        Amount: parseFloat((qw.Quantity * qw.Rate2007 / qw.Unitvalue).toFixed(2)),
        labour_facor: qw.lab,
        CalUnitvalue: qw.CalUnitvalue,
        cartage: qw.cartage,
        Civ_Elec: qw.Civ_Elec,
         schyear: qw.schyear,
         Stages: qw.Stages,
          Username:req.body.username,
         usercalquan:req.body.calquantity,
         userunit:req.body.unit,
         srnsr:req.body.srnsr,
             cess:qw.cess,
gst:qw.gst,
subheads:req.body.subhead,
date:req.body.date,

labourcost:parseFloat(((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*(qw.lab/100)).toFixed(2)),
cartagecost:parseFloat(((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*(qw.lab/100))+(qw.Quantity * qw.Rate2007 / qw.Unitvalue))*qw.cartage/100).toFixed(2)),
watercost:parseFloat(((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(qw.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(qw.gst/100)).toFixed(2)),
overcost:parseFloat((((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(qw.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(1+qw.Overheads/100))*(qw.cess/100)).toFixed(2))



                    });
                    let save = await product.save()
                    console.log('save')


                }


                else if (qw.Icode != "") {                                                                                                                                                {
                    console.log(qw.Icode)
                    console.log('firsticode!=empty')
                    console.log('labour = ' +qw.lab)
                    console.log('Quantity = ' +qw.Quantity  + '   Unit = '  +  qw.Unitvalue)

   try {
       let x = await Analysisf.aggregate([{ $match: { ItemCode: qw.Icode, 
        schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username: req.body.username } },
        
        {$project: {
                              
    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: qw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
    Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
     cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:qw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
     Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: qw.Water, else: {"$sum":["$Water",qw.Water]} } },
     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:qw.gst, else: {"$sum":["$gst",qw.gst]} } },
     cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:qw.cess, else: {"$sum":["$cess",qw.cess]} } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:qw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
     Rate2007: { $cond: { if: {$or:[{$eq:["$lRate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
     CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
    Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
     Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
    _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,
                                wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                            }
                        }, 
         {
    $project: {
     Quantity: { $divide: [{ $divide: [{ $multiply: [qw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, qw.Unitvalue] }
     , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007:1,
    Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1,  lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                            }
                        },

                        ])

console.log(x)

for (const sw of x) {


                            if (sw.Icode == "" && sw.Code != 0) {
                                console.log('secondicode==empty')
                                console.log(sw.Quantity)

                                var product = new A({
                                    commoncode: req.body.itemcode,
                                    ItemCode: sw.ItemCode,
                                    Description: sw.Description,
                                    Code: sw.Code,
                                    Quantity: parseFloat(sw.Quantity.toFixed(4)),
                                    Rate: sw.Rate2007,
                                    std: sw.Rate,
                                    Unit: sw.Unit,
                                    Unitvalue: sw.Unitvalue,
                                    Calquantityvalue: sw.Calquantityvalue,
                                    Water: sw.Water,
                                    Overheads: sw.Overheads,
                                    Amount: parseFloat((sw.Quantity * sw.Rate2007 / sw.Unitvalue).toFixed(2)),
                                    labour_facor: sw.lab,
                                    CalUnitvalue: sw.CalUnitvalue,
                                    cartage: sw.cartage,
                                    Civ_Elec: sw.Civ_Elec,
                                    schyear: sw.schyear,
                                    Stages: sw.Stages,
                                  
                                    Username:req.body.username,
                                    usercalquan:req.body.calquantity,
                                    userunit:req.body.unit,
                                    srnsr:req.body.srnsr,
                                    cess:sw.cess,
                                    gst:sw.gst,
                                    subheads:req.body.subhead,
                                    date:req.body.date,
 labourcost:parseFloat(((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*(sw.lab/100)).toFixed(2)),
 cartagecost:parseFloat(((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*(sw.lab/100))+(sw.Quantity * sw.Rate2007 / sw.Unitvalue))*sw.cartage/100).toFixed(2)),
 watercost:parseFloat(((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(sw.Water/100)).toFixed(2)),
 gstcost:parseFloat(((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(sw.gst/100)).toFixed(2)),
 overcost:parseFloat((((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(sw.Overheads/100)).toFixed(2)),
 cesscost:parseFloat(((((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(1+sw.Overheads/100))*(sw.cess/100)).toFixed(2))





                                });
                                let save1 = await product.save()
                                console.log('save1')


                            }


  else if (sw.Icode != "") {
            console.log('po')
         console.log(sw.Icode)
         console.log(sw.Water)

     console.log('secondicode!=empty')

        try {
            let x1 = await Analysisf.aggregate([{ $match: { ItemCode: sw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
             
                {$project: {
                                          
lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: sw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
 cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:sw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
 Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: sw.Water, else: {"$sum":["$Water",qw.Water]} } },
 gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:sw.gst, else: {"$sum":["$gst",qw.gst]} } },
cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:sw.cess, else: {"$sum":["$cess",qw.cess]} } },
 Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:sw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
 Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
 CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
_id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                                        }
                                    }, 

 { $project: {
    Quantity: { $divide: [{ $divide: [{ $multiply: [sw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, sw.Unitvalue] }
    , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1, Rate2007: 1,
    Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
}
},                                      
                                
])
                            
for (const tw of x1) {                              

    if (tw.Icode == "" && tw.Code != 0) {
        console.log(tw.Code)
        console.log(tw.Icode)
        console.log('thirdicode==empty')

        var product = new A({
            commoncode: req.body.itemcode,
            ItemCode: tw.ItemCode,
            Description: tw.Description,
            Code: tw.Code,
            Quantity: parseFloat(tw.Quantity.toFixed(4)),
            Rate: tw.Rate2007,
            std: tw.Rate,
            Unit: tw.Unit,
            Unitvalue: tw.Unitvalue,
            Calquantityvalue: tw.Calquantityvalue,
            Water: tw.Water,
            Overheads: tw.Overheads,
            Amount: parseFloat((tw.Quantity * tw.Rate2007 / tw.Unitvalue).toFixed(2)),
            labour_facor: tw.lab,
            CalUnitvalue: tw.CalUnitvalue,
            cartage: tw.cartage,
            Civ_Elec: tw.Civ_Elec,
            schyear: tw.schyear,
            Stages: tw.Stages,
            // Ratestype: tw.q.Ratestype,
            Username:req.body.username,
            usercalquan:req.body.calquantity,
            userunit:req.body.unit,
            srnsr:req.body.srnsr,
            cess:tw.cess,
            gst:tw.gst,
            subheads:req.body.subhead,
            date:req.body.date,
            labourcost:parseFloat(((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*(tw.lab/100)).toFixed(2)),
            cartagecost:parseFloat(((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*(tw.lab/100))+(tw.Quantity * tw.Rate2007 / tw.Unitvalue))*tw.cartage/100).toFixed(2)),
            watercost:parseFloat(((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(tw.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(tw.gst/100)).toFixed(2)),
overcost:parseFloat((((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(tw.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(1+tw.Overheads/100))*(tw.cess/100)).toFixed(2))                                              

      // console.log(tw)
});
let save2 = await product.save()
console.log('save2')


}     

                                  
else if (tw.Icode != "") {
    console.log(tw.Icode)
               console.log('thirdicode!=empty')
    try {
     let x2 = await Analysisf.aggregate([{ $match: { ItemCode: tw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username } },
   {
 $project: {
    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: tw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
    Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
     cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:tw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
     Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: tw.Water, else: {"$sum":["$Water",qw.Water]} } },
     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:tw.gst, else: {"$sum":["$gst",qw.gst]} } },
    cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:tw.cess, else: {"$sum":["$cess",qw.cess]} } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:tw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
     Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
     CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
    Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
    Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
    _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
 }},
     {
     $project: {
Quantity: { $divide: [{ $divide: [{ $multiply: [tw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, tw.Unitvalue] }
    , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
     Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1,  lab: 1, Civ_Elec: 1, schyear: 1, _id: 0, cess: 1, gst: 1,Username:1
                       }
                   },
                      

                   ])

       // console.log(x2)
       for (const fw of x2) {


        if (fw.Icode == "" && fw.Code != 0) {
            console.log(fw.Code)
            console.log(fw.Icode)
            console.log('fourthicode==empty')

    var product = new A({
                commoncode: req.body.itemcode,
                ItemCode: fw.ItemCode,
                Description: fw.Description,
                Code: fw.Code,
                Quantity: parseFloat((fw.Quantity).toFixed(4)),
                Rate: fw.Rate2007,
                std: fw.Rate,
                Unit: fw.Unit,
                Unitvalue: fw.Unitvalue,
                Calquantityvalue: fw.Calquantityvalue,
                Water: fw.Water,
                Overheads: fw.Overheads,
                Amount: ((fw.Quantity * fw.Rate2007 / fw.Unitvalue)),
                labour_facor: fw.lab,
                CalUnitvalue: fw.CalUnitvalue,
                cartage: fw.cartage,
                Civ_Elec: fw.Civ_Elec,
                schyear: fw.schyear,
                Stages: fw.Stages,
                // Ratestype: fw.q.Ratestype,
                Username:req.body.username,
usercalquan:req.body.calquantity,
userunit:req.body.unit,
srnsr:req.body.srnsr,
cess:fw.cess,
gst:fw.gst,
subheads:req.body.subhead,
date:req.body.date,
labourcost:parseFloat(((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*(fw.lab/100)).toFixed(2)),
cartagecost:parseFloat(((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*(fw.lab/100))+(fw.Quantity * fw.Rate2007 / fw.Unitvalue))*fw.cartage/100).toFixed(2)),
watercost:parseFloat(((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(fw.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(fw.gst/100)).toFixed(2)),
overcost:parseFloat((((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(fw.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(1+fw.Overheads/100))*(fw.cess/100)).toFixed(2))                                                     


            });
            let save3 = await product.save()
            console.log('save3')

        }


 else if (fw.Icode != "") {
     console.log(fw.Icode)

console.log('forthicode!=empty')

try {

    let x3 = await Analysisf.aggregate([{ $match: { ItemCode: fw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
        {
$project: {
 lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: fw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
     Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
 cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:fw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
  Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: fw.Water, else: {"$sum":["$Water",qw.Water]} } },
  gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:fw.gst, else: {"$sum":["$gst",qw.gst]} } },
cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:fw.cess, else: {"$sum":["$cess",qw.cess]} } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:fw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
  Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
_id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
            }},               {
                    $project: {
                        Quantity: { $divide: [{ $divide: [{ $multiply: [fw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fw.Unitvalue] }
                        , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
                        Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                    }
                },

               
                ])
                // console.log(x3)

  for (const fiw of x3) {

     if (fiw.Icode == "" && fiw.Code != 0)
      {
        console.log(fiw.Code)
                        console.log(fiw.Icode)
                        console.log('fifthicode==empty')
                        console.log(fiw.ItemCode)


                        var product = new A({
                            commoncode: req.body.itemcode,
                            ItemCode: fiw.ItemCode,
                            Description: fiw.Description,
                            Code: fiw.Code,
                            Quantity: parseFloat(fiw.Quantity.toFixed(4)),
                            Rate: fiw.Rate2007,
                            std: fiw.Rate,
                            Unit: fiw.Unit,
                            Unitvalue: fiw.Unitvalue,
                            Calquantityvalue: fiw.Calquantityvalue,
                            Water: fiw.Water,
                            Overheads: fiw.Overheads,
                            Amount: parseFloat((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue).toFixed(2)),
                            labour_facor: fiw.lab,
                            CalUnitvalue: fiw.CalUnitvalue,
                            cartage: fiw.cartage,
                            Civ_Elec: fiw.Civ_Elec,
                            schyear: fiw.schyear,
                            Stages: fiw.Stages,
                            // Ratestype: fiw.q.Ratestype,
                            Username:req.body.username,
                            usercalquan:req.body.calquantity,
                            userunit:req.body.unit,
                            srnsr:req.body.srnsr,
                            cess:fiw.cess,
                            gst:fiw.gst,
                            subheads:req.body.subhead,
                            date:req.body.date,
                            labourcost:parseFloat(((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*(fiw.lab/100)).toFixed(2)),
                            cartagecost:parseFloat(((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*(fiw.lab/100))+(fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue))*fiw.cartage/100).toFixed(2)),
                            watercost:parseFloat(((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(fiw.Water/100)).toFixed(2)),
    gstcost:parseFloat(((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(fiw.gst/100)).toFixed(2)),
    overcost:parseFloat((((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(fiw.Overheads/100)).toFixed(2)),
    cesscost:parseFloat(((((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(1+fiw.Overheads/100))*(fiw.cess/100)).toFixed(2))
    


  });
 let save4 = await product.save()
     console.log('save4')


     }

     else if (fiw.Icode != "") {
        console.log(fiw.Icode)
     console.log('fifthicode!=empty')

      try {

     let x4 = await Analysisf.aggregate([{ $match: { ItemCode: fiw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
        {
            $project: {
             lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: fiw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
                 Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
             cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:fiw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
              Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: fiw.Water, else: {"$sum":["$Water",qw.Water]} } },
              gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:fiw.gst, else: {"$sum":["$gst",qw.gst]} } },
            cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:fiw.cess, else: {"$sum":["$cess",qw.cess]} } },
                 Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:fiw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
              Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
            Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
            Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
            _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                        }}, 

      {
        $project: {
            Quantity: { $divide: [{ $divide: [{ $multiply: [fiw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fiw.Unitvalue] }
            , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1, Rate2007: 1,
            Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
        }
    },                   

                         
                            ])
console.log(x4)

 for (const six of x4) {



  if (six.Icode == "" && six.Code != 0) {
    console.log(six.Code)
    console.log(six.Icode)
    console.log('sixicode==empty')
    console.log(six.ItemCode)


    var product = new A({
        commoncode: req.body.itemcode,
        ItemCode: six.ItemCode,
        Description: six.Description,
        Code: six.Code,
        Quantity: parseFloat(six.Quantity.toFixed(2)),
        Rate: six.Rate2007,
        std: six.Rate,
        Unit: six.Unit,
        Unitvalue: six.Unitvalue,
        Calquantityvalue: six.Calquantityvalue,
        Water: six.Water,
        Overheads: six.Overheads,
        Amount: parseFloat((six.Quantity * six.Rate2007/ six.Unitvalue).toFixed(2)),
        labour_facor: six.lab,
        CalUnitvalue: six.CalUnitvalue,
        cartage: six.cartage,
        Civ_Elec: six.Civ_Elec,
        schyear: six.schyear,
        Stages: six.Stages,
        // Ratestype: six.q.Ratestype,
        Username:req.body.username,
        usercalquan:req.body.calquantity,
        userunit:req.body.unit,
        srnsr:req.body.srnsr,
        cess:six.cess,
        gst:six.gst,
        subheads:req.body.subhead,
        date:req.body.date,
        labourcost:parseFloat(((six.Quantity * six.Rate2007 / six.Unitvalue)*(six.lab/100)).toFixed(2)),
        cartagecost:parseFloat(((((six.Quantity * six.Rate2007 / six.Unitvalue)*(six.lab/100))+(six.Quantity * six.Rate2007 / six.Unitvalue))*six.cartage/100).toFixed(2)),
        watercost:parseFloat(((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
overcost:parseFloat((((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))




    });
                                   
    let save5 = await product.save()
      console.log('save5')


    }
    else if (six.Icode != '') {
        console.log(six.Icode)
        console.log('sixthicode!=empty')


    try {
 let x5 = await Analysisf.aggregate([{ $match: { ItemCode: six.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
         ,  {
            $project: {
             lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: six.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
                 Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
             cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:six.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
              Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then:six.Water, else: {"$sum":["$Water",qw.Water]} } },
              gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:six.gst, else: {"$sum":["$gst",qw.gst]} } },
            cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:six.cess, else: {"$sum":["$cess",qw.cess]} } },
                 Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:six.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
              Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
            Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
            Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
            _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                        }}, 

                                            
                        {
                            $project: {
                                Quantity: { $divide: [{ $divide: [{ $multiply: [six.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, six.CalUnitvalue] }
                                , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
                                Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                            }
                        },
                              

                                   
                                        ])



                                        for (const sev of x5) {


                                            if (sev.Icode == "" && sev.Code != 0) {
                                                console.log(sev.Code)
                                                console.log(sev.Icode)
                                                console.log('fifthicode==empty')
                                                console.log(sev.ItemCode)


                                                var product = new A({
                                                    commoncode: req.body.itemcode,
                                                    ItemCode: sev.ItemCode,
                                                    Description: sev.Description,
                                                    Code: sev.Code,
                                                    Quantity: sev.Quantity,
                                                    Rate: sev.Rate2007,
                                                    std: sev.Rate,
                                                    Unit: sev.Unit,
                                                    Unitvalue: sev.Unitvalue,
                                                    Calquantityvalue: sev.Calquantityvalue,
                                                    Water: sev.Water,
                                                    Overheads: sev.Overheads,
                                                    Amount: ((sev.Quantity * sev.Rate2007 / sev.Unitvalue)),
                                                    labour_facor: sev.lab,
                                                    CalUnitvalue: sev.CalUnitvalue,
                                                    cartage: sev.cartage,
                                                    Civ_Elec: sev.Civ_Elec,
                                                    schyear: sev.schyear,
                                                    Stages: sev.Stages,
                                                    Ratestype: sev.q.Ratestype,
                                                    Username:req.body.username,
                                                    usercalquan:req.body.calquantity,
                                                    userunit:req.body.unit,
                                                    srnsr:req.body.srnsr,
                                                    cess:sev.cess,
                                                    gst:sev.gst,
                                                    subheads:req.subhead,
                                                    date:req.body.date,
                                                    labourcost:parseFloat(((six.Quantity * sev.Rate2007 / six.Unitvalue)*(six.lab/100)).toFixed(2)),
                                                    cartagecost:parseFloat(((((six.Quantity * sev.Rate2007 / six.Unitvalue)*(six.lab/100))+(six.Quantity * sev.Rate2007 / six.Unitvalue))*six.cartage/100).toFixed(2)),
                                                    watercost:parseFloat(((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
                            gstcost:parseFloat(((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
                            overcost:parseFloat((((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
                            cesscost:parseFloat(((((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))
                                                });
                                                let save6 = await product.save()
                                                console.log('save6')

                                            }
                                        }
                                          


                                    } catch (err) {

                                    }

                                }
 }
}
                        catch (err) {
                            console.log(err)
}









}
}



            } catch (err) {
                console.log(err)
            }











        }

    }                                             




                                            }
                                            catch (err) {
                                                console.log(err)
                                            }

                                            console.log(tw.Icode)
                                        }





                                  }
                                }
                                catch (err) {
                                    console.log(err)
                                }









                             }


                       }
                    }
                    catch (err) {
                        console.log(err)
                    }






// //                     //                             }



                    // }
                    // )








       }








    }







          }

    //    let total = await   A.aggregate([{$facet:{
      
    //         labour:[ { $match: {commoncode:req.body.itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads }},
            
    //         {$project:{
    //          lab:{$cond:{if:{$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]},then:0,else:"$labour_facor"}},
    //          Amount:{$cond:{if:{$or:[{$eq:["$Amount","NULL"]},{$eq:["$Amount",""]}]},then:0,else:"$Amount"}},
    //          // Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:[1,1]},1]},100]},0.5]},100]},
    //          cartage:{$cond:{if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]},then:0,else:"$cartage"}},
    //          Water:{$cond:{if:{$or:[{$eq:["$Water","NULL"]},{$eq:["$Water",""]}]},then:0,else:"$Water"}},
    //          Overheads:{$cond:{if:{$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]},then:0,else:"$Overheads"}},
    //          Rate:{$cond:{if:{$or:[{$eq:["$Rate","NULL"]},{$eq:["$Rate",""]}]},then:0,else:"$Rate"}},
    //          CalUnitvalue:{$cond:{if:{$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]},then:0,else:"$CalUnitvalue"}},
    //          Calquantityvalue:{$cond:{if:{$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]}]},then:0,else:"$Calquantityvalue"}},
    //          Unit:{$cond:{if:{$or:[{$eq:["$Unit","NULL"]},{$eq:["$Unit",""]}]},then:0,else:"$Unit"}},
         
    //          Unitvalue:{$cond:{if:{$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]}]},then:0,else:"$Unitvalue"}},
    //          Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
    //          cess:1,gst:1,userunit:1,usercalquan:1
             
         
    //      }},
         
         
            
    //           {$project:{
    //               la:{$divide:[{$multiply:["$Amount","$lab"]},100]},Calquantityvalue:1,userunit:1,usercalquan:1,
    //               cess:1,gst:1,  cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Unitvalue:1}},
    //           {$project:{labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,Calquantityvalue:1,
    //           cess:1,gst:1, CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
    //          {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,labt:1, cartage:1, Calquantityvalue:1,
    //          cess:1,gst:1,Unitvalue:1,     Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
    //        {$project:{tot1:{$add:["$labt","$cart"]},la:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
    //        cess:1,gst:1,Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
         
         
           
    //            {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //            Calquantityvalue:1, cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
    //         {$project:{wattot:{$add:["$wat","$tot1"]},wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
    //         cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
            
    //          {$project:{gsttt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //          cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
    //          {$project:{gstplustot:{$add:["$gsttt","$wattot"]},gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //          cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
            
            
            
            
    //         //gst+total+water+overheads
         
    //          {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //          cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
    //           {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //           cess:1,gst:1, Unitvalue:1, Calquantityvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
         
    //         //cess
         
    //          {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //          cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Calquantityvalue:1,userunit:1,usercalquan:1}},
    //         {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //         cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
            
    //          {$project:{fintotcal:{$multiply:[{$divide:["$userunit","$usercalquan"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
    //          cess:1,gst:1,  Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
            
    //          //  {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
           
           
           
    //           {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
    //           ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
    //              gstt:{$sum:"$gsttt"},  gsttot:{$sum:"$gstplustot"},
    //           over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
    //           cesst:{$sum:"$cessplusfintot"},
    //           totaldivcal:{$sum:"$fintotcal"}} },
            
             
    //         ],
    //           }},
             
    //            ])


            //    if(total[0].labour[0]=="" || total[0].labour[0]==undefined ){
            //        var fintoot=0
            //    }else{

               

            //    console.log(total[0].labour[0].totaldivcal)

            //    var myquery={ Itemcode:req.body.itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,SR_NSR:'NSR'}
            //    var newvalues = { $set: {
            //    currentrate:parseFloat(total[0].labour[0].totaldivcal)}};
        
              
            //    console.log(req.body)
               
             
            // let srup=   await Sr2007.updateOne(myquery, newvalues, async function(err,result){
            //     console.log(result)
            // })
               

       
            let display = await A.find({ commoncode:req.body.itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,date:req.body.date })

            await res.json(display)

        })
        
console.timeEnd()

        

    }
    catch (err) {
        console.log(err)
    }





        



},


//total for calucated data which is taken  table and update it in sr user current rata3e field

totalsr: async function(req,res){
    console.log(req.body)
    console.log('tttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')

try{


    let total = await   A.aggregate([{$facet:{
      
        labour:[ { $match: {commoncode:req.body.itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads ,srnsr:req.body.srnsr,date:req.body.date}},
        
        {$project:{
         lab:{$cond:{if:{$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]},then:0,else:"$labour_facor"}},
         Amount:{$cond:{if:{$or:[{$eq:["$Amount","NULL"]},{$eq:["$Amount",""]}]},then:0,else:"$Amount"}},
         // Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:[1,1]},1]},100]},0.5]},100]},
         cartage:{$cond:{if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]},then:0,else:"$cartage"}},
         Water:{$cond:{if:{$or:[{$eq:["$Water","NULL"]},{$eq:["$Water",""]}]},then:0,else:"$Water"}},
         Overheads:{$cond:{if:{$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]},then:0,else:"$Overheads"}},
         Rate:{$cond:{if:{$or:[{$eq:["$Rate","NULL"]},{$eq:["$Rate",""]}]},then:0,else:"$Rate"}},
         CalUnitvalue:{$cond:{if:{$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]},then:0,else:"$CalUnitvalue"}},
         Calquantityvalue:{$cond:{if:{$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]}]},then:0,else:"$Calquantityvalue"}},
         Unit:{$cond:{if:{$or:[{$eq:["$Unit","NULL"]},{$eq:["$Unit",""]}]},then:0,else:"$Unit"}},
     
         Unitvalue:{$cond:{if:{$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]}]},then:0,else:"$Unitvalue"}},
         Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
         cess:1,gst:1,userunit:1,usercalquan:1
         
     
     }},
     
     
        
          {$project:{
              la:{$divide:[{$multiply:["$Amount","$lab"]},100]},Calquantityvalue:1,userunit:1,usercalquan:1,
              cess:1,gst:1,  cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Unitvalue:1}},
          {$project:{labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,Calquantityvalue:1,
          cess:1,gst:1, CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
         {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,labt:1, cartage:1, Calquantityvalue:1,
         cess:1,gst:1,Unitvalue:1,     Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
       {$project:{tot1:{$add:["$labt","$cart"]},la:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
       cess:1,gst:1,Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
     
     
       
           {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,tot1:1,labt:1,cart:1, cartage:1, 
           Calquantityvalue:1, cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
        {$project:{wattot:{$add:["$wat","$tot1"]},wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
        cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
        
         {$project:{gsttt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
         cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
         {$project:{gstplustot:{$add:["$gsttt","$wattot"]},gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
         cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
        
        
        
        
        //gst+total+water+overheads
     
         {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
         cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
          {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
          cess:1,gst:1, Unitvalue:1, Calquantityvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
     
        //cess
     
         {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
         cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Calquantityvalue:1,userunit:1,usercalquan:1}},
        {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
        cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
        
         {$project:{fintotcal:{$multiply:[{$divide:["$userunit","$usercalquan"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
         cess:1,gst:1,  Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
        
         //  {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
       
       
       
          {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
          ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
             gstt:{$sum:"$gsttt"},  gsttot:{$sum:"$gstplustot"},
          over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
          cesst:{$sum:"$cessplusfintot"},
          totaldivcal:{$sum:"$fintotcal"}} },
        
         
        ],
          }},
         
           ])


           if(total[0].labour[0]=="" || total[0].labour[0]==undefined ){
                fintot = 0 
            }
else{ 

    console.log(total[0].labour)
           
fintot =total[0].labour[0].totaldivcal
    console.log(total[0].labour[0].totaldivcal)
           

               var myquery={ Itemcode:req.body.itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,SR_NSR:'NSR'}
               var newvalues = { $set: {
               currentrate:parseFloat(fintot.toFixed(2))}};
        
              
               
               
             
            let srup =   await Sr2007.updateOne(myquery, newvalues, async function(err,result){
                console.log(result)

             await A.deleteMany({commoncode:req.body.itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads ,srnsr:req.body.srnsr,date:req.body.date,})
             await res.json(total[0].labour)
            })
        }}
        catch(err){
console.log(err)
        }

},

//update rates  for analysisf and rates for user
updaterates:async function(req,res){
    console.log(req.body)
    var myquery={ Code:req.body.code,schyear:req.body.schyear, Username:req.body.username,Civ_Elec:req.body.civ}
       
        var myquery1={ Code:req.body.code,Schyear:req.body.schyear, Username:req.body.username,Civ_Elec:req.body.civ}
           
               var newvalues = { $set: {Rate2007:req.body.currentrate}};
               
               var newvalues1 = { $set: { Marketate:req.body.currentrate}};
               
let x=await Analysisf.updateMany(myquery, newvalues, async function(err,result){
    console.log(result)
})
// await Rate.updateMany({myquery, newvalues1})
let x1=await Rate.updateMany(myquery1, newvalues1, async function(err,result){
    console.log(result)
})
await res.json('updated')

},




//calculating nsr

totalnsr:async function(req,res){
    console.time()
    console.log(req.body)
    
    try {
     let rr=await   Sr2007.aggregate([{$match:{SubHeadCode:req.body.subhead,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,SR_NSR:req.body.srnsr,Rate:{$ne:0},Calquantity:{$ne:0}}},
        {$sort:{"SubHeadCode": 1, "MasterCode1": 1,"SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
        {$project:{ Unitvalue:{$cond:{if:{$eq:["$Unitvalue",0]},then:1,else:"$Unitvalue"}},
        Calquantity:{$cond:{if:{$eq:["$Calquantity",0]},then:1,else:"$Calquantity"}},
            Itemcode:1,Username:1,SubHeadCode:1,_id:0}}])

for(const xx of rr){  
console.log('Itemcode = ' + xx.Itemcode + ' calquan = ' +xx.Calquantity +'unit  =' +xx.Unitvalue)

let a = await Analysisf.aggregate([{ $match: { ItemCode: xx.Itemcode, 
    schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username,sr_nsr:req.body.srnsr } },
    
{$project: {
  
                
    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]}, then: 0, else: "$labour_facor" } },
    Quantity: { $cond: { if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
    cartage: { $cond: { if: {$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]}, then: 0, else: "$cartage" } },
    Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]}]}, then: 0, else: "$Water" } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]}, then: 0, else: "$Overheads" } },
     Rate2007: { $cond: { if: {$or:[{$eq:["$lRate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
     CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]}, then: 1, else: "$CalUnitvalue" } },
    Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]}]}, then: 0, else: "$gst" } },
    cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]}]}, then: 0, else: "$cess" } },
    _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Calquantityvalue: 1, Code: 1, Stages: 1,
    wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1, CalUnitvalue: 1,Username:1,Rate:1
            }
        }])
        
 

            for(const qw of a) {




                if (qw.Icode == "" && qw.Code != 0) {
                   

                    console.log('firsticode==empty')
                    var product = new Analysisfnsr({
         commoncode:  xx.Itemcode,
        ItemCode: qw.ItemCode,
        Description: qw.Description,
        Code: qw.Code,
        Quantity: parseFloat(qw.Quantity.toFixed(4)),
        Rate: qw.Rate2007,
        std: qw.Rate,
        Unit: qw.Unit,
        Unitvalue: qw.Unitvalue,
        Calquantityvalue: qw.Calquantityvalue,
        Water: qw.Water,
        Overheads: qw.Overheads,
        Amount: parseFloat((qw.Quantity * qw.Rate2007 / qw.Unitvalue).toFixed(2)),
        labour_facor: qw.lab,
        CalUnitvalue: qw.CalUnitvalue,
        cartage: qw.cartage,
        Civ_Elec: qw.Civ_Elec,
         schyear: qw.schyear,
         Stages: qw.Stages,
          Username:req.body.username,
         usercalquan:xx.Calquantity,
         userunit:xx.Unitvalue,
         srnsr:req.body.srnsr,
             cess:qw.cess,
gst:qw.gst,
subheads:req.body.subhead,
date:req.body.date,

labourcost:parseFloat(((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*(qw.lab/100)).toFixed(2)),
cartagecost:parseFloat(((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*(qw.lab/100))+(qw.Quantity * qw.Rate2007 / qw.Unitvalue))*qw.cartage/100).toFixed(2)),
watercost:parseFloat(((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(qw.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(qw.gst/100)).toFixed(2)),
overcost:parseFloat((((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(qw.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(1+qw.Overheads/100))*(qw.cess/100)).toFixed(2))



                    });
                    let save = await product.save()
                    console.log('save')


                }


                else if (qw.Icode != "") {                                                                                                                                                {
                    console.log(qw.Icode)
                    console.log('firsticode!=empty')
                    console.log('labour = ' +qw.lab)
                    console.log('Quantity = ' +qw.Quantity  + '   Unit = '  +  qw.Unitvalue)

   try {
       let x = await Analysisf.aggregate([{ $match: { ItemCode: qw.Icode, 
        schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username: req.body.username } },
        
        {$project: {
                              
    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: qw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
    Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
     cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:qw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
     Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: qw.Water, else: {"$sum":["$Water",qw.Water]} } },
     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:qw.gst, else: {"$sum":["$gst",qw.gst]} } },
     cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:qw.cess, else: {"$sum":["$cess",qw.cess]} } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:qw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
     Rate2007: { $cond: { if: {$or:[{$eq:["$lRate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
     CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
    Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
     Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
    _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,
                                wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                            }
                        }, 
         {
    $project: {
     Quantity: { $divide: [{ $divide: [{ $multiply: [qw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, qw.Unitvalue] }
     , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007:1,
    Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1,  lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                            }
                        },

                        ])

// console.log(x)

for (const sw of x) {


                            if (sw.Icode == "" && sw.Code != 0) {
                                console.log('secondicode==empty')
                                console.log(sw.Quantity)

                                var product = new Analysisfnsr({
                                    commoncode: xx.Itemcode,
                                    ItemCode: sw.ItemCode,
                                    Description: sw.Description,
                                    Code: sw.Code,
                                    Quantity: parseFloat(sw.Quantity.toFixed(4)),
                                    Rate: sw.Rate2007,
                                    std: sw.Rate,
                                    Unit: sw.Unit,
                                    Unitvalue: sw.Unitvalue,
                                    Calquantityvalue: sw.Calquantityvalue,
                                    Water: sw.Water,
                                    Overheads: sw.Overheads,
                                    Amount: parseFloat((sw.Quantity * sw.Rate2007 / sw.Unitvalue).toFixed(2)),
                                    labour_facor: sw.lab,
                                    CalUnitvalue: sw.CalUnitvalue,
                                    cartage: sw.cartage,
                                    Civ_Elec: sw.Civ_Elec,
                                    schyear: sw.schyear,
                                    Stages: sw.Stages,
                                  
                                    Username:req.body.username,
                                    usercalquan:xx.Calquantity,
                                    userunit:xx.Unitvalue,
                                    srnsr:req.body.srnsr,
                                    cess:sw.cess,
                                    gst:sw.gst,
                                    subheads:req.body.subhead,
                                    date:req.body.date,
 labourcost:parseFloat(((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*(sw.lab/100)).toFixed(2)),
 cartagecost:parseFloat(((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*(sw.lab/100))+(sw.Quantity * sw.Rate2007 / sw.Unitvalue))*sw.cartage/100).toFixed(2)),
 watercost:parseFloat(((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(sw.Water/100)).toFixed(2)),
 gstcost:parseFloat(((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(sw.gst/100)).toFixed(2)),
 overcost:parseFloat((((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(sw.Overheads/100)).toFixed(2)),
 cesscost:parseFloat(((((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(1+sw.Overheads/100))*(sw.cess/100)).toFixed(2))





                                });
                                
                                let save1 = await product.save()
                                console.log('save1')


                            }


  else if (sw.Icode !== " ") {
            console.log('po')
         console.log(sw.Icode)
         console.log(sw.Water)

     console.log('secondicode!=empty')

        try {
            let x1 = await Analysisf.aggregate([{ $match: { ItemCode: sw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
             
                {$project: {
                                          
lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: sw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
 cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:sw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
 Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: sw.Water, else: {"$sum":["$Water",qw.Water]} } },
 gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:sw.gst, else: {"$sum":["$gst",qw.gst]} } },
cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:sw.cess, else: {"$sum":["$cess",qw.cess]} } },
 Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:sw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
 Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
 CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
_id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                                        }
                                    }, 

 { $project: {
    Quantity: { $divide: [{ $divide: [{ $multiply: [sw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, sw.Unitvalue] }
    , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1, Rate2007: 1,
    Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
}
},                                      
                                
])
                            
for (const tw of x1) {                              

    if (tw.Icode == "" && tw.Code != 0) {
        console.log(tw.Code)
        console.log(tw.Icode)
        console.log('thirdicode==empty')

        var product = new Analysisfnsr({
            commoncode:  xx.Itemcode,
            ItemCode: tw.ItemCode,
            Description: tw.Description,
            Code: tw.Code,
            Quantity: parseFloat(tw.Quantity.toFixed(4)),
            Rate: tw.Rate2007,
            std: tw.Rate,
            Unit: tw.Unit,
            Unitvalue: tw.Unitvalue,
            Calquantityvalue: tw.Calquantityvalue,
            Water: tw.Water,
            Overheads: tw.Overheads,
            Amount: parseFloat((tw.Quantity * tw.Rate2007 / tw.Unitvalue).toFixed(2)),
            labour_facor: tw.lab,
            CalUnitvalue: tw.CalUnitvalue,
            cartage: tw.cartage,
            Civ_Elec: tw.Civ_Elec,
            schyear: tw.schyear,
            Stages: tw.Stages,
            // Ratestype: tw.q.Ratestype,
            Username:req.body.username,
            usercalquan:xx.Calquantity,
            userunit:xx.Unitvalue,
            srnsr:req.body.srnsr,
            cess:tw.cess,
            gst:tw.gst,
            subheads:req.body.subhead,
            date:req.body.date,
            labourcost:parseFloat(((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*(tw.lab/100)).toFixed(2)),
            cartagecost:parseFloat(((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*(tw.lab/100))+(tw.Quantity * tw.Rate2007 / tw.Unitvalue))*tw.cartage/100).toFixed(2)),
            watercost:parseFloat(((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(tw.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(tw.gst/100)).toFixed(2)),
overcost:parseFloat((((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(tw.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(1+tw.Overheads/100))*(tw.cess/100)).toFixed(2))                                              

      // console.log(tw)
});
let save2 = await product.save()
console.log('save2')


}     

                                  
else if (tw.Icode != "") {
    console.log(tw.Icode)
               console.log('thirdicode!=empty')
    try {
     let x2 = await Analysisf.aggregate([{ $match: { ItemCode: tw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username } },
   {
 $project: {
    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: tw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
    Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
     cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:tw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
     Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: tw.Water, else: {"$sum":["$Water",qw.Water]} } },
     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:tw.gst, else: {"$sum":["$gst",qw.gst]} } },
    cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:tw.cess, else: {"$sum":["$cess",qw.cess]} } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:tw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
     Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
     CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
    Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
    Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
    _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
 }},
     {
     $project: {
Quantity: { $divide: [{ $divide: [{ $multiply: [tw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, tw.Unitvalue] }
    , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
     Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1,  lab: 1, Civ_Elec: 1, schyear: 1, _id: 0, cess: 1, gst: 1,Username:1
                       }
                   },
                      

                   ])

       // console.log(x2)
       for (const fw of x2) {


        if (fw.Icode == "" && fw.Code != 0) {
            console.log(fw.Code)
            console.log(fw.Icode)
            console.log('fourthicode==empty')

    var product = new Analysisfnsr({
                commoncode: xx.Itemcode,
                ItemCode: fw.ItemCode,
                Description: fw.Description,
                Code: fw.Code,
                Quantity: parseFloat((fw.Quantity).toFixed(4)),
                Rate: fw.Rate2007,
                std: fw.Rate,
                Unit: fw.Unit,
                Unitvalue: fw.Unitvalue,
                Calquantityvalue: fw.Calquantityvalue,
                Water: fw.Water,
                Overheads: fw.Overheads,
                Amount: ((fw.Quantity * fw.Rate2007 / fw.Unitvalue)),
                labour_facor: fw.lab,
                CalUnitvalue: fw.CalUnitvalue,
                cartage: fw.cartage,
                Civ_Elec: fw.Civ_Elec,
                schyear: fw.schyear,
                Stages: fw.Stages,
                // Ratestype: fw.q.Ratestype,
                Username:req.body.username,
usercalquan:xx.Calquantity,
userunit:xx.Unitvalue,
srnsr:req.body.srnsr,
cess:fw.cess,
gst:fw.gst,
subheads:req.body.subhead,
date:req.body.date,
labourcost:parseFloat(((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*(fw.lab/100)).toFixed(2)),
cartagecost:parseFloat(((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*(fw.lab/100))+(fw.Quantity * fw.Rate2007 / fw.Unitvalue))*fw.cartage/100).toFixed(2)),
watercost:parseFloat(((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(fw.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(fw.gst/100)).toFixed(2)),
overcost:parseFloat((((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(fw.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(1+fw.Overheads/100))*(fw.cess/100)).toFixed(2))                                                     


            });
            let save3 = await product.save()
            console.log('save3')

        }


 else if (fw.Icode != "") {
     console.log(fw.Icode)

console.log('forthicode!=empty')

try {

    let x3 = await Analysisf.aggregate([{ $match: { ItemCode:fw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
        {
$project: {
 lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: fw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
     Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
 cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:fw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
  Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: fw.Water, else: {"$sum":["$Water",qw.Water]} } },
  gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:fw.gst, else: {"$sum":["$gst",qw.gst]} } },
cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:fw.cess, else: {"$sum":["$cess",qw.cess]} } },
     Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:fw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
  Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
_id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
            }},               {
                    $project: {
                        Quantity: { $divide: [{ $divide: [{ $multiply: [fw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fw.Unitvalue] }
                        , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
                        Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                    }
                },

               
                ])
                // console.log(x3)

  for (const fiw of x3) {

     if (fiw.Icode == "" && fiw.Code != 0)
      {
        console.log(fiw.Code)
                        console.log(fiw.Icode)
                        console.log('fifthicode==empty')
                        console.log(fiw.ItemCode)


                        var product = new Analysisfnsr({
                            commoncode:xx.Itemcode,
                            ItemCode: fiw.ItemCode,
                            Description: fiw.Description,
                            Code: fiw.Code,
                            Quantity: parseFloat(fiw.Quantity.toFixed(4)),
                            Rate: fiw.Rate2007,
                            std: fiw.Rate,
                            Unit: fiw.Unit,
                            Unitvalue: fiw.Unitvalue,
                            Calquantityvalue: fiw.Calquantityvalue,
                            Water: fiw.Water,
                            Overheads: fiw.Overheads,
                            Amount: parseFloat((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue).toFixed(2)),
                            labour_facor: fiw.lab,
                            CalUnitvalue: fiw.CalUnitvalue,
                            cartage: fiw.cartage,
                            Civ_Elec: fiw.Civ_Elec,
                            schyear: fiw.schyear,
                            Stages: fiw.Stages,
                            // Ratestype: fiw.q.Ratestype,
                            Username:req.body.username,
                            usercalquan:xx.Calquantity,
                            userunit:xx.Unitvalue,
                            srnsr:req.body.srnsr,
                            cess:fiw.cess,
                            gst:fiw.gst,
                            subheads:req.body.subhead,
                            date:req.body.date,
                            labourcost:parseFloat(((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*(fiw.lab/100)).toFixed(2)),
                            cartagecost:parseFloat(((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*(fiw.lab/100))+(fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue))*fiw.cartage/100).toFixed(2)),
                            watercost:parseFloat(((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(fiw.Water/100)).toFixed(2)),
    gstcost:parseFloat(((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(fiw.gst/100)).toFixed(2)),
    overcost:parseFloat((((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(fiw.Overheads/100)).toFixed(2)),
    cesscost:parseFloat(((((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(1+fiw.Overheads/100))*(fiw.cess/100)).toFixed(2))
    


  });
 let save4 = await product.save()
     console.log('save4')


     }

     else if (fiw.Icode != "") {
        console.log(fiw.Icode)
     console.log('fifthicode!=empty')

      try {

     let x4 = await Analysisf.aggregate([{ $match: { ItemCode: fiw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
        {
            $project: {
             lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: fiw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
                 Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
             cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:fiw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
              Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: fiw.Water, else: {"$sum":["$Water",qw.Water]} } },
              gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:fiw.gst, else: {"$sum":["$gst",qw.gst]} } },
            cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:fiw.cess, else: {"$sum":["$cess",qw.cess]} } },
                 Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:fiw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
              Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
            Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
            Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
            _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                        }}, 

      {
        $project: {
            Quantity: { $divide: [{ $divide: [{ $multiply: [fiw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fiw.Unitvalue] }
            , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1, Rate2007: 1,
            Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
        }
    },                   

                         
                            ])
// console.log(x4)

 for (const six of x4) {



  if (six.Icode == "" && six.Code != 0) {
    console.log(six.Code)
    console.log(six.Icode)
    console.log('sixicode==empty')
    console.log(six.ItemCode)


    var product = new Analysisfnsr({
        commoncode: xx.Itemcode,
        ItemCode: six.ItemCode,
        Description: six.Description,
        Code: six.Code,
        Quantity: parseFloat(six.Quantity.toFixed(2)),
        Rate: six.Rate2007,
        std: six.Rate,
        Unit: six.Unit,
        Unitvalue: six.Unitvalue,
        Calquantityvalue: six.Calquantityvalue,
        Water: six.Water,
        Overheads: six.Overheads,
        Amount: parseFloat((six.Quantity * six.Rate2007/ six.Unitvalue).toFixed(2)),
        labour_facor: six.lab,
        CalUnitvalue: six.CalUnitvalue,
        cartage: six.cartage,
        Civ_Elec: six.Civ_Elec,
        schyear: six.schyear,
        Stages: six.Stages,
        // Ratestype: six.q.Ratestype,
        Username:req.body.username,
        usercalquan:xx.Calquantity,
        userunit:xx.Unitvalue,
        srnsr:req.body.srnsr,
        cess:six.cess,
        gst:six.gst,
        subheads:req.body.subhead,
        date:req.body.date,
        labourcost:parseFloat(((six.Quantity * six.Rate2007 / six.Unitvalue)*(six.lab/100)).toFixed(2)),
        cartagecost:parseFloat(((((six.Quantity * six.Rate2007 / six.Unitvalue)*(six.lab/100))+(six.Quantity * six.Rate2007 / six.Unitvalue))*six.cartage/100).toFixed(2)),
        watercost:parseFloat(((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
gstcost:parseFloat(((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
overcost:parseFloat((((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
cesscost:parseFloat(((((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))




    });
                                   
    let save5 = await product.save()
      console.log('save5')


    }
    else if (six.Icode != '') {
        console.log(six.Icode)
        console.log('sixthicode!=empty')


    try {
 let x5 = await Analysisf.aggregate([{ $match: { ItemCode: six.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
         ,  {
            $project: {
             lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: six.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
                 Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
             cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:six.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
              Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then:six.Water, else: {"$sum":["$Water",qw.Water]} } },
              gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:six.gst, else: {"$sum":["$gst",qw.gst]} } },
            cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:six.cess, else: {"$sum":["$cess",qw.cess]} } },
                 Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:six.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
              Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
            Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
            Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
            _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                        }}, 

                                            
                        {
                            $project: {
                                Quantity: { $divide: [{ $divide: [{ $multiply: [six.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, six.CalUnitvalue] }
                                , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
                                Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                            }
                        },
                              

                                   
                                        ])



                                        for (const sev of x5) {


                                            if (sev.Icode == "" && sev.Code != 0) {
                                                console.log(sev.Code)
                                                console.log(sev.Icode)
                                                console.log('fifthicode==empty')
                                                console.log(sev.ItemCode)


                                                var product = new Analysisfnsr({
                                                    commoncode: xx.Itemcode,
                                                    ItemCode: sev.ItemCode,
                                                    Description: sev.Description,
                                                    Code: sev.Code,
                                                    Quantity: sev.Quantity,
                                                    Rate: sev.Rate2007,
                                                    std: sev.Rate,
                                                    Unit: sev.Unit,
                                                    Unitvalue: sev.Unitvalue,
                                                    Calquantityvalue: sev.Calquantityvalue,
                                                    Water: sev.Water,
                                                    Overheads: sev.Overheads,
                                                    Amount: ((sev.Quantity * sev.Rate2007 / sev.Unitvalue)),
                                                    labour_facor: sev.lab,
                                                    CalUnitvalue: sev.CalUnitvalue,
                                                    cartage: sev.cartage,
                                                    Civ_Elec: sev.Civ_Elec,
                                                    schyear: sev.schyear,
                                                    Stages: sev.Stages,
                                                    Ratestype: sev.q.Ratestype,
                                                    Username:req.body.username,
                                                    usercalquan:xx.Calquantity,
                                                    userunit:xx.Unitvalue,
                                                    srnsr:req.body.srnsr,
                                                    cess:sev.cess,
                                                    gst:sev.gst,
                                                    subheads:req.subhead,
                                                    date:req.body.date,
                                                    labourcost:parseFloat(((six.Quantity * sev.Rate2007 / six.Unitvalue)*(six.lab/100)).toFixed(2)),
                                                    cartagecost:parseFloat(((((six.Quantity * sev.Rate2007 / six.Unitvalue)*(six.lab/100))+(six.Quantity * sev.Rate2007 / six.Unitvalue))*six.cartage/100).toFixed(2)),
                                                    watercost:parseFloat(((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
                            gstcost:parseFloat(((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
                            overcost:parseFloat((((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
                            cesscost:parseFloat(((((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))
                                                });
                                                let save6 = await product.save()
                                                console.log('save6')

                                            }
                                        }
                                          


                                    } catch (err) {

                                    }

                                }
 }
}
                        catch (err) {
                            console.log(err)
}









}
}



            } catch (err) {
                console.log(err)
            }











        }

    }                                             




                                            }
                                            catch (err) {
                                                console.log(err)
                                            }

                                            console.log(tw.Icode)
                                        }





                                  }
                                }
                                catch (err) {
                                    console.log(err)
                                }









                             }


                       }
                    }
                    catch (err) {
                        console.log(err)
                    }






// //                     //                             }



                    // }
                    // )








       }








    }







          }

          try{


            let total = await   Analysisfnsr.aggregate([{$facet:{
              
                labour:[ { $match: {commoncode:xx.Itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads ,srnsr:req.body.srnsr,date:req.body.date}},
                
                {$project:{
                 lab:{$cond:{if:{$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]},then:0,else:"$labour_facor"}},
                 Amount:{$cond:{if:{$or:[{$eq:["$Amount","NULL"]},{$eq:["$Amount",""]}]},then:0,else:"$Amount"}},
                 // Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:[1,1]},1]},100]},0.5]},100]},
                 cartage:{$cond:{if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]},then:0,else:"$cartage"}},
                 Water:{$cond:{if:{$or:[{$eq:["$Water","NULL"]},{$eq:["$Water",""]}]},then:0,else:"$Water"}},
                 Overheads:{$cond:{if:{$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]},then:0,else:"$Overheads"}},
                 Rate:{$cond:{if:{$or:[{$eq:["$Rate","NULL"]},{$eq:["$Rate",""]}]},then:0,else:"$Rate"}},
                 CalUnitvalue:{$cond:{if:{$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]},then:0,else:"$CalUnitvalue"}},
                 Calquantityvalue:{$cond:{if:{$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]}]},then:0,else:"$Calquantityvalue"}},
                 Unit:{$cond:{if:{$or:[{$eq:["$Unit","NULL"]},{$eq:["$Unit",""]}]},then:0,else:"$Unit"}},
             
                 Unitvalue:{$cond:{if:{$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]}]},then:0,else:"$Unitvalue"}},
                 Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                 cess:1,gst:1,userunit:1,usercalquan:1
                 
             
             }},
             
             
                
                  {$project:{
                      la:{$divide:[{$multiply:["$Amount","$lab"]},100]},Calquantityvalue:1,userunit:1,usercalquan:1,
                      cess:1,gst:1,  cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Unitvalue:1}},
                  {$project:{labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,Calquantityvalue:1,
                  cess:1,gst:1, CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                 {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,labt:1, cartage:1, Calquantityvalue:1,
                 cess:1,gst:1,Unitvalue:1,     Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
               {$project:{tot1:{$add:["$labt","$cart"]},la:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
               cess:1,gst:1,Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
             
             
               
                   {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,tot1:1,labt:1,cart:1, cartage:1, 
                   Calquantityvalue:1, cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                {$project:{wattot:{$add:["$wat","$tot1"]},wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
                cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                
                 {$project:{gsttt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                 cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                 {$project:{gstplustot:{$add:["$gsttt","$wattot"]},gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                 cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
                
                
                
                
                //gst+total+water+overheads
             
                 {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                 cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
                  {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                  cess:1,gst:1, Unitvalue:1, Calquantityvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
             
                //cess
             
                 {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                 cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Calquantityvalue:1,userunit:1,usercalquan:1}},
                {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                
                 {$project:{fintotcal:{$multiply:[{$divide:["$userunit","$usercalquan"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                 cess:1,gst:1,  Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                
                 //  {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
               
               
               
                  {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
                  ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
                     gstt:{$sum:"$gsttt"},  gsttot:{$sum:"$gstplustot"},
                  over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
                  cesst:{$sum:"$cessplusfintot"},
                  totaldivcal:{$sum:"$fintotcal"}} },
                
                 
                ],
                  }},
                 
                   ])
        
        
                   if(total[0].labour[0]=="" || total[0].labour[0]==undefined ){
                        fintot = 0 
                    }
        else{ 
        
            console.log(total[0].labour)
                   
        fintot =total[0].labour[0].totaldivcal
            console.log(total[0].labour[0].totaldivcal)
                   
        
                       var myquery={ Itemcode:xx.Itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,SR_NSR:'NSR'}
                       var newvalues = { $set: {
                       currentrate:parseFloat(fintot.toFixed(2))}};
                
                      
                       
                       
                     
                    let srup  =   await Sr2007.updateOne(myquery, newvalues)
                        console.log(srup)
        
                 let rty =    await Analysisfnsr.deleteMany({commoncode:xx.Itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads ,srnsr:req.body.srnsr,date:req.body.date,})
                     console.log(rty)
                   
                }}
                catch(err){
        console.log(err)
                }

       
           

        
    }
     
    


 

//let display = await Analysisfnsr.find({ commoncode: '2.37', schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,date:req.body.date })
console.timeEnd()
let ooo =await res.json('updated user nsr')   
console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')


    }
    catch (err) {
        console.log(err)
    }





        



},


    
          
calculatesr1:async function(req,res){
    console.log('sdksdshj')
    console.time()
    console.log(req.body)
   
 





        try {
            let rr=await   Sr2007.aggregate([{$match:{SubHeadCode:req.body.subhead,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,SR_NSR:'SR',Rate:{$ne:0},Calquantity:{$ne:0}}},
               {$sort:{"SubHeadCode": 1, "MasterCode1": 1,"SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
               {$project:{ Unitvalue:{$cond:{if:{$eq:["$Unitvalue",0]},then:1,else:"$Unitvalue"}},
               Calquantity:{$cond:{if:{$eq:["$Calquantity",0]},then:1,else:"$Calquantity"}},
                   Itemcode:1,Username:1,SubHeadCode:1,_id:0}}])
       
       for(const xx of rr){  
       console.log('Itemcode = ' + xx.Itemcode + ' calquan = ' +xx.Calquantity +'unit  =' +xx.Unitvalue)
       
       let a = await Analysisf.aggregate([{ $match: { ItemCode: xx.Itemcode, 
           schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username,sr_nsr:'SR' } },
           
       {$project: {
         
                       
           lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]}, then: 0, else: "$labour_facor" } },
           Quantity: { $cond: { if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
           cartage: { $cond: { if: {$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]}, then: 0, else: "$cartage" } },
           Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]}]}, then: 0, else: "$Water" } },
            Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]}, then: 0, else: "$Overheads" } },
            Rate2007: { $cond: { if: {$or:[{$eq:["$lRate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]}, then: 1, else: "$CalUnitvalue" } },
           Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
            gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]}]}, then: 0, else: "$gst" } },
           cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]}]}, then: 0, else: "$cess" } },
           _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Calquantityvalue: 1, Code: 1, Stages: 1,
           wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1, CalUnitvalue: 1,Username:1,Rate:1
                   }
               }])
               
        
       
                   for(const qw of a) {
       
       
       
       
                       if (qw.Icode == "" && qw.Code != 0) {
                          
       
                           console.log('firsticode==empty')
                           var product = new Analysisfnsr({
                commoncode:  xx.Itemcode,
               ItemCode: qw.ItemCode,
               Description: qw.Description,
               Code: qw.Code,
               Quantity: parseFloat(qw.Quantity.toFixed(4)),
               Rate: qw.Rate2007,
               std: qw.Rate,
               Unit: qw.Unit,
               Unitvalue: qw.Unitvalue,
               Calquantityvalue: qw.Calquantityvalue,
               Water: qw.Water,
               Overheads: qw.Overheads,
               Amount: parseFloat((qw.Quantity * qw.Rate2007 / qw.Unitvalue).toFixed(2)),
               labour_facor: qw.lab,
               CalUnitvalue: qw.CalUnitvalue,
               cartage: qw.cartage,
               Civ_Elec: qw.Civ_Elec,
                schyear: qw.schyear,
                Stages: qw.Stages,
                 Username:req.body.username,
                usercalquan:xx.Calquantity,
                userunit:xx.Unitvalue,
                srnsr:'SR',
                    cess:qw.cess,
       gst:qw.gst,
       subheads:req.body.subhead,
       date:req.body.date,
       
       labourcost:parseFloat(((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*(qw.lab/100)).toFixed(2)),
       cartagecost:parseFloat(((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*(qw.lab/100))+(qw.Quantity * qw.Rate2007 / qw.Unitvalue))*qw.cartage/100).toFixed(2)),
       watercost:parseFloat(((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(qw.Water/100)).toFixed(2)),
       gstcost:parseFloat(((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(qw.gst/100)).toFixed(2)),
       overcost:parseFloat((((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(qw.Overheads/100)).toFixed(2)),
       cesscost:parseFloat(((((((((qw.Quantity * qw.Rate2007 / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(1+qw.Overheads/100))*(qw.cess/100)).toFixed(2))
       
       
       
                           });
                           let save = await product.save()
                           console.log('save')
       
       
                       }
       
       
                       else if (qw.Icode != "") {                                                                                                                                                {
                           console.log(qw.Icode)
                           console.log('firsticode!=empty')
                           console.log('labour = ' +qw.lab)
                           console.log('Quantity = ' +qw.Quantity  + '   Unit = '  +  qw.Unitvalue)
       
          try {
              let x = await Analysisf.aggregate([{ $match: { ItemCode: qw.Icode, sr_nsr:'SR',
               schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username: req.body.username } },
               
               {$project: {
                                     
           lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: qw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
           Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
            cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:qw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
            Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: qw.Water, else: {"$sum":["$Water",qw.Water]} } },
            gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:qw.gst, else: {"$sum":["$gst",qw.gst]} } },
            cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:qw.cess, else: {"$sum":["$cess",qw.cess]} } },
            Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:qw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
            Rate2007: { $cond: { if: {$or:[{$eq:["$lRate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
           Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
            Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
           _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,
                                       wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                                   }
                               }, 
                {
           $project: {
            Quantity: { $divide: [{ $divide: [{ $multiply: [qw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] },qw.CalUnitvalue] }
            , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007:1,
           Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1,  lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                                   }
                               },
       
                               ])
       
       // console.log(x)
       
       for (const sw of x) {
       
       
                                   if (sw.Icode == "" && sw.Code != 0) {
                                       console.log('secondicode==empty')
                                       console.log(sw.Quantity)
       
                                       var product = new Analysisfnsr({
                                           commoncode: xx.Itemcode,
                                           ItemCode: sw.ItemCode,
                                           Description: sw.Description,
                                           Code: sw.Code,
                                           Quantity: parseFloat(sw.Quantity.toFixed(4)),
                                           Rate: sw.Rate2007,
                                           std: sw.Rate,
                                           Unit: sw.Unit,
                                           Unitvalue: sw.Unitvalue,
                                           Calquantityvalue: sw.Calquantityvalue,
                                           Water: sw.Water,
                                           Overheads: sw.Overheads,
                                           Amount: parseFloat((sw.Quantity * sw.Rate2007 / sw.Unitvalue).toFixed(2)),
                                           labour_facor: sw.lab,
                                           CalUnitvalue: sw.CalUnitvalue,
                                           cartage: sw.cartage,
                                           Civ_Elec: sw.Civ_Elec,
                                           schyear: sw.schyear,
                                           Stages: sw.Stages,
                                         
                                           Username:req.body.username,
                                           usercalquan:xx.Calquantity,
                                           userunit:xx.Unitvalue,
                                           srnsr:'SR',
                                           cess:sw.cess,
                                           gst:sw.gst,
                                           subheads:req.body.subhead,
                                           date:req.body.date,
        labourcost:parseFloat(((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*(sw.lab/100)).toFixed(2)),
        cartagecost:parseFloat(((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*(sw.lab/100))+(sw.Quantity * sw.Rate2007 / sw.Unitvalue))*sw.cartage/100).toFixed(2)),
        watercost:parseFloat(((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(sw.Water/100)).toFixed(2)),
        gstcost:parseFloat(((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(sw.gst/100)).toFixed(2)),
        overcost:parseFloat((((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(sw.Overheads/100)).toFixed(2)),
        cesscost:parseFloat(((((((((sw.Quantity * sw.Rate2007 / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(1+sw.Overheads/100))*(sw.cess/100)).toFixed(2))
       
       
       
       
       
                                       });
                                       
                                       let save1 = await product.save()
                                       console.log('save1')
       
       
                                   }
       
       
         else if (sw.Icode !== " ") {
                   console.log('po')
                console.log(sw.Icode)
                console.log(sw.Water)
       
            console.log('secondicode!=empty')
       
               try {
                   let x1 = await Analysisf.aggregate([{ $match: { ItemCode: sw.Icode,sr_nsr:'SR',
                     schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
                    
                       {$project: {
                                                 
       lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: sw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
       Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
        cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:sw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
        Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: sw.Water, else: {"$sum":["$Water",qw.Water]} } },
        gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:sw.gst, else: {"$sum":["$gst",qw.gst]} } },
       cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:sw.cess, else: {"$sum":["$cess",qw.cess]} } },
        Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:sw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
        Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
        CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
       Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
       Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
       _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                                               }
                                           }, 
       
        { $project: {
           Quantity: { $divide: [{ $divide: [{ $multiply: [sw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, sw.CalUnitvalue] }
           , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1, Rate2007: 1,
           Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
       }
       },                                      
                                       
       ])
                                   
       for (const tw of x1) {                              
       
           if (tw.Icode == "" && tw.Code != 0) {
               console.log(tw.Code)
               console.log(tw.Icode)
               console.log('thirdicode==empty')
       
               var product = new Analysisfnsr({
                   commoncode:  xx.Itemcode,
                   ItemCode: tw.ItemCode,
                   Description: tw.Description,
                   Code: tw.Code,
                   Quantity: parseFloat(tw.Quantity.toFixed(4)),
                   Rate: tw.Rate2007,
                   std: tw.Rate,
                   Unit: tw.Unit,
                   Unitvalue: tw.Unitvalue,
                   Calquantityvalue: tw.Calquantityvalue,
                   Water: tw.Water,
                   Overheads: tw.Overheads,
                   Amount: parseFloat((tw.Quantity * tw.Rate2007 / tw.Unitvalue).toFixed(2)),
                   labour_facor: tw.lab,
                   CalUnitvalue: tw.CalUnitvalue,
                   cartage: tw.cartage,
                   Civ_Elec: tw.Civ_Elec,
                   schyear: tw.schyear,
                   Stages: tw.Stages,
                   // Ratestype: tw.q.Ratestype,
                   Username:req.body.username,
                   usercalquan:xx.Calquantity,
                   userunit:xx.Unitvalue,
                   srnsr:'SR',
                   cess:tw.cess,
                   gst:tw.gst,
                   subheads:req.body.subhead,
                   date:req.body.date,
                   labourcost:parseFloat(((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*(tw.lab/100)).toFixed(2)),
                   cartagecost:parseFloat(((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*(tw.lab/100))+(tw.Quantity * tw.Rate2007 / tw.Unitvalue))*tw.cartage/100).toFixed(2)),
                   watercost:parseFloat(((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(tw.Water/100)).toFixed(2)),
       gstcost:parseFloat(((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(tw.gst/100)).toFixed(2)),
       overcost:parseFloat((((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(tw.Overheads/100)).toFixed(2)),
       cesscost:parseFloat(((((((((tw.Quantity * tw.Rate2007 / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(1+tw.Overheads/100))*(tw.cess/100)).toFixed(2))                                              
       
             // console.log(tw)
       });
       let save2 = await product.save()
       console.log('save2')
       
       
       }     
       
                                         
       else if (tw.Icode != "") {
           console.log(tw.Icode)
                      console.log('thirdicode!=empty')
           try {
            let x2 = await Analysisf.aggregate([{ $match: { ItemCode: tw.Icode,sr_nsr:'SR',
                 schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username } },
          {
        $project: {
           lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: tw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
           Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
            cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:tw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
            Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: tw.Water, else: {"$sum":["$Water",qw.Water]} } },
            gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:tw.gst, else: {"$sum":["$gst",qw.gst]} } },
           cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:tw.cess, else: {"$sum":["$cess",qw.cess]} } },
            Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:tw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
            Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
            CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
           Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
           Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
           _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
        }},
            {
            $project: {
       Quantity: { $divide: [{ $divide: [{ $multiply: [tw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, tw.CalUnitvalue] }
           , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
            Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1,  lab: 1, Civ_Elec: 1, schyear: 1, _id: 0, cess: 1, gst: 1,Username:1
                              }
                          },
                             
       
                          ])
       
              // console.log(x2)
              for (const fw of x2) {
       
       
               if (fw.Icode == "" && fw.Code != 0) {
                   console.log(fw.Code)
                   console.log(fw.Icode)
                   console.log('fourthicode==empty')
       
           var product = new Analysisfnsr({
                       commoncode: xx.Itemcode,
                       ItemCode: fw.ItemCode,
                       Description: fw.Description,
                       Code: fw.Code,
                       Quantity: parseFloat((fw.Quantity).toFixed(4)),
                       Rate: fw.Rate2007,
                       std: fw.Rate,
                       Unit: fw.Unit,
                       Unitvalue: fw.Unitvalue,
                       Calquantityvalue: fw.Calquantityvalue,
                       Water: fw.Water,
                       Overheads: fw.Overheads,
                       Amount: ((fw.Quantity * fw.Rate2007 / fw.Unitvalue)),
                       labour_facor: fw.lab,
                       CalUnitvalue: fw.CalUnitvalue,
                       cartage: fw.cartage,
                       Civ_Elec: fw.Civ_Elec,
                       schyear: fw.schyear,
                       Stages: fw.Stages,
                       // Ratestype: fw.q.Ratestype,
                       Username:req.body.username,
       usercalquan:xx.Calquantity,
       userunit:xx.Unitvalue,
       srnsr:'SR',
       cess:fw.cess,
       gst:fw.gst,
       subheads:req.body.subhead,
       date:req.body.date,
       labourcost:parseFloat(((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*(fw.lab/100)).toFixed(2)),
       cartagecost:parseFloat(((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*(fw.lab/100))+(fw.Quantity * fw.Rate2007 / fw.Unitvalue))*fw.cartage/100).toFixed(2)),
       watercost:parseFloat(((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(fw.Water/100)).toFixed(2)),
       gstcost:parseFloat(((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(fw.gst/100)).toFixed(2)),
       overcost:parseFloat((((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(fw.Overheads/100)).toFixed(2)),
       cesscost:parseFloat(((((((((fw.Quantity * fw.Rate2007 / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(1+fw.Overheads/100))*(fw.cess/100)).toFixed(2))                                                     
       
       
                   });
                   let save3 = await product.save()
                   console.log('save3')
       
               }
       
       
        else if (fw.Icode != "") {
            console.log(fw.Icode)
       
       console.log('forthicode!=empty')
       
       try {
       
           let x3 = await Analysisf.aggregate([{ $match: { ItemCode:fw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,sr_nsr:'SR'} },
               {
       $project: {
        lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: fw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
            Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
        cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:fw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
         Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: fw.Water, else: {"$sum":["$Water",qw.Water]} } },
         gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:fw.gst, else: {"$sum":["$gst",qw.gst]} } },
       cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:fw.cess, else: {"$sum":["$cess",qw.cess]} } },
            Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:fw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
         Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
       CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
       Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
       Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
       _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                   }},               {
                           $project: {
                               Quantity: { $divide: [{ $divide: [{ $multiply: [fw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fw.CalUnitvalue] }
                               , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
                               Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                           }
                       },
       
                      
                       ])
                       // console.log(x3)
       
         for (const fiw of x3) {
       
            if (fiw.Icode == "" && fiw.Code != 0)
             {
               console.log(fiw.Code)
                               console.log(fiw.Icode)
                               console.log('fifthicode==empty')
                               console.log(fiw.ItemCode)
       
       
                               var product = new Analysisfnsr({
                                   commoncode:xx.Itemcode,
                                   ItemCode: fiw.ItemCode,
                                   Description: fiw.Description,
                                   Code: fiw.Code,
                                   Quantity: parseFloat(fiw.Quantity.toFixed(4)),
                                   Rate: fiw.Rate2007,
                                   std: fiw.Rate,
                                   Unit: fiw.Unit,
                                   Unitvalue: fiw.Unitvalue,
                                   Calquantityvalue: fiw.Calquantityvalue,
                                   Water: fiw.Water,
                                   Overheads: fiw.Overheads,
                                   Amount: parseFloat((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue).toFixed(2)),
                                   labour_facor: fiw.lab,
                                   CalUnitvalue: fiw.CalUnitvalue,
                                   cartage: fiw.cartage,
                                   Civ_Elec: fiw.Civ_Elec,
                                   schyear: fiw.schyear,
                                   Stages: fiw.Stages,
                                   // Ratestype: fiw.q.Ratestype,
                                   Username:req.body.username,
                                   usercalquan:xx.Calquantity,
                                   userunit:xx.Unitvalue,
                                   srnsr:"SR",
                                   cess:fiw.cess,
                                   gst:fiw.gst,
                                   subheads:req.body.subhead,
                                   date:req.body.date,
                                   labourcost:parseFloat(((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*(fiw.lab/100)).toFixed(2)),
                                   cartagecost:parseFloat(((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*(fiw.lab/100))+(fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue))*fiw.cartage/100).toFixed(2)),
                                   watercost:parseFloat(((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(fiw.Water/100)).toFixed(2)),
           gstcost:parseFloat(((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(fiw.gst/100)).toFixed(2)),
           overcost:parseFloat((((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(fiw.Overheads/100)).toFixed(2)),
           cesscost:parseFloat(((((((((fiw.Quantity * fiw.Rate2007 / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(1+fiw.Overheads/100))*(fiw.cess/100)).toFixed(2))
           
       
       
         });
        let save4 = await product.save()
            console.log('save4')
       
       
            }
       
            else if (fiw.Icode != "") {
               console.log(fiw.Icode)
            console.log('fifthicode!=empty')
       
             try {
       
            let x4 = await Analysisf.aggregate([{ $match: { ItemCode: fiw.Icode,sr_nsr:'SR',
                schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
               {
                   $project: {
                    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: fiw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
                        Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
                    cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:fiw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
                     Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then: fiw.Water, else: {"$sum":["$Water",qw.Water]} } },
                     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:fiw.gst, else: {"$sum":["$gst",qw.gst]} } },
                   cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:fiw.cess, else: {"$sum":["$cess",qw.cess]} } },
                        Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:fiw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
                     Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
                   CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
                   Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
                   Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
                   _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                               }}, 
       
             {
               $project: {
                   Quantity: { $divide: [{ $divide: [{ $multiply: [fiw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fiw.CalUnitvalue] }
                   , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1, Rate2007: 1,
                   Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
               }
           },                   
       
                                
                                   ])
       // console.log(x4)
       
        for (const six of x4) {
       
       
       
         if (six.Icode == "" && six.Code != 0) {
           console.log(six.Code)
           console.log(six.Icode)
           console.log('sixicode==empty')
           console.log(six.ItemCode)
       
       
           var product = new Analysisfnsr({
               commoncode: xx.Itemcode,
               ItemCode: six.ItemCode,
               Description: six.Description,
               Code: six.Code,
               Quantity: parseFloat(six.Quantity.toFixed(2)),
               Rate: six.Rate2007,
               std: six.Rate,
               Unit: six.Unit,
               Unitvalue: six.Unitvalue,
               Calquantityvalue: six.Calquantityvalue,
               Water: six.Water,
               Overheads: six.Overheads,
               Amount: parseFloat((six.Quantity * six.Rate2007/ six.Unitvalue).toFixed(2)),
               labour_facor: six.lab,
               CalUnitvalue: six.CalUnitvalue,
               cartage: six.cartage,
               Civ_Elec: six.Civ_Elec,
               schyear: six.schyear,
               Stages: six.Stages,
               // Ratestype: six.q.Ratestype,
               Username:req.body.username,
               usercalquan:xx.Calquantity,
               userunit:xx.Unitvalue,
               srnsr:"SR",
               cess:six.cess,
               gst:six.gst,
               subheads:req.body.subhead,
               date:req.body.date,
               labourcost:parseFloat(((six.Quantity * six.Rate2007 / six.Unitvalue)*(six.lab/100)).toFixed(2)),
               cartagecost:parseFloat(((((six.Quantity * six.Rate2007 / six.Unitvalue)*(six.lab/100))+(six.Quantity * six.Rate2007 / six.Unitvalue))*six.cartage/100).toFixed(2)),
               watercost:parseFloat(((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
       gstcost:parseFloat(((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
       overcost:parseFloat((((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
       cesscost:parseFloat(((((((((six.Quantity * six.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))
       
       
       
       
           });
                                          
           let save5 = await product.save()
             console.log('save5')
       
       
           }
           else if (six.Icode != '') {
               console.log(six.Icode)
               console.log('sixthicode!=empty')
       
       
           try {
        let x5 = await Analysisf.aggregate([{ $match: { ItemCode: six.Icode,sr_nsr:'SR',
             schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username} },
                ,  {
                   $project: {
                    lab: { $cond: { if: {$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]},{$eq:["$labour_facor",0]}]}, then: six.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
                        Quantity: { $cond:{ if: {$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]}, then: 1, else: "$Quantity" } },
                    cartage: { $cond: { if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]},{$eq:["$cartage",0]}]}, then:six.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
                     Water: { $cond: { if: {$or:[{$eq:["$Wter","NULL"]},{$eq:["$Water",""]},{$eq:["$Water",0]}]}, then:six.Water, else: {"$sum":["$Water",qw.Water]} } },
                     gst: { $cond: { if: {$or:[{$eq:["$gst","NULL"]},{$eq:["$gst",""]},{$eq:["$gst",0]}]}, then:six.gst, else: {"$sum":["$gst",qw.gst]} } },
                   cess: { $cond: { if: {$or:[{$eq:["$cess","NULL"]},{$eq:["$cess",""]},{$eq:["$cess",0]}]}, then:six.cess, else: {"$sum":["$cess",qw.cess]} } },
                        Overheads: { $cond: { if: {$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]},{$eq:["$Overheads",0]}]}, then:six.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
                     Rate2007: { $cond: { if: {$or:[{$eq:["$Rate2007","NULL"]},{$eq:["$Rate2007",""]}]}, then: 0, else: "$Rate2007" } },
                   CalUnitvalue: { $cond: { if: {$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]},{$eq:["$CalUnitvalue",0]}]}, then: 1, else: "$CalUnitvalue" } },
                   Calquantityvalue: { $cond: { if: {$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]},{$eq:["$Calquantityvalue",0]}]}, then: 1, else: "$Calquantityvalue" } },
                   Unitvalue: { $cond: { if: {$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]},{$eq:["$Unitvalue",0]}]}, then: 1, else: "$Unitvalue" } },
                   _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,Rate:1,wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
                               }}, 
       
                                                   
                               {
                                   $project: {
                                       Quantity: { $divide: [{ $divide: [{ $multiply: [six.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, six.CalUnitvalue] }
                                       , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,Rate2007: 1,
                                       Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
                                   }
                               },
                                     
       
                                          
                                               ])
       
       
       
                                               for (const sev of x5) {
       
       
                                                   if (sev.Icode == "" && sev.Code != 0) {
                                                       console.log(sev.Code)
                                                       console.log(sev.Icode)
                                                       console.log('fifthicode==empty')
                                                       console.log(sev.ItemCode)
       
       
                                                       var product = new Analysisfnsr({
                                                           commoncode: xx.Itemcode,
                                                           ItemCode: sev.ItemCode,
                                                           Description: sev.Description,
                                                           Code: sev.Code,
                                                           Quantity: sev.Quantity,
                                                           Rate: sev.Rate2007,
                                                           std: sev.Rate,
                                                           Unit: sev.Unit,
                                                           Unitvalue: sev.Unitvalue,
                                                           Calquantityvalue: sev.Calquantityvalue,
                                                           Water: sev.Water,
                                                           Overheads: sev.Overheads,
                                                           Amount: ((sev.Quantity * sev.Rate2007 / sev.Unitvalue)),
                                                           labour_facor: sev.lab,
                                                           CalUnitvalue: sev.CalUnitvalue,
                                                           cartage: sev.cartage,
                                                           Civ_Elec: sev.Civ_Elec,
                                                           schyear: sev.schyear,
                                                           Stages: sev.Stages,
                                                           Ratestype: sev.q.Ratestype,
                                                           Username:req.body.username,
                                                           usercalquan:xx.Calquantity,
                                                           userunit:xx.Unitvalue,
                                                           srnsr:"SR",
                                                           cess:sev.cess,
                                                           gst:sev.gst,
                                                           subheads:req.subhead,
                                                           date:req.body.date,
                                                           labourcost:parseFloat(((six.Quantity * sev.Rate2007 / six.Unitvalue)*(six.lab/100)).toFixed(2)),
                                                           cartagecost:parseFloat(((((six.Quantity * sev.Rate2007 / six.Unitvalue)*(six.lab/100))+(six.Quantity * sev.Rate2007 / six.Unitvalue))*six.cartage/100).toFixed(2)),
                                                           watercost:parseFloat(((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
                                   gstcost:parseFloat(((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
                                   overcost:parseFloat((((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
                                   cesscost:parseFloat(((((((((six.Quantity * sev.Rate2007 / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))
                                                       });
                                                       let save6 = await product.save()
                                                       console.log('save6')
       
                                                   }
                                               }
                                                 
       
       
                                           } catch (err) {
       
                                           }
       
                                       }
        }
       }
                               catch (err) {
                                   console.log(err)
       }
       
       
       
       
       
       
       
       
       
       }
       }
       
       
       
                   } catch (err) {
                       console.log(err)
                   }
       
       
       
       
       
       
       
       
       
       
       
               }
       
           }                                             
       
       
       
       
                                                   }
                                                   catch (err) {
                                                       console.log(err)
                                                   }
       
                                                   console.log(tw.Icode)
                                               }
       
       
       
       
       
                                         }
                                       }
                                       catch (err) {
                                           console.log(err)
                                       }
       
       
       
       
       
       
       
       
       
                                    }
       
       
                              }
                           }
                           catch (err) {
                               console.log(err)
                           }
       
       
       
       
       
       
       // //                     //                             }
       
       
       
                           // }
                           // )
       
       
       
       
       
       
       
       
              }
       
       
       
       
       
       
       
       
           }
       
       
       
       
       
       
       
                 }
       
                 try{
       
       
                   let total = await   Analysisfnsr.aggregate([{$facet:{
                     
                       labour:[ { $match: {commoncode:xx.Itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads ,srnsr:"SR",date:req.body.date}},
                       
                       {$project:{
                        lab:{$cond:{if:{$or:[{$eq:["$labour_facor","NULL"]},{$eq:["$labour_facor",""]}]},then:0,else:"$labour_facor"}},
                        Amount:{$cond:{if:{$or:[{$eq:["$Amount","NULL"]},{$eq:["$Amount",""]}]},then:0,else:"$Amount"}},
                        // Amount:{$divide:[{$add:[{$multiply:[{$divide:[{$multiply:[1,1]},1]},100]},0.5]},100]},
                        cartage:{$cond:{if:{$or:[{$eq:["$cartage","NULL"]},{$eq:["$cartage",""]}]},then:0,else:"$cartage"}},
                        Water:{$cond:{if:{$or:[{$eq:["$Water","NULL"]},{$eq:["$Water",""]}]},then:0,else:"$Water"}},
                        Overheads:{$cond:{if:{$or:[{$eq:["$Overheads","NULL"]},{$eq:["$Overheads",""]}]},then:0,else:"$Overheads"}},
                        Rate:{$cond:{if:{$or:[{$eq:["$Rate","NULL"]},{$eq:["$Rate",""]}]},then:0,else:"$Rate"}},
                        CalUnitvalue:{$cond:{if:{$or:[{$eq:["$CalUnitvalue","NULL"]},{$eq:["$CalUnitvalue",""]}]},then:0,else:"$CalUnitvalue"}},
                        Calquantityvalue:{$cond:{if:{$or:[{$eq:["$Calquantityvalue","NULL"]},{$eq:["$Calquantityvalue",""]}]},then:0,else:"$Calquantityvalue"}},
                        Unit:{$cond:{if:{$or:[{$eq:["$Unit","NULL"]},{$eq:["$Unit",""]}]},then:0,else:"$Unit"}},
                    
                        Unitvalue:{$cond:{if:{$or:[{$eq:["$Unitvalue","NULL"]},{$eq:["$Unitvalue",""]}]},then:0,else:"$Unitvalue"}},
                        Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                        cess:1,gst:1,userunit:1,usercalquan:1
                        
                    
                    }},
                    
                    
                       
                         {$project:{
                             la:{$divide:[{$multiply:["$Amount","$lab"]},100]},Calquantityvalue:1,userunit:1,usercalquan:1,
                             cess:1,gst:1,  cartage:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Unitvalue:1}},
                         {$project:{labt:{$add:["$Amount","$la"]},la:1, cartage:1, Water:1,Overheads:1,Rate:1,Calquantityvalue:1,
                         cess:1,gst:1, CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                        {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,labt:1, cartage:1, Calquantityvalue:1,
                        cess:1,gst:1,Unitvalue:1,     Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                      {$project:{tot1:{$add:["$labt","$cart"]},la:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
                      cess:1,gst:1,Unitvalue:1,  Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                    
                    
                      
                          {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,tot1:1,labt:1,cart:1, cartage:1, 
                          Calquantityvalue:1, cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                       {$project:{wattot:{$add:["$wat","$tot1"]},wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, Calquantityvalue:1,
                       cess:1,gst:1, Unitvalue:1,   Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                       
                        {$project:{gsttt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                        cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                        {$project:{gstplustot:{$add:["$gsttt","$wattot"]},gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                        cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
                       
                       
                       
                       
                       //gst+total+water+overheads
                    
                        {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                        cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Calquantityvalue:1,Amount:1,userunit:1,usercalquan:1}},
                         {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                         cess:1,gst:1, Unitvalue:1, Calquantityvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                    
                       //cess
                    
                        {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                        cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,Calquantityvalue:1,userunit:1,usercalquan:1}},
                       {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                       cess:1,gst:1, Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1,Calquantityvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                       
                        {$project:{fintotcal:{$multiply:[{$divide:["$userunit","$usercalquan"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,gsttt:1,wattot:1,wat:1,la:1,tot1:1,labt:1,cart:1, cartage:1, 
                        cess:1,gst:1,  Unitvalue:1, Water:1,Overheads:1,Rate:1,CalUnitvalue:1, Unit:1,lab:1,Amount:1,userunit:1,usercalquan:1}},
                       
                        //  {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
                      
                      
                      
                         {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
                         ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
                            gstt:{$sum:"$gsttt"},  gsttot:{$sum:"$gstplustot"},
                         over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
                         cesst:{$sum:"$cessplusfintot"},
                         totaldivcal:{$sum:"$fintotcal"}} },
                       
                        
                       ],
                         }},
                        
                          ])
               
               
                          if(total[0].labour[0]=="" || total[0].labour[0]==undefined ){
                               fintot = 0 
                           }
               else{ 
               
                   console.log(total[0].labour)
                          
               fintot =total[0].labour[0].totaldivcal
                   console.log(total[0].labour[0].totaldivcal)
                          
               
                              var myquery={ Itemcode:xx.Itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec,SR_NSR:'SR'}
                              var newvalues = { $set: {
                              currentrate:parseFloat(fintot.toFixed(2))}};
                       
                             
                              
                              
                            
                           let srup  =   await Sr2007.updateOne(myquery, newvalues)
                               console.log(srup)
               
                        let rty =    await Analysisfnsr.deleteMany({commoncode:xx.Itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,Username:req.body.username,Subheads:req.body.subheads ,srnsr:'SR',date:req.body.date,})
                            console.log(rty)
                          
                       }}
                       catch(err){
               console.log(err)
                       }
       
              
                  
       
               
           }
            
           
       
       
        
       
       //let display = await Analysisfnsr.find({ commoncode: '2.37', schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,date:req.body.date })
       
       let ooo =await res.json('updated user sr')   
       console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')
       console.timeEnd()
       
           }
           catch (err) {
               console.log(err)
           }
           










 

},




















//creating analysisf for new user

balaji34: async function(req,res){
    var i=0
    // const v8=require('v8')
    // console.log(v8.getHeapStatistics().total_available_size/1024/1024/1024)
    try{ 
console.log('starts')
 Analysisf.aggregate([{$match:{Username:"",}},{$project:{Username:1,Code:1,Slno:1,Islno:1,ItemCode:1,
    MLCode:1 , Icode:1, Code: 1,Description: 1,Calquantityvalue:1, CalUnitvalue:1, Unitvalue: 1, weightage: 1, Unit: 1,Quantity: 1,
    particularqty:1, Actualquantity:1,Rate:1, Rate2007:1, Amount: 1, Amount1:1, worktype:1, Stages: 1,Water:1,watercost:1,Overheads:1,
    overheadcost:1,Total:1,Itemtotal:1, Calquantity: 1,Caltotal:1,sno: 1,cartage: 1,cartagecost: 1,Civ_Elec:1,labour_facor: 1,labourcost:1,
    eq_fac:1,eq_fac_phy: 1,schyear: 1,Wastage_desc:1, Wastage: 1, sr_nsr:1, cess:1, cesscost:1,gst:1,gstcost:1,ac:1,accost:1}}],async function(err,res1){
        for (const a of res1) {
   
            i++
                    
            var newanasr =  new Analysisf({
                Slno: a.Slno,
                Username: '123',
                Islno: a.Islno,
                ItemCode: a.ItemCode,
                MLCode: a.MLCode,
                Icode: a.Icode,
                Code: a.Code,
                Description: a.Description,
                Calquantityvalue: a.Calquantityvalue,
                CalUnitvalue: a.CalUnitvalue,
                Unitvalue: a.Unitvalue,
                weightage: a.weightage,
                Unit: a.Unit,
                Quantity: a.quantity,
                particularqty: a.particularqty,
                Actualquantity: a.Actualquantity,
                Rate: a.Rate,
                Rate2007: a.Rate2007,
                Amount: a.Amount,
                Amount1: a.Amount1,
                worktype: a.worktype,
                Stages: a.Stages,
                Water: a.Water,
                watercost: a.watercost,
                Overheads: a.Overheads,
                overheadcost: a.overheadcost,
                Total: a.Total,
                Itemtotal: a.Itemtotal,
                Calquantity: a.Calquantity,
                Caltotal: a.Caltotal,
                sno: a.sno,
                cartage: a.cartage,
                cartagecost: a.cartagecost,
                Civ_Elec: a.Civ_Elec,
                labour_facor: a.labour_facor,
                labourcost: a.labourcost,
                eq_fac: a.eq_fac,
                eq_fac_phy: a.eq_fac_phy,
                schyear: a.schyear,
                Wastage_desc: a.Wastage_desc,
                Wastage: a.Wastage,
                sr_nsr: a.sr_nsr,
                cess:a.cess,
                cesscost:a.cesscost,
        gst:a.gst,
        gstcost:a.gstcost,
        ac:a.ac,
        accost:a.accost
        
            })
        // arr.push(newanasr)
            console.log(i)
          

          
            await newanasr.save()
          
        
        }
        await res.json('po')
        console.log('finish1')

    })
// console.log(b.length)
// var i=0;
// var arr=[]


// console.log(arr)
// let aa=await A.insertMany(arr)


console.log('finish')
    } catch(err){
        console.log(err)
    }
},











       




///lookup for joining tw o tables
  //sdhfgsssssssssdj

  b123:function(req,res){
      console.time()

  Sr2007.aggregate([{$match:{SubHeadCode:9,schyear:2007,Username:'',SR_NSR : "SR",Civ_Elec:"CIVIL",Rate:{$ne:0}}},
  {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
  {$project:{Itemcode:1,_id:0}}], function(err,result){
if(err){
  res.status(500).json({code: 500, message: 'Internal server error'});
}
else{
  async.eachSeries(result, function (item, outerCallback) {
    console.log(item.Itemcode)
    Analysisf.aggregate([{$match:{ItemCode:item.Itemcode,schyear:2007,Civ_Elec:"CIVIL",Username:''}},
    {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
    pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
    {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:2007,Civ_Elec:"CIVIL",Username:''}},
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
  
    }}],function(err,result1){
      console.log("qwee")
      console.log(result1)
      for(i=0;i<result1.length;i++)
      {
         if(result1[i].Icode == "" && result1[i].Code!=0)
     
         {
          cal=result1[i].Calquantityvalue/result1[i].CalUnitvalue;

          var product = new A({
            commoncode:item.Itemcode,
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


              Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:2007,Civ_Elec:"CIVIL",Username:''}},
                {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
                pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
                {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:2007,Civ_Elec:"CIVIL",Username:''}},
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
                    commoncode:item.Itemcode,
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
    Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:2007,Civ_Elec:"CIVIL",Username:''}},
      {$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
      pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
      {$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:2007,Civ_Elec:"CIVIL",Username:''}},
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
          commoncode:item.Itemcode,
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

Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:2007,Civ_Elec:"CIVIL",Username:''}},
{$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
{$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:2007,Civ_Elec:"CIVIL",Username:''}},
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
  commoncode:item.Itemcode,
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

Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:2007,Civ_Elec:"CIVIL",Username:''}},
{$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
{$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:2007,Civ_Elec:"CIVIL",Username:''}},
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
  commoncode:item.Itemcode,
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

Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:2007,Civ_Elec:"CIVIL",Username:''}},
{$lookup:{from:"rate",let:{code:"$Code",year:"$schyear",civil:"$Civ_Elec"},
pipeline:[{$match:{$expr:{$and:[{$eq:["$Code","$$code"]},{$eq:["$Schyear","$$year"]},
{$eq:["$Civ_Elec","$$civil"]}]}}},{$match:{Schyear:2007,Civ_Elec:"CIVIL",Username:''}},
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
  commoncode:item.Itemcode,
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



    outerCallback()
      
    })
    
  },function(){
    
    Sr2007.aggregate([{$match:{SubHeadCode:9,schyear:2007,Civ_Elec:"CIVIL",Username:'',SR_NSR : "SR",Rate:{$ne:0}}},
    {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
    {$project:{Itemcode:1,Calquantity:1,_id:0}}], function(err,result){
  if(err){
    res.status(500).json({code: 500, message: 'Internal server error'});
  }
  else{
    async.eachSeries(result, function (item, outerCallbac) {
  
     cal= item.Calquantity
      console.log(item.Itemcode)
     console.log(cal)
   
     A.aggregate([{$facet:{
      
   labour:[{$match:{commoncode:item.Itemcode,schyear:2007,Civ_Elec:"CIVIL"}},
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
     totaldivcal:{$sum:"$fintotcal"}}}],
   
   
   
     }},
    
      ],function(err,result){
        console.log(result)
        var i
   
      if(result[0].labour[0]=="" || result[0].labour[0]==undefined ){
        finres=0
    }
    else{ 
    
       
      finres=parseFloat(result[0].labour[0].totaldivcal.toFixed(2))
    }
        var myquery = { ItemCode: item.Itemcode,schyear:2007,Civ_Elec:"CIVIL",};
        var new_values = { Rate:finres };
      
       
        mongoose.connection.collection("sr2007").updateOne(myquery,  {$set: new_values})
      
        console.log(finres)
      
       outerCallbac()
     })
    }, function(){
      mongoose.connection.collections.a.drop(function(err){
        
        console.log("deleted")
      })
      console.timeEnd()
      console.log('oudihdhhdhhidhishidhsi')
      res.json("update and deleted")
    })
   
  }})
    
  })
}

}
 )

},





we:async function(req,res){
  let c= await Analysisf.aggregate([{$match:{Username:"",schyear:2007}},{$project:{Username:1,Code:1,Slno:1,Islno:1,ItemCode:1,
    MLCode:1 , Icode:1, Code: 1,Description: 1,Calquantityvalue:1, CalUnitvalue:1, Unitvalue: 1, weightage: 1, Unit: 1,Quantity: 1,
    particularqty:1, Actualquantity:1,Rate:1, Rate2007:1, Amount: 1, Amount1:1, worktype:1, Stages: 1,Water:1,watercost:1,Overheads:1,
    overheadcost:1,Total:1,Itemtotal:1, Calquantity: 1,Caltotal:1,sno: 1,cartage: 1,cartagecost: 1,Civ_Elec:1,labour_facor: 1,labourcost:1,
    eq_fac:1,eq_fac_phy: 1,schyear: 1,Wastage_desc:1, Wastage: 1, sr_nsr:1, cess:1, cesscost:1,gst:1,gstcost:1}}])
  res.json(c)
  console.log(c.length)

},

















  
    // gg:function(req,res){
//         sess = req.session;
//         sess.email = req.body.Civ_Elec;
//         sess.m=req.body.year;
        

// console.log(req.body)
// console.log(sess)
// console.log( sess.email)
// console.log( sess.m)
// req.session.destroy()
// let  sess = req.session;


// console.log(req.session.user1)

// res.json('ok')
//     },



    balaji1:function(req,res){

        console.log(req.body);
          Sr2007.aggregate([{$match:{Itemcode:'20.10',schyear:2016,Username:'123',Civ_Elec:'CIVIL',Rate:{$ne:0}}},
          {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
         ], function(err,result){
        if(err){
          res.status(500).json({code: 500, message: 'Internal server error'});
        }
        else{
          
          async.eachSeries(result, function (item, outerCallback) {
           
            console.log(result)
          
            Analysisf.aggregate([{$match:{ItemCode:item.Itemcode,schyear:2016,Username:'123',Civ_Elec:'CIVIL'}},
            ],function(err,result1){
              
              // console.log(result1)
              for(i=0;i<result1.length;i++)
              {
                 if(result1[i].Icode == "" && result1[i].Code!=0)
             
                 {
                    
                  console.log(item.Unitvalue)
                  console.log(item.Calquantity);
        
                  var product = new A({
                    commoncode:item.Itemcode,
                    ItemCode:result1[i].ItemCode,
                    Description:result1[i].Description,
                    Code:result1[i].Code,
                    Quantity:result1[i].Quantity,
                    Rate:result1[i].Rate2007,
                    std:result1[i].Rate,
                    Unit:result1[i].Unit,
                    Unitvalue:result1[i].Unitvalue,
                    Calquantityvalue:item.Calquantity,
                    Water:result1[i].Water,
                    Overheads:result1[i].Overheads,
                    Amount:((result1[i].Quantity*result1[i].Rate2007 )/result1[i].Unitvalue),
                    labour_facor:result1[i].labour_facor,
                    CalUnitvalue:item.Unitvalue,
                    cartage:result1[i].cartage,
                    Civ_Elec:result1[i].Civ_Elec,
                    schyear:result1[i].schyear,
                    Stages:result1[i].Stages,
                    Ratestype:result1[i].Ratestype,
                    cess:result1[i].cess,
                    gst:result1[i].gst,
                    Username:item.Username,
                    subheads:item.SubHeadCode
                   
                
                    
                
                    // Icode:result[i].Icode
                   
                });
        product.save(function(error){
        
        });
             
        
              }
            
                 else if(result1[i].Icode != "" ){ 
                 
                   console.log(result1[i].Icode)
                  // console.log(result1[i].Calquantityvalue)
                
                  //  console.log(i)
                    console.log('quantityoficode1:'+result1[i].Quantity)
                    console.log('quantityoficode1:'+result1[i].Water)
                    console.log('quantityofWater1:'+result1[i].Overheads)
        
        
                      Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:2016,Username:'123',Civ_Elec:'CIVIL'}},
                      {$project:{
                    // Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
                      labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
                     
                      cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
                      Water:{$cond:{if:{$eq:["$Water",""]},then:result1[i].Water,else:"$Water"}},
                      Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result1[i].Overheads,else:"$Overheads"}},
                      CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
                      Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
                     Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
                      wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1,Quantity:1
                      }},
                      {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result1[i].Quantity,"$CalUnitvalue","$Quantity"]},result1[i].CalUnitvalue]},"$Calquantityvalue"]},
                      Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
                      Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}                         
                       ],function(err,result2){ 
                    
                          console.log('hdgygfhghdgfyd')
                          console.log(result2)
                      for(i=0;i<result2.length;i++){
                       
                        if(result2[i].Icode == "" && result2[i].Code!=0 ){
                          // console.log(result2[i].ItemCode)
                
                           
                          var product = new A({
                            commoncode:item.Itemcode,
                            ItemCode:result2[i].ItemCode,
                            Description:result2[i].Description,
                            Code:result2[i].Code,
                            Rate:result2[i].Rate,
                            Unit:result2[i].Unit,
                            Unitvalue:result2[i].Unitvalue,
                            Calquantityvalue:item.Calquantity,
                            Quantity:result2[i].Quantity,
                            Water:result2[i].Water,
                            Overheads:result2[i].Overheads,
                            Amount:((result2[i].Quantity*result2[i].Rate)/result2[i].Unitvalue),
                            labour_facor:result2[i].labour_facor,
                            CalUnitvalue:item.Unitvalue,
                            std:result2[i].Rate,
                            cartage:result2[i].cartage,
                            Civ_Elec:result2[i].Civ_Elec,
                            schyear:result2[i].schyear,
                            Stages:result2[i].Stages,
                              Ratestype:result2[i].Ratestype,
                              cess:result2[i].cess,
                    gst:result2[i].gst,
                    Username:item.Username,
                    subheads:item.SubHeadCode
                            // Icode:result[i].Icode
                            
                           
                        });
              product.save(function(error){
                  if(!error){
                      // res.status(200).json(product);
                      console.log('saved icode1')
                  }
                  else{
                      // res.status(500).send({error:error});
                    
                  }
              });
            
        
        
        
        
          }
      
      
          
        
        
          
      //     //5.9.5
          else if(result2[i].Icode != ""  ){
            // console.log(result2[i].Icode)
            // console.log(result2[i].Quantity)
            Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:2016,Username:'123',Civ_Elec:'CIVIL'}},
            {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
            labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
           
            cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
            Water:{$cond:{if:{$eq:["$Water",""]},then:result2[i].Water,else:"$Water"}},
            Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result2[i].Overheads,else:"$Overheads"}},
            CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
            Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
           Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
            wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
            }},
            {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result2[i].Quantity,"$CalUnitvalue","$Quantity"]},result2[i].CalUnitvalue]},"$Calquantityvalue"]}
            ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
            Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}       
             ],function(err,result3){ 
         
            for(i=0;i<result3.length;i++){
           
              
               
                  if(result3[i].Icode == "" && result3[i].Code!=0){
                var product = new A({
                  commoncode:item.Itemcode,
                  ItemCode:result3[i].ItemCode,
                  Description:result3[i].Description,
                  Code:result3[i].Code,
                  Rate:result3[i].Rate,
                  Unit:result3[i].Unit,
                  Unitvalue:result3[i].Unitvalue,
                  Calquantityvalue:item.Calquantity,
                  Quantity:result3[i].Quantity,
                  Water:result3[i].Water,
                  Overheads:result3[i].Overheads,
                  Amount:((result3[i].Quantity*result3[i].Rate)/result3[i].Unitvalue),
                  labour_facor:result3[i].labour_facor,
                  CalUnitvalue:item.Unitvalue,
                  std:result3[i].Rate,
                  cartage:result3[i].cartage,
                  Stages:result3[i].Stages,
                  Civ_Elec:result3[i].Civ_Elec,
                  schyear:result3[i].schyear,
                  Ratestype:result3[i].Ratestype,
                  cess:result3[i].cess,
                    gst:result3[i].gst,
                    Username:item.Username,
                    subheads:item.SubHeadCode
                  // Icode:result[i].Icode
                  
                 
              });
        product.save(function(error){
        if(!error){
            // res.status(200).json(product);
            console.log('savedicode2')
        }
        else{
            // res.status(500).send({error:error});
        }
        });
        }
          
      
        else if(result3[i].Icode!=""){
        // console.log(result3[i].Icode)
        // console.log(result3[i].Quantity)
        
        Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:2016,Username:'123',Civ_Elec:'CIVIL'}},
        {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
        labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
       
        cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
        Water:{$cond:{if:{$eq:["$Water",""]},then:result3[i].Water,else:"$Water"}},
        Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result3[i].Overheads,else:"$Overheads"}},
        CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
        Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
       Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
        wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
        }},
        
        {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result3[i].Quantity,"$CalUnitvalue","$Quantity"]},result3[i].CalUnitvalue]},"$Calquantityvalue"]}
        ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
        Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}
        
        ],function(err,result4){ 
        console.log('3')
        // console.log(result3)
        for(i=0;i<result4.length;i++){
        
        
        
        if(result4[i].Icode == "" && result4[i].Code!=0){
        var product = new A({
          commoncode:item.Itemcode,
        ItemCode:result4[i].ItemCode,
        Description:result4[i].Description,
        Code:result4[i].Code,
        Rate:result4[i].Rate,
        Unit:result4[i].Unit,
        Unitvalue:result4[i].Unitvalue,
        Calquantityvalue:item.Calquantity,
        Quantity:result4[i].Quantity,
        Water:result4[i].Water,
        Overheads:result4[i].Overheads,
        Amount:((result4[i].Quantity*result4[i].Rate)/result4[i].Unitvalue),
        labour_facor:result4[i].labour_facor,
        CalUnitvalue:item.Unitvalue,
        std:result4[i].Rate,
        cartage:result4[i].cartage,
        Stages:result4[i].Stages,
        Civ_Elec:result4[i].Civ_Elec,
        schyear:result4[i].schyear,
        Ratestype:result4[i].Ratestype,
        cess:result4[i].cess,
                    gst:result4[i].gst,
                    Username:item.Username,
                    subheads:item.SubHeadCode
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
        
        Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:2016,Username:'123',Civ_Elec:'CIVIL'}},
        {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
        labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
       
        cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
        Water:{$cond:{if:{$eq:["$Water",""]},then:result4[i].Water,else:"$Water"}},
        Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result4[i].Overheads,else:"$Overheads"}},
        CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
        Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
       Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
        wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
        }},
        {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result4[i].Quantity,"$CalUnitvalue","$Quantity"]},result4[i].CalUnitvalue]},"$Calquantityvalue"]}
        ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
        Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}} 
        ],function(err,result5){ 
        // console.log(result5[0].ItemCode)
        // console.log(result3)
        console.log('4')
        for(i=0;i<result5.length;i++){
        
        
        
          if(result5[i].Icode == "" && result5[i].Code!=0){
        var product = new A({
          commoncode:item.Itemcode,
          ItemCode:result5[i].ItemCode,
          Description:result5[i].Description,
          Code:result5[i].Code,
          Rate:result5[i].Rate,
          Unit:result5[i].Unit,
          Unitvalue:result5[i].Unitvalue,
          Calquantityvalue:item.Calquantity,
          Quantity:result5[i].Quantity,
          Water:result5[i].Water,
          Overheads:result5[i].Overheads,
          Amount:((result5[i].Quantity*result5[i].Rate)/result5[i].Unitvalue),
          labour_facor:result5[i].labour_facor,
          CalUnitvalue:item.Unitvalue,
          std:result5[i].Rate,
          cartage:result5[i].cartage,
          Stages:result5[i].Stages,
          Civ_Elec:result5[i].Civ_Elec,
          schyear:result5[i].schyear,
          Ratestype:result5[i].Ratestype,
          cess:result5[i].cess,
                    gst:result5[i].gst,
                    Username:item.Username,
                    subheads:item.SubHeadCode
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
        
        Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:2016,Username:'123',Civ_Elec:'CIVIL'}},
        {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
        labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
       
        cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
        Water:{$cond:{if:{$eq:["$Water",""]},then:result5[i].Water,else:"$Water"}},
        Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result5[i].Overheads,else:"$Overheads"}},
        CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
        Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
       Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
        wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
        }},
        {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result5[i].Quantity,"$CalUnitvalue","$Quantity"]},result5[i].CalUnitvalue]},"$Calquantityvalue"]}
        ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
        Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}
        
        ],function(err,result6){ 
        console.log(result6[0].ItemCode)
        // console.log(result3)
        for(i=0;i<result6.length;i++){
        
        
        
        if(result6[i].Icode == "" && result6[i].Code!=0){
        var product = new A({
          commoncode:item.Itemcode,
        ItemCode:result6[i].ItemCode,
        Description:result6[i].Description,
        Code:result6[i].Code,
        Rate:result6[i].Rate,
        Unit:result6[i].Unit,
        Unitvalue:result6[i].Unitvalue,
        Calquantityvalue:item.Calquantity,
        Quantity:result6[i].Quantity,
        Water:result6[i].Water,
        Overheads:result6[i].Overheads,
        Amount:((result6[i].Quantity*result6[i].Rate)/result6[i].Unitvalue),
        labour_facor:result6[i].labour_facor,
        CalUnitvalue:item.Unitvalue,
        std:result6[i].Rate,
        cartage:result6[i].cartage,
        Stages:result6[i].Stages,
        Civ_Elec:result6[i].Civ_Elec,
        schyear:result6[i].schyear,
        Ratestype:result6[i].Ratestype,
        cess:result6[i].cess,
                    gst:result6[i].gst,
                    Username:item.Username,
                    subheads:item.SubHeadCode
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
        )} 
      
        } 
      
        
        
            outerCallback()
              
            })
            
          },function(){
             
       
      
      
      
      Sr2007.aggregate([{$match:{Itemcode:'20.10',schyear:2016,Username:'123',Civ_Elec:'CIVIL',Rate:{$ne:0}}},
      {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
      {$project:{Itemcode:1,Calquantity:1,_id:0}}], function(err,result){
      if(err){
      res.status(500).json({code: 500, message: 'Internal server error'});
      }
      else{
      async.eachSeries(result, function (item, outerCallbac) {
      
      //  cal= item.Calquantity
        console.log(item.Itemcode)
       console.log(cal)
      
       A.aggregate([{$facet:{
        
      labour:[{$match:{commoncode:item.Itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec}},
       {$project:{la:{$divide:[{$multiply:["$Amount","$labour_facor"]},100]},labour_facor:1,Amount:1,Water:1,Overheads:1,cartage:1,
       Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{labt:{$add:["$Amount","$la"]},la:1,Amount:1,Water:1,cartage:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,Overheads:1,labt:1,cartage:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{tot1:{$add:["$labt","$cart"]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,tot1:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{wattot:{$add:["$wat","$tot1"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{gstt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
       {$project:{gstplustot:{$add:["$gstt","$wattot"]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
      
      
      
      
      
       {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
       {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
      
       {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
       {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
      
       {$project:{fintotcal:{$multiply:[{$divide:["$CalUnitvalue","$Calquantityvalue"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
      
       //{$project:{fintotcal:{$divide:["$cessplusfintot",cal]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,lwattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
      
       {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
       ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
          gstt:{$sum:"$gstt"},  gsttot:{$sum:"$gstplustot"},
       over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
       cesst:{$sum:"$cessplusfintot"},
       totaldivcal:{$sum:"$fintotcal"}}}],
      
      
      
       }},
      
        ],function(err,result){
          console.log(result)
          console.log(result[0].labour[0])
      
      
      if(result[0].labour[0]=="" || result[0].labour[0]==undefined ){
          finres=0
      }
      else{ 
      
         
        finres=parseFloat(result[0].labour[0].totaldivcal.toFixed(2))
      }
         
    //       var myquery = { Itemcode: item.Itemcode,schyear:req.body.schyear,Username:req.body.username,Civ_Elec:req.body.Civ_Elec };
    //       var new_values = {currentrate:finres };
        
         
    //   Sr2007.updateOne(myquery,  {$set: new_values},function(err,result){
    //       if(err ){
    //           console.log(error)
    //       }
    //       else{
    //           console.log(finres)
        
             
    //       }
    //   })
        
      outerCallbac()
       })
      }, function(){
     res.json('ppipil')
      
      }
    
      )}})
      
      
      
      
            
          })
        }
        
        }
         )
        
        },
      





  


        ////chgdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhj




        // Sr2007.aggregate([{$match:{SubHeadCode:9,schyear:req.body.schyear,schyear:2007,Username:'',Civ_Elec:'CIVIL',SR_NSR:'SR',Rate:{$ne:0}}},
        // {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
        // {$project:{Itemcode:1,Calquantity:1,_id:0}}], function(err,result){
        // if(err){
        // res.status(500).json({code: 500, message: 'Internal server error'});
        // }
        // else{
        // async.eachSeries(result, function (item, outerCallbac) {
        
        // //  cal= item.Calquantity
        //   console.log(item.Itemcode)
        //  console.log(cal)
        
        //  A.aggregate([{$facet:{
          
        // labour:[{$match:{commoncode:item.Itemcode,schyear:2007,Civ_Elec:'CIVIL'}},
        //  {$project:{la:{$divide:[{$multiply:["$Amount","$labour_facor"]},100]},labour_facor:1,Amount:1,Water:1,Overheads:1,cartage:1,
        //  Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{labt:{$add:["$Amount","$la"]},la:1,Amount:1,Water:1,cartage:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,Overheads:1,labt:1,cartage:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{tot1:{$add:["$labt","$cart"]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,tot1:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{wattot:{$add:["$wat","$tot1"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{gstt:{$divide:[{$multiply:["$wattot","$gst"]},100]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gst:1}},
        //  {$project:{gstplustot:{$add:["$gstt","$wattot"]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        
        
        
        
        
        //  {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        //  {$project:{fintot:{$add:["$wattotove","$gstplustot"]},wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        
        //  {$project:{cessmulfintot:{$divide:[{$multiply:["$fintot","$cess"]},100]},fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        //  {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        
        //  {$project:{fintotcal:{$multiply:[{$divide:["$CalUnitvalue","$Calquantityvalue"]},"$cessplusfintot"]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        
        //  //{$project:{fintotcal:{$divide:["$cessplusfintot",cal]},cessplusfintot:1,cessmulfintot:1,fintot:1,wattotove:1,gstplustot:1,lwattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,Calquantityvalue:1,CalUnitvalue:1,cess:1,gstt:1,gst:1}},
        
        //  {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
        //  ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
        //     gstt:{$sum:"$gstt"},  gsttot:{$sum:"$gstplustot"},
        //  over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
        //  cesst:{$sum:"$cessplusfintot"},
        //  totaldivcal:{$sum:"$fintotcal"}}}],
        
        
        
        //  }},
        
        //   ],function(err,result){
        //     console.log(result)
        //     console.log(result[0].labour[0])
        
        
        // if(result[0].labour[0]=="" || result[0].labour[0]==undefined ){
        //     finres=0
        // }
        // else{ 
        
           
        //   finres=parseFloat(result[0].labour[0].totaldivcal.toFixed(2))
        // }
           
        //     var myquery = { Itemcode: item.Itemcode,schyear:2007,Username:'',Civ_Elec:'CIVIL',SR_NSR:'SR'};
        //     var new_values = {currentrate:finres };
          
           
        // Sr2007.updateOne(myquery,  {$set: new_values},function(err,result){
        //     if(err ){
        //         console.log(error)
        //     }
        //     else{
        //         console.log(finres)
          
        //         outerCallbac()
        //     }
        // })
          
         
        //  })
        // }, function(){
        //   A.deleteMany({schyear:2007,Civ_Elec:'CIVIL',},function(err){
            
        //     console.log("deleted")
        //   })
        //   console.timeEnd()
        // //   res.json("update and deleted")
        
        // })
        
        // }})












//         else if(result1[i].Icode != "" ){ 
//             cal=result1[i].Calquantityvalue;
//              console.log(result1[i].Icode)
//             // console.log(result1[i].Calquantityvalue)
          
//             //  console.log(i)
//             //   console.log(result1[i].Quantity)
  
  
//                 Analysisf.aggregate([{$match:{ItemCode:result1[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL',sr_nsr:'SR'}},
//                 {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
//                 labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
               
//                 cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
//                 Water:{$cond:{if:{$eq:["$Water",""]},then:result1[i].Water,else:"$Water"}},
//                 Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result1[i].Overheads,else:"$Overheads"}},
//                 CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
//                 Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
//                Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
//                 wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
//                 }},
//                 {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result1[i].Quantity,"$CalUnitvalue","$Quantity"]},result1[i].CalUnitvalue]},"$Calquantityvalue"]},
//                 Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
//                 Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}                         
//                  ],function(err,result2){ 
              
//                     console.log('2')
//                 for(i=0;i<result2.length;i++){
                 
//                   if(result2[i].Icode == "" && result2[i].Code!=0 ){
//                     // console.log(result2[i].ItemCode)
          
                     
//                     var product = new A({
//                       commoncode:item.Itemcode,
//                       ItemCode:result2[i].ItemCode,
//                       Description:result2[i].Description,
//                       Code:result2[i].Code,
//                       Rate:result2[i].Rate,
//                       Unit:result2[i].Unit,
//                       Unitvalue:result2[i].Unitvalue,
//                       Calquantityvalue:item.Calquantity,
//                       Quantity:result2[i].Quantity,
//                       Water:result2[i].Water,
//                       Overheads:result2[i].Overheads,
//                       Amount:((result2[i].Quantity*result2[i].Rate)/result2[i].Unitvalue),
//                       labour_facor:result2[i].labour_facor,
//                       CalUnitvalue:item.Unitvalue,
//                       std:result2[i].Rate,
//                       cartage:result2[i].cartage,
//                       Civ_Elec:result2[i].Civ_Elec,
//                       schyear:result2[i].schyear,
//                       Stages:result2[i].Stages,
//                         Ratestype:result2[i].Ratestype,
//                         cess:result2[i].cess,
//               gst:result2[i].gst,
//               Username:item.Username,
//               subheads:item.SubHeadCode
//                       // Icode:result[i].Icode
                      
                     
//                   });
//         product.save(function(error){
//             if(!error){
//                 // res.status(200).json(product);
//                 console.log('saved icode1')
//             }
//             else{
//                 // res.status(500).send({error:error});
              
//             }
//         });
      
  
  
  
  
//     }


    
  
  
    
// //     //5.9.5
//     else if(result2[i].Icode != ""  ){
//       // console.log(result2[i].Icode)
//       // console.log(result2[i].Quantity)
//       Analysisf.aggregate([{$match:{ItemCode:result2[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
//       {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
//       labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
     
//       cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
//       Water:{$cond:{if:{$eq:["$Water",""]},then:result2[i].Water,else:"$Water"}},
//       Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result2[i].Overheads,else:"$Overheads"}},
//       CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
//       Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
//      Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
//       wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
//       }},
//       {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result2[i].Quantity,"$CalUnitvalue","$Quantity"]},result2[i].CalUnitvalue]},"$Calquantityvalue"]}
//       ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
//       Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}       
//        ],function(err,result3){ 
   
//       for(i=0;i<result3.length;i++){
     
        
         
//             if(result3[i].Icode == "" && result3[i].Code!=0){
//           var product = new A({
//             commoncode:item.Itemcode,
//             ItemCode:result3[i].ItemCode,
//             Description:result3[i].Description,
//             Code:result3[i].Code,
//             Rate:result3[i].Rate,
//             Unit:result3[i].Unit,
//             Unitvalue:result3[i].Unitvalue,
//             Calquantityvalue:item.Calquantity,
//             Quantity:result3[i].Quantity,
//             Water:result3[i].Water,
//             Overheads:result3[i].Overheads,
//             Amount:((result3[i].Quantity*result3[i].Rate)/result3[i].Unitvalue),
//             labour_facor:result3[i].labour_facor,
//             CalUnitvalue:item.Unitvalue,
//             std:result3[i].Rate,
//             cartage:result3[i].cartage,
//             Stages:result3[i].Stages,
//             Civ_Elec:result3[i].Civ_Elec,
//             schyear:result3[i].schyear,
//             Ratestype:result3[i].Ratestype,
//             cess:result3[i].cess,
//               gst:result3[i].gst,
//               Username:item.Username,
//               subheads:item.SubHeadCode
//             // Icode:result[i].Icode
            
           
//         });
//   product.save(function(error){
//   if(!error){
//       // res.status(200).json(product);
//       console.log('savedicode2')
//   }
//   else{
//       // res.status(500).send({error:error});
//   }
//   });
//   }
    

//   else if(result3[i].Icode!=""){
//   // console.log(result3[i].Icode)
//   // console.log(result3[i].Quantity)
  
//   Analysisf.aggregate([{$match:{ItemCode:result3[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
//   {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
//   labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
 
//   cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
//   Water:{$cond:{if:{$eq:["$Water",""]},then:result3[i].Water,else:"$Water"}},
//   Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result3[i].Overheads,else:"$Overheads"}},
//   CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
//   Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
//  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
//   wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
//   }},
  
//   {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result3[i].Quantity,"$CalUnitvalue","$Quantity"]},result3[i].CalUnitvalue]},"$Calquantityvalue"]}
//   ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
//   Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}
  
//   ],function(err,result4){ 
//   console.log('3')
//   // console.log(result3)
//   for(i=0;i<result4.length;i++){
  
  
  
//   if(result4[i].Icode == "" && result4[i].Code!=0){
//   var product = new A({
//     commoncode:item.Itemcode,
//   ItemCode:result4[i].ItemCode,
//   Description:result4[i].Description,
//   Code:result4[i].Code,
//   Rate:result4[i].Rate,
//   Unit:result4[i].Unit,
//   Unitvalue:result4[i].Unitvalue,
//   Calquantityvalue:item.Calquantity,
//   Quantity:result4[i].Quantity,
//   Water:result4[i].Water,
//   Overheads:result4[i].Overheads,
//   Amount:((result4[i].Quantity*result4[i].Rate)/result4[i].Unitvalue),
//   labour_facor:result4[i].labour_facor,
//   CalUnitvalue:item.Unitvalue,
//   std:result4[i].Rate,
//   cartage:result4[i].cartage,
//   Stages:result4[i].Stages,
//   Civ_Elec:result4[i].Civ_Elec,
//   schyear:result4[i].schyear,
//   Ratestype:result4[i].Ratestype,
//   cess:result4[i].cess,
//               gst:result4[i].gst,
//               Username:item.Username,
//               subheads:item.SubHeadCode
//   // Icode:result[i].Icode
  
  
//   });
//   product.save(function(error){
//   if(!error){
//   // res.status(200).json(product);
//   }
//   else{
//   // res.status(500).send({error:error});
//   }
//   });
  
  
  
  
  
  
  
  
  
//   }
  
  
//   else if(result4[i].Icode!=""){
//   // console.log(result4[i].Icode)
//   // console.log(result4[i].Quantity)
  
//   Analysisf.aggregate([{$match:{ItemCode:result4[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
//   {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
//   labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
 
//   cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
//   Water:{$cond:{if:{$eq:["$Water",""]},then:result4[i].Water,else:"$Water"}},
//   Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result4[i].Overheads,else:"$Overheads"}},
//   CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
//   Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
//  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
//   wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
//   }},
//   {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result4[i].Quantity,"$CalUnitvalue","$Quantity"]},result4[i].CalUnitvalue]},"$Calquantityvalue"]}
//   ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
//   Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}} 
//   ],function(err,result5){ 
//   // console.log(result5[0].ItemCode)
//   // console.log(result3)
//   console.log('4')
//   for(i=0;i<result5.length;i++){
  
  
  
//     if(result5[i].Icode == "" && result5[i].Code!=0){
//   var product = new A({
//     commoncode:item.Itemcode,
//     ItemCode:result5[i].ItemCode,
//     Description:result5[i].Description,
//     Code:result5[i].Code,
//     Rate:result5[i].Rate,
//     Unit:result5[i].Unit,
//     Unitvalue:result5[i].Unitvalue,
//     Calquantityvalue:item.Calquantity,
//     Quantity:result5[i].Quantity,
//     Water:result5[i].Water,
//     Overheads:result5[i].Overheads,
//     Amount:((result5[i].Quantity*result5[i].Rate)/result5[i].Unitvalue),
//     labour_facor:result5[i].labour_facor,
//     CalUnitvalue:item.Unitvalue,
//     std:result5[i].Rate,
//     cartage:result5[i].cartage,
//     Stages:result5[i].Stages,
//     Civ_Elec:result5[i].Civ_Elec,
//     schyear:result5[i].schyear,
//     Ratestype:result5[i].Ratestype,
//     cess:result5[i].cess,
//               gst:result5[i].gst,
//               Username:item.Username,
//               subheads:item.SubHeadCode
//     // Icode:result[i].Icode
    
   
//   });
//   product.save(function(error){
//   if(!error){
//   // res.status(200).json(product);
//   }
//   else{
//   // res.status(500).send({error:error});
//   }
//   });
  
  
//   }
  
//   else if(result5[i].Icode!=""){
//   // console.log(result5[i].Icode)
//   // console.log(result5[i].Quantity)
  
//   Analysisf.aggregate([{$match:{ItemCode:result5[i].Icode,schyear:2007,Username:'',Civ_Elec:'CIVIL'}},
//   {$project:{Quantity:{$cond:{if:{$or:[{$eq:["$Quantity","NULL"]},{$eq:["$Quantity",""]}]},then:0,else:"$Quantity"}},
//   labour_facor:{$cond:{if:{$eq:["$labour_facor",'NULL']},then:0,else:"$labour_facor"}},
 
//   cartage:{$cond:{if:{$eq:["$cartage",""]},then:0,else:"$cartage"}},Civ_Elec:1,schyear:1,
//   Water:{$cond:{if:{$eq:["$Water",""]},then:result5[i].Water,else:"$Water"}},
//   Overheads:{$cond:{if:{$eq:["$Overheads",""]},then:result5[i].Overheads,else:"$Overheads"}},
//   CalUnitvalue:{$cond:{if:{$eq:["$CalUnitvalue","NULL"]},then:1,else:"$CalUnitvalue"}},
//   Calquantityvalue:{$cond:{if:{$eq:["$Calquantityvalue",0]},then:1,else:"$Calquantityvalue"}},
//  Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,
//   wastage:1,Wastage_desc:1,Stages:1,Code:1,Rate:1,cess:1,gst:1
//   }},
//   {$project:{Quantity:{$divide:[{$divide:[{$multiply:[result5[i].Quantity,"$CalUnitvalue","$Quantity"]},result5[i].CalUnitvalue]},"$Calquantityvalue"]}
//   ,Code:1,ItemCode:1,Icode:1,Description:1,Unitvalue:1,Unit:1,CalUnitvalue:1, Calquantityvalue:1,Rate:1,
//   Overheads:1,wastage:1,Wastage_desc:1,Water:1,Overheads:1,cartage:1,Stages:1,Code:1,labour_facor:1,cess:1,gst:1,lab:1,Civ_Elec:1,schyear:1,Username:1,_id:0}}
  
//   ],function(err,result6){ 
//   console.log(result6[0].ItemCode)
//   // console.log(result3)
//   for(i=0;i<result6.length;i++){
  
  
  
//   if(result6[i].Icode == "" && result6[i].Code!=0){
//   var product = new A({
//     commoncode:item.Itemcode,
//   ItemCode:result6[i].ItemCode,
//   Description:result6[i].Description,
//   Code:result6[i].Code,
//   Rate:result6[i].Rate,
//   Unit:result6[i].Unit,
//   Unitvalue:result6[i].Unitvalue,
//   Calquantityvalue:item.Calquantity,
//   Quantity:result6[i].Quantity,
//   Water:result6[i].Water,
//   Overheads:result6[i].Overheads,
//   Amount:((result6[i].Quantity*result6[i].Rate)/result6[i].Unitvalue),
//   labour_facor:result6[i].labour_facor,
//   CalUnitvalue:item.Unitvalue,
//   std:result6[i].Rate,
//   cartage:result6[i].cartage,
//   Stages:result6[i].Stages,
//   Civ_Elec:result6[i].Civ_Elec,
//   schyear:result6[i].schyear,
//   Ratestype:result6[i].Ratestype,
//   cess:result6[i].cess,
//               gst:result6[i].gst,
//               Username:item.Username,
//               subheads:item.SubHeadCode
//   // Icode:result[i].Icode
  
  
//   });
//   product.save(function(error){
//   if(!error){
//   // res.status(200).json(product);
//   }
//   else{
//   // res.status(500).send({error:error});
//   }
//   });
  
  
//   }
  
  
//   }
//   // console.log(result4);
//   }
//   )}
  
  
  
  
  
  
  
  
  
  
  
//   }
         
//   // console.log(result3);
//   }
//   )}
//   }
//   });
//   }}
  
//   //console.log()
  
//   })
//   }
//         }
//         // res.json(result1) 
//        }
//   )} 







































}




module.exports = cosbreakAPI



// Sr2007.aggregate([{$match:{SubHeadCode:20,schyear:2016,SR_NSR : "SR",Username:"",Civ_Elec:"CIVIL",Rate:{$ne:0}}},
// {$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},
// {$project:{Itemcode:1,Calquantity:1,_id:0}}], function(err,result){
// if(err){
// res.status(500).json({code: 500, message: 'Internal server error'});
// }
// else{
// async.eachSeries(result, function (item, outerCallbac) {

//  cal= item.Calquantity
//   console.log(item.Itemcode)
//  console.log(cal)

//  A.aggregate([{$facet:{
  
// labour:[{$match:{commoncode:item.Itemcode,Civ_Elec:"CIVIL",schyear:2016}},
//  {$project:{la:{$divide:[{$multiply:["$Amount","$labour_facor"]},100]},labour_facor:1,Amount:1,Water:1,Overheads:1,cartage:1}},
//  {$project:{labt:{$add:["$Amount","$la"]},la:1,Amount:1,Water:1,cartage:1,Overheads:1}},
//  {$project:{cart:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,Overheads:1,labt:1,cartage:1}},
//  {$project:{tot1:{$add:["$labt","$cart"]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1}},
//  {$project:{wat:{$divide:[{$multiply:["$tot1","$Water"]},100]},la:1,Amount:1,Water:1,labt:1,Overheads:1,cart:1,tot1:1}},
//  {$project:{wattot:{$add:["$wat","$tot1"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,}},
//  {$project:{gst:{$multiply:["$wattot",0.1405]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1}},
//  {$project:{gstplustot:{$add:["$gst","$wattot"]},wattot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,gst:1}},




// //gst+total+water+overheads
//  {$project:{wattotove:{$divide:[{$multiply:["$gstplustot","$Overheads"]},100]},gstplustot:1,la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattot:1,gst:1,gstplustot:1}},
//  {$project:{fintot:{$add:["$wattotove","$gstplustot"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,gst:1,gstplustot:1}},
// //cess
//  {$project:{cessmulfintot:{$multiply:["$fintot",0.01]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,gst:1,fintot:1,gstplustot:1}},
//  {$project:{cessplusfintot:{$add:["$fintot","$cessmulfintot"]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,gst:1,fintot:1,cessmulfintot:1,gstplustot:1}},

//  {$project:{fintotcal:{$divide:["$cessplusfintot",cal]},la:1,Amount:1,Water:1,labt:1,cart:1,tot1:1,wat:1,Overheads:1,wattotove:1,wattot:1,fintot:1,gst:1,cessplusfintot:1,cessmulfintot:1,gstplustot:1}},

//  // {$project:{watt:{$divide:[{$multiply:["$cartage","$labt"]},100]},la:1,Amount:1,Water:1,labt:1,cart:1}},
//  {$group:{_id:1,total:{$sum:"$Amount"},  labourfacor:{$sum:"$la"},labplustotal:{$sum:"$labt"},cartage:{$sum:"$cart"} 
//  ,labourfacorpluscartage:{$sum:"$tot1"},watercharge:{$sum:"$wat"},waterchargeplustotal:{$sum:"$wattot"},
//     gstt:{$sum:"$gst"},  gsttot:{$sum:"$gstplustot"},
//  over:{$sum:"$wattotove"},overheadsplustotal:{$sum:"$fintot"},  cess:{$sum:"$cessmulfintot"},
//  cesst:{$sum:"$cessplusfintot"},
//  totaldivcal:{$sum:"$fintotcal"}}}],



//  }},

//   ],function(err,result){
//     console.log(result)
//     var i
//   finres=result[0].labour[0].totaldivcal
   
//     var myquery = { ItemCode: item.Itemcode,schyear:2016,Username:"",Civ_Elec:"CIVIL" };
//     var new_values = { Rate:finres };
  
   
//     Sr2007.updateOne(myquery,  {$set: new_values})
  
//     console.log(finres)
  
//    outerCallbac()
//  })
// }, function(){
//   // mongoose.connection.collections.a.drop(function(err){
    
//   //   console.log("deleted")
//   // })
//   res.json("update and deleted")
// })

// }})










//costbreakupmarketrate(wit look up(i.e   joining analysisf and rates))

// marketrate:async function(req,res){
//     console.log(req.body)
    
//     try {





//         let a = await Analysisf.aggregate([{ $match: { ItemCode: req.body.itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username,sr_nsr:'NSR' } },
//             {
//                 $lookup: {
//                     from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec", username: "$Username" },
//                     pipeline: [{
//                         $match: {
//                             $expr: {
//                                 $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] }, { $eq: ["$Username", "$$username"] },
//                                 { $eq: ["$Civ_Elec", "$$civil"] }]
//                             },
//                         }
//                     }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                     { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                 }
//         }, {
//             $project: {
//                 q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                 lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: 0, else: "$labour_facor" } },
//                 Quantity: { $cond: { if: { $eq: ["$Quantity", ''] }, then: 1, else: "$Quantity" } },
//                 cartage: { $cond: { if: { $eq: ["$cartage", ''] }, then: 0, else: "$cartage" } },
//                 Water: { $cond: { if: { $eq: ["$Water", ""] }, then: 0, else: "$Water" } },
//                 Overheads: { $cond: { if: { $eq: ["$Overheads", ""] }, then: 0, else: "$Overheads" } },
//                 Rate: { $cond: { if: { $eq: ["$Rate", ''] }, then: 0, else: "$Rate" } },
//                 CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                 Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                 gst: { $cond: { if: { $eq: ["$gst", ""] }, then: 0, else: "$gst" } },
//                 cess: { $cond: { if: { $eq: ["$cess", ""] }, then: 0, else: "$cess" } },
//                 _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Calquantityvalue: 1, Code: 1, Stages: 1,
//                 wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1, CalUnitvalue: 1,Username:1
//             }
//         }, { $unwind: "$q" }, {
//             $project:
//             {
//                 _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, Calquantityvalue: 1, Water: 1, CalUnitvalue: 1,Username:1,
//                 wastage: 1, Wastage_desc: 1, Quantity: 1, Civ_Elec: 1, schyear: 1, lab: 1, Overheads: 1, q: 1, cartage: 1, Stages: 1, Code: 1, CalUnitvalue: 1, Rate: 1,gst:1,cess:1

//             }
//         }], async function (err, result) {
//             // console.log(result)

//             for (const qw of result) {




//                 if (qw.Icode == "" && qw.Code != 0) {
                   

//                     console.log('firsticode==empty')
//                     var product = new A({
//                         commoncode: req.body.itemcode,
//                         ItemCode: qw.ItemCode,
//                         Description: qw.Description,
//                         Code: qw.Code,
//                         Quantity: qw.Quantity,
//                         Rate: qw.q.Marketate,
//                         std: qw.Rate,
//                         Unit: qw.Unit,
//                         Unitvalue: qw.Unitvalue,
//                         Calquantityvalue: qw.Calquantityvalue,
//                         Water: qw.Water,
//                         Overheads: qw.Overheads,
//                         Amount: ((qw.Quantity * qw.q.Marketate / qw.Unitvalue)),
//                         labour_facor: qw.lab,
//                         CalUnitvalue: qw.CalUnitvalue,
//                         cartage: qw.cartage,
//                         Civ_Elec: qw.Civ_Elec,
//                         schyear: qw.schyear,
//                         Stages: qw.Stages,
//                         Ratestype: qw.q.Ratestype,
//                         Username:req.body.username,
//                         usercalquan:req.body.calquantity,
//                         userunit:req.body.unit,
//                         srnsr:req.body.srnsr,
//                         cess:qw.cess,
// gst:qw.gst,
//                         labourcost:parseFloat(((qw.Quantity * qw.q.Marketate / qw.Unitvalue)*(qw.lab/100)).toFixed(2)),
//                         cartagecost:parseFloat(((((qw.Quantity * qw.q.Marketate / qw.Unitvalue)*(qw.lab/100))+(qw.Quantity * qw.q.Marketate / qw.Unitvalue))*qw.cartage/100).toFixed(2)),
//                         watercost:parseFloat(((((qw.Quantity * qw.q.Marketate / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(qw.Water/100)).toFixed(2)),
// gstcost:parseFloat(((((((qw.Quantity * qw.q.Marketate / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(qw.gst/100)).toFixed(2)),
// overcost:parseFloat((((((((qw.Quantity * qw.q.Marketate / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(qw.Overheads/100)).toFixed(2)),
// cesscost:parseFloat(((((((((qw.Quantity * qw.q.Marketate / qw.Unitvalue)*((qw.lab/100)+1))*(1+qw.cartage/100))*(1+qw.Water/100)))*(1+qw.gst/100))*(1+qw.Overheads/100))*(qw.cess/100)).toFixed(2))





//                     });
//                     let save = await product.save()
//                     console.log('save')


//                 }


//                 else if (qw.Icode != "") {                                                                                                                                                {
//                     console.log(qw.Icode)
//                     console.log('firsticode!=empty')
//                     console.log('labour = ' +qw.lab)
//                     console.log('Quantity = ' +qw.Quantity  + '   Unit = '  +  qw.Unitvalue)

//    try {
//        let x = await Analysisf.aggregate([{ $match: { ItemCode: qw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec } },
//                         {
//                             $lookup: {
//                                 from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec" },
//                                 pipeline: [{
//                                     $match: {
//                                         $expr: {
//                                             $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] },
//                                             { $eq: ["$Civ_Elec", "$$civil"] }]
//                                         },
//                                     }
//                                 }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                                 { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                             }
//                         }, {
//                             $project: {
//                                 q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                                 lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: qw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
//                                 Quantity: { $cond: { if: { $eq: ["$Quantity", ''] }, then: 1, else: "$Quantity" } },
//                                 cartage: { $cond: { if: { $eq: ["$cartage", 0] }, then:qw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
//                                 Water: { $cond: { if: { $eq: ["$Water", 0] }, then: qw.Water, else: {"$sum":["$Water",qw.Water]} } },
//                                 gst: { $cond: { if: { $eq: ["$gst", 0] }, then:qw.gst, else: {"$sum":["$gst",qw.gst]} } },
//                                 cess: { $cond: { if: { $eq: ["$cess", 0] }, then:qw.cess, else: {"$sum":["$cess",qw.cess]} } },
//                                 Overheads: { $cond: { if: { $eq: ["$Overheads", 0] }, then:qw.Overheads, else: {"$sum":["$Overheads",qw.Overheads]}} },
//                                 Rate: { $cond: { if: { $eq: ["$Rate", ''] }, then: 0, else: "$Rate" } },
//                                 CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                                 Calquantityvalue: { $cond: { if: { $eq: ["$Calquantityvalue", 0] }, then: 1, else: "$Calquantityvalue" } },
//                                 Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                                 _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,
//                                 wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
//                             }
//                         }, { $unwind: "$q" },

//                         {
//                             $project: {
//                                 Quantity: { $divide: [{ $divide: [{ $multiply: [qw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, qw.Unitvalue] }
//                                 , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,
//                                 Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                             }
//                         },

//                         {
//                             $project: {
//                                 Quantity: 1,
//                                 Code: 1, ItemCode: 1, Rate: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1,Calquantityvalue: 1,
//                                 Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                             }
//                         }
//                         ])
// //  console.log(x)



//                         for (const sw of x) {
// //                            console.log(sw.q)
// //                               console.log('calquans' + sw.Calquantityvalue +'cal' +sw.CalUnitvalue)
// // console.log('dffgj'+ sw.Quantity)

//                             if (sw.Icode == "" && sw.Code != 0) {
//                                 console.log('secondicode==empty')

//                                 var product = new A({
//                                     commoncode: req.body.itemcode,
//                                     ItemCode: sw.ItemCode,
//                                     Description: sw.Description,
//                                     Code: sw.Code,
//                                     Quantity: sw.Quantity,
//                                     Rate: sw.q.Marketate,
//                                     std: sw.Rate,
//                                     Unit: sw.Unit,
//                                     Unitvalue: sw.Unitvalue,
//                                     Calquantityvalue: sw.Calquantityvalue,
//                                     Water: sw.Water,
//                                     Overheads: sw.Overheads,
//                                     Amount: ((sw.Quantity * sw.q.Marketate / sw.Unitvalue)),
//                                     labour_facor: sw.lab,
//                                     CalUnitvalue: sw.CalUnitvalue,
//                                     cartage: sw.cartage,
//                                     Civ_Elec: sw.Civ_Elec,
//                                     schyear: sw.schyear,
//                                     Stages: sw.Stages,
//                                     Ratestype: sw.q.Ratestype,
//                                     Username:req.body.username,
//                                     usercalquan:req.body.calquantity,
//                                     userunit:req.body.unit,
//                                     srnsr:req.body.srnsr,
//                                     cess:sw.cess,
//                                     gst:sw.gst,
//                                     labourcost:parseFloat(((sw.Quantity * sw.q.Marketate / sw.Unitvalue)*(sw.lab/100)).toFixed(2)),
//                                     cartagecost:parseFloat(((((sw.Quantity * sw.q.Marketate / sw.Unitvalue)*(sw.lab/100))+(sw.Quantity * sw.q.Marketate / sw.Unitvalue))*sw.cartage/100).toFixed(2)),
//                                     watercost:parseFloat(((((sw.Quantity * sw.q.Marketate / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(sw.Water/100)).toFixed(2)),
//             gstcost:parseFloat(((((((sw.Quantity * sw.q.Marketate / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(sw.gst/100)).toFixed(2)),
//             overcost:parseFloat((((((((sw.Quantity * sw.q.Marketate / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(sw.Overheads/100)).toFixed(2)),
//             cesscost:parseFloat(((((((((sw.Quantity * sw.q.Marketate / sw.Unitvalue)*((sw.lab/100)+1))*(1+sw.cartage/100))*(1+sw.Water/100)))*(1+sw.gst/100))*(1+sw.Overheads/100))*(sw.cess/100)).toFixed(2))





//                                 });
//                                 let save1 = await product.save()
//                                 console.log('save1')


//                             }


//   else if (sw.Icode != "") {
//             console.log('po')
//          console.log(sw.Icode)
//          console.log(sw.Water)

//      console.log('secondicode!=empty')

//         try {
//             let x1 = await Analysisf.aggregate([{ $match: { ItemCode: sw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,} },
//                  {
//                   $lookup: {
//                     from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec", },
//                     pipeline: [{
//                         $match: {
//                             $expr: {
//                                 $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] }, 
//                                 { $eq: ["$Civ_Elec", "$$civil"] }]
//                             },                                        
//                                                 }
//                                             }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                                             { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                                         }
//                                     }, {
//                                         $project: {
//                                             q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                                             lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: sw.lab, else:{"$sum":["$labour_facor",qw.lab]}} },
//                                             Quantity: { $cond: { if: { $eq: ["$Quantity", 0] }, then: 1, else: "$Quantity" } },
//                                             cartage: { $cond: { if: { $eq: ["$cartage",0] }, then: sw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
//                                             Water: { $cond: { if: { $eq: ["$Water", 0] }, then: sw.Water, else: {"$sum":["$Water",qw.Water]} } },
//                                             Overheads: { $cond: { if: { $eq: ["$Overheads",0 ] }, then: sw.Overheads, else:{"$sum":["$Overheads",qw.Overheads]} } },
//                                             gst: { $cond: { if: { $eq: ["$gst", 0] }, then:sw.gst, else: {"$sum":["$gst",qw.gst]} } },
//                                 cess: { $cond: { if: { $eq: ["$cess",0] }, then:sw.cess, else: {"$sum":["$cess",qw.cess]} } },
//                                             Rate: { $cond: { if: { $eq: ["$Rate", 'NULL'] }, then: 0, else: "$Rate" } },
//                                             CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                                             Calquantityvalue: { $cond: { if: { $eq: ["$Calquantityvalue", 0] }, then: 1, else: "$Calquantityvalue" } },
//                                             Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                                             _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,
//                                             wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
//                                         }
//                                     }, { $unwind: "$q" },

//                                     {
//                                         $project: {
//                                             Quantity: { $divide: [{ $divide: [{ $multiply: [sw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, sw.Unitvalue] }
//                                             , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,
//                                             Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                         }
//                                     },

//                                     {
//                                         $project: {
//                                             Quantity: 1,
//                                             Code: 1, ItemCode: 1, Rate: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1,
//                                             Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                         }
//                                     }
//                                     ])
//                                     // console.log(x1)


//                                     for (const tw of x1) {

//                                         // console.log(tw)



//                                         if (tw.Icode == "" && tw.Code != 0) {
//                                             console.log(tw.Code)
//                                             console.log(tw.Icode)
//                                             console.log('thirdicode==empty')


//                                             var product = new A({
//                                                 commoncode: req.body.itemcode,
//                                                 ItemCode: tw.ItemCode,
//                                                 Description: tw.Description,
//                                                 Code: tw.Code,
//                                                 Quantity: tw.Quantity,
//                                                 Rate: tw.q.Marketate,
//                                                 std: tw.Rate,
//                                                 Unit: tw.Unit,
//                                                 Unitvalue: tw.Unitvalue,
//                                                 Calquantityvalue: tw.Calquantityvalue,
//                                                 Water: tw.Water,
//                                                 Overheads: tw.Overheads,
//                                                 Amount: ((tw.Quantity * tw.q.Marketate / tw.Unitvalue)),
//                                                 labour_facor: tw.lab,
//                                                 CalUnitvalue: tw.CalUnitvalue,
//                                                 cartage: tw.cartage,
//                                                 Civ_Elec: tw.Civ_Elec,
//                                                 schyear: tw.schyear,
//                                                 Stages: tw.Stages,
//                                                 Ratestype: tw.q.Ratestype,
//                                                 Username:req.body.username,
//                                                 usercalquan:req.body.calquantity,
//                                                 userunit:req.body.unit,
//                                                 srnsr:req.body.srnsr,
//                                                 cess:tw.cess,
//                                                 gst:tw.gst,
//                                                 labourcost:parseFloat(((tw.Quantity * tw.q.Marketate / tw.Unitvalue)*(tw.lab/100)).toFixed(2)),
//                                                 cartagecost:parseFloat(((((tw.Quantity * tw.q.Marketate / tw.Unitvalue)*(tw.lab/100))+(tw.Quantity * tw.q.Marketate / tw.Unitvalue))*tw.cartage/100).toFixed(2)),
//                                                 watercost:parseFloat(((((tw.Quantity * tw.q.Marketate / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(tw.Water/100)).toFixed(2)),
//                         gstcost:parseFloat(((((((tw.Quantity * tw.q.Marketate / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(tw.gst/100)).toFixed(2)),
//                         overcost:parseFloat((((((((tw.Quantity * tw.q.Marketate / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(tw.Overheads/100)).toFixed(2)),
//                         cesscost:parseFloat(((((((((tw.Quantity * tw.q.Marketate / tw.Unitvalue)*((tw.lab/100)+1))*(1+tw.cartage/100))*(1+tw.Water/100)))*(1+tw.gst/100))*(1+tw.Overheads/100))*(tw.cess/100)).toFixed(2))                                              






//                                             });
//                                             let save2 = await product.save()
//                                             console.log('save2')


//                                         }

//                                         else if (tw.Icode != "") {
//                                             console.log(tw.Icode)
//                                             console.log('thirdicode!=empty')
//                                             try {
//                                                 let x2 = await Analysisf.aggregate([{ $match: { ItemCode: tw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, } },
//                                                 {
//                                                     $lookup: {
//                                                         from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec"},
//                                                         pipeline: [{
//                                                             $match: {
//                                                                 $expr: {
//                                                                     $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] }, 
//                                                                     { $eq: ["$Civ_Elec", "$$civil"] }]
//                                                                 },
//                                                             }
//                                                         }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                                                         { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                                                     }
//                                                 }, {
//                                                     $project: {
//                                                         q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                                                         lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: tw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
//                                                         Quantity: { $cond: { if: { $eq: ["$Quantity", 0] }, then: 1, else: "$Quantity" } },
//                                                         cartage: { $cond: { if: { $eq: ["$cartage",0] }, then: tw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
//                                             Water: { $cond: { if: { $eq: ["$Water", 0] }, then: sw.Water, else: {"$sum":["$Water",qw.Water]} } },
//                                             Overheads: { $cond: { if: { $eq: ["$Overheads",0 ] }, then: tw.Overheads, else:{"$sum":["$Overheads",qw.Overheads]} } },
//                                             gst: { $cond: { if: { $eq: ["$gst", 0] }, then:tw.gst, else: {"$sum":["$gst",qw.gst]} } },
//                                 cess: { $cond: { if: { $eq: ["$cess",0] }, then:tw.cess, else: {"$sum":["$cess",tw.cess]} } },
//                                                         Rate: { $cond: { if: { $eq: ["$Rate", 'NULL'] }, then: 0, else: "$Rate" } },
//                                                         CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                                                         Calquantityvalue: { $cond: { if: { $eq: ["$Calquantityvalue", 0] }, then: 1, else: "$Calquantityvalue" } },
//                                                         Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                                                         _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,
//                                                         wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1, Username:1
//                                                     }
//                                                 }, { $unwind: "$q" },

//                                                 {
//                                                     $project: {
//                                                         Quantity: { $divide: [{ $divide: [{ $multiply: [tw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, tw.Unitvalue] }
//                                                         , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,
//                                                         Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0, cess: 1, gst: 1,Username:1
//                                                     }
//                                                 },

//                                                 {
//                                                     $project: {
//                                                         Quantity: 1,
//                                                         Code: 1, ItemCode: 1, Rate: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1,
//                                                         Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0, cess: 1, gst: 1,Username:1
//                                                     }
//                                                 }
//                                                 ])

//                                                 // console.log(x2)
//                                                 for (const fw of x2) {




//                                                     if (fw.Icode == "" && fw.Code != 0) {
//                                                         console.log(fw.Code)
//                                                         console.log(fw.Icode)
//                                                         console.log('fourthicode==empty')

//                                                         var product = new A({
//                                                             commoncode: req.body.itemcode,
//                                                             ItemCode: fw.ItemCode,
//                                                             Description: fw.Description,
//                                                             Code: fw.Code,
//                                                             Quantity: fw.Quantity,
//                                                             Rate: fw.q.Marketate,
//                                                             std: fw.Rate,
//                                                             Unit: fw.Unit,
//                                                             Unitvalue: fw.Unitvalue,
//                                                             Calquantityvalue: fw.Calquantityvalue,
//                                                             Water: fw.Water,
//                                                             Overheads: fw.Overheads,
//                                                             Amount: ((fw.Quantity * fw.q.Marketate / fw.Unitvalue)),
//                                                             labour_facor: fw.lab,
//                                                             CalUnitvalue: fw.CalUnitvalue,
//                                                             cartage: fw.cartage,
//                                                             Civ_Elec: fw.Civ_Elec,
//                                                             schyear: fw.schyear,
//                                                             Stages: fw.Stages,
//                                                             Ratestype: fw.q.Ratestype,
//                                                             Username:req.body.username,
//                         usercalquan:req.body.calquantity,
//                         userunit:req.body.unit,
//                         srnsr:req.body.srnsr,
//                         cess:fw.cess,
//                         gst:fw.gst,
//                                                             labourcost:parseFloat(((fw.Quantity * fw.q.Marketate / fw.Unitvalue)*(fw.lab/100)).toFixed(2)),
//                                                             cartagecost:parseFloat(((((fw.Quantity * fw.q.Marketate / fw.Unitvalue)*(fw.lab/100))+(fw.Quantity * fw.q.Marketate / fw.Unitvalue))*fw.cartage/100).toFixed(2)),
//                                                             watercost:parseFloat(((((fw.Quantity * fw.q.Marketate / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(fw.Water/100)).toFixed(2)),
//                                     gstcost:parseFloat(((((((fw.Quantity * fw.q.Marketate / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(fw.gst/100)).toFixed(2)),
//                                     overcost:parseFloat((((((((fw.Quantity * fw.q.Marketate / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(fw.Overheads/100)).toFixed(2)),
//                                     cesscost:parseFloat(((((((((fw.Quantity * fw.q.Marketate / fw.Unitvalue)*((fw.lab/100)+1))*(1+fw.cartage/100))*(1+fw.Water/100)))*(1+fw.gst/100))*(1+fw.Overheads/100))*(fw.cess/100)).toFixed(2))                                                     






//                                                         });
//                                                         let save3 = await product.save()
//                                                         console.log('save3')


//                                                     }




//                                                     else if (fw.Icode != "") {
//                                                         console.log(fw.Icode)

//                                                         console.log('forthicode!=empty')

//                                                         try {

//                                                             let x3 = await Analysisf.aggregate([{ $match: { ItemCode: fw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,} },
//                                                             {
//                                                                 $lookup: {
//                                                                     from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec", },
//                                                                     pipeline: [{
//                                                                         $match: {
//                                                                             $expr: {
//                                                                                 $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] }, 
//                                                                                 { $eq: ["$Civ_Elec", "$$civil"] }]
//                                                                             },
//                                                                         }
//                                                                     }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                                                                     { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                                                                 }
//                                                             }, {
//                                                                 $project: {
//                                                                     q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                                                                     lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: fw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
//                                                         Quantity: { $cond: { if: { $eq: ["$Quantity", 0] }, then: 1, else: "$Quantity" } },
//                                                         cartage: { $cond: { if: { $eq: ["$cartage",0] }, then: fw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
//                                             Water: { $cond: { if: { $eq: ["$Water", 0] }, then: fw.Water, else: {"$sum":["$Water",qw.Water]} } },
//                                             Overheads: { $cond: { if: { $eq: ["$Overheads",0 ] }, then: fw.Overheads, else:{"$sum":["$Overheads",qw.Overheads]} } },
//                                             gst: { $cond: { if: { $eq: ["$gst", 0] }, then:fw.gst, else: {"$sum":["$gst",qw.gst]} } },
//                                 cess: { $cond: { if: { $eq: ["$cess",0] }, then:fw.cess, else: {"$sum":["$cess",qw.cess]} } },
//                                                                     Rate: { $cond: { if: { $eq: ["$Rate", 'NULL'] }, then: 0, else: "$Rate" } },
//                                                                     CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                                                                     Calquantityvalue: { $cond: { if: { $eq: ["$Calquantityvalue", 0] }, then: 1, else: "$Calquantityvalue" } },
//                                                                     Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                                                                     _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,
//                                                                     wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
//                                                                 }
//                                                             }, { $unwind: "$q" },

//                                                             {
//                                                                 $project: {
//                                                                     Quantity: { $divide: [{ $divide: [{ $multiply: [fw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fw.Unitvalue] }
//                                                                     , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,
//                                                                     Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                                                 }
//                                                             },

//                                                             {
//                                                                 $project: {
//                                                                     Quantity: 1,
//                                                                     Code: 1, ItemCode: 1, Rate: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1,
//                                                                     Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                                                 }
//                                                             }
//                                                             ])
//                                                             // console.log(x3)

//                                                             for (const fiw of x3) {




//                                                                 if (fiw.Icode == "" && fiw.Code != 0) {
//                                                                     console.log(fiw.Code)
//                                                                     console.log(fiw.Icode)
//                                                                     console.log('fifthicode==empty')
//                                                                     console.log(fiw.ItemCode)


//                                                                     var product = new A({
//                                                                         commoncode: req.body.itemcode,
//                                                                         ItemCode: fiw.ItemCode,
//                                                                         Description: fiw.Description,
//                                                                         Code: fiw.Code,
//                                                                         Quantity: fiw.Quantity,
//                                                                         Rate: fiw.q.Marketate,
//                                                                         std: fiw.Rate,
//                                                                         Unit: fiw.Unit,
//                                                                         Unitvalue: fiw.Unitvalue,
//                                                                         Calquantityvalue: fiw.Calquantityvalue,
//                                                                         Water: fiw.Water,
//                                                                         Overheads: fiw.Overheads,
//                                                                         Amount: ((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)),
//                                                                         labour_facor: fiw.lab,
//                                                                         CalUnitvalue: fiw.CalUnitvalue,
//                                                                         cartage: fiw.cartage,
//                                                                         Civ_Elec: fiw.Civ_Elec,
//                                                                         schyear: fiw.schyear,
//                                                                         Stages: fiw.Stages,
//                                                                         Ratestype: fiw.q.Ratestype,
//                                                                         Username:req.body.username,
//                                                                         usercalquan:req.body.calquantity,
//                                                                         userunit:req.body.unit,
//                                                                         srnsr:req.body.srnsr,
//                                                                         cess:fiw.cess,
//                                                                         gst:fiw.gst,
//                                                                         labourcost:parseFloat(((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)*(fiw.lab/100)).toFixed(2)),
//                                                                         cartagecost:parseFloat(((((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)*(fiw.lab/100))+(fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue))*fiw.cartage/100).toFixed(2)),
//                                                                         watercost:parseFloat(((((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(fiw.Water/100)).toFixed(2)),
//                                                 gstcost:parseFloat(((((((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(fiw.gst/100)).toFixed(2)),
//                                                 overcost:parseFloat((((((((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(fiw.Overheads/100)).toFixed(2)),
//                                                 cesscost:parseFloat(((((((((fiw.Quantity * fiw.q.Marketate / fiw.Unitvalue)*((fiw.lab/100)+1))*(1+fiw.cartage/100))*(1+fiw.Water/100)))*(1+fiw.gst/100))*(1+fiw.Overheads/100))*(fiw.cess/100)).toFixed(2))
                                                





//                                                                     });
//                                                                     let save4 = await product.save()
//                                                                     console.log('save4')


//                                                                 }

//                                                                 else if (fiw.Icode != "") {
//                                                                     console.log(fiw.Icode)


//                                                                     console.log('fifthicode!=empty')

//                                                                     try {

//                                                                         let x4 = await Analysisf.aggregate([{ $match: { ItemCode: fiw.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,} },
//                                                                         {
//                                                                             $lookup: {
//                                                                                 from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec"},
//                                                                                 pipeline: [{
//                                                                                     $match: {
//                                                                                         $expr: {
//                                                                                             $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] }, 
//                                                                                             { $eq: ["$Civ_Elec", "$$civil"] }]
//                                                                                         },
//                                                                                     }
//                                                                                 }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                                                                                 { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                                                                             }
//                                                                         }, {
//                                                                             $project: {
//                                                                                 q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                                                                                 lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: fiw.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
//                                                                                 Quantity: { $cond: { if: { $eq: ["$Quantity", 0] }, then: 1, else: "$Quantity" } },
//                                                                                 cartage: { $cond: { if: { $eq: ["$cartage",0] }, then: fiw.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
//                                                                     Water: { $cond: { if: { $eq: ["$Water", 0] }, then: fiw.Water, else: {"$sum":["$Water",qw.Water]} } },
//                                                                     Overheads: { $cond: { if: { $eq: ["$Overheads",0 ] }, then: fiw.Overheads, else:{"$sum":["$Overheads",qw.Overheads]} } },
//                                                                     gst: { $cond: { if: { $eq: ["$gst", 0] }, then:fiw.gst, else: {"$sum":["$gst",qw.gst]} } },
//                                                         cess: { $cond: { if: { $eq: ["$cess",0] }, then:fiw.cess, else: {"$sum":["$cess",qw.cess]} } },
//                                                                                 CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                                                                                 Calquantityvalue: { $cond: { if: { $eq: ["$Calquantityvalue", 0] }, then: 1, else: "$Calquantityvalue" } },
//                                                                                 Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                                                                                 _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,
//                                                                                 wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
//                                                                             }
//                                                                         }, { $unwind: "$q" },

//                                                                         {
//                                                                             $project: {
//                                                                                 Quantity: { $divide: [{ $divide: [{ $multiply: [fiw.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, fiw.Unitvalue] }
//                                                                                 , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,
//                                                                                 Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                                                             }
//                                                                         },

//                                                                         {
//                                                                             $project: {
//                                                                                 Quantity: 1,
//                                                                                 Code: 1, ItemCode: 1, Rate: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1,
//                                                                                 Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                                                             }
//                                                                         }
//                                                                         ])
// console.log(x4)

//                                                                         for (const six of x4) {




//                                                                             if (six.Icode == "" && six.Code != 0) {
//                                                                                 console.log(six.Code)
//                                                                                 console.log(six.Icode)
//                                                                                 console.log('sixicode==empty')
//                                                                                 console.log(six.ItemCode)


//                                                                                 var product = new A({
//                                                                                     commoncode: req.body.itemcode,
//                                                                                     ItemCode: six.ItemCode,
//                                                                                     Description: six.Description,
//                                                                                     Code: six.Code,
//                                                                                     Quantity: six.Quantity,
//                                                                                     Rate: six.q.Marketate,
//                                                                                     std: six.Rate,
//                                                                                     Unit: six.Unit,
//                                                                                     Unitvalue: six.Unitvalue,
//                                                                                     Calquantityvalue: six.Calquantityvalue,
//                                                                                     Water: six.Water,
//                                                                                     Overheads: six.Overheads,
//                                                                                     Amount: ((six.Quantity * six.q.Marketate / six.Unitvalue)),
//                                                                                     labour_facor: six.lab,
//                                                                                     CalUnitvalue: six.CalUnitvalue,
//                                                                                     cartage: six.cartage,
//                                                                                     Civ_Elec: six.Civ_Elec,
//                                                                                     schyear: six.schyear,
//                                                                                     Stages: six.Stages,
//                                                                                     Ratestype: six.q.Ratestype,
//                                                                                     Username:req.body.username,
//                                                                                     usercalquan:req.body.calquantity,
//                                                                                     userunit:req.body.unit,
//                                                                                     srnsr:req.body.srnsr,
//                                                                                     cess:six.cess,
//                                                                                     gst:six.gst,
//                                                                                     labourcost:parseFloat(((six.Quantity * six.q.Marketate / six.Unitvalue)*(six.lab/100)).toFixed(2)),
//                                                                                     cartagecost:parseFloat(((((six.Quantity * six.q.Marketate / six.Unitvalue)*(six.lab/100))+(six.Quantity * six.q.Marketate / six.Unitvalue))*six.cartage/100).toFixed(2)),
//                                                                                     watercost:parseFloat(((((six.Quantity * six.q.Marketate / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(six.Water/100)).toFixed(2)),
//                                                             gstcost:parseFloat(((((((six.Quantity * six.q.Marketate / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(six.gst/100)).toFixed(2)),
//                                                             overcost:parseFloat((((((((six.Quantity * six.q.Marketate / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(six.Overheads/100)).toFixed(2)),
//                                                             cesscost:parseFloat(((((((((six.Quantity * six.q.Marketate / six.Unitvalue)*((six.lab/100)+1))*(1+six.cartage/100))*(1+six.Water/100)))*(1+six.gst/100))*(1+six.Overheads/100))*(six.cess/100)).toFixed(2))





//                                                                                 });
//                                                                                 let save5 = await product.save()
//                                                                                 console.log('save5')


//                                                                             }
//                                                                             else if (six.Icode != '') {
//                                                                                 console.log(six.Icode)
//                                                                                 console.log('sixthicode!=empty')


//                                                                                 try {

//                                                                                     let x5 = await Analysisf.aggregate([{ $match: { ItemCode: six.Icode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec,} },
//                                                                                     {
//                                                                                         $lookup: {
//                                                                                             from: "rate", let: { code: "$Code", year: "$schyear", civil: "$Civ_Elec", },
//                                                                                             pipeline: [{
//                                                                                                 $match: {
//                                                                                                     $expr: {
//                                                                                                         $and: [{ $eq: ["$Code", "$$code"] }, { $eq: ["$Schyear", "$$year"] },
//                                                                                                         { $eq: ["$Civ_Elec", "$$civil"] }]
//                                                                                                     },
//                                                                                                 }
//                                                                                             }, { $match: { Schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec, Username: req.body.username } },
//                                                                                             { $project: { _id: 0, Marketate: 1, Ratestype: 1, Username: 1, Rate: 1 } }], as: "mrate"
//                                                                                         }
//                                                                                     }, {
//                                                                                         $project: {
//                                                                                             q: { $cond: { if: { $eq: ["$mrate", []] }, then: 1, else: "$mrate" } },
//                                                                                             lab: { $cond: { if: { $eq: ["$labour_facor", 0] }, then: six.lab, else: {"$sum":["$labour_facor",qw.lab]} } },
//                                                                                             Quantity: { $cond: { if: { $eq: ["$Quantity", 0] }, then: 1, else: "$Quantity" } },
//                                                                                             cartage: { $cond: { if: { $eq: ["$cartage",0] }, then: six.cartage, else: {"$sum":["$cartage",qw.cartage]} } },
//                                                                                 Water: { $cond: { if: { $eq: ["$Water", 0] }, then: six.Water, else: {"$sum":["$Water",qw.Water]} } },
//                                                                                 Overheads: { $cond: { if: { $eq: ["$Overheads",0 ] }, then: six.Overheads, else:{"$sum":["$Overheads",qw.Overheads]} } },
//                                                                                 gst: { $cond: { if: { $eq: ["$gst", 0] }, then:six.gst, else: {"$sum":["$gst",qw.gst]} } },
//                                                                     cess: { $cond: { if: { $eq: ["$cess",0] }, then:six.cess, else: {"$sum":["$cess",qw.cess]} } },
//                                                                                             Rate: { $cond: { if: { $eq: ["$Rate", ''] }, then: 0, else: "$Rate" } },
//                                                                                             CalUnitvalue: { $cond: { if: { $eq: ["$CalUnitvalue", 0] }, then: 1, else: "$CalUnitvalue" } },
//                                                                                             Calquantityvalue: { $cond: { if: { $eq: ["$Calquantityvalue", 0] }, then: 1, else: "$Calquantityvalue" } },
//                                                                                             Unitvalue: { $cond: { if: { $eq: ["$Unitvalue", 0] }, then: 1, else: "$Unitvalue" } },
//                                                                                             _id: 0, ItemCode: 1, Icode: 1, Description: 1, Unit: 1, Code: 1, Stages: 1,
//                                                                                             wastage: 1, Wastage_desc: 1, Civ_Elec: 1, schyear: 1,Username:1
//                                                                                         }
//                                                                                     }, { $unwind: "$q" },

//                                                                                     {
//                                                                                         $project: {
//                                                                                             Quantity: { $divide: [{ $divide: [{ $multiply: [six.Quantity, "$CalUnitvalue", "$Quantity"] }, "$Calquantityvalue"] }, six.CalUnitvalue] }
//                                                                                             , Code: 1, ItemCode: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1, Rate: 1,
//                                                                                             Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                                                                         }
//                                                                                     },

//                                                                                     {
//                                                                                         $project: {
//                                                                                             Quantity: 1,
//                                                                                             Code: 1, ItemCode: 1, Rate: 1, Icode: 1, Description: 1, Unitvalue: 1, Unit: 1, CalUnitvalue: 1, Calquantityvalue: 1,
//                                                                                             Overheads: 1, wastage: 1, Wastage_desc: 1, Water: 1, Overheads: 1, cartage: 1, Stages: 1, Code: 1, q: 1, lab: 1, Civ_Elec: 1, schyear: 1, _id: 0,cess:1,gst:1,Username:1
//                                                                                         }
//                                                                                     }
//                                                                                     ])



//                                                                                     for (const sev of x5) {


//                                                                                         if (sev.Icode == "" && sev.Code != 0) {
//                                                                                             console.log(sev.Code)
//                                                                                             console.log(sev.Icode)
//                                                                                             console.log('fifthicode==empty')
//                                                                                             console.log(sev.ItemCode)


//                                                                                             var product = new A({
//                                                                                                 commoncode: req.body.itemcode,
//                                                                                                 ItemCode: sev.ItemCode,
//                                                                                                 Description: sev.Description,
//                                                                                                 Code: sev.Code,
//                                                                                                 Quantity: sev.Quantity,
//                                                                                                 Rate: sev.q.Marketate,
//                                                                                                 std: sev.Rate,
//                                                                                                 Unit: sev.Unit,
//                                                                                                 Unitvalue: sev.Unitvalue,
//                                                                                                 Calquantityvalue: sev.Calquantityvalue,
//                                                                                                 Water: sev.Water,
//                                                                                                 Overheads: sev.Overheads,
//                                                                                                 Amount: ((sev.Quantity * sev.q.Marketate / sev.Unitvalue)),
//                                                                                                 labour_facor: sev.lab,
//                                                                                                 CalUnitvalue: sev.CalUnitvalue,
//                                                                                                 cartage: sev.cartage,
//                                                                                                 Civ_Elec: sev.Civ_Elec,
//                                                                                                 schyear: sev.schyear,
//                                                                                                 Stages: sev.Stages,
//                                                                                                 Ratestype: sev.q.Ratestype,
//                                                                                                 Username:req.body.username,
//                                                                                                 usercalquan:req.body.calquantity,
//                                                                                                 userunit:req.body.unit,
//                                                                                                 srnsr:req.body.srnsr,
//                                                                                                 cess:sev.cess,
//                                                                                                 gst:sev.gst,
//                                                                                                 labourcost:parseFloat(((sev.Quantity * sev.q.Marketate / sev.Unitvalue)*(sev.lab/100)).toFixed(2)),
//                                                                                                 cartagecost:parseFloat(((((sev.Quantity * sev.q.Marketate / sev.Unitvalue)*(sev.lab/100))+(sev.Quantity * sev.q.Marketate / sev.Unitvalue))*sev.cartage/100).toFixed(2)),
//                                                                                                 watercost:parseFloat(((((sev.Quantity * sev.q.Marketate / sev.Unitvalue)*((sev.lab/100)+1))*(1+sev.cartage/100))*(sev.Water/100)).toFixed(2)),
//                                                                         gstcost:parseFloat(((((((sev.Quantity * sev.q.Marketate / sev.Unitvalue)*((sev.lab/100)+1))*(1+sev.cartage/100))*(1+sev.Water/100)))*(sev.gst/100)).toFixed(2)),
//                                                                         overcost:parseFloat((((((((sev.Quantity * sev.q.Marketate / sev.Unitvalue)*((sev.lab/100)+1))*(1+sev.cartage/100))*(1+sev.Water/100)))*(1+sev.gst/100))*(sev.Overheads/100)).toFixed(2)),
//                                                                         cesscost:parseFloat(((((((((sev.Quantity * sev.q.Marketate / sev.Unitvalue)*((sev.lab/100)+1))*(1+sev.cartage/100))*(1+sev.Water/100)))*(1+sev.gst/100))*(1+sev.Overheads/100))*(sev.cess/100)).toFixed(2))


//                                                                                             });
//                                                                                             let save6 = await product.save()
//                                                                                             console.log('save6')

//                                                                                         }
//                                                                                     }
                                                                                      


//                                                                                 } catch (err) {

//                                                                                 }

//                                                                             }
//                                              }
//                                          }
//                                                                     catch (err) {
//                                                                         console.log(err)
//                                   }









//                                      }
//                                 }



//                                                         } catch (err) {
//                                                             console.log(err)
//                                                         }











//                                                     }

//                                                 }




//                                             }
//                                             catch (err) {
//                                                 console.log(err)
//                                             }

//                                             console.log(tw.Icode)
//                                         }





//                                   }
//                                 }
//                                 catch (err) {
//                                     console.log(err)
//                                 }









//                              }


//                        }
//                     }
//                     catch (err) {
//                         console.log(err)
//                     }






// // //                     //                             }



//                     // }
//                     // )








//        }








//     }







//           }




//             let display = await A.find({ commoncode:req.body.itemcode, schyear: req.body.schyear, Civ_Elec: req.body.Civ_Elec })

//             await res.json(display)



//         })

//     }
//     catch (err) {
//         console.log(err)
//     }





        



// },