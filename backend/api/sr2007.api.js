var Sr2007= require('../Schemas/srrates.schema');
civ ="";
year="";
sub="";
civ1 ="";
year1="";
sub1="";
civ2 ="";
year2="";
sub2="";

username="";
civnew="";
yearnew="";
itemcode="";


var SrAPI={
  storerates:function(req,res){
  
 

    civ =req.body.Civ_Elec;
    year=req.body.year;
    sub=req.body.subhead;
    //  console.log(coe);
   
    // console.log(req.body)
 
    res.status(200).send({"message":"data received"});
    return e;  
    return d;  
    return r;  
},


// year dropdown from sr2007 table
// *****start****
sr2007civdropdown:function(req,res){
       
  Sr2007.aggregate([{$match:{Civ_Elec:"CIVIL",Username:'123'}},{$group:{_id:"$schyear"}},{$sort:{"_id":1}}],
   function(err,result){
      // console.log(result);
      res.json(result);
  });
},

sr2007elecdropdown:function(req,res){

  Sr2007.aggregate([{$match:{Civ_Elec:"ELECT",Username:'123'}},{$group:{_id:"$schyear"}},{$sort:{"_id":1}}],
  function(err,result){
      // console.log(result);
      res.json(result);
  });
},


// *******subhead****


  subheads:function(req,res){
    sch=parseInt(sch);
   
   Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,Username:'123'}},{$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},
{$project:{SubHeadDes:1}},{$sort:{"_id":1}}],
function(err,result){
          // console.log(result);
          res.json(result);
      });
  },

//getting subheads data from sr2007 and displaying it rates component
 subheaddes:function(req,res){
      sch=parseInt(sch);
 sub=parseInt(sub);
//  console.log(sub)
//  console.log(sch)
  Sr2007.aggregate([{$match:{schyear: year,SR_NSR : "SR",Civ_Elec:civ,SubHeadCode:sub,Username:'123' }}, 
  {$sort:{ "SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1 }},
  ],
     function(err,result){
      // console.log(result);
      res.json(result);
  });
},

// *******subhead****





subhead:function(req,res){
  sch=parseInt(sch);
sub=parseInt(sub);
// console.log(sub)
// console.log(sch)
Sr2007.aggregate([{$match:{SubHeadCode:sub,schyear:sch,SR_NSR :"SR",Civ_Elec:coe}},
 {$lookup:{from:"sr",let:{year:"$Itemcode",civil:"$Civ_Elec",sch:"$schyear"},
 pipeline:[{$match:{$expr:{$and:[{$eq:["$ItemCode","$$year"]},{$eq:["$schyear","$$sch"]},
 {$eq:["$Civ_Elec","$$civil"]}]}}}, {$project:{_id:0,Rate:1,schyear:1,ItemCode:1,Civ_Elec:1}}],as:"mrate"}},
 {$project:{qw:{$cond:{if:{$eq:["$mrate",[]]},then:0,else:"$mrate"}},Itemcode:1,Description:1,Rate:1,"Unitvalue":1,"Unit":1,
 SubHeadCode: 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1 }},
 {$unwind:"$qw"},{$sort:{"SubHeadCode": 1, "MasterCode1": 1,     "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1}},],
 function(err,result){
  // console.log(result);
  res.json(result);
});
},


saving:function(request,res,next){
  
 var newProduct =  new Sr2007({
 Slno : 0,
 Itemcode : request.body.itemcode,
 Description :request.body.description,
 Unitvalue :  request.body.unitvalue,
 Unit :  request.body.unit,
 Rate : request.body.rate,
 SubHeadCode:request.body.subheadcode,
 SubHeadDes : request.body.subheaddes,
 MasterCode : request.body.subheadcode+"." +request.body.MasterCode1,
 MasterCode1 : request.body.MasterCode1,
 MasterDesc : request.body.description,
 SubMasterCode : request.body.subheadcode+"." +request.body.MasterCode1+"."+request.body.SubMasterCode1,
 SubMasterCode1 :request.body.SubMasterCode1,
 SubMasterDesc : '',
 SubCode :request.body.subheadcode+"." +request.body.MasterCode1+"."+request.body.SubMasterCode1+"."+request.body.SubCode1,
 SubCode1 : request.body.SubCode1  ,
 SubDesc :'',
 SSubCode :  request.body.subheadcode+"." +request.body.MasterCode1+"."+request.body.SubMasterCode+"."+request.body.SubCode1+"."+request.body.SSubcode1,
 SSubCode1 : request.body.SSubcode1,
 SSubDesc : '',
 Edit : request.body.edit,
 SR_NSR :request.body.srnsr,
 Pub_pri : request.body.pubpri,
 Username : request.body.Username,
 Calquantity :  request.body.calquantity,
 Deviation : 0,
 Civ_Elec :request.body.Civ_Elec,
 ulength :'',
 ubreadth :'',
 uheight : '',
 schyear:  request.body.year,
 Depttype : '',
  
});


newProduct.save(function(error,result){
  res.status(200).send({"msg":"success"});
  // console.log(result); 
});

 
      
      
      },




      //newitem rates component getting last itemcode for new entry
//want to add username

      newitem:function(req,res){
        year1=parseInt(year1)
        Sr2007.aggregate([{$match:{schyear:year1,Civ_Elec:civ1,SubHeadCode:sub1, Username:'123'}},
        {$sort:{ "SubHeadCode": -1, "MasterCode1": -1,"SubMasterCode1": -1,"SubCode1": -1, "SSubCode1": -1 }},
        {$project:{Itemcode:1,SubHeadCode:1, MasterCode1:1,SubMasterCode1:1,SubCode1:1,SSubCode1:1}}], function(err,result){
res.json(result[0])
        })

      },

      
      newitem1:function(req,res){
        year2=parseInt(year2)
        Sr2007.aggregate([{$match:{schyear:year2,Civ_Elec:civ2,SubHeadCode:sub2 ,Username:'123'}},
        {$sort:{ "SubHeadCode": -1, "MasterCode1": -1,"SubMasterCode1": -1,"SubCode1": -1, "SSubCode1": -1 }},
        {$project:{Itemcode:1,SubHeadCode:1, MasterCode1:1,SubMasterCode1:1,SubCode1:1,SSubCode1:1,
          SubHeadDes:1,MasterDesc:1,SubMasterDesc:1,SubDesc:1,SSubDesc:1}}], function(err,result){
res.json(result[0])
        })

      },
      // newitem partial submitting and getting subheaddescription
      

parsub:function(request,res){
//  console.log( request.body)
 year1=request.body.year;
 civ1=request.body.Civ_Elec;
 sub1=request.body.subheads;
 year1=parseInt(year1)
 Sr2007.aggregate([{$match:{schyear:year1 ,Civ_Elec:civ1,SubHeadCode:sub1,Username:'123' }},
 {$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},
{$project:{SubHeadDes:1}}], function(err,result){
res.json(result[0])
 })


},

 // newitem partial submitting and getting subheaddescription for abb undernew item of existing in new item click
parsub1:function(request,res){
   console.log( request.body)
   year2=request.body.year;
   civ2=request.body.Civ_Elec;
   sub2=parseInt(request.body.usersubhead);
   year2=parseInt(year2)
   Sr2007.aggregate([{$match:{schyear:year2 ,Civ_Elec:civ2,SubHeadCode:sub2 ,Username:'123'}},
   {$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},
  {$project:{SubHeadDes:1}}], function(err,result){
  res.json(result[0])
   })
  
  
  },




unit:function(request,res){
  // console.log( request.body)
  // year1=request.body.year;
  // civ1=request.body.Civ_Elec;
  // sub1=request.body.subheads;
  year1=parseInt(year1)
  Sr2007.aggregate([{$match:{schyear:year ,Civ_Elec:civ , Unit: { $ne:'' } ,Username:'123'}},
  {$group:{ _id:"$Unit"}},
 {$project:{Unit:1}}], function(err,result){
 res.json(result)
  })
} ,

// unit1:function(request,res){
//   // console.log( request.body)
//   // year1=request.body.year;
//   // civ1=request.body.Civ_Elec;
//   // sub1=request.body.subheads;
//   year2=parseInt(year2)
//   Sr2007.aggregate([{$match:{schyear:year2 ,Civ_Elec:civ2 , Unit: { $ne:'' } }},
//   {$group:{ _id:"$Unit"}},
//  {$project:{Unit:1}}], function(err,result){
//  res.json(result)
//   })
// } ,




//save for newitem rates for x.x

savetwo:function(request,res){
//  console.log( request.body.rate)

  var newsavetwo =  new Sr2007({
    // Slno : 0,
    Itemcode : request.body.itemcode,
    Description :request.body.description,
    Unitvalue :request.body.unit,
    Unit :request.body.unitval,
    Rate : parseFloat(request.body.rate),
    currentrate:parseFloat(request.body.rate),
    SubHeadCode: parseInt(request.body.subheads),
    SubHeadDes : request.body.subheaddes,
    MasterCode : request.body.mastercode,
    MasterCode1 : parseInt(request.body.mastercode1),
    MasterDesc : request.body.masterdesc,
    SubMasterCode : request.body.submastercode,
    SubMasterCode1 :request.body.submastercode1,
    SubMasterDesc : request.body.submasterdesc,
    SubCode :request.body.subcode,
    SubCode1 :parseInt(request.body.subcode1)  ,
    SubDesc :request.body.subdesc,
    SSubCode :  request.body.ssubcode,
    SSubCode1 : parseInt(request.body.ssubcode1),
    SSubDesc : request.body.ssubdesc,
    Edit : request.body.edit,
    SR_NSR :request.body.srnsr,
    Pub_pri : request.body.pubpri,
    Username : request.body.username,
    Calquantity:request.body.calquanity,
    Deviation : 0,
    Civ_Elec :request.body.Civ_Elec,
    ulength :request.body.ulength,
    ubreadth :request.body.ubreadth,
    uheight : request.body.uheight,
    schyear:  request.body.year,
    Depttype : '',
     
   });
   
   
   newsavetwo.save(function(error,result){
     res.status(200).send({"msg":"Saved Successfully"});
     
   });
   

  

},

//getting subheads for required user
getsubrequser:function(req,res){
  // console.log(req.body)
  Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,Username:req.body.username,SR_NSR:"NSR"}},
  {$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},{$project:{SubHeadDes:1}},{$sort:{"_id":1}}],
  function(err,result){
    res.json(result)
  })


},


newusersrdata:function(req,res){
  // console.log(req.body)

Sr2007.aggregate([{$match:{schyear: parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,
  Username:req.body.username,SubHeadCode:req.body.usersubhead,SR_NSR:"NSR" }}, 
{$sort:{ "SubHeadCode": 1, "MasterCode1": 1, "SubMasterCode1": 1,"SubCode1": 1, "SSubcode1": 1 }},
],
 function(err,result){
  // console.log(result);
  res.json(result);
});
},


//update operation for new item rates
updatenew:function(req,res){
  // console.log(req.body)
  username=req.body.Username;
civnew=req.body.Civ_Elec;
yearnew=req.body.schyear;
itemcode=req.body.Itemcode;
res.json("OK")

},

//getting the records and displaying in  updateitemsrates
displaying:function(req,res){
Sr2007.findOne({Itemcode:itemcode,schyear:yearnew,Username:username,Civ_Elec:civnew},

  
  function(err,result){
    // console.log(result)
    res.json(result)
  })
},

//update query
update:function(req,res){
  // console.log(req.body)
  // console.log(parseFloat(req.body.currate))
  
  var myquery={ Itemcode:req.body.itemcode ,Username:req.body.username,Civ_Elec:req.body.civele,
  schyear:parseInt(req.body.sch)};
  var newvalues = { $set: {Description:req.body.description, currentrate:parseFloat(req.body.currate) } };
  Sr2007.updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    // console.log("1 document updated");
    res.json('Updated Successfully')
 
  })

},

//delete query for  user's data
delete:function(req,res){
  // console.log(req.body)
  Sr2007.findByIdAndRemove(req.params.id,function(err, result) {
      if (err) throw err;
      // console.log("1 document deleted");
      res.json('Deleted Successfully')
    
    })
  
  

},
//get subheads for the standard and new itemform
getstandardandnewsub:function(req,res){
  // console.log(req.body)
  var yea=parseInt(req.body.year)
  var clec=req.body.Civ_Elec
  Sr2007.aggregate([{$match:{schyear:yea,Civ_Elec:clec}},
  {$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},{$project:{SubHeadDes:1}},{$sort:{"_id":1}}],
  function(err,result){
    res.json(result)
  })


},

//get standard and user's data
getstandardandnewuserdata:function(req,res){
  // console.log(req.body)
  var years=parseInt(req.body.year)
  var cle=req.body.Civ_Elec
  var usersub=parseInt(req.body.usersubhead)
  
  Sr2007.aggregate([{$match:{"Username":req.body.username,Civ_Elec:cle,
  schyear:years,SubHeadCode:usersub}},
  {$sort:{ "SubHeadCode": 1, "MasterCode1": 1,"SubMasterCode1": 1,"SubCode1": 1,"SSubcode1": 1 }}
  ], function(err,result){
    res.json(result)
  })


},
//add under existing item
//get subheads for the standard and new itemform
getsubheadsunder:function(req,res){
  // console.log(req.body)

  Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec}},
  {$group:{ _id:{as:"$SubHeadCode",qw:{$toLower:"$SubHeadDes"}}}},{$sort:{"_id":1}}],
  function(err,result){
    res.json(result)
  })


},


getsubheadsunder1:function(req,res){
Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec
  ,"Username":req.body.username,SubHeadCode:parseInt(req.body.usersubhead)}},
  {$group:{ _id:{as:"$MasterCode",qw:"$MasterDesc",bd:"$MasterCode1",qws:"$SubHeadDes"}}},{$sort:{"_id.bd":1}}],
  function(err,result){
    res.json(result)
  })

},



getsubheadsunder2:function(req,res){
  // console.log(req.body)
Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,
  "Username":req.body.username,SubMasterCode:{$ne : ""},
  MasterCode:req.body.subhead1}},
  {$group:{ _id:{as:"$SubMasterCode",qw:"$SubMasterDesc",bd:"$SubMasterCode1",qws:"$SubHeadDes",
  mas:"$MasterDesc",mc:"$MasterCode1"
}}},
  {$sort:{"_id.bd":1}}],function(err,result){
    res.json(result)
  })

},

getsubheadsunder3:function(req,res){
  // console.log(req.body)
Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,
  "Username":req.body.username ,SubCode:{$ne : ""},
  SubMasterCode:req.body.usermastercode}},
  {$group:{ _id:{as:"$SubCode",qw:"$SubDesc",bd:"$SubCode1",qws:"$SubHeadDes",
  mas:"$MasterDesc",submas:"$SubMasterDesc",mc:"$MasterCode1",sm:"$SubMasterCode1"
}}},
  {$sort:{"_id.bd":1}}],function(err,result){
    res.json(result)
    // console.log(result)
  })

},




getsubheadsunder4:function(req,res){
  // console.log(req.body)
Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,
  "Username":req.body.username ,SSubCode:{$ne : ""},
  SubCode:req.body.usersubcode}},
  {$group:{ _id:{as:"$SSubCode",qw:"$SSubDesc",bd:"$SSubCode1",qws:"$SubHeadDes",
  mas:"$MasterDesc",submas:"$SubMasterDesc",ssubmas:"$SubDesc",mc:"$MasterCode1",sm:"$SubMasterCode1",
  sc:"$SubCode1"
}}},
  {$sort:{"_id.bd":1}}],function(err,result){
    res.json(result)
    // console.log(result)
  })

},



//add underw existing items
//for x.x

addxx:function(req,res){
  // console.log(req.body)
var civ=req.body.Civ_Elec;
var year=parseInt(req.body.year); 
var username=req.body.username;
var subhead=parseInt(req.body.usersubhead);
var code=req.body.subhead1
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,SubHeadCode:subhead,Itemcode:code,
    "Username":req.body.username }},
    
    ], function(err,result){
res.json(result)
// console.log(result)
    })
},

addxxl:function(req,res){
  var civ=req.body.Civ_Elec;
  var year=parseInt(req.body.year); 
  var username=req.body.username;
  var subhead=parseInt(req.body.usersubhead);
  var code=req.body.subhead1
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,SubHeadCode:subhead,
    "Username":req.body.username }},
  {$sort:{ "SubHeadCode": -1, "MasterCode1": -1,     "SubMasterCode1": -1,"SubCode1": -1, "SSubcode1": -1 }},
  {$project:{Itemcode:1,SubHeadCode:1, MasterCode1:1,SubMasterCode1:1,SubCode1:1,SSubcode1:1}}], function(err,result){
res.json(result[0])
  })

},


addxxx:function(req,res){
  console.log('12')
  console.log(req.body)
  var civ=req.body.Civ_Elec;
var year=parseInt(req.body.year); 
var username=req.body.username;
var subhead=parseInt(req.body.usersubhead);
var code=req.body.usermastercode
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,SubHeadCode:subhead,Itemcode:code,
    "Username":req.body.username }},
    
    ], function(err,result){
res.json(result)
console.log(result)
    })
},

addxxx2:function(req,res){
  console.log('12')
  console.log(req.body)

  Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,SubHeadCode:parseInt(req.body.usersubhead),MasterCode:req.body.subhead1,
    "Username":req.body.username }},
    
    ], function(err,result){
res.json(result)
console.log(result)
    })
},






















addxxxl:function(req,res){
  console.log('13')
  console.log(req.body)
  var civ=req.body.Civ_Elec;
  var year=parseInt(req.body.year); 
  var username=req.body.username;
  // var subhead=parseInt(req.body.subhead1);
  var code=(req.body.usersubhead+'.'+req.body.MasterCode1).toString()
//  console.log(code)
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,
    "Username":req.body.username ,SubMasterCode:{$ne : ""},
    // SubCode1:0 , 
      MasterCode:req.body.subhead1}},
      {$group:{ _id:{submastercode:"$SubMasterCode",submasterdesc:"$SubMasterDesc",submastercode1:"$SubMasterCode1",subhesdes:"$SubHeadDes",
      masterdesc:"$MasterDesc",mastercode1:"$MasterCode1",itemcode:"$Itemcode",subcode1:"$SubCode1"
      ,subheadcode:"$SubHeadCode",mastercode:"$MasterCode"
    }}},
      {$sort:{"_id.submastercode1":-1}}],function(err,result){
        res.json(result[0])
        console.log(result[0])

      })
//   console.log('fffffffffffffffffffffffff')
// console.log(req.body)


},


pooo:function(req,res){
  console.log(req.body)

  Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,
    "Username":req.body.username ,SubMasterCode:{$ne : ""},
    // SubCode1:0 , 
      MasterCode:req.body.subhead1}},
      {$group:{ _id:{submastercode:"$SubMasterCode",submasterdesc:"$SubMasterDesc",submastercode1:"$SubMasterCode1",subhesdes:"$SubHeadDes",
      masterdesc:"$MasterDesc",mastercode1:"$MasterCode1",itemcode:"$Itemcode",subcode1:"$SubCode1"
      ,subheadcode:"$SubHeadCode",mastercode:"$MasterCode"
    }}},
      {$sort:{"_id.submastercode1":-1}}],function(err,result){
        res.json(result[0])
        console.log(result[0])

      })
},























//four
addxxxx:function(req,res){
  // console.log(req.body)
  var civ=req.body.Civ_Elec;
var year=parseInt(req.body.year); 
var username=req.body.username;
var subhead=parseInt(req.body.usersubhead);
var code=req.body.usersubcode
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,SubHeadCode:subhead,Itemcode:code,
    "Username":req.body.username }},
    
    ], function(err,result){
res.json(result)
// console.log(result)
    })
},



addxxxx2:function(req,res){
  // console.log(req.body)
  var civ=req.body.Civ_Elec;
var year=parseInt(req.body.year); 
var username=req.body.username;
var subhead=parseInt(req.body.usersubhead);
var code=req.body.usersubcode

  Sr2007.aggregate([{$match:{schyear:parseInt(req.body.year),Civ_Elec:req.body.Civ_Elec,
    SubHeadCode:parseInt(req.body.usersubhead),MasterCode:req.body.subhead1,SubMasterCode:req.body.usermastercode,
    "Username":req.body.username}},
    
    ], function(err,result){
res.json(result)
// console.log(result)
    })
},













addxxxxl:function(req,res){
  var civ=req.body.Civ_Elec;
  var year=parseInt(req.body.year); 
  var username=req.body.username;
  // var subhead=parseInt(req.body.subhead1);
  var code=(req.body.usersubhead+'.'+req.body.MasterCode1).toString()
//  console.log(code)
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,
    "Username":req.body.username ,SubCode:{$ne : ""},
    // SSubCode1:0 , 
    SubMasterCode:req.body.usermastercode}},
      {$group:{ _id:{subheadcode:"$SubHeadCode",subhesdes:"$SubHeadDes",mastercode:"$MasterCode",
      mastercode1:"$MasterCode1", masterdesc:"$MasterDesc",submastercode:"$SubMasterCode",submasterdesc:"$SubMasterDesc",
      submastercode1:"$SubMasterCode1",subcode1:"$SubCode1", itemcode:"$Itemcode"
        
     
      
    }}},
      {$sort:{"_id.subcode1":-1}}],function(err,result){
        res.json(result[0])
        // console.log(result[0])

      })
//   console.log('four')
// console.log(req.body)


},


//five
addxxxxx:function(req,res){
  // console.log(req.body)
  var civ=req.body.Civ_Elec;
var year=parseInt(req.body.year); 
var username=req.body.username;
var subhead=parseInt(req.body.usersubhead);
var code=req.body.userssubcode
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,SubHeadCode:subhead,Itemcode:code,
    "Username":req.body.username }},
    
    ], function(err,result){
res.json(result)
// console.log(result)
    })
},


addxxxxxl:function(req,res){
  var civ=req.body.Civ_Elec;
  var year=parseInt(req.body.year); 
  var username=req.body.username;
  // var subhead=parseInt(req.body.subhead1);
  var code=(req.body.usersubhead+'.'+req.body.MasterCode1).toString()
//  console.log(code)
  Sr2007.aggregate([{$match:{schyear:year,Civ_Elec:civ,
    "Username":req.body.username ,SSubCode:{$ne : ""},
    SubCode:req.body.usersubcode}},
      {$group:{ _id:{submastercode:"$SubMasterCode",submasterdesc:"$SubMasterDesc",submastercode1:"$SubMasterCode1",subhesdes:"$SubHeadDes",
      masterdesc:"$MasterDesc",mastercode1:"$MasterCode1",itemcode:"$Itemcode",subcode1:"$SubCode1",
      ssubcode:"$SSubCode1"   ,subheadcode:"$SubHeadCode",mastercode:"$MasterCode"
   
    }}},
      {$sort:{"_id.ssubcode":-1}}],function(err,result){
        res.json(result[0])
        // console.log(result[0])

      })
//   console.log('five')
// console.log(req.body)


},






save:function(request,res){
  // console.log('balaji')
  // console.log(request.body)


  var newsavexx =  new Sr2007({
    // Slno : 0,
    Itemcode : request.body.itemcode,
    Description :request.body.description,
    Unitvalue :request.body.unit,
    Unit :request.body.unitval,
    Rate : parseFloat(request.body.rate),
    currentrate:parseFloat(request.body.rate),
    SubHeadCode: parseInt(request.body.usersubhead),
    SubHeadDes : request.body.usersubheaddes,
    MasterCode : request.body.subhead1,
    MasterCode1 : parseInt(request.body.MasterCode1),
    MasterDesc : request.body.MasterDesc,
    SubMasterCode : request.body.usermastercode,
    SubMasterCode1 :request.body.SubMasterCode1,
    SubMasterDesc : request.body.SubMasterDesc,
    SubCode :request.body.usersubcode,
    SubCode1 :parseInt(request.body.SubCode1)  ,
    SubDesc :request.body.SubDesc,
    SSubCode :  request.body.userssubcode,
    SSubCode1 : parseInt(request.body.SSubCode1),
    SSubDesc : request.body.SSubDesc,
    Edit : request.body.edit,
    SR_NSR :request.body.srnsr,
    Pub_pri : request.body.pubpri,
    Username : request.body.username,
    Calquantity:request.body.calquanity,
    Deviation : 0,
    Civ_Elec :request.body.Civ_Elec,
    ulength :request.body.ulength,
    ubreadth :request.body.ubreadth,
    uheight : request.body.uheight,
    schyear:  request.body.year,
    Depttype : '',
     
   });
   
   
   newsavexx .save(function(error,result){
     res.status(200).send({"msg":"success"});
     
   });
   

  

},






ss:function(req,res){
  Sr2007.find({schyear:2018},{sort:{MasterCode1:-1,SubMasterCode1:-1,SubCode1:-1,SSubCode:-1 
  }},function(req,result){
    res.json(result)
  })
}

}









  module.exports = SrAPI;
