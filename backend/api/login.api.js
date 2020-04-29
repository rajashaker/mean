//templogin
var Login = require('../Schemas/temporarylogin.schema');
var userlog = require('../Schemas/userlogin.schema')
var Rate = require('../Schemas/rate.schema');
var Sr2007 = require('../Schemas/srrates.schema');
var Analysisf = require('../Schemas/analysisf.schema');
var async = require('async');
var A = require('../Schemas/product.schema');
var MongoClient = require('mongodb').MongoClient
var mongoose= require('mongoose');

// var userlogin=require('../Schemas/userlogin.schema')
var generator = require('generate-password');
// require('dotenv').config();
q = '';

var async = require('async');

var newuser = {
    //mainpage component new user registering

    saving: function (request, res, next) {
        password = generator.generate({
            length: 10,
            numbers: true,
            name1: request.body.name + request.body.uniqueuserid
        });
        if (request.body.officetype == 'Contractor') {
            q = 'individual';
        }
        else {
            q = 'firm';
        }
        var newProduct = new Login({
            UserName: request.body.name + request.body.uniqueuserid,
            Accesscode: password,
            RAccesscode: '',
            Type: q,
            FirstName: request.body.name,
            Lastname: '',
            OfficeName: request.body.officetype,
            Company: '',
            Email: request.body.email,
            Address1: request.body.address,
            Address2: '',
            Country: '',
            City: request.body.city,
            State: request.body.state,
            Pincode: request.body.pincode,
            Iaddress: '',
            Mobile: request.body.mobile,
            Telphone: '',
            Category: request.body.category,
            SecQues1: request.body.q1,
            SecAns1: request.body.a1,
            SecQues2: request.body.q2,
            SecAns2: request.body.a2,
            RegIPAddress: request.body.ip,
            RegisterTime: request.body.date,
            ReghostName: '',
            UniqueuserID: request.body.uniqueuserid,

        });
        res.status(200).send({ "msg": "success" });

        newProduct.save(function (error) {

        });


        // console.log(request.body);

    },

    //authentication
    authlog: function (request, response) {
        // console.log(request.body);
        
        userlog.find().where('UserName').equals(request.body.UserName).where('Accesscode').equals(request.body.password)
            .countDocuments(function (error, numRows) {
                let sess = request.session;
                sess.user1 = request.body.UserName;
                response.status(200).json({
                    count: numRows
                });
                // console.log(numRows)
            });
    },

    //checking mail if aldready enterd
    dispmail: function (req, res) {
        Login.find({}, { Email: 1, UniqueuserID: 1 }, { sort: { "UniqueuserID": -1 } },
            function (err, result) {
                // console.log(result);
                res.json(result);
            })
    },


    //getting the data who are register in temporary login table
    templogin: function (req, res) {

        Login.find({},

            function (err, result) {
                // console.log(result);

                res.json(result);


            });
    },

    //checking

    checking: function (request, res, next) {



async.eachSeries(request.body,
        function (item, next) {
            // console.log(item.UserName)
           
    
            var newuser = new userlog({
                UserName: item.UserName,
                Accesscode: item.Accesscode,
                RAccesscode: item.RAccesscode,
                Type: item.Type,
                FirstName: item.FirstName,
                Lastname: item.Lastname,
                OfficeName: item.OfficeName,
                Company: item.Company,
                Email: item.Email,
                Address1: item.Address1,
                Address2: item.Address2,
                Country: item.Country,
                City: item.City,
                State: item.State,
                Pincode: item.Pincode,
                Iaddress: item.Iaddress,
                Mobile: item.Mobile,
                Telphone: item.Telphone,
                Category: item.Category,
                SecQues1: item.SecQues1,
                SecAns1: item.SecAns1,
                SecQues2: item.SecQues2,
                SecAns2: item.SecAns2,
                RegIPAddress: item.RegIPAddress,
                RegisterTime: item.RegisterTime,
                ReghostName: item.ReghostName
    
    
            })
            newuser.save(function (error) {
              
            });
        next()
        }
            
,function(){
    // console.log('checking')
      res.json('ok')  
} )   

    },

    checking1: function (request, res, next) {

        
async.eachSeries(request.body,
    function (item, next) {
                        Rate.find({ Username: "" },
                            function (err, result) {
            
                                // console.log(result.length)
            
                                for (i = 0; i < result.length; i++) {
            
            
                                    var newuserrate = new Rate({
                                        slno: result[i].slno,
                                        Code: result[i].Code,
                                        Description: result[i].Description,
                                        Unitvalue: result[i].Unitvalue,
                                        Unit: result[i].Unit,
                                        Rate: result[i].Rate,
                                        Ratestype: result[i].Ratestype,
                                        Stages: result[i].Stages,
                                        Edit: result[i].Edit,
                                        test: result[i].test,
                                        Marketrate: result[i].Marketrate,
                                        Pub_pri: result[i].Pub_pri,
                                        Username: item.UserName,
                                        GroupM: result[i].GroupM,
                                        GID: result[i].GID,
                                        Code1: result[i].Code1,
                                        Description1: result[i].Description1,
                                        Civ_Elec: result[i].Civ_Elec,
                                        eq_fac: result[i].eq_fac,
                                        eq_fac_phy: result[i].eq_fac_phy,
                                        Schyear: result[i].Schyear
            
                                    })
                                    newuserrate.save(function (error) {
                                        // console.log(item.UserName)
                                    });
                                }
                              
                                // console.log('copied' + item.UserName + 'rates')
                                next()
                            })},function(){


                                // console.log('checking1')
                                res.json('ok')  
                            })

       
        
            },

            
            checking2: function (request, res, next) {


                
                       

                                            Sr2007.find({ Username: "" },{Itemcode:1}, function (err, result2) {
                        for(i=0;i<result2.length;i++){
                                var newusersr =  new Analysisf({
                                Slno : result2[i].Slno,
                                Itemcode :result2[i].Itemcode,
                                 Description :result2[i].Description,
                                Unitvalue :  result2[i].Unitvalue,
                                Unit :  result2[i].Unit,
                                Rate : result2[i].Rate,
                                Curmarkrate:result2[i].Rate,
                                Username:request.body.UserName,
                                SubHeadCode:result2[i].SubHeadCode,
                                SubHeadDes :result2[i].SubHeadDes,
                                MasterCode :result2[i].MasterCode ,
                                MasterCode1 :result2[i].MasterCode1,
                                MasterDesc :result2[i].MasterDesc,
                                SubMasterCode :result2[i].SubMasterCode ,
                                SubMasterCode1 :result2[i].SubMasterCode1 ,
                                SubMasterDesc :result2[i].SubMasterDesc,
                                SubCode :result2[i].SubCode  ,
                                SubCode1 :result2[i].SubCode1 ,
                                SubDesc :result2[i].SubDesc,
                                SSubCode :result2[i].SSubCode ,
                                SSubCode1 :result2[i].SSubCode1,
                                SSubDesc :result2[i].SSubDesc,
                                Edit :result2[i].Edit,
                                SR_NSR :result2[i].SR_NSR,
                                Pub_pri :result2[i].Pub_pri,
                                Calquantity :result2[i].Calquantity,
                                Deviation :result2[i].Deviation,
                                Civ_Elec :result2[i].Civ_Elec,
                                ulength : result2[i].ulength,
                                ubreadth :result2[i].ubreadth,
                                uheight :result2[i].uheight,
                                schyear: result2[i].schyear,
                                Depttype :result2[i].Depttype
                              })
                    
                              newusersr.save(function(error,data){
                            //   console.log('i')
                    });
                            
                        }
                        res.json('srrate')  })
                        
                      
                  
                    },
                    
        
    checking3: async function (request, res, next) {
try{
  

        let x = await Analysisf.find({ Username: "" }, { Code: 1 })
        console.log(x.length)
        var i=0
        var entry=[]
        for (const a of x) {
            
            i++
            var newanasr = new A({
                Slno: a.Slno,
                Username: '585',
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
                sr_nsr: a.sr_nsr

            })
    //  await  newanasr.save()
          console.log(i)
          entry.push(newanasr)
if(a.length===x.length){
    break
}

        }

       for(const ab of entry){
           console.log(ab.Code)
       }
       console.log('po')
        await res.json('a')
    }
    catch(err){
        console.log(err)
    }
},











// as: async function(req,res){ 

//     let a = await Analysisf.find({ Username: "" }, { Code: 1 })

// var entry = {
// Code : 123,

// };

// var entries = [];

// var total_entries = 10000

// for (var j = 0 ; j <= a.length ; j ++){
//     var newanasr = new A({
//         Slno: a.Slno,
//         Username: '585',
//         Islno: a.Islno,
//         ItemCode: a.ItemCode,
//         MLCode: a.MLCode,
//         Icode: a.Icode,
//         Code: a.Code,
//         Description: a.Description,
//         Calquantityvalue: a.Calquantityvalue,
//         CalUnitvalue: a.CalUnitvalue,
//         Unitvalue: a.Unitvalue,
//         weightage: a.weightage,
//         Unit: a.Unit,
//         Quantity: a.quantity,
//         particularqty: a.particularqty,
//         Actualquantity: a.Actualquantity,
//         Rate: a.Rate,
//         Rate2007: a.Rate2007,
//         Amount: a.Amount,
//         Amount1: a.Amount1,
//         worktype: a.worktype,
//         Stages: a.Stages,
//         Water: a.Water,
//         watercost: a.watercost,
//         Overheads: a.Overheads,
//         overheadcost: a.overheadcost,
//         Total: a.Total,
//         Itemtotal: a.Itemtotal,
//         Calquantity: a.Calquantity,
//         Caltotal: a.Caltotal,
//         sno: a.sno,
//         cartage: a.cartage,
//         cartagecost: a.cartagecost,
//         Civ_Elec: a.Civ_Elec,
//         labour_facor: a.labour_facor,
//         labourcost: a.labourcost,
//         eq_fac: a.eq_fac,
//         eq_fac_phy: a.eq_fac_phy,
//         schyear: a.schyear,
//         Wastage_desc: a.Wastage_desc,
//         Wastage: a.Wastage,
//         sr_nsr: a.sr_nsr

//     })
// console.log (j);
// entries.push({newanasr});
// }

// console.log ("Number of entries", entries.length);


// // Get the collection

// //9
// var url = 'mongodb://localhost:27017/cms1';
// mongoose.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true} , function(err, db) {
//     console.log(db)
//     var col = db.collection('a');
// var bulk = col.initializeOrderedBulkOp();
// var counter = 0;

// async.whilst(
// // Iterator condition
// function() { return counter < entries.length },

// // Do this in the iterator
// function(callback) {
// counter++;

// bulk.insert(entries[counter] );

// if ( counter % 1000 == 0 ) {
// bulk.execute(function(err,result) {
// bulk = col.initializeOrderedBulkOp();
// callback(err);
// });
// } else {
// callback();
// }
// },

// // When all is done
// function(err) {
// if ( counter % 1000 != 0 )
// bulk.execute(function(err,result) {
// console.log( "inserted some more" );
// });
// console.log( "I'm finished now" );
// res.json('pojijij')
// }
// );

// })



// }










}

module.exports = newuser;



        //         Sr2007.find({Username:""},function(err,result2){

        //             for(i=0;i<result2.length;i++){
        //             var newusersr =  new Sr2007({
        //             Slno : result2[i].Slno,
        //             Itemcode :result2[i].Itemcode,
        //              Description :result2[i].Description,
        //             Unitvalue :  result2[i].Unitvalue,
        //             Unit :  result2[i].Unit,
        //             Rate : result2[i].Rate,
        //             Curmarkrate:result2[i].Rate,
        //             Username:item.UserName,
        //             SubHeadCode:result2[i].SubHeadCode,
        //             SubHeadDes :result2[i].SubHeadDes,
        //             MasterCode :result2[i].MasterCode ,
        //             MasterCode1 :result2[i].MasterCode1,
        //             MasterDesc :result2[i].MasterDesc,
        //             SubMasterCode :result2[i].SubMasterCode ,
        //             SubMasterCode1 :result2[i].SubMasterCode1 ,
        //             SubMasterDesc :result2[i].SubMasterDesc,
        //             SubCode :result2[i].SubCode  ,
        //             SubCode1 :result2[i].SubCode1 ,
        //             SubDesc :result2[i].SubDesc,
        //             SSubCode :result2[i].SSubCode ,
        //             SSubCode1 :result2[i].SSubCode1,
        //             SSubDesc :result2[i].SSubDesc,
        //             Edit :result2[i].Edit,
        //             SR_NSR :result2[i].SR_NSR,
        //             Pub_pri :result2[i].Pub_pri,
        //             Calquantity :result2[i].Calquantity,
        //             Deviation :result2[i].Deviation,
        //             Civ_Elec :result2[i].Civ_Elec,
        //             ulength : result2[i].ulength,
        //             ubreadth :result2[i].ubreadth,
        //             uheight :result2[i].uheight,
        //             schyear: result2[i].schyear,
        //             Depttype :result2[i].Depttype
        //           })

        //           newusersr.save(function(error){

        //         });
        //     }
        //     console.log('Copiedsr2007')
        //     console.log(item.UserName)

        //     next();
        // })




//         Rate.find({Username:""},
//         function(err,result){
//             console.log('Copyingrates')
//             for(i=0;i<result.length;i++){
//                 var newuserrate =  new Rate({
//                 slno:result[i].slno,
//                 Code:result[i].Code,
//                  Description:result[i].Description,
//                  Unitvalue:result[i].Unitvalue,
//                   Unit:result[i].Unit,
//                  Rate:result[i].Rate,
//                   Ratestype:result[i].Ratestype,
//                   Stages:result[i].Stages,
//                   Edit:result[i].Edit,
//                   test:result[i].test,
//                   Marketrate:result[i].Marketrate,
//                  Pub_pri:result[i].Pub_pri,
//                   Username:item.UserName,
//                   GroupM:result[i].GroupM,
//                  GID:result[i].GID,
//                  Code1:result[i].Code1,
//                  Description1:result[i].Description1,
//                 Civ_Elec:result[i].Civ_Elec,
//                  eq_fac:result[i].eq_fac,
//                 eq_fac_phy:result[i].eq_fac_phy,
//                 Schyear:result[i].Schyear

//                 })
//                 newuserrate.save(function(error){

//                 });
//             }
//             console.log('1ssssssss') 


// console.log(request.body.length)
//  next();
//         })



// async.eachSeries(request.body,
//     function (item, next) {
//         console.log(item.UserName)
//         a = request.body

//         var newuser = new userlog({
//             UserName: item.UserName,
//             Accesscode: item.Accesscode,
//             RAccesscode: item.RAccesscode,
//             Type: item.Type,
//             FirstName: item.FirstName,
//             Lastname: item.Lastname,
//             OfficeName: item.OfficeName,
//             Company: item.Company,
//             Email: item.Email,
//             Address1: item.Address1,
//             Address2: item.Address2,
//             Country: item.Country,
//             City: item.City,
//             State: item.State,
//             Pincode: item.Pincode,
//             Iaddress: item.Iaddress,
//             Mobile: item.Mobile,
//             Telphone: item.Telphone,
//             Category: item.Category,
//             SecQues1: item.SecQues1,
//             SecAns1: item.SecAns1,
//             SecQues2: item.SecQues2,
//             SecAns2: item.SecAns2,
//             RegIPAddress: item.RegIPAddress,
//             RegisterTime: item.RegisterTime,
//             ReghostName: item.ReghostName


//         })
//         newuser.save(function (error) {
          
//         });


//         async.eachSeries(item, function (ool, cb1) {
//             Rate.find({ Username: "" },
//                 function (err, result) {

//                     console.log(result.length)

//                     for (i = 0; i < result.length; i++) {


//                         var newuserrate = new Rate({
//                             slno: result[i].slno,
//                             Code: result[i].Code,
//                             Description: result[i].Description,
//                             Unitvalue: result[i].Unitvalue,
//                             Unit: result[i].Unit,
//                             Rate: result[i].Rate,
//                             Ratestype: result[i].Ratestype,
//                             Stages: result[i].Stages,
//                             Edit: result[i].Edit,
//                             test: result[i].test,
//                             Marketrate: result[i].Marketrate,
//                             Pub_pri: result[i].Pub_pri,
//                             Username: item.UserName,
//                             GroupM: result[i].GroupM,
//                             GID: result[i].GID,
//                             Code1: result[i].Code1,
//                             Description1: result[i].Description1,
//                             Civ_Elec: result[i].Civ_Elec,
//                             eq_fac: result[i].eq_fac,
//                             eq_fac_phy: result[i].eq_fac_phy,
//                             Schyear: result[i].Schyear

//                         })
//                         newuserrate.save(function (error) {
//                             console.log(item.UserName)
//                         });
//                     }
//                     console.log('copied' + item.UserName + 'rates')
//                 })
//                     async.eachSeries(item, function (ool, cb) {
                       

//                         Sr2007.find({ Username: "" }, function (err, result2) {
//     for(i=0;i<result2.length;i++){
//             var newusersr =  new Sr2007({
//             Slno : result2[i].Slno,
//             Itemcode :result2[i].Itemcode,
//              Description :result2[i].Description,
//             Unitvalue :  result2[i].Unitvalue,
//             Unit :  result2[i].Unit,
//             Rate : result2[i].Rate,
//             Curmarkrate:result2[i].Rate,
//             Username:item.UserName,
//             SubHeadCode:result2[i].SubHeadCode,
//             SubHeadDes :result2[i].SubHeadDes,
//             MasterCode :result2[i].MasterCode ,
//             MasterCode1 :result2[i].MasterCode1,
//             MasterDesc :result2[i].MasterDesc,
//             SubMasterCode :result2[i].SubMasterCode ,
//             SubMasterCode1 :result2[i].SubMasterCode1 ,
//             SubMasterDesc :result2[i].SubMasterDesc,
//             SubCode :result2[i].SubCode  ,
//             SubCode1 :result2[i].SubCode1 ,
//             SubDesc :result2[i].SubDesc,
//             SSubCode :result2[i].SSubCode ,
//             SSubCode1 :result2[i].SSubCode1,
//             SSubDesc :result2[i].SSubDesc,
//             Edit :result2[i].Edit,
//             SR_NSR :result2[i].SR_NSR,
//             Pub_pri :result2[i].Pub_pri,
//             Calquantity :result2[i].Calquantity,
//             Deviation :result2[i].Deviation,
//             Civ_Elec :result2[i].Civ_Elec,
//             ulength : result2[i].ulength,
//             ubreadth :result2[i].ubreadth,
//             uheight :result2[i].uheight,
//             schyear: result2[i].schyear,
//             Depttype :result2[i].Depttype
//           })

//           newusersr.save(function(error,result){
          
// });
        
//     }
    
//     async.eachSeries(item,function(ool,cb1){
//         Analysisf.find({Username:""},{code:1}, function (err, result3) {
//            console.log(result3.length)
//            res.json('a')
//         })

//     },function(){})

    
//                            console.log(result2.length)
                           
//                         })



                        
                            
//                         }, function () {
//                         console.log('5')

//                     })


                    

//         }, function () {
//             console.log('5')
            

//         })


//         next()

       

//     }

//     , function (err, result) {

//         console.log('kk')
//     }
// )