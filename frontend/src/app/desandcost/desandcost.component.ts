// import { Component, OnInit } from '@angular/core';
// import{Rates} from '../entites/rates.entity'
// import{Rate} from '../entites/rate.entity'
// import{ProductService} from '../product.service'

// import {Product} from '../entites/product.entity'

// //

// import{Analysis} from '../entites/analysis.entity';
// // import { MatTableDataSource } from '@angular/material';
// import { Srhead } from '../entites/srentity';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MatTableDataSource } from '@angular/material';
// import { An } from '../entites/descost.entity';
// import { Try } from '../entites/try.entities';
// import { Cmpl } from '../entites/basicratescmpl.entity';
// import { FormBuilder } from '@angular/forms';
// //

// @Component({
//   selector: 'app-desandcost',
//   templateUrl: './desandcost.component.html',
//   styleUrls: ['./desandcost.component.css']
// })
// export class DesandcostComponent implements OnInit {

// try:Try[]
// tr:Try[]
//   an:An[];
//   listData:MatTableDataSource<any>
//   displayedColumns:string[]=['Itemcode', 'Description','Unitvalue','Rate','update'];
//   dropciv:Rates[];
//   as:Rates[];
//   storerate:Rate[];
//     Products :Product[];
//     Product :Product[];
//   Itemcode:string;
//     bala:Rates[];
//   Selected:Number;
//   modifiedtext:string;
//   e:string;
//    ;
//     a:String;
//     val: number;
//   show=false;
//   show1=false;
//   userModel=new Rate('','','','');
// ane:An[]
// //cost breakup for civil

// Pr :Analysis[];
// Produc :Analysis[];

// try1 :Try[];
// try2 :Try[];

  
//   selectedItem: any;
//   router: any;
//   disable = true;
//   checked = true;
//   productForm: any;
//     constructor(private productservice:ProductService, private http: HttpClient,private formBuilder: FormBuilder) { }
  
//     ngOnInit() {
//     // this.loadData();
//     // this.loadata();
//     // this.asd();
//     this.productForm = this.formBuilder.group({
//       _id:'',
//     Rate:0
//     });
 
//     }
   

//  id:any
// //  single(){
// //   this.cod();
 
// // }

    
// //   cod(){
// //     this.productservice.initem().then(
// //       res=>{
// //         this.try=res;
       
// //         console.log('balaji')
// //         var a=1
// //         this.id=setInterval(() =>{

// //           a++
// //           this.display()
// //         if(a == 2){
// //           clearInterval(this.id);
// //           this.result()
          
// //           console.log('hghgf')
// //         }}
// //           , 4000,)
     
// //       },
// //         error=>{
// //           console.log(error);
// //         }
// //      );
    

// //   }
// //     display(){
// //       this.productservice.dis().then(
// //         res=>{
// //           this.try1 =res
// //        console.log(res);
// //         },
// //           error=>{
// //             console.log(error);
            
  
// //           }); 
      
// //     } 
// //     result():void{
// //       this.productservice.finaltotal().then(
// //         res=>{
// //           this.try2 =res
// //        console.log(res);
// //         },
// //           error=>{
// //             console.log(error);
            
  
// //           }); 
// //     }






//     // display(){
//     //   this.productservice.dis().then(
//     //     res=>{
//     //       this.try1 =res
//     //    console.log(res);
//     //     },
//     //       error=>{
//     //         console.log(error);
            
  
//     //       }); 
      
//     // } 


//     //plants record api
//     asr(){
//       this.asd();
//     }
//   asd(){
    
//    this.sub();
//     this.loadD();
//   }
//   sub(){
//     this.onSubmit();
//   }
  
//     loadD():void{
//       this.productservice.subforcurrentrate().then(
//         res=>{
//           this.bala=res;
//           this.listData=new MatTableDataSource(this.bala);
         
//           console.log(res);
//         },
//           error=>{
//             console.log(error);
//             });
//      } 
     
  
  
  
  
  
//     //civildropdown
//     loadData():void{
//       this.productservice. civdrop().then(
//         res=>{
//           this.Products=res;
//           // this.Selected=5;
         
//           console.log(res);},
//           error=>{
//             console.log(error);
            
//   this.a="select";
//           }
    
          
        
//       );
   
//     } 
//     Onyearselected(num:any){
//   this.On(num);
//       this.ele(num)
//     } 
//     On(num){
//        this.modifiedtext=num;
//       if(num =='CIVIL'){
//         this.show=true;
//       }
//       else{
       
//   this.show=false;
//       }
  
//     }
//     ele(num){
//       this.modifiedtext=num;
//       if(num =='ELECT'){
//         this.show1=true;
//       }
//       else{
       
//   this.show1=false;
//       }
  
//     }
//     //elecdrop
//     loadata():void{
//       this.productservice. elecdrop().then(
//         res=>{
//           this.Product=res;},
//           error=>{
//             console.log(error);
//           }
    
          
        
//       );
//     } 
  
//   //dropdown for civdropdown
//     civ(){
//       this.productservice.dropciv().then(
//         res=>{
//           this.dropciv=res;},
//           error=>{
//             console.log(error);
//           }
    
          
        
//       );
  
//     }
//   //dropdown for elecdropdown
//     // elec(){
//     //   this.productservice.dropelec().then(
//     //     res=>{
//     //       this.dropciv=res;},
//     //       error=>{
//     //         console.log(error);
//     //       }
    
          
        
//     //   );
      
//     // }
//     ar(){
//       this.onSubmit();
//       this.civ();
//     }
//     //   uq(){
//     //     this.onSubmit();
//     //   this.elec();
//     // }
//     onSelect(selectedItem: any) {
//       console.log( selectedItem.Itemcode);
//       this.e=selectedItem.Itemcode;
//     // var userModel=new Rate('','','',' id : selectedItem.Itemcode)
//      var use = { id : selectedItem.Itemcode,as:this.userModel};
//       const headers = new HttpHeaders()
//       .set('Authorization', 'my-auth-token')
//       .set('Content-Type', 'application/json');
//      //http://localhost:3073
// this.http.post('http://localhost:3073/api/save', JSON.stringify(use), {
//   headers: headers
// })
// .subscribe(data => {
//   console.log(data);
// });


// }
  
//     onSubmit(){this. productservice.rate(this.userModel)
//     .subscribe(
//       data=>console.log('success',data),
//       error=>console.error('error',error)
  
//     )
//     console.log(this.userModel);
//   }


//   applyFilter(filterValue: string) {
//     this.listData.filter = filterValue.trim().toLowerCase();
//   }




 


 



 
//   newrate={};

//   sdd:any
//   Rate:any
//   schyear:any
//   Code:any

//   onedit(ana1:any){ 
// this.sdd=ana1._id;
// this.Rate=ana1.Rate
// this.schyear=ana1.schyear
// this.Code=ana1.Code
// console.log(this.sdd)
    
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
     
    
    
//     // this.productservice.selected=element;

    
//     // console.log( element._id);
//     // this.sdd=element._id;
//     // this.Rate=element.Rate;
//     // onSelect(selectedItem: any) {
//     //   console.log( selectedItem.Itemcode);
//     //   this.e=selectedItem.Itemcode;

 


                                                             
                                                       
      
//       }
      
 


  