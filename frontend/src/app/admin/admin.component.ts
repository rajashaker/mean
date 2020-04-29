import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { login } from '../entites/login.entity';
import { MatTableDataSource } from '@angular/material';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  temp:login[];
  listData:MatTableDataSource<any>
  displayedColumns = [  'FirstName', 'OfficeName','E-mail','Username','Password','edit'];
  myForm:  FormGroup;
  ana1= [];
  b=[];
  a=[];


  constructor(private productservice:ProductService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: this.fb.array([])
    });
  }

  display():void{
    this.productservice.disptempuser().then(
      res=>{
        this.temp=res;
        this.listData=new MatTableDataSource(this.temp);
        
       console.log(res)
      },
        error=>{
          console.log(error);
        }
   );
  }


 
    onsave(ana1: string,isChecked: boolean){
      const emailFormArray = <FormArray>this.myForm.controls.username;

      if (isChecked) {
        emailFormArray.push(new FormControl(ana1));
      
      } else {
        let index = emailFormArray.controls.findIndex(x => x.value == ana1)
        emailFormArray.removeAt(index);
       
      }
       var a=this.myForm.value.username;
       console.log(this.myForm.value.username);
      //   this.ana1.push(this.myForm.value.username);
       
    
          }


          submit(){
         
            console.log(this.myForm.value.username);
            this.productservice.check( this.myForm.value.username) .subscribe( response => console.log('Success!', response),
             error => console.error('Error!', error)
               )
          }
    
        

          submit1(){
         
            console.log(this.myForm.value.username);
            this.productservice.check1( this.myForm.value.username) .subscribe( response => console.log('Success!', response),
             error => console.error('Error!', error)
               )
          }

          submit2(){
         
            console.log(this.myForm.value.username);
            this.productservice.check2( this.myForm.value.username) .subscribe( response => console.log('Success!', response),
             error => console.error('Error!', error)
               )
          }

          // submit3(){
         
          //   console.log(this.myForm.value.username);
          //   this.productservice.check3( this.myForm.value.username) .subscribe( response => console.log('Success!', response),
          //    error => console.error('Error!', error)
          //      )
          // }



}