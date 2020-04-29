var mongoose = require('mongoose');
var srSchema = new mongoose.Schema(
  {
        
    slno:Number,
    ItemCode:{},
     Description:String,
     Unitvalue:Number,
      Unit:String,
     Rate:{},
      Ratestype:String,
      Stages:Number,
      Edit:String,
      test:Number,
      Marketrate:Number,
     Pub_pri:String,
      Username:String,
      GroupM:String,
     GID:Number,
     Code1:Number,
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
module.exports = mongoose.model('sr',srSchema,'Sr');