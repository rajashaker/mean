import { Component, OnInit } from '@angular/core';
import{ProductService} from '../product.service'

import {Product} from '../entites/product.entity'
import{FormsModule, Validators, FormBuilder, FormGroup} from '@angular/forms'
import{ Router}from'@angular/router';
import {RR} from '../entites/rr'
import {Pr} from '../entites/new.entity'
import{Rates} from '../entites/rates.entity'
import{Rate} from '../entites/rate.entity'


//

import{Analysis} from '../entites/analysis.entity';
// import { MatTableDataSource } from '@angular/material';
import { Srhead } from '../entites/srentity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { ExcelService } from '../services/excel.service';

import {MatDialog, MatDialogConfig} from '@angular/material';
import { AnalysisfComponent } from '../analysisf/analysisf.component';
//
@Component({
  selector: 'app-costbreakup',
  templateUrl: './costbreakup.component.html',
  styleUrls: ['./costbreakup.component.css']
})
export class CostbreakupComponent implements OnInit {
  public e;
  listData:MatTableDataSource<any>
  displayedColumns:string[]=['Itemcode', 'Description','Unitvalue','Rate'];
 
  as:Rates[];
  storerate:Rate[];
    Products :Product[];
    Product :Product[];
  Itemcode:string;
    bala:Rates[];
  Selected:Number;
 



//cost breakup for civil
head:Srhead[];
totalwatertotal:Analysis[];
overheads:Analysis[];
cost:Analysis[];
quanmet:Analysis[];
Pr :Analysis[];
Produc :Analysis[];
selectedItem: any;
  router: any;



   
form: FormGroup
showspinner:boolean;
button:boolean;
show=false;
show1=false;
ash: Rates[];
  
  dropciv:Product[];
  
    constructor(private productservice:ProductService,
       private excelService:ExcelService,private fb:FormBuilder,private http:HttpClient,
       public dialog:MatDialog) { }
       opendialog(){
        const dialogRef = this.dialog.open(AnalysisfComponent, {
          width: '1000px',
          height:'400px'
     
          
       
      
        
      
         
       })}
  
    ngOnInit() {
      this.form =this.fb.group({
        Civ_Elec:['',Validators.required],
        year:[,Validators.required],
        subhead:[,Validators.required],
        itemcode:[0,Validators.required]

       
      })
 
    }
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
      console.log(this.form.value)
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
        console.log(this.form.value)
      this.show1=true;
          this. productservice.rate(this.form.value)
      .subscribe( response => console.log('Success!', response),
          
          error => console.error('Error!', error)
          )
    
      
        }

        sube(){
          console.log(this.form.value)
        this.show1=true;
            this. productservice.rate(this.form.value)
        .subscribe( response => console.log('Success!', response),
            
            error => console.error('Error!', error)
            )
      
        
          }
    
        //table
        table():void
        {this.button=true;
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
    

         onSelect(selectedItem: any) {
           console.log(selectedItem.Description)
          console.log( selectedItem.Itemcode);


       var  e=selectedItem.Itemcode
          this.form.get('itemcode').setValue(e)
          this.itemcode()
          // console.log(this.form.value)
         }

         itemcode(){
          console.log(this.form.value)
       
            this. productservice.sendcode(this.form.value)
        .subscribe( response => console.log('Success!', response),
            
            error => console.error('Error!', error)
            )
      
        this.opendialog();
          }







          applyFilter(filterValue: string) {
            this.listData.filter = filterValue.trim().toLowerCase();
          }











  
  
  
  
  
  
    // onSelect(selectedItem: any) {
    //   console.log( selectedItem.Itemcode);
      
   
    // var userModel=new Rate('','','',' id : selectedItem.Itemcode)
//      var use = { id : selectedItem.Itemcode,as:this.form};
//       const headers = new HttpHeaders()
//       .set('Authorization', 'my-auth-token')
//       .set('Content-Type', 'application/json');
//      //http://localhost:3073
// this.http.post('http://localhost:3073/api/code', JSON.stringify(use), {
//   headers: headers
// })
// .subscribe(data => {
//   console.log(data);
// });
// }
     




  }




  
    
      
 





  
  