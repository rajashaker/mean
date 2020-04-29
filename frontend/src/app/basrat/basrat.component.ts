import { Component, OnInit } from '@angular/core';
import { NewitemService } from '../services/newitem.service';
import {Product} from '../entites/product.entity'
import { Radiorate } from '../entites/radiorate.entity';
import{ FormBuilder,FormGroup, Validators} from '@angular/forms'
import {MatDialog, MatDialogConfig} from '@angular/material';
import{basrateco} from '../entites/basratecomp'

import { MatTableDataSource } from '@angular/material';
import { DatatableComponent } from '../datatable/datatable.component';
import { Add } from '../entites/add.entity';
import { NotificationService } from '../services/notification.service';
import { UpdatenewitemratesComponent } from './updatenewitemrates/updatenewitemrates.component';


@Component({
  selector: 'app-basrat',
  templateUrl: './basrat.component.html',
  styleUrls: ['./basrat.component.css']
})


export class BasratComponent implements OnInit {
  
  form: FormGroup;
  form1: FormGroup;
  deleteform: FormGroup;

listData:MatTableDataSource<any>
  displayedColumn:string[]=['Code', 'Description','Unit','Rate','Marketrate','Standard/New','actions'];
  displayedColumns:string[]=['Code', 'Description','Unit','Rate','Marketrate','Standard/New'];

  ncode:Product
  year:Add[]
  type:Add[]
  groupm:Add[]
  unitval:Add[]

butdis=false
yeartab=false
typetab=false
detailstab=false
mattab=false
newunittab=false
hide=false
showrate=false;

//add form
add=false

edit=false
edit1=false


viewtab=false
viewtab1=false


user:string
selected :any
pushing :any
public deletedata:string
  cocode: Product[];
  stand:Product[]
  standview:Product[]

 
  constructor (private newservice:NewitemService, public dialog: MatDialog,private notification:NotificationService,private fb:FormBuilder) { 
    console.log(localStorage.auth_token);
    this.user=localStorage.auth_token
    // this.form.get('username').setValue(this.user)
  }
  
  ngOnInit() {
    this.form=this.fb.group({
      Civ_Elec:[''],
      schyear:[''],
      type:[''],
      details:[''],
      username:['']
  
     })


     this.form1=this.fb.group({
       code:['',Validators.required],
      Civ_Elec:['',Validators.required],
      schyear:['',Validators.required],
      type:['',Validators.required],
      description:['',Validators.required],
      details:['',Validators.required],
      username:['',Validators.required],
      group:[''],
      unit:['',Validators.required],
      unitvalue:['',Validators.required],
      newunit:[''],
      stdrate:['',Validators.required],
      currate:['',Validators.required],
      Edit:['Yes'],
      pub:['Private'],
      test:[0],
      gid:[0],
      eq_fac:['FOR USE'],
      eq_fac_phy:[1],
      stage:['']


  
     })

     if (this.form.get('username').value==""  ){ 
      this.form.get('username').setValue(`${this.user}`)
      if(this.form.get('username').value=="ADMIN"){
        this.form1.get('username').clearValidators()
        this.form.get('username').setValue("")
        this.form.get('Edit').setValue("NO")
        this.form.get('pub').setValue("Public")
      }
     }
     else{
      this.form.get('username').setValue("")
     }


     //deleteform
   
  this.deleteform = this.fb.group({
      _id:'',
      })
  }



 post(){

    console.log(this.form.value)
    this.newservice.store(this.form.value).toPromise().then(
      res=>{
       console.log(res)
     if(res=="ok"){
this.group()
this.unit()
this.newcode()
// this.code()
// this.ccode()
this.newcode()
     }
     else{}
      },
      error=>{
        console.log(error)
      })
  }



  post1(){

    console.log(this.form.value)
    this.newservice.store(this.form.value).toPromise().then(
      res=>{
       console.log(res)
     if(res=="ok"){
console.log('ok')
     }
     else{}
      },
      error=>{
        console.log(error)
      })
  }



  save(){

    console.log(this.form1.value)
    this.newservice.save(this.form1.value).toPromise().then(
      res=>{
       console.log(res)
       
       this.notification.success(res.msg);
       this.hide=false
      },
      error=>{
        console.log(error)
      })
  }



//   code(){
//     this.newservice.newcode().then(res =>{
//       console.log(res)
//       this.ncode=res._id+1
//       console.log(this.ncode)
  
//       // this.form1.get('code').setValue(`${this.ncode}`)
//     },
//     error=>{ console.error('Error!', error) })
    
    
//   }

//   ccode(){
//     this.newservice.comcode().then(res =>{
//       console.log(res)
//       console.log(this.ncode)
//       this.cocode=res
//       if(res){
//         this.do()
//       }
//       // this.form1.get('code').setValue(`${this.ncode}`)
//     },
//     error=>{ console.error('Error!', error) })
    
    
//   }
//   do(){
//     console.log(this.cocode)
//     console.log(this.ncode)
//     for(let i=0;i<this.cocode.length;i++){
//       // console.log(this.cocode.length+1)
      
// if(this.ncode==this.cocode[i]._id){
//   this.form1.get('code').setValue(`${this.cocode.length+1}`)
  
// }
// else{
//   console.log('op')
//   this.form1.get('code').setValue(`${this.ncode}`)
// }
//     }
//   }


 newcode(){
    this.newservice.cocode().then(res =>{
      console.log(res)
      this.ncode=res
      console.log(this.ncode)
  
      this.form1.get('code').setValue(`${this.ncode}`)
    },
    error=>{ console.error('Error!', error) })
    
    
  }


  getyearciv(){
    this.viewtab=false;
    this.viewtab1=false;
    this.edit=false;
    this.edit1=false;
    
    this.yeartab=false
    this.typetab=false
   this.detailstab=false
   this.add=false
    this.form.get('schyear').reset()
    this.form.get('type').reset()
    this.form.get('details').reset()
    this.newservice.yearciv().then(res => {
      this.year=res
      this.yeartab=true
      console.log( res)
     },

      error => { console.error('Error!', error) }
    )
  }


  
  getyearele(){
    
    this.yeartab=false
    this.typetab=false
    this.detailstab=false
    this.add=false
    this.viewtab=false;
    this.viewtab1=false;
    this.edit=false;
    this.edit1=false;
    
    this.form.get('schyear').reset()
    this.form.get('type').reset()
    this.form.get('details').reset()
    this.newservice.yearele().then(res => {
      console.log( res)
      this.year=res
      this.yeartab=true
     },

      error => { console.error('Error!', error) }
    )
  }


  //getting rates type for both Civil an elect

  gettypeciv(){
   
   
    this.newservice.civtype().then(res => {
      this.type=res
     
      console.log( res)
     },

      error => { console.error('Error!', error) }
    )
  }

  gettypeelec(){
   
   
    this.newservice.eletype().then(res => {
      this.type=res
     
      console.log( res)
     },

      error => { console.error('Error!', error) }
    )
  }

  yyyy(event){
    this.form.get('details').reset()
    this.add=false
    console.log(event.value)
    if(this.form.get('schyear')!=null && this.form.get('Civ_Elec').value == 'CIVIL'){
this.gettypeciv()
this.typetab=true
    }
    else if(this.form.get('schyear')!=null && this.form.get('Civ_Elec').value == 'ELECT'){
     this.gettypeelec()
     this.typetab=true
    }
    else{
      console.log('no')
    }
  }


  xxxx(event){
    this.form.get('details').reset()
    this.add=false
  console.log(event.value)
    if(this.form.get('type')!=null && this.form.get('schyear').value!=null){

this.detailstab=true
    }
   
    else{
      console.log('no')
    }
  }

  zzzz(event){
    console.log(event.value)
    if(event.value=='Add'){
      this.viewtab=false
      this.edit=false
      this.bb()
      this.showrate=false
      this.hide=true
      this.newunittab=false
      this.form1.get('group').reset()
      this.add=true
      console.log( this.form1.get('Civ_Elec').setValue(this.form.get('Civ_Elec').value))
      this.form1.get('schyear').setValue(this.form.get('schyear').value)
      this.form1.get('type').setValue(this.form.get('type').value)
     this.form1.get('details').setValue(this.form.get('details').value)
     this.form1.get('username').setValue(this.form.get('username').value)
     if(this.form1.get('type').value=="Materials"){
       this.mattab=true
       this.form1.get('group').setValidators(Validators.required)
       this.form1.get('stage').setValue(1)

       this.post()

       
     }
     else if(this.form1.get('type').value=="Labour"){
      this.form1.get('stage').setValue(2)
      this.post()
      this.mattab=false
      this.form1.get('group').clearValidators()
      this.form1.get('group').setValue('')
      this.showrate=false
     }
     else if(this.form1.get('type').value=="Plants"){
      this.form1.get('stage').setValue(3)
      this.post()
      this.mattab=false
      this.form1.get('group').clearValidators()
      this.form1.get('group').setValue('')
      this.showrate=false
    }
    else if(this.form1.get('type').value=="Carriage"){
      this.form1.get('stage').setValue(4)
      this.post()
      this.mattab=false
      this.form1.get('group').clearValidators()
      this.form1.get('group').setValue('')
      this.showrate=false
    }
     else{
       this.mattab=false
       this.form1.get('group').clearValidators()
       this.form1.get('group').setValue('')
       this.post()
       this.showrate=false
     }

      
    }
    else if(event.value=="edit"){
      this.post1()
      this.edit=true
      this.edit1=true
      this.add=false
      this.viewtab=false
      this.showtable()
    }
    else if(event.value=="view"){
      // this.post1()
      this.edit=false
      this.edit1=false
      this.add=false
      this.viewtab=true
      this.viewtab1=true
      this.view()







    }
  }


//group


group(){
   
   
  this.newservice.matgroup().then(res => {
    this.groupm=res
   
    console.log( res)
   },

    error => { console.error('Error!', error) }
  )
}
unit(){
   
   
  this.newservice.matunit().then(res => {
   
  
    console.log( res)
    this.unitval=res
   },

    error => { console.error('Error!', error) }
  )
}

others(event){
  console.log(event.value)
  if(event.value=="undefined"||event.value==""||event.value==null){
  
    this.form1.get('newunit').setValue("")
    this.form1.get('newunit').setValidators([Validators.required,Validators.pattern('[a-zA-Z ]*$')])
    this.newunittab=true
  }
  else{
    this.form1.get('newunit').clearValidators()
    this.newunittab=false
  }
}
ss(event){

  console.log(event.target.value)
  if(event.target.value==""){
    this.form1.get('newunit').setValue("")
  }
  else{
  
  }
}

ad(){ 
this.selected = this.form1.get('newunit').value
const newLocal =  {_id: this.selected };
this.pushing = this.unitval.push(newLocal);
 console.log(this.unitval)
 this.newunittab=false
}

rate(event){
  if(event!=""){
// this.code()
console.log(event)
this.showrate=true
  }
  else{
    this.showrate=false
  }
  
}

clear(){

  this.form1.get('code').reset()
  this.form1.get('description').reset()
  this.form1.get('group').reset()
  this.form1.get('unit').reset()
  this.form1.get('unitvalue').reset()
  this.form1.get('stdrate').reset()
  this.form1.get('currate').reset()
  this.newcode()
  this.newcode()

this.bb()
this.hide=true
this.showrate=false

}
bb(){
  this.form1.get('group').setValue("")
  this.form1.get('unit').setValue("")
  this.form1.get('unitvalue').setValue("")
  this.form1.get('stdrate').setValue("")
  this.form1.get('currate').setValue("")
  this.form1.controls['description'].setValue("")
  
}


//edit and deleting function operation

showtable(){
  this.newservice.standnew().then(res => {
   
  
    console.log( res)
    this.stand=res
    this.listData = new MatTableDataSource(this.stand);
   },

    error => { console.error('Error!', error) }
  )
}

ref(){
 this.showtable()
}



onSelectdelete(element) {
  console.log(element._id)
  this.deletedata=element._id
  this.deleteform.get('_id').setValue(`${this.deletedata}`)
  if(confirm('Are you sure to delete this record ?')){
    this.newservice.deleterate(this.deleteform.value._id)
   .toPromise()
    .then(
      res => {
        console.log(res)
        this.notification.warn('! Deleted successfully');
        this.showtable()
       
      },
      error => {
        console.log(error);
      })
   
    
  }

}

// view

view(){

  this.newservice.standnewview(this.form.value).toPromise().then(
    res=>{
     console.log(res)
     this.standview=res
       this.listData = new MatTableDataSource(this.standview);
   }
  ,
    error=>{
      console.log(error)
    })
  






  // this.newservice.standnewview().then(res => {

  //   console.log( res)
  //   this.standview=res
  //   this.listData = new MatTableDataSource(this.standview);
  //  },

  //   error => { console.error('Error!', error) }
  // )
}


//update
update(element){
   console.log(element)
   this.newservice.ratespost(element)
   .toPromise()
   .then(
     res => {
       console.log(res)
       if(res="ok1"){
         this.openConfirmDialog()
       }
       else{}
     },
     error => {
       console.log(error);
     })





}

openConfirmDialog(){
  return this.dialog.open(UpdatenewitemratesComponent,{
    width: '1000px',
    height: '400px',

   
   });
 }












  
}