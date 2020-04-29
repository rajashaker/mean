// import { Component, OnInit } from '@angular/core';
// import { An } from '../entites/descost.entity';
// import { Try } from '../entites/try.entities';
// import { Test } from '../entites/test.entity';
// import{ProductService} from '../product.service'
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FormBuilder } from '@angular/forms';
// import { Cm } from '../entites/newforrate.entity';
// import { saving } from '../entites/sampo.enitity';

// import { Analysis } from '../entites/analysis.entity';
// import { ExcelService } from '../services/excel.service';

// @Component({
//   selector: 'app-cmrate',
//   templateUrl: './cmrate.component.html',
//   styleUrls: ['./cmrate.component.css']
// })
// export class CmrateComponent implements OnInit {
// ty:Test[];
// yu:Analysis[]

//   try :Try[];
//   try1 :Try[];
//   try2 :Try[];
//   productForm :any
//   ode:any
// rate:any
// Civ_Elec:any
// Description:any
// schyear:any
//   constructor(private productservice:ProductService, 
//      private http: HttpClient,private formBuilder: FormBuilder,private excelService:ExcelService) { 

//   }
//   exportAsXLSX():void {
//     this.excelService.exportAsExcelFile(this.try1, 'sample');
//   }
  
//   ngOnInit()  {
    
//       this.productForm = this.formBuilder.group({
//         _id:'',
//         Marketrate:0,
//         rew:0,
//         sch:0,
//         civelec:0

//       });
    
//    }

  

//     id:any
//     single(){
//       this.cod();
     
//     }

  

  

//   cod(){
//     this.productservice.initem().then(
//       res=>{
//         this.try=res;
//         console.log(this.try)
//         setTimeout (() => {
        
//             this.display()
            
//           console.log("Hello from setTimeout");
//        }, 4000);
     
      
         
     
//       },
//         error=>{
//           console.log(error);
//         }
//      );
    
    
//   }
//   display(){
//     this.productservice.dis().then(
//       res=>{
//         this.try1 =res
//         this.result()
//      console.log(res);
     
//       },
//         error=>{
//           console.log(error);
          

//         }); 
    
//   } 
//   result():void{
//     this.productservice.finaltotal().then(
//       res=>{
//         this.try2 =res
//      console.log(res);
//       },
//         error=>{
//           console.log(error);
          

//         }); 
//   }

//   de(){
//     this.productservice.delete().toPromise().then(
//       res=>{
//          alert('success')
     
//       },
//         error=>{
//           console.log(error);
          

//         }); 
//   }


// qode:any
// year:any;
// civil:any

//   onedit(ana1:Try){
//     // this.productservice.selected=element;
    
//     console.log( ana1);
//     this.productForm.get('Marketrate').setValue(`${ana1.Rate}`)
//     this.productForm.get('rew').setValue(`${ana1.Code}`)
//     this.productForm.get('sch').setValue(`${ana1.schyear}`)
//     this.productForm.get('civelec').setValue(`${ana1.Civ_Elec}`)
//     this.productForm.get('_id').setValue(`${ana1._id}`)
//     // console.log( ana1._id);
//     this.ode=ana1._id;
//     this.rate=ana1.Rate;
//     this.qode=ana1.Code;
//     this.year=ana1.schyear;
//     this.civil=ana1.Civ_Elec

//     console.log(this.ode)


//     console.log

//     // onSelect(selectedItem: any) {
//     //   console.log( selectedItem.Itemcode);
//     //   this.e=selectedItem.Itemcode;

//   }

//   save(event:any){
//     this.productservice.Update3(this.productForm.value).toPromise().then(
//       res=>{
//         alert('updated')
//       },error=>{
//         console.log(error);
//       }
//     );
//   }
//   // updateinall(event:any){
//   //   this.productservice.Update2(this.productForm.value).toPromise().then(
//   //     res=>{
//   //       alert('updated in all years')
//   //     },error=>{
//   //       console.log(error);
//   //     }
//   //   );
//   // }



//   // sav(event:any){
//   //   this.productservice.Upcmr(this.productForm.value).toPromise().then(
//   //     res=>{
//   //       alert('updated')
    
//   //     },error=>{
//   //       console.log(error);
//   //     }
//   //   );
//   // }
//   twe(){
//     this.save(event)
//   }
//   // tyu(){
//   //  this.updateinall(event)
//   // }
//   // d(){
//   //   this.productservice.Upsr(this.p).toPromise().then(
//   //     res=>{
//   //        alert('updated')
     
//   //     },
//   //       error=>{
//   //         console.log(error);
          

//   //       }); 
//   // }






// }



// // cod(){
// //   this.productservice.initem().then(
// //     res=>{
// //       this.try=res;
     
// //       console.log('balaji')
// //       var  a =  1
// //       this.id = setInterval(() =>{

// //         a=2
// //         this.display()
// //       if(a == 2){
        

// //         clearInterval(this.id);
// //         this.result()
        
// //         console.log('hghgf')
// //     }

// //     } , 4000)
       
   
// //     },
// //       error=>{
// //         console.log(error);
// //       }
// //    );
  

// // }