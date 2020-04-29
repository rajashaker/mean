var async = require('async');
// function doSomeAction() {
//     var someNestedArray = [{key:'value0'},{key:'value1'},{key:'value2'}];
//     console.log("1")
    
//     async.eachSeries(someNestedArray,
     
//         function  (item,next) {
//         console.log("hh")
//         console.log(item)
     
//         async.eachSeries(item, function(deepObj, cb1) {
//             console.log(item)
//             console.log(deepObj)
           
//           cb1()
            
//     //         async.eachSeries(item, function  (deepOb, cb,vv) {
           
//     //             console.log(item)
//     //             console.log(deepOb)
     
  
//     //           cb()
          
//     //         }, function vv(err,vf,cb1)  {
               
//     //   console.log("tyy")
//     //   next()
   
     
//     //         })
         
      
//         }, function vv(err,cb1)  {
//             next()
//   console.log("tyty")


 
//         })
    
//     }, function (err, res) {
//         console.log('AllWorkDone');
//     }
//     )}

//     doSomeAction()



      
    //         async.eachSeries(item, function br (deepObj, cb,vv) {
           
    //             console.log(item)
     
  
              
          
    //         }, function vv(err,vf,cb1)  {
               
    //   console.log("tyy")
    
    
     
    //         })
  
         




// var async = require('async');
// function doSomeAction() {
//     var someNestedArray = [[{key:'value1'}],[{key:'value2'}]];
//     // for(i=0;i<someNestedArray.length;i++){ 
//     //   console.log( someNestedArray[i]) 
//     async.forEach(someNestedArray, function (someNestedArray1, next) {
//         console.log(someNestedArray1)
//         someNestedArray1="ji"
//        console.log("start")
//     async.forEach(someNestedArray1,  function (deepObj, cb) { 
       
//             console.log(deepObj)  
//             cb()
      
//         }, 
        
//     function q() {
//         console.log("last")
//         next()
//  })
//            }, 
//            function (err, res) {
//         console.log('AllWorkDone');
//     })}
//      doSomeAction()



// var myCallback = function(data) {
//     console.log("3")
//   console.log('got data: '+data);

// };

// var usingItNow = function(callback) {
//       console.log("1")
//   callback('get it?');

// };
 
// usingItNow(myCallback);
// var async = require("async")
// var users = [1,2,3]; // Initialize user array or get it from DB

// async.forEachLimit(users, 8, function(users, userCallback){

//     async.waterfall([
//         function(callback) {
//             callback(null, 'one', 'two');
//             console.log("users")  
//         },
//         function(arg1, arg2, callback) {
//             // arg1 now equals 'one' and arg2 now equals 'two'
//             console.log(arg1)
//             callback(null, 'three');
//         },
//         function(arg1, callback) {
//             // arg1 now equals 'three'
//             callback(null, 'done');
//         }
//     ], function (err, result) {
//         // result now equals 'done'
//         console.log('done')
//         userCallback();
//     });


// }, function(err){
//     console.log("User For Loop Completed");
// });






// function doSomeAction() {
//     var someNestedArray = [[{key:'value1'}],[{key:'value2'}]];
//     async.eachSeries(someNestedArray, function (item, next) {

//         console.log(item)
//         console.log("1")
//         for(i=0;i<2;i++){
//             console.log('po')
//         }
//    next()
    
//     }, function () {
//         console.log('AllWorkDone');
//     })}
//     doSomeAction()