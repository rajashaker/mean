import { Component, OnInit } from '@angular/core';
import{ProductService} from './product.service'
import {Product} from './entites/product.entity'
import{  FormBuilder,FormGroup} from'@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {
Products :Product[];

public name ="day";
  constructor( private productservice:ProductService,) {
  
   }

  ngOnInit() {
    // this.loadData();
  }
// loadData():void{
//   this.productservice.findAll().then(
//     res=>{
//       this.Products=res;},
//       error=>{
//         console.log(error);
//       }


    
//   );
// }

}