import { Component, OnInit } from '@angular/core';
import { NewcostbreaupService } from 'src/app/services/newcostbreaup.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-newcostbreaup2part',
  templateUrl: './newcostbreaup2part.component.html',
  styleUrls: ['./newcostbreaup2part.component.css']
})
export class Newcostbreaup2partComponent implements OnInit {
  message:any;
a:any
  constructor(private costbreakservice: NewcostbreaupService,private fb: FormBuilder,private notification: NotificationService) { }
  form5:FormGroup;
  ngOnInit() {
    this.costbreakservice.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)




    this.form5=this.fb.group({
      id:[this.message._id],
      username:[this.message.Username],
      calquantityvalue:[this.message.Calquantityvalue],
    
      Itemcode: [{value:this.message.ItemCode,disabled:true}],
        Icode: [{value:this.message.Icode,disabled:true}],
        Code:[{value:this.message.Code,disabled:true}],
      Description :[{value:this.message.Description,disabled:true}],
     Unitvalue:[{value:this.message.Unitvalue,disabled:true}],
      Unit:[{value:this.message.Unit,disabled:true}],
      Rate :[{value:this.message.Rate,disabled:true}],
  Qty:[this.message.Quantity,Validators.required],
  amount:[{value:this.message.Amount,disabled:true}],
  labour:[this.message.labour_facor,Validators.required],
  labourcost:[{value:this.message.labourcost,disabled:true}],
  totalpluslabour:[{value:0,disabled:true}],
  cartage:[this.message.cartage],
  cartagetot:[{value:this.message.cartagecost,disabled:true}],
  cartagecharge:[{value:0,disabled:true}],
  water:[this.message.Water],
  watertot:[{value:this.message.watercost,disabled:true}],
  watercharge:[{value:0,disabled:true}],
  gst:[this.message.gst],
  gsttot:[{value:this.message.gstcost,disabled:true}],
  gstcharge:[{value:0,disabled:true}],
  overhead:[this.message.Overheads],
  overtot:[{value:this.message.overheadcost,disabled:true}],
  overcharge:[{value:0,disabled:true}],
  cess:[this.message.cess],
  cesstot:[{value:this.message.cesscost,disabled:true}],
  cesscharge:[{value:0,disabled:true}],
  unitplus:[{value:this.message.Unitvalue+' '+this.message.Unit,disabled:true}],
  fintotal:[{value:this.message.Total,disabled:true}],
  schyear:[this.message.schyear],
  civ:[this.message.Civ_Elec]
 



  


    })






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











  update(){
    
 this.costbreakservice.updata(this.form5.getRawValue()).toPromise().then(
   data=>{
    console.log(data)
    this.notification.success(data);
 
    // this.a=res
    // console.log(this.a)
   
 
  //  this.updatecalulated()
   
   },
   error=>{
     console.log(error)
   })
}


delete(){
  console.log(this.form5.get('id').value)
  
  if(confirm('Are you sure to delete this record ?')){
    
    this.costbreakservice.deletecos(this.form5.get('id').value)
   .toPromise()
    .then(
      res => {
        
       
        this.notification.warn('! Deleted successfully');
      
      },
      error => {
        console.log(error);
      })
   
  }
  


}












}
