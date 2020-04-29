
var State = require('../Schemas/state.schema');



var Stateapi={
//mainpage component for state field
dropstate:function(req,res){
    State.aggregate([{$match:{Divcode:"NIJ"}},{$project:{statename:"$statename",Statecode:"$Statecode"}}],
        
        function(err,result){
            // console.log(result);
           
            res.json(result);
            
    
        });
    
    },



  

}
module.exports = Stateapi;