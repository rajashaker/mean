var mongoose=require('mongoose');
var AnalysisfSchema = new mongoose.Schema(
    {
        
        Slno : {},
        Username:String,
        Islno: Number,        
        ItemCode:{},
        MLCode: String,
        Icode: String,
        Code :Number,
        Description:String,
        Calquantityvalue:{},
        CalUnitvalue: {},
        Unitvalue:{},
        weightage: Number,
        Unit: {},
        Quantity:{},
        particularqty: Number,
        Actualquantity: Number,
        Rate: Number,
        Rate2007: Number,
        Amount: {},
        Amount1: Number,
        worktype: String,
        Stages:Number,
        Water: {},
        watercost: Number,
        Overheads: Number,
        overheadcost: Number,
        Total:Number,
        Itemtotal: Number,
        Calquantity:String,
        Caltotal: Number,
        sno: Number,
        cartage: Number,
        cartagecost: Number,
        Civ_Elec: String,
        labour_facor: Number,
        labourcost: Number,
        eq_fac:String,
        eq_fac_phy:Number,
        schyear: Number,
        Wastage_desc:String,
        Wastage: Number,
        sr_nsr:String,
        cesscost:Number,
        gstcost:Number,
        gst:Number,
        cess:Number,
        ac:Number,
        accost:Number
        

    });
module.exports = mongoose.model('Analysisf',AnalysisfSchema,'analysisf');

//  "_id" :,
//  "Slno" : 893,
//  "Username" : "",
//  "Islno" : 0,
//  "ItemCode" : 4.9,
//  "MLCode" : 4.9,
//  "Icode" : "5.1.3",
//  "Code" : "",
//  "Description" : "Cement concrete 1:2:4 p/4x0.125x0.60 = �.007cumRate as per item No 5.1.3",
//  "Calquantityvalue" : 1,
//  "CalUnitvalue" : 1,
//  "Unitvalue" : 1,
//  "weightage" : 1,
//  "Unit" : "Cum",
//  "Quantity" : 0.007,
//  "particularqty" : 0,
//  "Actualquantity" : 0.007,
//  "Rate" : 5725.9,
//  "Rate2007" : 5725.9,
//  "Amount" : 57.26,
//  "Amount1" : 23.52,
//  "worktype" : "",
//  "Stages" : 0,
//  "Water" : "",
//  "watercost" : "",
//  "Overheads" : "",
//  "overheadcost" : "",
//  "Total" : "",
//  "Itemtotal" : "",
//  "Calquantity" : "Bollard",
//  "Caltotal" : 324.7,
//  "sno" : 2,
//  "cartage" : "",
//  "cartagecost" : "NULL",
//  "Civ_Elec" : "CIVIL",
//  "labour_facor" : 0,
//  "labourcost" : 0,
//  "eq_fac" : "FOR USE",
//  "eq_fac_phy" : 0,
//  "schyear" : 2016,
//  "Wastage_desc" : "",
//  "Wastage" : 0,
//  "sr_nsr" : "SR"

 