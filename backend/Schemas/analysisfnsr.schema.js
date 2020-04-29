var mongoose = require('mongoose');
var ProductSchema1 = new mongoose.Schema(
  {
    commoncode:{},
    ItemCode:{},
    Description:{},
    Code:{},
    Rate:{},
    std:{},
    Unit:{},
    Unitvalue:{},
    Quantity:{},
    Calquantityvalue:{},
    CalUnitvalue:{},
    Amount:{},
    labour_facor:{},
    labourcost:{},
    cartage:{},
    cartagecost:{},
    Water:{},
    watercost:{},
    gst:{},
    gstcost:{},
    Overheads:{},
    overcost:{},
   cess:{},
   cesscost:{},

    Civ_Elec:{},
    schyear:{},
    Stages:{},
    Ratestype:{},
 Username:{},
    subheads:{},
    usercalquan:{},
    userunit:{},
    srnsr:{},
    date:{}
    
                 
});
module.exports = mongoose.model('Analysisfnsr', ProductSchema1,'analysisfnsr');
