import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewitemService } from 'src/app/services/newitem.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from 'src/app/entites/product.entity';
import { Add } from 'src/app/entites/add.entity';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-updatenewitemrates',
  templateUrl: './updatenewitemrates.component.html',
  styleUrls: ['./updatenewitemrates.component.css']
})
export class UpdatenewitemratesComponent implements OnInit {
form:FormGroup
code:any;
desc:any;
rates:any;
currate:any;
unitvalue:any;
unit:any;
_id:any;
civ:any;
sch:any;
username:any;
type:any;


newunittab=false

unitvall:Add[]
  selected: any;
  pushing: any;
  hide=false


  constructor(private newservice:NewitemService,private notification:NotificationService,
    private fb:FormBuilder,public dialogRef: MatDialogRef< UpdatenewitemratesComponent>) { }

  ngOnInit() {
//form 
this.form=this.fb.group({
  _id:[''],
code:[{value:'',disabled:true},Validators.required],
Civ_Elec:['',Validators.required],
schyear:['',Validators.required],
type:['',Validators.required],
description:['',Validators.required],
username:['',Validators.required],
unit:['',Validators.required],
unitvalue:['',Validators.required],
rate:['',Validators.required],
currate:['',Validators.required],
newunit:['']

})


    
    this.newservice.disp().then(res =>{
      console.log(res)
      if(res){
        this._id=res._id
        this.civ=res.Civ_Elec
        this.sch=res.Schyear
        this.code=res.Code
        this.desc=res.Description
        this.rates=res.Rate
        this.currate=res.Marketate
        this.unit=res.Unit
        this.unitvalue=res.Unitvalue
        this.username=res.Username
        this.type=res.Ratestype



  this.form.get('_id').setValue(`${this._id}`)
  this.form.get('Civ_Elec').setValue(`${this.civ}`)
  this.form.get('schyear').setValue(`${this.sch}`)
        this.form.get('code').setValue(`${this.code}`)
        this.form.get('description').setValue(`${this.desc}`)
        this.form.get('rate').setValue(`${this.rates}`)
        this.form.get('currate').setValue(`${this.currate}`)
        this.form.get('unit').setValue(`${this.unitvalue}`)
        this.form.get('unitvalue').setValue(`${this.unit}`)
        this.form.get('username').setValue(`${this.username}`)
        this.form.get('type').setValue(`${this.type}`)
       
        
        this.post1()
      }
  },
    error=>{ console.error('Error!', error) })
   
 

  }




  
  post1(){

    console.log(this.form.value)
    this.newservice.unitup(this.form.value).toPromise().then(
      res=>{
       console.log(res)
     if(res!=""){
      this.unitvall=res
     }
     else{}
      },
      error=>{
        console.log(error)
      })
  }





  
  others(event){
    console.log(event.value)
    if(event.value=="undefined"||event.value==""||event.value==null){
    
      this.form.get('newunit').setValue("")
      this.form.get('newunit').setValidators([Validators.required,Validators.pattern('[a-zA-Z ]*$')])
      this.newunittab=true
    }
    else{
      this.form.get('newunit').clearValidators()
      this.newunittab=false
    }
  }
  ss(event){
  
    console.log(event.target.value)
    if(event.target.value==""){
      this.form.get('newunit').setValue("")
    }
    else{
    
    }
  }
  
  ad(){ 
  this.selected = this.form.get('newunit').value
  const newLocal =  {_id: this.selected };
  this.pushing = this.unitvall.push(newLocal);
   console.log(this.unitvall)
   this.newunittab=false
  }
  


  update(){
    console.log(localStorage.auth_token);
    console.log(this.username);
    console.log(this.form.getRawValue())
if(localStorage.auth_token==this.username){
  this.newservice.updatenew1(this.form.getRawValue()).toPromise().then(
      res=>{
       console.log(res)
       if(res!=""){
       this.notification.success(':: Updated successfully');
       this.onClose();}
       else{
         console.log(res)
       }
      },
      error=>{
        console.log(error)
      })
}
else{
  
}




    // this.form.get('itemcode').setValue(`${this.Itemcode}`)
    // console.log(this.form.value)
    // this.productservice.updatenew(this.form.getRawValue()).toPromise().then(
    //   res=>{
    //    console.log(res)
    //    this.notification.success(':: Updated successfully');
    //    this.onClose();
    //   },
    //   error=>{
    //     console.log(error)
    //   })
  }
  onClose() {
   
    this.dialogRef.close();
  }













}
