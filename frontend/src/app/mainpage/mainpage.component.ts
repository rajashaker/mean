import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 
import{FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import{FormsModule} from '@angular/forms'
import { ProductService } from '../product.service';
import { ExcelService } from '../services/excel.service';
import { Analysis } from '../entites/analysis.entity';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  
show=false;
form: FormGroup;
loginform:FormGroup;
errormsg:string='';
  state: Analysis[];
  ipAddress:any;
  a=1000
  send_date=new Date();
  formattedDate : any;
  mail: string;
  email:Analysis[];
  Email:Analysis;
  constructor(private httpClient:HttpClient,private productservice:ProductService, 
    private excelService:ExcelService,private fb:FormBuilder,private router:Router) 
  {   
    this.httpClient.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      // console.log('th data', data.ip);
      this.ipAddress = data.ip
     
      this.form.get('ip').setValue(`${this.ipAddress}`)
    
    })

    this.send_date.setMonth(this.send_date.getMonth());
     this.formattedDate=this.send_date.toISOString();
//  console.log(this.formattedDate); 
 this.displayingemail()
 
 
  }

  ngOnInit() {
    this.statedata();
    let nameregex:RegExp=/^[a-zA-Z]+$/;
    let cityregex:RegExp=/^[a-zA-Z]+$/;
  
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.form =this.fb.group({
      'name':['',[Validators.required,Validators.minLength(3),Validators.pattern(nameregex),]],
     'email':[,[Validators.required,Validators.pattern(emailregex)]],
      address:[,Validators.required],
      city:[,[Validators.required,Validators.pattern(cityregex)]],
      state:[,Validators.required],
      pincode:[,[Validators.required,Validators.pattern('[0-9]{1,6}'),Validators.minLength(6)]],
      mobile:[,[Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      officetype:[,Validators.required],
      category:[,Validators.required],
      q1:[,Validators.required],
      a1:[,Validators.required],
      q2:[,Validators.required],
      a2:[,Validators.required],
      ip:[this.ipAddress],
      uniqueuserid:[this.a],
      date:[this.formattedDate]
     
     
    });
    this.loginform=this.fb.group({
      UserName:[''],
      Accesscode:['']
    });

}

dc(){
  this.show=true
}



getErrorEmail() {
  return this.form.get('email').hasError('required') ? 'Field is required' :
    this.form.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
      this.form.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
}

getusername(){
  return this.form.get('name').hasError('required') ? 'Name is required ' :
  this.form.get('name').hasError('pattern') ? 'Name only contains characters' :
  this.form.get('name').hasError('minlength') ? ' Minimum 3 characters' :'';
    

}
getcity(){
  return this.form.get('city').hasError('required') ? 'City is required ' :
  this.form.get('city').hasError('pattern') ? 'City only contains characters' :'';
    

}


getmobile(){
  return this.form.get('mobile').hasError('required') ? 'Mobile.no is required ' :
  this.form.get('mobile').hasError('pattern') ? 'It is not a valid mobile number.' :'';
}

getpincode(){
  return this.form.get('pincode').hasError('required') ? 'pincode is required ' :
  this.form.get('pincode').hasError('pattern') ? 'Only numbers is to be entered.' :
  this.form.get('pincode').hasError('minlength') ? 'Pincode must contain only 6 digits.' :'';
}




statedata():void{
              this.productservice.stateapi().then(
                res=>{
                  this.state=res;
                // console.log(res)
               
                // console.log(isIPv4)
              },
                  error=>{
                    console.log(error);
                  }
         );
            }

            sub(){
              // console.log(this.form.value)
              this.a=this.a+1
              // console.log(this.a)
              this.form.get('uniqueuserid').setValue(`${this.a}`)
              this. productservice.registering(this.form.value)
              .subscribe( response => console.log('Success!', response),
              error => console.error('Error!', error)
             
              )
              // console.log(this.formattedDate)
           this.clear();
            }
            clear(){
              this.form.reset();
              this.loginform.reset();
              this.errormsg=''
            }

            
            checkmail(Email: string)
            {
             
              var len=this.email;
              for(var i=0;i<len.length;i++)
              {
                if(this.email[i].Email == this.form.get('email').value){
                 
              alert('mail already exist');
              this.form.controls['email'].reset()
              // this.mail=Email;
             
                }
              }
          
          // console.log(Email);
            }
      

          displayingemail(): void{
            
              this.productservice.dispmail().then(
                res =>{
                  this.email = res;
                  this.a=this.email[0].UniqueuserID
 
                  this.a=this.a+1
                  // console.log(this.a);
                  // console.log( this.email)
                },
                error => {
                  console.log(error);
                }
              );
              
            }

//sigin
login1(): void{
 
  this.productservice.login(this.loginform.value.UserName,this.loginform.value.Accesscode).then(
    res => {
    //  console.log((res as any).count);
    if ((res as any).count == 1){
      this.errormsg='';
localStorage.setItem('auth_token',  this.loginform.value.UserName);
if(this.loginform.value.UserName == 'ADMIN' && this.loginform.value.Accesscode =='ADMIN')
{


this.router.navigate(['/admin']);
}
else
{
 this.router.navigate(['/in']);
}
}
else
{
 this.errormsg = 'Invalid Account';
}
     
   },
   error => {
     this.errormsg = error.message;
   }
 )
}

            
 

}