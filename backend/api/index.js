
var mongoose= require('mongoose');

var express=  require('express');
// var cors=require('cors');
var router=express.Router();
mongoose.set('useFindAndModify',false);
{ useUnifiedTopology: true }


//this.one for localhost
   mongoose.connect(' mongodb://localhost:27017/cms1',{ useNewUrlParser: true});

var AccountAPI= require('./rate.api');
// var RatesAPI= require('./basicrates.api');
var SrAPI= require('./sr2007.api');
 var AcAPI= require('./analysisf.api');
 var Stateapi=require('./state.api');
 var newuser=require('./login.api')
//  var ap= require('./try.api');
  var NewitemsAPI = require('./newbasicrates.api');
  // var e=require('./new.api');

  var cosbreakAPI = require('./costbreaknew.api');


  router.get('/ss',SrAPI.ss);
//rates
router.post('/enroll',AccountAPI.store);

//rates table year for elect and civil
router.get('/appointmentform/civdrop',AccountAPI.civdropdown);
router.get('/appointmentform/elecdrop',AccountAPI.elecdropdown);

//rates table api
router.get('/lobour',AccountAPI.Labour);
router.get('/Materials',AccountAPI.Materials);
router.get('/Plants',AccountAPI.Plants);
router.get('/Carriage',AccountAPI.Carriage);
// *****

// sr2007 ********start***
router.post('/rate',SrAPI.storerates);

//rates table year for elect and civil  from sr2007 table
router.get('/sr2007civdrop',SrAPI.sr2007civdropdown);
router.get('/sr2007elecdrop',SrAPI.sr2007elecdropdown);

//rates component for subheads for elect and civil  from sr2007 table
router.get('/subhead',SrAPI.subheads);


//getting subheads data from sr2007 and displaying it rates component
router.get('/Subheaddes',SrAPI.subheaddes);


//newitem rates component getting last itemcode for new entry
router.get('/newitemsr',SrAPI.newitem)
router.get('/newitemsr1',SrAPI.newitem1)

// newitem partial submitting
router.post('/newitemsrsubpar',SrAPI.parsub)
router.post('/newitemsrsubpar1',SrAPI.parsub1)


router.get('/newitemunit',SrAPI.unit)

//save for newitem rates for x.x
router.post('/newitemssrsavetwo',SrAPI.savetwo)


//getting subheads for required user
router.post('/userbubhead',SrAPI.getsubrequser)

//posting subheads for required user and get the user entered data
router.post('/newusersrdata',SrAPI.newusersrdata)


//update operation for new item rtes
router.post('/newup',SrAPI.updatenew)

//getting the records and displaying in  updateitemsrates
router.get('/newdisplay',SrAPI.displaying)

//update query
router.put('/updatedata',SrAPI.update)

//delete query for  user's data
router.delete('/deletedata/:id',SrAPI.delete)

//get subheads for the standard and new itemform
router.post('/stansub',SrAPI.getstandardandnewsub)

//get standard and user's data
router.post('/stanandnew',SrAPI.getstandardandnewuserdata)

//under subhead
router.post('/subheadunder',SrAPI.getsubheadsunder)

//getsubheadsunder1
router.post('/subheadunde1',SrAPI.getsubheadsunder1)

//getsubheadsunder2
router.post('/subheadunde2',SrAPI.getsubheadsunder2)

//getsubheadsunder3
router.post('/subheadunde3',SrAPI.getsubheadsunder3)

//getsubheadsunder4
router.post('/subheadunde4',SrAPI.getsubheadsunder4)


//add underw existing items
//for x.x
router.post('/addx.x',SrAPI.addxx)
router.post('/addx.xl',SrAPI.addxxl)
router.post('/s',SrAPI.save)
//for x.x.x
router.post('/addx.x.x',SrAPI.addxxx)
router.post('/addx.x.xl',SrAPI.addxxxl)

router.post('/addx.x.x2',SrAPI.addxxx2)

router.post('/addpo',SrAPI.pooo)
//for x.x.x.x
router.post('/addx.x.x.x',SrAPI.addxxxx)
router.post('/addx.x.x.xl',SrAPI.addxxxxl)

router.post('/addx.x.x.x2',SrAPI.addxxxx2)

//for x.x.x.x.x
router.post('/addx.x.x.x.x',SrAPI.addxxxxx)
router.post('/addx.x.x.x.xl',SrAPI.addxxxxxl)

// ********end***


// ********************************************analysisf******************************

// ********************************************start******************************

//router.post('/code',AccountAPI.stor);
router.post('/code',AcAPI.stor);

//heading for required item code in sr2007 table displaying it in a analysisf component
router.get('/costciv',AcAPI.Civcosdes);

//civil costbreakup details
router.get('/cbu1',AcAPI.display1);

// total for the above costbreakup details result
router.get('/cbtot',AcAPI.total);

// ********************************************analysisf******************************

// ********************************************end******************************


//************state api******//
router.get('/state',Stateapi.dropstate);

// ********************************************end state api*****************************

//************login api******//
//for registering new user
router.post('/newuserreg',newuser.saving);

//authentication
router.post('/authlog',newuser.authlog);

//checking mail if aldready enterd
router.get('/dispmail',newuser.dispmail);

//getting the data who are register in temporary login table

router.get('/temp',newuser.templogin);

//checking
router.post('/check',newuser.checking);
router.post('/check1',newuser.checking1);
router.post('/check2',newuser.checking2);
// router.get('/check3',newuser.checking3);

// router.get('/ch',newuser.as);



// ********************************************end login api*****************************

 
//New item of construction in basrat component in angular and service is new item service
//****************new basic rates api*********************************************
//post
router.post('/store',NewitemsAPI.post)
//year
router.get('/yearcivbasrat',NewitemsAPI.yearciv)
router.get('/yearelebasrat',NewitemsAPI.yearelec)

//ratestype
router.get('/typecivbasrat',NewitemsAPI.typeciv)
router.get('/typeelebasrat',NewitemsAPI.typeelec)

//group
router.get('/groupfi',NewitemsAPI.group)

//unit
router.get('/unite',NewitemsAPI.unit)

//unitup
router.post('/unitupn',NewitemsAPI.unitup)

//newcode
router.get('/newcode',NewitemsAPI.newcode)
//allcode
router.get('/compcode',NewitemsAPI.comparecode)
//bothprocess doing comparing and give new code(it is only used)
router.get('/1',NewitemsAPI.newcode1)

 //standard nd new
 router.get('/standard',NewitemsAPI.standardnew)
//view
router.post('/view',NewitemsAPI.view)

//delete query for  user's data in rates tables
router.delete('/deleterate/:id',NewitemsAPI.delete)

//update queryfor  user's data in rates tables
router.put('/updatenewrates',NewitemsAPI.updatedata)

//saving all rates
router.post('/save',NewitemsAPI.save)



router.post('/ratepost',NewitemsAPI.postand)
router.get('/display',NewitemsAPI.displaying1)



// ********************************************end new basic rates api*****************************






//add ratesbutton
router.post('/newsave',SrAPI.saving);




// ********************************************start cost break new api*****************************
router.get('/costcivnew1',cosbreakAPI.civ)
router.get('/costelectnew1',cosbreakAPI.elect)
//subheads
router.post('/sub',cosbreakAPI.sub)
//showing the sr  item in table (user's data)
router.post('/sr',cosbreakAPI.showsr)
//subheads for  when itemcode is clicked
router.post('/cossub',cosbreakAPI.subhead)
//byclicking subhead and get srtable
router.post('/srdata',cosbreakAPI.srtable)
//post data from srtable
router.post('/postsr',cosbreakAPI.postsr)

//saving useer itemcode with the code
router.post('/postcode',cosbreakAPI.postcode)

//get viewing all rates
router.post('/viewdata',cosbreakAPI.viewdata)

//updating cost break up data
router.put('/updatecos',cosbreakAPI.updatecos)

//updating calquantity for cost break up data
router.put('/updatecal',cosbreakAPI.updatecal)

//delete query for  user's data in rates tables
router.delete('/deletecos/:id',cosbreakAPI.delete)

//for code via (inserting data in add cost breakup)
router.post('/ratetype',cosbreakAPI.ratestype)

//getting data from rates with ratestype in userraterecords
router.post('/ratedata',cosbreakAPI.data)


//getting data from analysisf with Icode icode and inside 
router.post('/checking',cosbreakAPI.analysisfcode)

//getting data from analysisf  with users temcode
router.post('/viewcos',cosbreakAPI.viewcos)

//otal for new cosbreakup for standard basic rates
router.post('/totalnewcos',cosbreakAPI.totalfornewcos)



// router.post('/soo',cosbreakAPI.gg)


 router.get('/calculatedsr',cosbreakAPI.balaji)


//geetting data from A collection and calculating sr
 router.post('/market',cosbreakAPI.marketrate)
 router.post('/totalsruser',cosbreakAPI.totalsr)

 //updating rates and analysisf rates
 router.put('/updatting',cosbreakAPI.updaterates)

//calculating nsr and updating
router.post('/nsr',cosbreakAPI.totalnsr)


router.get('/balaji1',cosbreakAPI.balaji1)

router.get('/b', cosbreakAPI.balaji34)


router.get('/b1', cosbreakAPI.b123)

// router.get('/balaji12',cosbreakAPI.sd)

router.get('/q', cosbreakAPI.we)



router.post('/sr55', cosbreakAPI.calculatesr1)



// ********************************************end cost break new api*****************************


































// router.get('/2',AcAPI.civdropdown2);
// router.get('/3',AcAPI.civdropdown3);
// router.get('/4',AcAPI.civdropdown4);
// router.get('/5',AcAPI.civdropdown5);
// router.get('/6',AcAPI.civdropdown6);
// router.get('/q',AcAPI.dropcarriage);










//   router.put('/gi',e.dd)

//  router.get('/gg',e.we)

//  router.get('/balaji',e.balaji)
//  router.get('/balaji1',e.balaji1)
//  router.get('/balaji2',e.balaji2)

//  router.get('/first',ap.upe);
//  router.get('/res',ap.total);
//  router.get('/re',ap.display);
//  router.put('/up1',ap.update1);
//  router.put('/up2',ap.update2);
//  router.put('/up3/',ap.update3);
//  router.delete('/d',ap.del);


//  router.get('/ft',ap.rt);
//  router.get('/ftt',ap.rte);






// router.post('/save',ap.sto);
//test
// router.post('/tsst',ap.tdt);
// router.get('/tt',ap.tst);


// router.get('/all',ap.allright);



 
 

















// router.get('/Sub',SrAPI.subhead);


//sr2007






//electrical costbreakup details 
// router.get('/elecos',AcAPI.total1);

// router.get('/w',AcAPI.dropdownmat);
// router.get('/45',AcAPI.d);



//BASICRATES RADIOBUTTON
// router.get('/bascivi',AccountAPI.basciv);
// router.get('/baselec',AccountAPI.baselec);


// storing the values for  BASICRATES 
// router.post('/bascstor',RatesAPI.storing);

// Fetching the data for  BASICRATES from rates table
// router.get('/bascrates',RatesAPI.basic);

//updating market rates for rates table
// router.put('/up/:id',AccountAPI.update);



//new items basic rates

// router.get('/nic',NewitemsAPI.civilnewitems);
//  router.get('/nie',NewitemsAPI.elecnewitems);
//  router.get('/ni',NewitemsAPI.sub);


//  router.post('/n',NewitemsAPI.newitemstoring);
//  router.get('/data',NewitemsAPI.data);


//  router.post('/add',NewitemsAPI.addform);

//ratestype
//  router.get('/rateelc',NewitemsAPI.ratestypeelec);
//  router.get('/rateciv',NewitemsAPI.ratestypecivil);





module.exports=router;
