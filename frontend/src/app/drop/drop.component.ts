import { Component, OnInit } from '@angular/core';
import{ProductService} from '../product.service'
import {Product} from '../entites/product.entity'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rates } from '../entites/rates.entity';
import { Rate } from '../entites/rate.entity';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})

export class DropComponent implements OnInit {
  dropciv:Product[];
  as:Rates[];
  storerate:Rate[];
    Products :Product[];
    Product :Product[];
    
    bala:Rates[];
    ash: Rates[];
  
  
  
   
  form: FormGroup
  showspinner:boolean;
  button:boolean;
  show=false;
  show1=false;
  
  constructor(private productservice:ProductService,private fb:FormBuilder) { }

  ngOnInit() {
    this.form =this.fb.group({
      Civ_Elec:['',Validators.required],
      year:[,Validators.required],
      subheadcode:[,Validators.required],
      subheaddes:[,Validators.required],
      itemcode:[,Validators.required],
      description:[,Validators.required],
      unitvalue:[0],
      unit:[,Validators.required],
      rate:[0],
     
       MasterCode1:[0] ,     
       SubMasterCode1:[0] ,
       SubCode1: [0], 
       SSubcode1: [0],
       edit:['NO'],
       srnsr:['SR'],
       pubpri:['Public'],
       calquantity:[0],
       deviation:[0],
       ulength: [''],
        ubreadth: [''],
        uheight: [''],
       Depttype: [''],
      
       Username: [''],
     
    })
  
  }


  civilyearofsr2007(){
    this.form.controls['year'].reset()
    this.form.controls['subheadcode'].reset()
    this.button=false;
    this.productservice.srciv().then(
      res=>{
        this.dropciv=res;
        this.show=true;
      // console.log(res)
    },
        error=>{
          console.log(error);
        }
  );
  }
  electricalyearof2007(){
    this.form.controls['year'].reset()
    this.form.controls['subheadcode'].reset()
    this.button=false;
    this.productservice.srelec().then(
      res=>{
        this.dropciv=res;
        this.show=true;
    
      },
        error=>{
          console.log(error);
        }
  );
  }
  
  //subheads dropdown from sr2007 for both civil and elect
  subhead():void{
    this.productservice. dropciv().then(
      res=>{
        this.ash=res;
        // console.log(res);
      },
        error=>{
          console.log(error);
          } 
          );
  } 
  
  //submitting and geeting the subhead
  
  subhead1(){
    console.log(this.form.value)
  this.show1=true;
      this. productservice.rate(this.form.value)
  .subscribe( response =>
    //  console.log('Success!', response),
      
      error => {
        return console.error('Error!', error);
      }
      )
    // this.table();
    this.subhead();
    }

submit(){
  console.log(this.form.value)
  this. productservice.newsr(this.form.value)
  .subscribe( response =>{
  alert('submittted')},
      
      error => {
        return console.error('Error!', error);
      }
      )
}
reset(){
  this.form.reset()
}
  

}
