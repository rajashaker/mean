import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { NewcostbreaupService } from '../services/newcostbreaup.service';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Add } from '../entites/add.entity';
import { Newsub } from '../entites/newsubheads';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Rates } from '../entites/rates.entity';
import { Product } from '../entites/product.entity';
import { SelectionModel } from '@angular/cdk/collections';
import { Analysisfdata } from '../entites/analysisfdata.entity';
import { BehaviorSubject } from 'rxjs';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { Newcostbreaup2partComponent } from './newcostbreaup2part/newcostbreaup2part.component';


@Component({
  selector: 'app-newcostbreakup',
  templateUrl: './newcostbreakup.component.html',
  styleUrls: ['./newcostbreakup.component.css']
})
export class NewcostbreakupComponent implements OnInit {

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  
  form1: FormGroup;
  form2:FormGroup;
  form3:FormGroup;
  form4:FormGroup;
  form5:FormGroup;
  form6:FormGroup;

  year:Add[];
  subheads:Newsub[];
  subheadscos:Newsub[];
  anasub:Newsub[];
ratetype:Newsub[];
ratesdata:Rates[];
  srtab:Rates[];
  srtableshow:Product[];

  datashow:Analysisfdata[];
  transferdata:Analysisfdata[];

  public user:string
public title:string
public line:string
public labcost:number
public total:number;
public calvar:any;
public calunit:any;

public finalresult:any;
END=false
showchap1=false
showspinner=false;
showyear=false
showdetail=false
showchap=false
showline=false
showtable=false
calculation=false
diff=false
selectdata=false;
selecttabledata=false
subhead2=false
button=false
selecttable=false
calculatedata=false
costbreakup=false
type=false
codedata=false
codedatabutton=false
analysisfdata=false
anabutton=false
analysissub=false



 numbers=new Array()
 numbers1=new Array()
 number=new Array()

 

listData: MatTableDataSource<any>

// dis: string[] = ['Code'];
// displayColumns = ['from', 'to'];
rows: FormArray = this.fb.array([]);


  displayedColumns: string[] = ['Code', 'Description', 'Unitvalue', 'Rate'];
  displayedCol: string[] = ['select','Code', 'Description', 'Unitvalue', 'Rate'];
  display:string[]=['select','Code', 'Description','Unit','Rate','sorn'];

  displayed: string[] = ['select','Itemcode','Icode','Code', 'Description', 'Unitvalue', 'Rate','Qty','Amount','labour','cartage','water','gst','over','cess'];
  

  selection = new SelectionModel <FormArray>(true, []);


  constructor(private costbreakservice: NewcostbreaupService,private router : Router,
    private fb: FormBuilder,private notification: NotificationService,public dialog:MatDialog) { 
    this.user = localStorage.auth_token;
 
  }

  ngOnInit() {
    

    this.form1 = this.fb.group({
      Civ_Elec: [''],
      schyear: [''],
      username:[''],
      details:[''],
      subheads:[''],
      subheads1:['']
 
  

    })
    if(this.user!=""||this.user!=null||this.user!=undefined){
      this.form1.get('username').setValue(this.user)
    }else{

    }

    //form12l
    this.form2=this.fb.group({
      Civ_Elec: [''],
      schyear: [ ],
      
      username:[''],
      subheads:['']
    


    })

    this.form3=this.fb.group({
      Civ_Elec: [''],
      schyear: [ ],
     username:[''],
     Itemcode:[{value:'',disabled:true}],
     Desc:[{value:'',disabled:true}],
     unit:[''],
     unitvalue:[''],
     unitplus:[{value:'',disabled:true}],
     calquantityvalue:['',],
     subheads1:[''],
     type:['']
     
     
   


    })

    this.form4=this.fb.group({
      user: this.fb.array([]),
      username:[''],
    Itemcode:[''],
    calunit:[''],
    calquan:[''],
  unit:[''],
  Civ_Elec:[''],
  schyear: [ ]
  


    })

    this.form6=this.fb.group({
      user: this.fb.array([]),
      calquan:[''],
      itemcode:[''],
      civ:[''],
      sch:[''],
      username:['']

      
    })


    this.form5=this.fb.group({
      id:[''],
      username:[''],
      calquantityvalue:[],
    
      Itemcode: [{value:'',disabled:true}],
        Icode: [{value:'',disabled:true}],
        Code:[{value:'',disabled:true}],
      Description :[{value:'',disabled:true}],
     Unitvalue:[{value:'',disabled:true}],
      Unit:[{value:'',disabled:true}],
      Rate :[{value:'',disabled:true}],
  Qty:['',Validators.required],
  amount:[{value:0,disabled:true}],
  labour:[0,Validators.required],
  labourcost:[{value:0,disabled:true}],
  totalpluslabour:[{value:0,disabled:true}],
  cartage:[0],
  cartagetot:[{value:0,disabled:true}],
  cartagecharge:[{value:0,disabled:true}],
  water:[0],
  watertot:[{value:0,disabled:true}],
  watercharge:[{value:0,disabled:true}],
  gst:[0],
  gsttot:[{value:0,disabled:true}],
  gstcharge:[{value:0,disabled:true}],
  overhead:[0],
  overtot:[{value:0,disabled:true}],
  overcharge:[{value:0,disabled:true}],
  cess:[0],
  cesstot:[{value:0,disabled:true}],
  cesscharge:[{value:0,disabled:true}],
  unitplus:[{value:'',disabled:true}],
  fintotal:[{value:0,disabled:true}]
 


    })



    this.form3.get('calquantityvalue').valueChanges.subscribe((value:number)=>{
      console.log(value)
      this.form5.get('calquantityvalue').setValue(this.form3.get('calquantityvalue').value)
      this.form6.get('calquan').setValue(this.form3.get('calquantityvalue').value)
      this.form6.get('itemcode').setValue(this.form3.get('Itemcode').value)
      this.form6.get('civ').setValue(this.form3.get('Civ_Elec').value)
      this.form6.get('sch').setValue(this.form3.get('schyear').value)
      this.form6.get('username').setValue(this.form3.get('username').value)
      this.calvar=value
      this.calunit=this.form4.get('calunit').value;

    });


    this.form5.get('Qty').valueChanges.subscribe((value:number)=>{
      
      console.log(value);
      var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)

      console.log(a)
     
      this.form5.get('amount').setValue(parseFloat((a).toFixed(2)))


    this.form5.get('labourcost').setValue(parseFloat((a*(this.form5.get('labour').value/100)).toFixed(2))) 
    var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))
    console.log(b);

    var c1 = this.form5.get('totalpluslabour').setValue(parseFloat((((a)*(b))+a).toFixed(2)));
    console.log(c1);

    var cartagecost=  this.form5.get('cartagetot').setValue(parseFloat(((a+(a*b))*(this.form5.get('cartage').value/100)).toFixed(2)));
   
    console.log(cartagecost);
    var cartage=(this.form5.get('cartage').value/100)
    var cartagecos:number = ((a+(a*b))*cartage)
    var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
    console.log(cartagecos)
    console.log(cartagetotal)
    this.form5.get('cartagecharge').setValue(parseFloat((cartagetotal).toFixed(2)))

var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)
this.form5.get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)))
this.form5.get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)
this.form5.get('gsttot').setValue(parseFloat((gstcos).toFixed(2)))
this.form5.get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)
this.form5.get('overtot').setValue(parseFloat((overcos).toFixed(2)))
this.form5.get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)
this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))




    


    })
    




this.form5.get('labour').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
  console.log((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value);
this.form5.get('labourcost').setValue(parseFloat((((this.form5.get('Rate').value* this.form5.get('Qty').value)/
this.form5.get('Unitvalue').value)*(this.form5.get('labour').value/100)).toFixed(2))) 

this.form5.get('totalpluslabour').setValue(parseFloat(((((this.form5.get('Rate').value* this.form5.get('Qty').value)/
this.form5.get('Unitvalue').value)*(this.form5.get('labour').value/100))+((this.form5.get('Rate').value* this.form5.get('Qty').value)/
this.form5.get('Unitvalue').value)).toFixed(2)))

var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)
this.form5.get('amount').setValue(a)
var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))

var cartage=(this.form5.get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)
this.form5.get('cartagetot').setValue(parseFloat((cartagecos).toFixed(2)))
this.form5.get('cartagecharge').setValue(parseFloat((cartagetotal).toFixed(2)))

var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)
this.form5.get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)))
this.form5.get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)
this.form5.get('gsttot').setValue(parseFloat((gstcos).toFixed(2)))
this.form5.get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)
this.form5.get('overtot').setValue(parseFloat((overcos).toFixed(2)))
this.form5.get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)


this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))





})

this.form5.get('cartage').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)
var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))

var cartage=(this.form5.get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)
this.form5.get('cartagetot').setValue(parseFloat((cartagecos).toFixed(2)))
this.form5.get('cartagecharge').setValue(parseFloat((cartagetotal).toFixed(2)))

var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)
this.form5.get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)))
this.form5.get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)
this.form5.get('gsttot').setValue(parseFloat((gstcos).toFixed(2)))
this.form5.get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)
this.form5.get('overtot').setValue(parseFloat((overcos).toFixed(2)))
this.form5.get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)

this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))

})

this.form5.get('water').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)
var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))

var cartage=(this.form5.get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)
this.form5.get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)))
this.form5.get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)
this.form5.get('gsttot').setValue(parseFloat((gstcos).toFixed(2)))
this.form5.get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)
this.form5.get('overtot').setValue(parseFloat((overcos).toFixed(2)))
this.form5.get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)


this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))

})

this.form5.get('gst').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)
var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))

var cartage=(this.form5.get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)


var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)
this.form5.get('gsttot').setValue(parseFloat((gstcos).toFixed(2)))
this.form5.get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)
this.form5.get('overtot').setValue(parseFloat((overcos).toFixed(2)))
this.form5.get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)

this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))


})

this.form5.get('overhead').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)
var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))

var cartage=(this.form5.get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)
this.form5.get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)))
this.form5.get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)


var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)
this.form5.get('overtot').setValue(parseFloat((overcos).toFixed(2)))
this.form5.get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)

this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))


})



this.form5.get('cess').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=((this.form5.get('Rate').value* this.form5.get('Qty').value)/this.form5.get('Unitvalue').value)
var b:number=(parseFloat((this.form5.get('labour').value/100).toFixed(2)))

var cartage=(this.form5.get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =(this.form5.get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)


var gst:number =(this.form5.get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)


var overheads:number=(this.form5.get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)

console.log(overcos)
console.log(overtotal)



var cess:number=(this.form5.get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal)
this.form5.get('cesstot').setValue(parseFloat((cesscos).toFixed(2)))
this.form5.get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)))
console.log(cesscos)
console.log(cesstotal)


this.form5.get('fintotal').setValue(parseFloat((cesstotal).toFixed(2)))

})







  }
qty(event){
  console.log(event.target.value)
  if(event.target.value==""){
    alert('quantity cannot be empty')
    this.form5.get('Qty').setValue(0)
  }
  else{

  }
}

lab(event){
  console.log(event.target.value)
  if(event.target.value==""){
    alert('quantity cannot be empty')
    this.form5.get('labour').setValue(0)
  }
  else{

  }
}
  qw(event){
    console.log(event)
  }

  // getEmployee() {
  //   const control = <FormArray>this.form6.get('user');
  //   for (const emp of this.datashow) {
  //     const grp = this.fb.group({
  //       // select:[false],
  //       id:[emp._id],
  //       Itemcode: {value:emp.ItemCode },
  //       schyear: {value:emp.schyear},
  //       civ: {value:emp.Civ_Elec},
  //       username:[emp.Username],
  //       Icode: {value:emp.Icode,disabled:true },
  //       Code:{value:emp.Code,disabled:true },
  //     Description :{value:emp.Description,disabled:true },
  //    Unitvalue:{value:emp.Unitvalue,disabled:true },
  //     unit:{value:emp.Unitvalue+' '+emp.Unit,disabled:true },
  //     Rate :{value:emp.Rate,disabled:true },
  // Qty:{value:emp.Quantity,disabled:true },
  // amount:[emp.Amount],
  // labour:{value:emp.labour_facor,disabled:true },
  // labourcost:{value:emp.labourcost,disabled:true },
  // totalpluslabour:{value:0,disabled:true },
  // cartage:{value:emp.cartage,disabled:true },
  // cartagetot:{value:emp.cartagecost,disabled:true },
  // cartagecharge:{value:0,disabled:true},
  // water:{value:emp.Water,disabled:true },
  // watertot:{value:emp.watercost,disabled:true },
  // watercharge:{value:0,disabled:true},
  // gst:{value:emp.gst,disabled:true },
  // gsttot:{value:emp.gstcost,disabled:true },
  // gstcharge:{value:0,disabled:true},
  // overhead:{value:emp.Overheads,disabled:true },
  // overtot:{value:emp.overheadcost,disabled:true },
  // overcharge:{value:0,disabled:true},
  // cess:{value:emp.cess,disabled:true },
  // cesstot:{value:emp.cesscost,disabled:true },
  // cesscharge:{value:0,disabled:true},
  // alltotal:[0]


     
  //     });
  //     control.push(grp);
  //   }

   
  // }





  changeAction(e, index) {


    console.log(e, index);
    if (e == true ) {

      
//quantity change 
this.form6.get("user").valueChanges
      .subscribe((newVal) => {
        let total:number=0;
        newVal.forEach(e=>{
         
          total=total+parseFloat(e.alltotal)
        console.log(total)
        this.form6.get('tot').setValue(total)
        });
      });

        // this.frm.get('total').patchValue(total,0) 

    (<FormArray>this.form6.get("user")).at(index).get('Qty').valueChanges.subscribe((value:number)=>{
      
      console.log(value);

    // amount = ((r*q)/u)
      var a:number=(parseFloat(((((<FormArray>this.form6.get("user")).at(index).get('Rate').value)*((<FormArray>this.form6.get("user")).at(index).get('Qty').value))/((<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)).toFixed(2)));
                   
      //amount
      (<FormArray>this.form6.get("user")).at(index).get('amount').setValue(a);
       console.log(a);
      


     var b:number=(parseFloat((((<FormArray>this.form6.get("user")).at(index).get('labour').value)/100).toFixed(2)))
    console.log(b);
    (<FormArray>this.form6.get("user")).at(index).get('labourcost').setValue(parseFloat((a*((<FormArray>this.form6.get("user")).at(index).get('labour').value/100)).toFixed(2))) 

    var c1 = (<FormArray>this.form6.get("user")).at(index).get('totalpluslabour').setValue(parseFloat((((a)*(b))+a).toFixed(2)));
    console.log(c1);

    var cartagecost=  (<FormArray>this.form6.get("user")).at(index).get('cartagetot').setValue(parseFloat(((a+(a*b))*((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)).toFixed(2)));
   
    console.log(cartagecost);
    var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)
    var cartagecos:number = ((a+(a*b))*cartage)
    var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
    console.log(cartagecos)
    console.log(cartagetotal);
    (<FormArray>this.form6.get("user")).at(index).get('cartagecharge').setValue(parseFloat((cartagetotal).toFixed(2)))

var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal);
(<FormArray>this.form6.get("user")).at(index).get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)));

var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('gsttot').setValue(parseFloat((gstcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('overtot').setValue(parseFloat((overcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos)
console.log(cesstotal)




    


    });

//labourchange
(<FormArray>this.form6.get("user")).at(index).get('labour').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
  console.log(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value);
(<FormArray>this.form6.get("user")).at(index).get('labourcost').setValue(parseFloat(((((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/
(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)*((<FormArray>this.form6.get("user")).at(index).get('labour').value/100)).toFixed(2))); 

(<FormArray>this.form6.get("user")).at(index).get('totalpluslabour').setValue(parseFloat((((((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/
(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)*((<FormArray>this.form6.get("user")).at(index).get('labour').value/100))+(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/
(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)).toFixed(2)))

var a:number=(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value);
(<FormArray>this.form6.get("user")).at(index).get('amount').setValue(a)
var b:number=(parseFloat(((<FormArray>this.form6.get("user")).at(index).get('labour').value/100).toFixed(2)))

var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal);
(<FormArray>this.form6.get("user")).at(index).get('cartagetot').setValue(parseFloat((cartagecos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cartagecharge').setValue(parseFloat((cartagetotal).toFixed(2)))

var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal);
(<FormArray>this.form6.get("user")).at(index).get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)));

var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('gsttot').setValue(parseFloat((gstcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('overtot').setValue(parseFloat((overcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('overcharge').setValue(parseFloat((overtotal).toFixed(2)));
console.log(overcos)
console.log(overtotal)



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos)
console.log(cesstotal)





});

//cartage charge
(<FormArray>this.form6.get("user")).at(index).get('cartage').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value);
var b:number=(parseFloat(((<FormArray>this.form6.get("user")).at(index).get('labour').value/100).toFixed(2)));

var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100);
var cartagecos:number = ((a+(a*b))*cartage);
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage));
console.log(cartagecos);
console.log(cartagetotal);
(<FormArray>this.form6.get("user")).at(index).get('cartagetot').setValue(parseFloat((cartagecos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cartagecharge').setValue(parseFloat((cartagetotal).toFixed(2)));

var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100);
console.log(water );
var watercos:number = (water*cartagetotal);
var watertotal:number=((water*cartagetotal)+cartagetotal);
console.log(watercos );
console.log(watertotal);
(<FormArray>this.form6.get("user")).at(index).get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)));

var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal);
var gsttotal:number=((gst*watertotal)+watertotal);
console.log(gstcos);
console.log(gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('gsttot').setValue(parseFloat((gstcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)));

var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100);
var overcos:number = (overheads*gsttotal);
var overtotal:number=((overheads*gsttotal)+gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('overtot').setValue(parseFloat((overcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('overcharge').setValue(parseFloat((overtotal).toFixed(2)));
console.log(overcos);
console.log(overtotal);



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100);
var cesscos:number = (cess*overtotal);
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos);
console.log(cesstotal);


});

//water
(<FormArray>this.form6.get("user")).at(index).get('water').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)
var b:number=(parseFloat(((<FormArray>this.form6.get("user")).at(index).get('labour').value/100).toFixed(2)))

var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal);
(<FormArray>this.form6.get("user")).at(index).get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('gsttot').setValue(parseFloat((gstcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('overtot').setValue(parseFloat((overcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos)
console.log(cesstotal)


});

//gst
(<FormArray>this.form6.get("user")).at(index).get('gst').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)
var b:number=(parseFloat(((<FormArray>this.form6.get("user")).at(index).get('labour').value/100).toFixed(2)))

var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)


var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('gsttot').setValue(parseFloat((gstcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('gstcharge').setValue(parseFloat((gsttotal).toFixed(2)))

var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('overtot').setValue(parseFloat((overcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos)
console.log(cesstotal)


});
     
//overheads
(<FormArray>this.form6.get("user")).at(index).get('overhead').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)
var b:number=(parseFloat(((<FormArray>this.form6.get("user")).at(index).get('labour').value/100).toFixed(2)))

var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal);
(<FormArray>this.form6.get("user")).at(index).get('watertot').setValue(parseFloat((water*cartagetotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('watercharge').setValue(parseFloat(((water*cartagetotal)+cartagetotal).toFixed(2)))

var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)


var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal);
(<FormArray>this.form6.get("user")).at(index).get('overtot').setValue(parseFloat((overcos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('overcharge').setValue(parseFloat((overtotal).toFixed(2)))
console.log(overcos)
console.log(overtotal)



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos)
console.log(cesstotal)


});




//cess
(<FormArray>this.form6.get("user")).at(index).get('cess').valueChanges.subscribe((value:number)=>{
  console.log(value);
 
var a:number=(((<FormArray>this.form6.get("user")).at(index).get('Rate').value* (<FormArray>this.form6.get("user")).at(index).get('Qty').value)/(<FormArray>this.form6.get("user")).at(index).get('Unitvalue').value)
var b:number=(parseFloat(((<FormArray>this.form6.get("user")).at(index).get('labour').value/100).toFixed(2)))

var cartage=((<FormArray>this.form6.get("user")).at(index).get('cartage').value/100)
var cartagecos:number = ((a+(a*b))*cartage)
var cartagetotal:number=((((a)*(b))+a)+((a+(a*b))*cartage))
console.log(cartagecos)
console.log(cartagetotal)


var water:number =((<FormArray>this.form6.get("user")).at(index).get('water').value/100)
console.log(water )
var watercos:number = (water*cartagetotal)
var watertotal:number=((water*cartagetotal)+cartagetotal)
console.log(watercos )
console.log(watertotal)


var gst:number =((<FormArray>this.form6.get("user")).at(index).get('gst').value/100);
var gstcos:number = (gst*watertotal)
var gsttotal:number=((gst*watertotal)+watertotal)
console.log(gstcos)
console.log(gsttotal)


var overheads:number=((<FormArray>this.form6.get("user")).at(index).get('overhead').value/100)
var overcos:number = (overheads*gsttotal)
var overtotal:number=((overheads*gsttotal)+gsttotal)

console.log(overcos)
console.log(overtotal)



var cess:number=((<FormArray>this.form6.get("user")).at(index).get('cess').value/100)
var cesscos:number = (cess*overtotal)
var cesstotal:number=((cess*overtotal)+overtotal);
(<FormArray>this.form6.get("user")).at(index).get('cesstot').setValue(parseFloat((cesscos).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('cesscharge').setValue(parseFloat((cesstotal).toFixed(2)));
(<FormArray>this.form6.get("user")).at(index).get('alltotal').setValue(parseFloat((cesstotal).toFixed(2)));
console.log(cesscos)
console.log(cesstotal)


});

  
  
  // this.form6
  //       .get("user")
  //       .at(index)
  //       .get("label").valueChanges.subscribe((value:number)=>{
  //         console.log(value)
  //       })

      (<FormArray>this.form6.get("user")).at(index).get("Qty").enable();
      (<FormArray>this.form6.get("user")).at(index).get("labour").enable();
      (<FormArray>this.form6.get("user")).at(index).get("cartage").enable();
      (<FormArray>this.form6.get("user")).at(index).get("water").enable();
      (<FormArray>this.form6.get("user")).at(index).get("gst").enable();
      (<FormArray>this.form6.get("user")).at(index).get("overhead").enable();
      (<FormArray>this.form6.get("user")).at(index).get("cess").enable();
      
      } else {
        (<FormArray>this.form6.get("user")).at(index).get("Qty").disable();
        (<FormArray>this.form6.get("user")).at(index).get("labour").disable();
        (<FormArray>this.form6.get("user")).at(index).get("cartage").disable();
        (<FormArray>this.form6.get("user")).at(index).get("water").disable();
        (<FormArray>this.form6.get("user")).at(index).get("gst").disable();
        (<FormArray>this.form6.get("user")).at(index).get("overhead").disable();
        (<FormArray>this.form6.get("user")).at(index).get("cess").disable();
        
    }

    (<FormArray>this.form4.get("user")).valueChanges.subscribe((value)=>{
      console.log(value)
      // <FormArray>this.form4.controls.user
    });
  }



  

   






  civil() {
    this.END=false
    this.showchap1=false
    this.costbreakup=false
    this.analysissub=false
    this.type=false
    this.button=false
    this.codedatabutton=false
    this.codedata=false
    this.costbreakup=false
    this.calculatedata=false
    this.selecttable=false
    this.selecttabledata=false
    this.showtable=false
    this.showchap=false
    this.showyear=false
    this.showdetail=false
    this.calculation=false
    this.diff=false
    this.subhead2=false
    this.form1.get('schyear').reset()
    this.form1.get('details').reset()
 this.costbreakservice.getyear().then(
      res => {
    
      if(res){
        console.log(res)
        this.year=res
      this.showyear=true
      }
      else{
        this.showyear=false
        this.showdetail=false
      }
      },
      error => {
        console.log(error);
      }
    );
  }

  elect() {
    this.END=false
    this.showchap1=false
    this.costbreakup=false
    this.analysissub=false
    this.type=false
    this.button=false
    this.codedatabutton=false
    this.codedata=false
    this.costbreakup=false
    this.calculatedata=false
    this.selecttable=false
    this.selecttabledata=false
    this.showtable=false
    this.showchap=false
    this.showyear=false
    this.showdetail=false
    this.calculation=false
    this.diff=false
    this.subhead2=false
    this.form1.get('schyear').reset()
    this.form1.get('details').reset()

   
    this.costbreakservice.getyear1().then(
         res => {
          if(res){
            console.log(res)
            this.year=res
          this.showyear=true
          }
          else{
            this.showyear=false
            this.showdetail=false
          }
         },
         error => {
           console.log(error);
         }
       );
     }

     f1(event){
      this.END=false
      this.showchap1=false
      this.costbreakup=false
      this.analysissub=false
       this.type=false
      this.codedatabutton=false
      this.codedata=false
      this.costbreakup=false
      this.calculatedata=false
      this.selecttable=false
      this.selecttabledata=false
      this.subhead2=false
      this.calculation=false
      this.showtable=false
      this.diff=false
       console.log(event.value)
       this.form1.get('details').reset()
       if(this.form1.get('schyear').value==""||this.form1.get('schyear').value==null){
        this.showdetail=false
        this.showchap=false
      }
      else{
        this.showdetail=true
        this.showchap=false
      }
       }

       head(event){  
           this.END=false
        this.showchap1=false
        this.costbreakup=false
        this.analysissub=false
         this.type=false
         this.button=false
        this.codedatabutton=false
        this.codedata=false
        this.costbreakup=false
        this.calculatedata=false
        this.selecttable=false
        this.selecttabledata=false
        this.subhead2=false
        this.diff=false
        this.calculation=false
        console.log(event.value)
      
        if(this.form1.get('details').value==""||this.form1.get('details').value==null||this.form1.get('details').value==undefined){
        this.showchap=false;
        this.showchap1=false;
        this.form2.get('Civ_Elec').reset()
        this.form2.get('schyear').reset()
        
       }
       else{
  //  this.showchap=true
       } 
        if(event.value!=""){ 
          this.analysissub=false
       this.title=event.value

       if(event.value=="Add Cost Breakup New Item Of Construction"){
        this.showchap=true
        this.showchap1=false
        this.codedatabutton=false
        this.showline=false
        this.showtable=false
        // console.log(this.form1.get('Civ_Elec').value)
          this.form2.get('Civ_Elec').setValue(this.form1.get('Civ_Elec').value)
          this.form2.get('schyear').setValue(this.form1.get('schyear').value)
          this.form2.get('username').setValue(this.form1.get('username').value)

          this.form2.get('subheads').reset()
          this.form1.get('subheads').reset()
          this.sub()

       }


       if(event.value=="view  Cost Breakup New Item Of Construction on basicrates"){
        this.showchap=false
        this.END=false
        this.showchap1=true
        this.codedatabutton=false
        this.showline=false
        this.showtable=false
        // console.log(this.form1.get('Civ_Elec').value)
          this.form2.get('Civ_Elec').setValue(this.form1.get('Civ_Elec').value)
          this.form2.get('schyear').setValue(this.form1.get('schyear').value)
          this.form2.get('username').setValue(this.form1.get('username').value)
      
          this.form2.get('subheads').reset()
          this.form1.get('subheads').reset()
          // this.sub()
          this.costbreakservice.changeMessag(this.form1.value);
          this.router.navigate(['/Endnewc']);

       }


       if(event.value=="view  Cost Breakup New Item Of Construction on marketrates"){
        this.showchap=false
        this.END=false
        this.showchap1=true
        this.codedatabutton=false
        this.showline=false
        this.showtable=false
        // console.log(this.form1.get('Civ_Elec').value)
          this.form2.get('Civ_Elec').setValue(this.form1.get('Civ_Elec').value)
          this.form2.get('schyear').setValue(this.form1.get('schyear').value)
          this.form2.get('username').setValue(this.form1.get('username').value)
      
          this.form2.get('subheads').reset()
          this.form1.get('subheads').reset()
          // this.sub()
          this.costbreakservice.changeMessag(this.form1.value);
          this.router.navigate(['/Endnewc']);

       }



      //  console.log(event.value)
      }
      
      else{
        this.title=""
        this.showtable=false
      }




        }

        sub(){ 
          this.costbreakup=false
          this.analysissub=false
          this.codedatabutton=false
          this.codedata=false
          this.costbreakup=false
          this.selecttable=false
          this.subhead2=false
          this.costbreakservice.subh(this.form1.value) .toPromise().then(res => {
            console.log(res)
            if(res==""){
              this.line="No cost Break up"
              this.subheads=res
              this.showline=true
              console.log('1')
              console.log(this.line)
              this.form2.get('subheads').disable()
              this.form1.get('subheads').disable()
            }
            else{
              this.line=""
              // this.showchap=true
              this.subheads=res
              this.showline=false
              this.form2.get('subheads').enable()
              this.form1.get('subheads').enable()
              

            }
            
          },
        
            error => { console.error('Error!', error) }
          )
        
        }


//slecetion event for chossing a chapter in form2
sr(event){
  this.costbreakup=false
  this.analysissub=false
  this.type=false
  this.button=false
  this.codedatabutton=false
  this.codedata=false
  this.costbreakup=false
  this.selecttable=false
  this.selecttabledata=false
  this.subhead2=false
  this.diff=false
  this.calculation=false
  console.log(event.value)
  this.showtable=false
  if(event.value!=""||event.value!=null||event.value!=undefined){
    this.srtable()
    this.showtable=true
    // this.selectdata=true
  }

  else if(event.value == ""){
    this.showtable=false
  }
  
}




sr1(event){
 
console.log(event.value)
  if(event.value!=""){
    this.END = true
    this.costbreakservice.changeMessag(this.form1.value);
    // this.selectdata=true
  }

  else if(event.value == ""){
    this.END=false
  }
  
}




        srtable(){ 
          this.codedatabutton=false
          this.codedata=false
          this.selecttable=false
          // this.costbreakservice.ssr(this.form2.value) .toPromise().then(res => {
          this.costbreakservice.ssr(this.form1.value) .toPromise().then(res => {
            console.log(res)
            this.srtab=res
            this.listData = new MatTableDataSource(this.srtab);
            
            
          },
        
            error => { console.error('Error!', error) }
          )
        
        }


        onselect(element){
          this.codedatabutton=false
          this.codedata=false
          console.log(element)
          this.costbreakup=false
          this.showtable=false
          this.calculation=true
          this.subhead2=false
        

          this.form3.get('Civ_Elec').setValue(element.Civ_Elec)
          this.form3.get('schyear').setValue(element.schyear)
          this.form3.get('username').setValue(element.Username)
          this.form3.get('Itemcode').setValue(element.Itemcode)
          this.form3.get('Desc').setValue(element.Description)
          this.form3.get('unitvalue').setValue(element.Unitvalue)
          this.form3.get('unit').setValue(element.Unit)
          this.form3.get('unitplus').setValue(element.Unitvalue+"-"+element.Unit)
          this.form3.get('calquantityvalue').reset()




          this.form4.get('Itemcode').setValue(element.Itemcode)
          this.form4.get('calunit').setValue(element.Unitvalue)
          this.form4.get('unit').setValue(element.Unit)
          this.form4.get('Civ_Elec').setValue(element.Civ_Elec)
          this.form4.get('schyear').setValue(element.schyear)
            
        }
        calquan(event){
          this.analysissub=false
          this.button=false
          this.codedatabutton=false
          this.selecttabledata=false
          console.log(event.target.value)
          if(event.target.value!=""){
            
            console.log(event.target.value)
            this.form4.get('calquan').setValue(event.target.value)
            this.form6.get('calquan').setValue(event.target.value)
            this.form3.get('subheads1').reset()
this.diff=true
          }
          else{
            this.diff=false
            this.subhead2=false
            this.type=false
            this.selecttable=false
            this.selecttabledata=false
            this.codedata=false
          }
        }


item(event){
  this.costbreakup=false
  this.selecttabledata=false
  this.analysisfdata=false
  this.codedata=false
  
  this.analysissub=false
  this.type=false
  this.subhead2=false
  this.codedatabutton=false
  this.codedata=false
  this.calculatedata=false
  this.selecttable=false
  console.log(event.value)
  // console.log(this.form3.value)
  if(event.value=="Itemcode"){
    this.codedata=false
    const control = <FormArray>this.form4.controls['user'];
  
    for(let i = control.length-1; i >= 0; i--) {
        control.removeAt(i)
       
          this.button=false
          this.codedatabutton=false
}
    this.form3.get('subheads1').reset()
    this.subhead2=true
    this.type=false
    this.analysissub=false
    this.selecttabledata=false
this.subh()
  }

  if(event.value=="Material/labour code"){
    this.codedatabutton=false
    this.codedata=false
    const control = <FormArray>this.form4.controls['user'];
  
    for(let i = control.length-1; i >= 0; i--) {
        control.removeAt(i)
       
          this.button=false
          this.codedatabutton=false
        
}
    this.form3.get('type').reset()
    this.form3.get('type').reset()
    this.type=true
    this.subhead2=false
    this.selecttabledata=false
    this.analysissub=false
this.rates()
  }

  if(event.value=="Analysis of Standard Items"){
    this.codedata=false
    this.selecttabledata=false
    const control = <FormArray>this.form4.controls['user'];
  
    for(let i = control.length-1; i >= 0; i--) {
        control.removeAt(i)
       
          this.button=false
          this.codedatabutton=false
}
    this.form3.get('subheads1').reset()
    this.analysissub=true
    this.type=false
    this.selecttabledata=false
    this.subhead2=false
this.subh()

  }




}
//subheads for sr table
subh(){ 
  this.costbreakservice.coss(this.form3.value) .toPromise().then(res => {
    console.log(res)
    this.subheadscos=res
    this.anasub=res

  },

    error => { console.error('Error!', error) }
  )

}

//rates from rates table
rates(){ 
  
  this.costbreakservice.type(this.form3.value) .toPromise().then(res => {
    console.log(res)
    this.ratetype=res

  },

    error => { console.error('Error!', error) }
  )
}



sub1(event){
  console.log(event.value)
  if(event.value!=""){
this.srtabl()
this.selecttabledata=true
this.codedata=false
  }
  else{
    this.selecttabledata=false
  }
}

anasub1(event){
  this.selecttabledata=false
  this.codedata=false
  console.log(event.value)
  if(event.value!=""){
this.srtabl()
this.selecttabledata=false
this.codedata=false
this.analysisfdata=true
  }
  else{
    this.selecttabledata=false
    this.analysisfdata=false
    this.codedata=false
  }
}


//ratetypetype change event
rate(event){
  console.log(event.value)
  console.log(this.form3.value)
  if(event.value!=""){ 
    this.codedata=true
    this.selecttabledata=false
  this.costbreakservice.ratedatas(this.form3.value) .toPromise().then(res => {
    console.log(res)
    
this.ratesdata=res
this.listData = new MatTableDataSource(this.ratesdata);
  },

    error => { console.error('Error!', error) }
  )
}
else{

}
}


//srtable showing
srtabl(){
  this.calculatedata=false
  this.selecttable=false
this.costbreakservice.srtable(this.form3.value) .toPromise().then(res => {
    console.log(res)
    this.srtableshow=res
    this.listData = new MatTableDataSource(this.srtableshow);
    // this.selecttabledata=true
   

  },

    error => { console.error('Error!', error) }
  )
}


//post sr data
srrr(){
  this.showspinner=true
  this.costbreakservice.srdata(this.form4.value) .toPromise().then(res => {
    console.log(res)
    if(res=="saved"){
      
      this.selecttabledata=false
      this.button=false
      const control = <FormArray>this.form4.controls['user'];
  
      for(let i = control.length-1; i >= 0; i--) {
          control.removeAt(i)
  }
  const control1= <FormArray>this.form6.get('user');
  for(let i = control1.length-1; i >= 0; i--) {
    control1.removeAt(i)
}

  this.form3.get('subheads1').setValue("")
  this.disdata()
 
  this.selectdata=false
    
    }
  else{}
   

  },

    error => { console.error('Error!', error) }
  )
}


saveana(){
  this.showspinner=true
  this.costbreakservice.anadatas(this.form4.value) .toPromise().then(res => {
    console.log(res)
    if(res=="er"){
      this.selecttabledata=false
      this.button=false
      this.anabutton=false
      this.analysisfdata=false
      const control = <FormArray>this.form4.controls['user'];
  
      for(let i = control.length-1; i >= 0; i--) {
          control.removeAt(i)
  }
  const control1= <FormArray>this.form6.get('user');
  for(let i = control1.length-1; i >= 0; i--) {
    control1.removeAt(i)
}

  this.form3.get('subheads1').setValue("")
  setTimeout (() => {
    this.disdata()
    console.log("Hello from setTimeout");
 }, 3000);

 
  this.selectdata=false
    
    }
  else{}
   

  },

    error => { console.error('Error!', error) }
  )
}




onsave(element,checked){
  console.log(checked)
  console.log(element)
  console.log(<FormArray>this.form4.controls.user.value)
  
 
  const emailFormArray = <FormArray>this.form4.controls.user;
  // console.log(emailFormArray.length);



  if (checked==true) {
    emailFormArray.push(new FormControl(element));
    this.numbers.push(element);
    this.numbers.push();
    // console.log(this.numbers.length);
    this.form4.get('username').setValue(this.user)
    // console.log(emailFormArray.length);
  } 
  
    else {
      let index = emailFormArray.controls.findIndex(x => x.value == element)
      emailFormArray.removeAt(index);
      // console.log(this.form4.value.username);
      // console.log(this.numbers.length);
      // console.log(emailFormArray.length);
     
    }

    const control = <FormArray>this.form4.controls['user'];
  
    for(let i =0; i <= control.length; i++) {
        console.log(control.length)
        if(control.length ==0){
          this.button=false
 
          this.codedatabutton=false
        }
        else{
 
          this.codedatabutton=false
          this.button=true
        }
  }
  }


  saveforcode(){
    this.showspinner=true
    console.log(this.form4.value)
  this.costbreakservice.codedata(this.form4.value) .toPromise().then(res => {
      console.log(res)
      if(res=="saved"){
        this.codedata=false
        this.selecttabledata=false
         this.button=false
         this.codedatabutton=false
        const control = <FormArray>this.form4.controls['user'];
    
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
    }
    const control1= <FormArray>this.form6.get('user');
    for(let i = control1.length-1; i >= 0; i--) {
      control1.removeAt(i)
  }
  
    this.form3.get('subheads1').setValue("")
    this.disdata()
   
    this.selectdata=false
      
      }
    else{}
     
  
    },
  
      error => { console.error('Error!', error) }
    )
  }




  onsav(element,checked){
    console.log(checked)
    console.log(element)
    console.log(<FormArray>this.form4.controls.user.value)
    
   
    const emailFormArray = <FormArray>this.form4.controls.user;
    // console.log(emailFormArray.length);
  
  
  
    if (checked==true) {
      emailFormArray.push(new FormControl(element));
      this.numbers.push(element);
      // console.log(this.numbers.length);
      this.form4.get('username').setValue(this.user)
      // console.log(emailFormArray.length);
    } 
    
      else {
        let index = emailFormArray.controls.findIndex(x => x.value == element)
        emailFormArray.removeAt(index);
        // console.log(this.form4.value.username);
        // console.log(this.numbers.length);
        // console.log(emailFormArray.length);
       
      }
  
      const control = <FormArray>this.form4.controls['user'];
    
      for(let i =0; i <= control.length; i++) {
          console.log(control.length)
          if(control.length ==0){
            this.button=false
            this.codedatabutton=false
          }
          else{
           this.button=false
            this.codedatabutton=true
          }
    }
    }
    
    
onsaveforana(element,checked){
  
  console.log(checked)
  console.log(element)
  console.log(<FormArray>this.form4.controls.user.value)
  
 
  const emailFormArray = <FormArray>this.form4.controls.user;
  // console.log(emailFormArray.length);



  if (checked==true) {
    emailFormArray.push(new FormControl(element));
    this.numbers.push(element);
    this.numbers.push();
    // console.log(this.numbers.length);
    this.form4.get('username').setValue(this.user)
    // console.log(emailFormArray.length);
  } 
  
    else {
      let index = emailFormArray.controls.findIndex(x => x.value == element)
      emailFormArray.removeAt(index);
      // console.log(this.form4.value.username);
      // console.log(this.numbers.length);
      // console.log(emailFormArray.length);
     
    }

    const control = <FormArray>this.form4.controls['user'];
  
    for(let i =0; i <= control.length; i++) {
        console.log(control.length)
        if(control.length == 0){
          this.button=false
 this.anabutton=false
          this.codedatabutton=false
        }
        else{
 
          this.codedatabutton=false
          this.button=false
          this.anabutton=true
        }
  }
  }
  


dr(){   
  const element = document.querySelector('#scrollId');
  element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
 
  // console.log( element)
}



  
add(element){
  console.log('popopopoppppppppppppppppppppppppppppppppppppppppppppp')
  this.transferdata=element
  console.log('poooooooooooo')
  console.log(this.transferdata)
  
    this.costbreakservice.changeMessage(this.transferdata);
    // this.router.navigate(['/hello'])
    //this.data.currentMessage.subscribe(message => this.message = message)
    this.opendialog()
 

  this.calculatedata=true
  console.log(element)
  this.form5.get('id').setValue(element._id);
  this.form5.get('username').setValue(element.Username);
  this.form5.get('Itemcode').setValue(element.ItemCode)
  this.form5.get('Icode').setValue(element.Icode)
  this.form5.get('Code').setValue(element.Code)
  this.form5.get('Description').setValue(element.Description)
  this.form5.get('Unitvalue').setValue(element.Unitvalue)
  this.form5.get('Unit').setValue(element.Unit)
  this.form5.get('Rate').setValue(element.Rate)
  this.form5.get('Qty').setValue(element.Quantity)
  this.form5.get('amount').setValue(element.Amount)
  this.form5.get('labour').setValue(element.labour_facor)
  this.form5.get('labourcost').setValue(element.labourcost)
  this.form5.get('cartage').setValue(element.cartage)
  this.form5.get('cartagetot').setValue(element.cartagecost)
   this.form5.get('water').setValue(element.Water)
   this.form5.get('watertot').setValue(element.watercost)
   this.form5.get('overhead').setValue(element.Overheads);
   this.form5.get('overtot').setValue(element.Overheadcost);
  this.form5.get('gst').setValue(element.gst);
  this.form5.get('gsttot').setValue(element.gstcost);
 this.form5.get('cess').setValue(element.cess);
 this.form5.get('cesstot').setValue(element.cesscost);
 this.form5.get('unitplus').setValue(element.Unitvalue+' '+element.Unit)
 this.form5.get('fintotal').setValue(element.Total);
 this.costbreakup=true
//  if(this.costbreakup=true){ 
//   this.dr()
//   }
//   else{}

  console.log(this.form5.value)

 
}





// ddd(){
//   this.costbreakservice.fff().then(res => {
//     console.log(res)
//   })

// }







  disdata(){ 
    this.showspinner=true
    this.costbreakservice.vdata(this.form4.value).toPromise().then(res => {
 console.log(res)
 if(res){

 this.showspinner=false
 this.datashow=res
 this.listData = new MatTableDataSource(this.datashow);

  this.selecttable=true
  console.log(this.datashow)
  
     this.datashow.map(t => t.Amount).reduce((acc, value) => acc + value, 0);

    }

   
    },
  
      error => { console.error('Error!', error) }
    )
  
  }


// gettotalcost(){
//   // console.log(this.datashow)
//   var total= this.datashow.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
//   console.log(parseFloat((total).toFixed(2)))

// }


//delete the record of an single item in cost break up
delete(){
  console.log(this.form5.get('id').value)
  
  if(confirm('Are you sure to delete this record ?')){
    
    this.costbreakservice.deletecos(this.form5.get('id').value)
   .toPromise()
    .then(
      res => {
        this.costbreakup=false
        // console.log(res)
       
        this.notification.warn('! Deleted successfully');
        // this.submit()
        this.updatecalulated()
      },
      error => {
        console.log(error);
      })
   
  }
  


}





//update data for cost break calculation for cess gst
update(){
     this.costbreakup=false
  this.costbreakservice.updata(this.form5.getRawValue()).toPromise().then(
    res=>{
     console.log(res)
     this.notification.success(res);
      // this.disdata()
      const control = <FormArray>this.form6.get('user');
      for (const emp of this.datashow) {
        const grp = this.fb.group({
          // select:[false],
          id:[emp._id],
          Itemcode: [emp.ItemCode],
          schyear: [emp.schyear],
          civ: [emp.Civ_Elec],
          username:[emp.Username]
    
        });
        control.push(grp);
      }
  
  
        this.updatecalulated()
    
    },
    error=>{
      console.log(error)
    })
}

updatecalulated(){
  console.log(this.form6.value)
  this.costbreakservice.updatacal(this.form6.value).toPromise().then(
    res=>{
     console.log(res)
     this.total=res
  //    const control1= <FormArray>this.form6.get('user');
  //    for(let i = control1.length-1; i >= 0; i--) {
  //      control1.removeAt(i)
  //  }
      this.disdata()
    
    },
    error=>{
      console.log(error)
    })
}

//dialog box opening

opendialog(){
  const dialogRef = this.dialog.open(Newcostbreaup2partComponent, {
    width: '1500px',
    height:'400px',

 })
 dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`);
  // this.finalresult=`${result}`
  // console.log(this.finalresult)
this.updatecalulated()
});
}









    // console.log(this.numbers.findIndex(x => x.value ))
    // console.log(this.numbers);

    // let index = this.numbers.indexOf(x => x.value == element)
    // this.numbers.splice(index,1);
    
    // console.log(index)
    // console.log(this.numbers);

   
  









a(){ 
  this.costbreakservice.un(this.form1.value,
  
  )
  .toPromise().then(response => {
   console.log('Success!', response)
 
  },

    error => { console.error('Error!', error) }
  )

}



}
