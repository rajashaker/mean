// import { Component, OnInit } from '@angular/core';
// import{ProductService} from '../product.service'
// import {Product} from '../entites/product.entity'
// import{MaterialModule} from'../material/material.module'
// // import {FormControl, Validators,ReactiveFormsModule, FormBuilder }from '@angular/forms';
// import{ Router}from'@angular/router';
// import {RR} from '../entites/rr'
// import {Pr} from '../entites/new.entity'
// import { MatTableDataSource } from '@angular/material';
// import { Radiorate } from '../entites/radiorate.entity';
// import { Save } from '../entites/savebasicrates.entity';
// import { Cmpl } from '../entites/basicratescmpl.entity';
// import{NgForm}from '@angular/forms'
// import { MatIcon } from '@angular/material';
// import { element } from '@angular/core/src/render3';
// import { HttpClient } from '@angular/common/http';
// import{FormBuilder} from '@angular/forms';
// import { Cm } from '../entites/newforrate.entity';
// @Component({
//   selector: 'app-basicrates',
//   templateUrl: './basicrates.component.html',
//   styleUrls: ['./basicrates.component.css'],
//    providers:[ProductService]
// })
// export class BasicratesComponent implements OnInit {
// dis=true

//   listData:MatTableDataSource<any>
//   displayedColumns:string[]=['Code', 'Description','Unitvalue','Rate','Marketrate','update'];
//   Products :Product[];
//   Product :Product[];
//   cm:Cm[];
// sel:Cm;
//   store:Save[];
//  bas:Cmpl;
// user=new Cmpl();
//   basic:Cmpl[];

//    rad1:Radiorate[];
//   rad:Radiorate[];

//   favoriteSeason: string;


// Selected:Number;
// modifiedtext:string;
//   s:String;
//   a:String;
//   val: number;
// show=false;
// show1=false;

// userModel=new Save('','','');
// constructor(private productservice:ProductService, private http: HttpClient, private router:Router, private formBuilder: FormBuilder) { }
// sdd:any;
// marketrate:any;
// productForm: any;
//   ngOnInit() {
//     this.productForm = this.formBuilder.group({
//       _id:'',
//       Marketrate:0
//     });
    
    
//   }
//  sub(){
//       this.onSubmit();
   
//     }
//     asd(){
//        this.onSubmit();
//        this.loadD();
    
//      }



// aser(){this.loadData();
//   this.basiccivilrates();
  
//   // this.onSubmit();
// }

// we(){ this.loadData();
//   this.basiccivilrates();
 
//   // this.onSubmit();
// }

// fe(){  this.loadata();
//   this. basicelctrates();

//   // this.onSubmit();
// }
// ae(){
//   this. basicelctrates();
//   // this.loadata();
//   this.onSubmit();
// }

//      basiccivilrates(){
//       this.productservice.civBasic().then(
//         res=>{
//           this.rad =res;
//           console.log(res);
//         },
//           error=>{
//             console.log(error);
          
//           } 
//       );
//      }
   

//      basicelctrates(){
//       this.productservice.elecBasic().then(
//         res=>{
//           this.rad =res;
//           console.log(res);
//         },
//           error=>{
//             console.log(error);
          
//           } 
//       );
//      }


// //displaying datas in table
//     loadD():void{
//       this.productservice.bascrates().then(
//         res=>{
//           this.basic =res;
//           this.listData = new MatTableDataSource(this.basic)
//           // this.Selected=5;
         
//           console.log(res);
//         },
//           error=>{
//             console.log(error);
//           })}
  
  
//    //for civil dropdown
//     loadData():void{
//       this.productservice. civdrop().then(
//         res=>{
//           this.Products=res;
//           // this.Selected=5;
         
//           console.log(res);},
//           error=>{
//             console.log(error);
            
//   this.a="select";
//           }); 
//         } 
//     //for elect dropdown
//         loadata():void{
//           this.productservice. elecdrop().then(
//             res=>{
//               this.Product=res;},
//               error=>{
//                 console.log(error);
//               } );
//             }
              
          
        
    
   
//    //{
//     Onyearselected(num:any){
//   this.On(num);
//       this.ele(num)
//     }
//    // for  displaying civildropdown and ratestype
//     On(num){
//        this.modifiedtext=num;
//       if(num =='CIVIL'){
//         // this.we();
//         this.show=true;
      
//       }
//       else{
       
//   this.show=false;
//       }}
  
    
//      // for  displaying electricaldropdown and ratestype
//     ele(num){
//       this.modifiedtext=num;
//       if(num =='ELECT'){
//         this.show1=true;
//       }
//       else{
       
//   this.show1=false;
//       } }
  
//    //}
//   //  "http://localhost:3073/api/up/"

//   // private readonly update:string="http://localhost:3073/api/up/";
//   // Update(selected:Cm){
//   //   return this.http.put(this.update+`${this.sdd}`,selected)
//   // }
   

//   //  save(event:any){
//   //   this.Update(this.productForm.value).toPromise().then(
//   //     res=>{
//   //       alert('updated')
//   //     },error=>{
//   //       console.log(error);
//   //     }
//   //   );
//   // }
// twe(){
//   this.yr();
// }
//   yr(){
//     this.save(event);
//     this.asd()
//   }
//   save(event:any){
//     this.productservice.Update(this.productForm.value).toPromise().then(
//       res=>{
//         alert('updated')
//       },error=>{
//         console.log(error);
//       }
//     );
//   }
     
  
//     onSubmit(){this. productservice.ratesforbasic(this.userModel)
//     .subscribe(
//       data=>console.log('success',data),
//       error=>console.error('error',error)
  
//     )
//   }

//   onedit(element:Cmpl){
//     // this.productservice.selected=element;
//     this.productservice.selected=element;
//     console.log( element);
//     console.log( element._id);
//     this.sdd=element._id;
//     this.marketrate=element.Marketrate;
//     // onSelect(selectedItem: any) {
//     //   console.log( selectedItem.Itemcode);
//     //   this.e=selectedItem.Itemcode;

//   }
  
   
//   applyFilter(filterValue: string) {
//     this.listData.filter = filterValue.trim().toLowerCase();
//   }
// }




