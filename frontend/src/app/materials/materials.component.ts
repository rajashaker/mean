import { Component, OnInit } from '@angular/core';
import{ProductService} from '../product.service'
import {Product} from '../entites/product.entity'
import{MaterialModule} from'../material/material.module'
import {FormControl, Validators,ReactiveFormsModule, FormBuilder, FormGroup }from '@angular/forms';
import{ Router}from'@angular/router';
import {RR} from '../entites/rr'
import {Pr} from '../entites/new.entity'
import { MatTableDataSource } from '@angular/material';
import { ExcelService } from '../services/excel.service';




@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {
  Products :Product[];
Product :Product[];
listData:MatTableDataSource<any>
displayedColumns:string[]=['Code', 'Description','Unitvalue','Rate'];
bala:Pr[];


show=false;
show1=false;
button=false;

userModel=new RR('','');
form: FormGroup
showspinner:boolean;

  constructor(private productservice:ProductService, private excelService:ExcelService,private fb:FormBuilder) { }



  ngOnInit() {
  
 this.form =this.fb.group({
    Civ_Elec:['',Validators.required],
    year:[,Validators.required],
   
  })

  } 
 
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.bala, 'sample');
  }
 

  table():void{
    this.button=true;
    this.showspinner=true;
    this.sub();
    this.productservice.mat().then(
      res=>{
        this.bala =res
        this.listData = new MatTableDataSource(this.bala)
        //  console.log(res);
         this.showspinner=false;
      },
        error=>{
          console.log(error);
        
        });
} 

sub(){
console.log(this.form.value)
  this. productservice.register(this.form.value)
  .subscribe( response => console.log('Success!', response),
  error => console.error('Error!', error)
  )
// this.table();
}

sue(){

  console.log(this.form.value)
    this. productservice.register(this.form.value)
    .subscribe( response => console.log('Success!', response),
    error => console.error('Error!', error)
    )

  }


  //year(labour,material,plants,carriage of rates)
  civilyearofrates():void{
    this.form.controls['year'].reset()
    this.button=false;
    this.productservice. civdrop().then(
      res=>{
        this.Product=res;
        this.show=true;
        
            
      // console.log(res)
    
    },
        error=>{
          console.log(error);
  
        }
        );
     }

        electricalyearofrates():void{
          this.form.controls['year'].reset()
          this.button=false;
          this.productservice. elecdrop().then(
            res=>{
              this.Product=res;
            
              this.show=true;
              // console.log(res);
            },
              error=>{
                console.log(error);
              }  
          );
           } 

  //  **   
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
 
      }
 