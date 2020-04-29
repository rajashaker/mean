var mongoose=require('mongoose');
var StateSchema = new mongoose.Schema(
    {
        Statecode:String,
        Location:String,
        Divcode:String,

        
    },{
    versionKey: false

});
module.exports = mongoose.model('State',StateSchema,'state');