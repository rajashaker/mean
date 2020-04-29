import { Component, OnInit } from '@angular/core';
import {Pr} from '../entites/new.entity'
import{ProductService} from '../product.service'
@Component({
  selector: 'app-newcomp',
  templateUrl: './newcomp.component.html',
  styleUrls: ['./newcomp.component.css']
})
export class NewcompComponent implements OnInit {
  bala:Pr[];
  constructor(private productservice:ProductService) { }

  ngOnInit() {
    this.loadD();
  }
  loadD():void{
    this.productservice.lab().then(
      res=>{
        this.bala =res;
        // this.Selected=5;
       
        console.log(res);
      },
        error=>{
          console.log(error);
          

        }
  
        
      
    );
 
  } 
}


