import { Component, OnInit } from '@angular/core';
import{ProductService} from '../product.service'
import {Product} from '../entites/product.entity'
import{MatTableDataSource} from '@angular/material';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-ass',
  templateUrl: './ass.component.html',
  styleUrls: ['./ass.component.css']
})
export class AssComponent implements OnInit {
//   listData:MatTableDataSource<any>
// Products :Product[];public name ="day";
// Code :string;
// displayedColumns:string[]=['Code', 'Description',' Unit',   'Rate'];
//   constructor( private productservice:ProductService) { }

  ngOnInit() {
    // this.loadData();
  }
//   loadData():void{
//     this.productservice. sc2013civ().then(
//       res=>{
//         this.Products=res;
//         this.listData = new MatTableDataSource(this.Products)
//       },
//         error=>{
//           console.log(error);
//         }
  
      
//     );
//   }

// }
}
