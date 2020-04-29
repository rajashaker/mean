import { Component, OnInit } from '@angular/core';
import{ProductService} from '../product.service'

import {Product} from '../entites/product.entity'
import{FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms'
import{ Router}from'@angular/router';
import {RR} from '../entites/rr'
import {Pr} from '../entites/new.entity'
import{Rates} from '../entites/rates.entity'
import{Rate} from '../entites/rate.entity'
import { throwMatDuplicatedDrawerError, MatTableDataSource } from '@angular/material';
import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  listData:MatTableDataSource<any>
  displayedColumns:string[]=['Code', 'Description','Unitvalue','Rate'];
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

constructor(private productservice:ProductService, private excelService:ExcelService,private fb:FormBuilder) { }


  ngOnInit() {
    this.form =this.fb.group({
      Civ_Elec:['',Validators.required],
      year:[,Validators.required],
      subhead:[,Validators.required]
     
    })
  }

//year dropdown for both civ and elec from sr2007 table
civilyearofsr2007(){
  this.form.controls['year'].reset()
  this.form.controls['subhead'].reset()
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
  this.form.controls['subhead'].reset()
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
  // console.log(this.form.value)
this.show1=true;
    this. productservice.rate(this.form.value)
.subscribe( response => console.log('Success!', response),
    
    error => console.error('Error!', error)
    )
  // this.table();
  this.subhead();
  }

  //submitting all the datas to get the table
  sub(){
    // console.log(this.form.value)
  this.show1=true;
      this. productservice.rate(this.form.value)
  .subscribe( response => console.log('Success!', response),
      
      error => console.error('Error!', error)
      )

  
    }

    //table
    table():void{this.button=true;
      this.showspinner=true;
      this.sub();
      this.productservice.sub().then(
        res=>{
          this.bala=res;
       this.listData=new MatTableDataSource(this.bala);
       this.showspinner=false;
          // console.log(res);
        },
          error=>{
            console.log(error);
            });
     } 
  
     exportAsXLSX():void {
          this.excelService.exportAsExcelFile(this.bala, 'sample');
        }






















 
  




  


 
   
applyFilter(filterValue: string) {
  this.listData.filter = filterValue.trim().toLowerCase();
}
}

