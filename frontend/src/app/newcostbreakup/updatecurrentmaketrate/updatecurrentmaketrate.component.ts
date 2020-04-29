import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { NewcostbreaupService } from 'src/app/services/newcostbreaup.service';

@Component({
  selector: 'app-updatecurrentmaketrate',
  templateUrl: './updatecurrentmaketrate.component.html',
  styleUrls: ['./updatecurrentmaketrate.component.css']
})
export class UpdatecurrentmaketrateComponent implements OnInit {
  message:any;
  transferdata:any;
  form:FormGroup;
  hide=false
  constructor(private fb:FormBuilder,public dialog:MatDialog,private costbreakservice: NewcostbreaupService
    ,private notification:NotificationService,public dialogRef: MatDialogRef< UpdatecurrentmaketrateComponent>,
     @Inject(MAT_DIALOG_DATA) public data:FormGroup){} 
   

  ngOnInit() {
    // let rateregex: RegExp =^\d+\.\d{0,2}$
    this.costbreakservice.currentrate.subscribe(message => this.message = message)
    console.log('oigoigoogoroor')
    console.log(this.message)


    this.form=this.fb.group({
      
    code:[{value:this.message.Code,disabled:true}],
    description:[{value:this.message.Description,disabled:true}],
    currentrate:[this.message.Rate,[Validators.required,Validators.maxLength(9),Validators.pattern('[0-9]{1,4}(\.[0-9][0-9]?)?')]],
    standardrate:[{value:this.message.std,disabled:true}],
    schyear:[this.message.schyear],
    civ:[this.message.Civ_Elec],
    username:[this.message.Username]

    })


    this.form.get('currentrate').valueChanges.subscribe((value:any)=>{
console.log(value)
if(value ===0 || value=='e'){
  alert('market rate cannot be 0')
  this.form.get('currentrate').setValue(1)


}
    })
  }






  update(){
    this.hide=true

this.transferdata=this.form.getRawValue()
// console.log(this.form.getRawValue())
//     this.costbreakservice.Message(this.transferdata);

    

    this.costbreakservice.updatarate(this.form.getRawValue()).toPromise().then(
      res=>{
        if(res=='updated'){
       console.log(res)
       this.notification.success(':: Updated successfully');
       this.dialogRef.close(true)
        }
      },
      error=>{
        console.log(error)
      })
  }
  onClose() {
   
    this.dialogRef.close(false);
  }
}
