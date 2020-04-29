import { Component, OnInit } from '@angular/core';
import{ProductService} from '../product.service'

import {Product} from '../entites/product.entity'
import{FormsModule} from '@angular/forms'
import{ Router}from'@angular/router';
import {RR} from '../entites/rr'
import {Pr} from '../entites/new.entity'
import{Rates} from '../entites/rates.entity'
import{Rate} from '../entites/rate.entity'
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  listData:MatTableDataSource<any>
  displayedColumns:string[]=['Code', 'Description','Unitvalue','Rate'];
dropciv:Rates[];
as:Rates[];
storerate:Rate[];
  Products :Product[];
  Product :Product[];
  
  bala:Rates[];
Selected:Number;
modifiedtext:string;
  s:String;
  a:String;
  val: number;
show=false;
show1=false;
userModel=new Rate('','','','');
 
  constructor(private productservice:ProductService, private router:Router) { }

  ngOnInit() {
  // this.loadData();
  // this.loadata();
  // this.asd();
  }
  //plants record api
  ar(){
    this.onSubmit();
    this.civ();}
    // uq(){
    //    this.onSubmit();
    // this.elec();}
    asd(){
  
      this.sub();
      this.loadD();
    }
    sub(){
      this.onSubmit();
    }
  loadD():void{
    this.productservice.sub().then(
      res=>{
        this.bala=res;
     this.listData=new MatTableDataSource(this.bala);
       
        console.log(res);
      },
        error=>{
          console.log(error);
          });
   } 





  //civildropdown
  loadData():void{
    this.productservice. civdrop().then(
      res=>{
        this.Products=res;
        // this.Selected=5;
       
        console.log(res);},
        error=>{
          console.log(error);
          
this.a="select";
        }
  
        
      
    );
 
  } 
  Onyearselected(num:any){
this.On(num);
    this.ele(num)
  } 
  On(num){
     this.modifiedtext=num;
    if(num =='CIVIL'){
      this.show=true;
    }
    else{
     
this.show=false;
    }

  }
  ele(num){
    this.modifiedtext=num;
    if(num =='ELECT'){
      this.show1=true;
    }
    else{
     
this.show1=false;
    }

  }
  //elecdrop
  loadata():void{
    this.productservice. elecdrop().then(
      res=>{
        this.Product=res;},
        error=>{
          console.log(error);
        }
  
        
      
    );
  } 

//dropdown for civdropdown
  civ(){
    this.productservice.dropciv().then(
      res=>{
        this.dropciv=res;},
        error=>{
          console.log(error);
        }
  
        
      
    );

  }
//dropdown for elecdropdown
  // elec(){
  //   this.productservice.dropelec().then(
  //     res=>{
  //       this.dropciv=res;},
  //       error=>{
  //         console.log(error);
  //       }
  
        
      
  //   );
    
  // }


  onSubmit(){this. productservice.rate(this.userModel)
  .subscribe(
    data=>console.log('success',data),
    error=>console.error('error',error)

  )
  console.log(this.userModel);
}
   
applyFilter(filterValue: string) {
  this.listData.filter = filterValue.trim().toLowerCase();
}
}


