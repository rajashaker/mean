import { Component, OnInit, Input } from '@angular/core';
import{ProductService} from '../product.service';
import{Analysis} from '../entites/analysis.entity';
import { MatTableDataSource } from '@angular/material';
import { Srhead } from '../entites/srentity';


@Component({
  selector: 'app-analysisf',
  templateUrl: './analysisf.component.html',
  styleUrls: ['./analysisf.component.css']
})

export class AnalysisfComponent implements OnInit {




  listData:MatTableDataSource<any>
  displayedColumns = [  'Code', 'Description','Unitvalue','Quantity','Rate','Amount'];

  // Products :Analysis[];
  Product :Analysis[];

  // Produc :Analysis[];
  Prod :Analysis[];
  Pro :Analysis[];
  Pr :Analysis[];
  Pq:Analysis[];
  Ae:Analysis[];
  public name ="day";
  Code:string;
  head:Srhead[];
  totalwatertotal:Analysis[];
overheads:Analysis[];
cost:Analysis[];
quanmet:Analysis[];
  try2: Analysis[];
  unit:string
  unitvalue:string
  rate:string
    constructor( private productservice:ProductService) {this.yes(); }
  
    ngOnInit() {
this.yes();
    }

 

yes(){
  this.all()
}

    all(){
      this.heading();
    }

     //heading for costbreakup

    
     heading():void{
      this.productservice.headciv().then(
        res=>{
          this.head=res;
          // console.log(res)
          this.unit=res[0].Unit;
          this.unitvalue=res[0].Unitvalue;
          this.rate=res[0].Rate;
        this.display();
      },
          error=>{
            console.log(error);
          }
    );
    }
    //records disply from analysisf

    display():void{
      this.productservice.labo().then(
        res=>{
          this.Product=res;
          this.listData=new MatTableDataSource(this.Product);
          this.total();
         
        },
          error=>{
            console.log(error);
          }
     );
    }


//total for the above records
    total():void{
      this.productservice.newtot().then(
        res=>{
          this.try2=res;},
          error=>{
            console.log(error);
          }
    );
    }

 }
    


  