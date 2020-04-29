
var mongoose=require('mongoose');
var userLoginSchema = new mongoose.Schema(
    {
         
         UserName:String,
         Accesscode:String,
         RAccesscode:String,
         Type:String,
         FirstName:String,
         Lastname:String,
         OfficeName:String,
         Company:String,
         Email:String,
         Address1:String,
         Address2:String,
         Country:String,
         City:String,
         State:String,
         Pincode:String,
         Iaddress:String,
         Mobile:Number,
         Telphone:String,
         Category:String,
         SecQues1:String,
         SecAns1:String,
         SecQues2:String,
         SecAns2:String,
         RegIPAddress:String,
         RegisterTime:String,
         ReghostName:String,
        
         
         
    },{
    versionKey: false

});
module.exports = mongoose.model('Login',userLoginSchema,'login');