// import { Component, OnInit } from '@angular/core';
// import{ProductService} from '../product.service';
// import{Analysis} from '../entites/analysis.entity';
// import { MatTableDataSource } from '@angular/material';
// import { Srhead } from '../entites/srentity';

// @Component({
//   selector: 'app-eleccostbreakup',
//   templateUrl: './eleccostbreakup.component.html',
//   styleUrls: ['./eleccostbreakup.component.css']
// })
// export class EleccostbreakupComponent implements OnInit {
//   listData:MatTableDataSource<any>
//   displayedColumns = [ 'ItemCode', 'Code', 'Description','Unitvalue','Quantity','Rate','Amount'];

//   // Products :Analysis[];
//   Product :Analysis[];
//   Produc :Analysis[];
//   head:Srhead[];

//   constructor(private productservice:ProductService) { }

//   ngOnInit() {  this.show()
//   }
//   show(){
//     this.de()
//   }
// de(){
//   this.loadData();
//   this.loadDat();
//   this.heading();
// }
//   loadData():void{
//     this.productservice.eleccos().then(
//       res=>{
//         this.Produc=res;
      
//       },
//         error=>{
//           console.log(error);
//         })
  
//       }
//       loadDat():void{
//         this.productservice.labo().then(
//           res=>{
//             this.Product=res;
//             this.listData=new MatTableDataSource(this.Product);
//           },
//             error=>{
//               console.log(error);
//             })
  
//           }


//           heading():void{
//             this.productservice.headciv().then(
//               res=>{
//                 this.head=res;},
//                 error=>{
//                   console.log(error);
//                 }
          
                
              
//             );
//           }
    
    
//     }