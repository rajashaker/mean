var mongoose = require('mongoose');
var AccountSchema = new mongoose.Schema(
  {
        
    slno:Number,
    Code:{},
     Description:String,
     Unitvalue:Number,
      Unit:String,
     Rate:Number,
      Ratestype:String,
      Stages:Number,
      Edit:String,
      test:Number,
      Marketrate:Number,
      Marketate:Number,
     Pub_pri:String,
      Username:String,
      GroupM:String,
     GID:Number,
     Code1:{},
     Description1:String,
    Civ_Elec:String,
     eq_fac:String,
    eq_fac_phy:Number,
    Schyear:{}
},
{
   versionKey:false
}
);
module.exports = mongoose.model('Rate',AccountSchema,'rate');