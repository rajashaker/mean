import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Srhead } from 'src/app/entites/srentity';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { Srr } from 'src/app/entites/srrr.entity';

@Component({
  selector: 'app-updateitemrates',
  templateUrl: './updateitemrates.component.html',
  styleUrls: ['./updateitemrates.component.css']
})
export class UpdateitemratesComponent implements OnInit {
   newrate:Srr
  form: FormGroup;
  Itemcode:any;
  desc:any 
  rate:any 
  currate:any 
  unit:any
  unitvalue:any
  username: any;
  year: any;
  civ: any;
  constructor(private fb:FormBuilder,private productservice:ProductService,public dialog:MatDialog
    ,private notification:NotificationService,public dialogRef: MatDialogRef< UpdateitemratesComponent>) 
    { 
      this.productservice.newuserdata().then(
        res=>{
          // console.log(res)
       this.newrate=res
       console.log(this.newrate)
       
      this.Itemcode=this.newrate.Itemcode
      this.desc=this.newrate.Description
      this.rate=this.newrate.Rate
      this.currate=this.newrate.currentrate
      this.unit=this.newrate.Unit
      this.unitvalue=this.newrate.Unitvalue+''+this.unit
      this.year= this.newrate.schyear;
      this.civ=this.newrate.Civ_Elec
  
      this.username=this.newrate.Username
  
      console.log(this.Itemcode)
      this.form.get('itemcode').setValue(`${this.Itemcode}`)
      this.form.get('description').setValue(`${this.desc}`)
      this.form.get('rate').setValue(`${this.rate}`)
      this.form.get('currate').setValue(`${this.currate}`)
      this.form.get('unit').setValue(`${this.unitvalue}`)
      this.form.get('username').setValue(`${this.username}`)
      this.form.get('sch').setValue(`${this.year}`)
      this.form.get('civele').setValue(`${this.civ}`)
      
      
       console.log(this.newrate.Rate)
       console.log(this.newrate.currentrate)
        },
          error=>{
            console.log(error);
          
          });
  
  
          this.form =this.fb.group({
            civele:[''],
            sch:[''],
            itemcode:[{value:'',disabled:true},Validators.required],
        description:[,Validators.required],
         rate:[{value:'',disabled:true},Validators.required],
         currate:['',Validators.required],
         unit:[{value:'',disabled:true},Validators.required],
         username:['',Validators.required]
           
           
          }) 
    }

  ngOnInit() {
    this.productservice.newuserdata().then(
      res=>{
       
     this.newrate=res
     console.log(this.newrate)
     
    this.Itemcode=this.newrate.Itemcode
    this.desc=this.newrate.Description
    this.rate=this.newrate.Rate
    this.currate=this.newrate.currentrate
    this.unit=this.newrate.Unit
    this.unitvalue=this.newrate.Unitvalue+''+this.unit

    this.username=this.newrate.Username

    console.log(this.Itemcode)
    this.form.get('itemcode').setValue(`${this.Itemcode}`)
    this.form.get('description').setValue(`${this.desc}`)
    this.form.get('rate').setValue(`${this.rate}`)
    this.form.get('currate').setValue(`${this.currate}`)
    this.form.get('unit').setValue(`${this.unitvalue}`)
    this.form.get('username').setValue(`${this.username}`)
    this.form.get('sch').setValue(`${this.year}`)
      this.form.get('civele').setValue(`${this.civ}`)
    
    
     console.log(this.newrate.Rate)
    
      },
        error=>{
          console.log(error);
        
        });
 

        this.form =this.fb.group({
          Code:[''],
          civele:[''],
          sch:[''],
          itemcode:[{value:'',disabled:true},Validators.required],
      description:[,Validators.required],
       rate:[{value:'',disabled:true},Validators.required],
       currate:['',Validators.required],
       unit:[{value:'',disabled:true},Validators.required],
       username:['',Validators.required]
         
         
        })

        

  }

  update(){
    console.log(this.form.getRawValue())
    this.form.get('itemcode').setValue(`${this.Itemcode}`)
    console.log(this.form.value)
    this.productservice.updatenew(this.form.getRawValue()).toPromise().then(
      res=>{
       console.log(res)
       this.notification.success(':: Updated successfully');
       this.onClose();
      },
      error=>{
        console.log(error)
      })
  }
  onClose() {
   
    this.dialogRef.close();
  }

}
