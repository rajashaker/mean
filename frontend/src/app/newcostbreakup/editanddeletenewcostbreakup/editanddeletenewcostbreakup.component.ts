import { Component, OnInit } from '@angular/core';
import { NewcostbreaupService } from 'src/app/services/newcostbreaup.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Rates } from 'src/app/entites/rates.entity';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Analysis } from 'src/app/entites/analysis.entity';
import { Analysisfdata } from 'src/app/entites/analysisfdata.entity';
import { ExcelService } from 'src/app/services/excel.service';
import { UpdatecurrentmaketrateComponent } from '../updatecurrentmaketrate/updatecurrentmaketrate.component';

@Component({
  selector: 'app-editanddeletenewcostbreakup',
  templateUrl: './editanddeletenewcostbreakup.component.html',
  styleUrls: ['./editanddeletenewcostbreakup.component.css']
})
export class EditanddeletenewcostbreakupComponent implements OnInit {

  listData1: MatTableDataSource<any>
  listData2: MatTableDataSource<any>
  listData3: MatTableDataSource<any>
  listData4: MatTableDataSource<any>

  message:any;
 year:any;
subheads:any;
error:string;
finaltotal:any;
calquanval:any;
calunitval:any;
calunit:any;
title:any;
transferdata:any;

try2:Analysis[];
try3:Analysis[];
srtab:Rates[];
srtab1:Rates[];
newuserana:Analysisfdata[];
newuserana1:Analysisfdata[];
newuserana2:Analysisfdata[];

sub1=false
errorhead=false
firsttable=false
secondtable=false
thirdtable=false
forthtable=false
showspinner=false

displayedColumns: string[] = ['select','Code', 'Description', 'Unitvalue', 'Rate'];
displayed: string[] = ['Itemcode','Icode','Code', 'Description', 'Unitvalue', 'Rate','Qty','Amount','labour','cartage','water','gst','over','cess'];
display: string[] = ['select','Code', 'Description', 'Unitvalue', 'Rate'];

  form1: FormGroup;
  form2: FormGroup;
  constructor(private costbreakservice: NewcostbreaupService,private fb: FormBuilder,private excelService:ExcelService,
    private router : Router,private notification: NotificationService,
      public dialog: MatDialog,
   ) {
  
   }

  ngOnInit() {
    this.costbreakservice.currentMessag.subscribe(message => this.message = message)
    console.log(this.message)
    this.form1 = this.fb.group({
      Civ_Elec: [this.message.Civ_Elec],
      username:[this.message.username],
      schyear:[this.message.schyear],
     
      details:[this.message.details],
      subheads:[''],
      
   
    })
this.title=this.form1.get('details').value

    this.form2 = this.fb.group({
      Civ_Elec: [this.message.Civ_Elec],
      username:[this.message.username],
      schyear:[this.message.schyear],
      itemcode:[''],
      unit:[''],
    calquantity:[''],
    srnsr:[''],
    subhead:[''],
    date:['']
     
      
     
      
   
    })






    if(this.form1.get('Civ_Elec').value =='CIVIL')
    { 
      this.costbreakservice.getyear().then(
        res => {
      
        if(res){
          console.log(res)
          this.year=res
          this.sub()
          this.sub1=true
        }
        else{
          this.sub1=false
        }
        },
        error => {
          console.log(error);
        }
      );
    }
    else if(this.form1.get('Civ_Elec').value =='ELECT'){
      this.costbreakservice.getyear1().then(
        res => {
         if(res){
           this.year=res
           this.sub()
           this.sub1=true
           console.log(res)
         
         }
         else{
          this.sub1=false
         }
        },
        error => {
          console.log(error);
        }
      );
   

    }
    if(this.form2.get('username').value==null||""){
      this.router.navigate(['/NCBU']);
    }

  }

  back(){
    this.router.navigate(['/NCBU']);
  }

 


 
    civil() {
      this.firsttable=false
      this.errorhead=false
      this.secondtable=false
      this.thirdtable=false
          this.forthtable=false
  this.sub1=false
     
      this.form1.get('schyear').reset()
      this.form1.get('subheads').reset()
   this.costbreakservice.getyear().then(
        res => {
      
        if(res){
          console.log(res)
          this.year=res
        }
        else{
         
        }
        },
        error => {
          console.log(error);
        }
      );
    }
  
   

  elect() {
    this.firsttable=false
    this.errorhead=false
    this.secondtable=false
    this.thirdtable=false
          this.forthtable=false
    this.sub1=false
     this.form1.get('schyear').reset()
    this.form1.get('subheads').reset()

   
    this.costbreakservice.getyear1().then(
         res => {
          if(res){
            this.year=res
            console.log(res)
          
          }
          else{
          
          }
         },
         error => {
           console.log(error);
         }
       );
     }

     f1(event){
      this.firsttable=false
      this.secondtable=false
      this.thirdtable=false
          this.forthtable=false
      this.errorhead=false
       console.log(event.value)
       if(event.value!=="" ){
this.sub()
this.sub1=true
this.form2.get('schyear').setValue(this.form1.get('schyear').value)
this.form2.get('Civ_Elec').setValue(this.form1.get('Civ_Elec').value)
this.form1.get('subheads').reset()

       }
       else{
        this.form2.get('schyear').setValue(this.form1.get('schyear').value)
        this.form2.get('Civ_Elec').setValue(this.form1.get('Civ_Elec').value)
       }

  
      
       }





       sub(){ 
       
        this.costbreakservice.subh(this.form1.value) .toPromise().then(res => {
          console.log(res)
          if(res==""){
            this.errorhead=true
            this.error='No Cost Breakup Item  '
            this.subheads=res
          
            console.log('1')
       
            this.form1.get('subheads').disable()
          }
          else{
      
            this.subheads=res
      
            this.form1.get('subheads').enable()
            this.errorhead=false
            // this.firsttable=true

          }
          
        },
      
          error => { console.error('Error!', error) }
        )
      
      }

      sr(event){
       
        console.log(event.value)
        // console.log(this.form1.get('details').value)

        if(event.value === ""){
          // this.showtable=false
          this.firsttable=false;
          this.secondtable=false
          this.thirdtable=false
          this.forthtable=false
          console.log('wq')
        }


      else if((event.value!==""||event.value!==null||event.value!==undefined)&& this.form1.get('details').value ==="view  Cost Breakup New Item Of Construction on basicrates"){
          this.firsttable=true;
          this.secondtable=false
          this.thirdtable=false
          this.forthtable=false
          // this.secondtable=false
          // this.errorhead=false;
          this.srtable()
          this.form2.get('schyear').setValue(this.form1.get('schyear').value)
this.form2.get('Civ_Elec').setValue(this.form1.get('Civ_Elec').value)
this.form2.get('subhead').setValue(this.form1.get('subheads').value)
        
        
        }





  else if(event.value!==" " && this.form1.get('details').value ==='view  Cost Breakup New Item Of Construction on marketrates')
        {
          this.firsttable=false;
          this.secondtable=false
          this.thirdtable=true
          this.forthtable=false
          this.errorhead=false;

        
this.srtable1()
        
        }


        
      }
      
      
      srtable1() {

        // this.costbreakservice.ssr(this.form2.value) .toPromise().then(res => {
        this.costbreakservice.ssr(this.form1.value).toPromise().then(res => {
          console.log(res)
          this.srtab1 = res
          this.listData3 = new MatTableDataSource(this.srtab1);
    
    
        },
    
          error => { console.error('Error!', error) }
        )
    
      }  
      





  srtable() {

    // this.costbreakservice.ssr(this.form2.value) .toPromise().then(res => {
    this.costbreakservice.ssr(this.form1.value).toPromise().then(res => {
      console.log(res)
      this.srtab = res
      this.listData1 = new MatTableDataSource(this.srtab);


    },

      error => { console.error('Error!', error) }
    )

  }




    onselect(element){
      this.firsttable=false
      this.secondtable=false
      console.log(element)
      this.form2.get('itemcode').setValue(element.Itemcode)
      this.form2.get('srnsr').setValue(element.SR_NSR)
      this.form2.get('unit').setValue(element.Unitvalue)
      this.form2.get('calquantity').setValue(element.calquantity);
   
      this.submittingdata()
    }



    onselect1(element){
      // this.firsttable=false
      // this.secondtable=false
      console.log(Date())
      this.thirdtable=false
      console.log(element)
      this.form2.get('itemcode').setValue(element.Itemcode)
      this.form2.get('srnsr').setValue(element.SR_NSR)
      this.form2.get('unit').setValue(element.Unitvalue)
      this.form2.get('calquantity').setValue(element.Calquantity)
      this.form2.get('subhead').setValue(element.SubHeadCode)
   this.calculateana()
      // this.submittingdata()

     
    }


calculateana(){ 
  this.forthtable=false
  this.form2.get('date').setValue(Date())
    this.costbreakservice.marketratecost(this.form2.value).toPromise().then(res => {
      console.log(res)
      if(res!=''){
        this.totalsr()
        this.newuserana1=res
        
        this.calquanval=this.newuserana1[0].Calquantityvalue;
        this.calunitval=this.newuserana1[0].CalUnitvalue;
        this.calunit=this.newuserana1[0].Calquantity;
        this.listData4 = new MatTableDataSource(this.newuserana1);
      }

     
      // this.listData = new MatTableDataSource(this.newuserana1);
      // console.table(res)
      // this.srtab = res
      // this.listData = new MatTableDataSource(this.srtab);


    },

      error => { console.error('Error!', error) }
    )



  }


    totalsr(){
      this.firsttable=false;
      this.secondtable=false
      this.costbreakservice.marketratecost1(this.form2.value).toPromise().then(res => {
        
        console.log(res)
        console.log(res[0].total)
        if(res!=''){
          this.forthtable=true
          this.thirdtable=false
          this.try3=res
        }
 },
  
        error => { console.error('Error!', error) }
      )

    }

 exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.newuserana1, 'sample');
  }






    







    submittingdata(){ 

      this.firsttable=false
      this.secondtable=false
      this.costbreakservice.viewcosbasic(this.form2.value).toPromise().then(res => {
        console.log(res)
       
        if(res==""){
          this.errorhead=true
          this.error='NO cost Breakup for this item'
        }
        else{
          this.errorhead=false
          
          this.newuserana = res
      
          console.log(this.newuserana[0].CalUnitvalue)
          console.log(this.newuserana[0].Calquantity)
          console.log(this.newuserana[0].Calquantityvalue)

          this.calquanval=this.newuserana[0].Calquantityvalue;
          this.calunitval=this.newuserana[0].CalUnitvalue;
          this.calunit=this.newuserana[0].Calquantity;

          this.listData2 = new MatTableDataSource(this.newuserana);
         this.total()
        }
          
   
        
      },
    
        error => { console.error('Error!', error) }
      )
    
    }



    
  total(){ 
       
      this.costbreakservice.totalfor(this.form2.value).toPromise().then(res => {
        console.log(res)
        this.try2=res;
      if(res!=''){
        this.secondtable=true
      }
      else{
        
      }
     
          
   
        
      },
    
        error => { console.error('Error!', error) }
      )
    
    }

      

    opendialog(element){
      this.transferdata=element
      this.costbreakservice.Message(this.transferdata);
      const dialogRef = this.dialog.open(UpdatecurrentmaketrateComponent, {
        width: '800px',
        height:'300px',
    
     })
     dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
     
      console.log(result)
if(result===true){
  this.showspinner=true
  console.log('34543')
  this.calculateana()
  this.calculatensr()
  // this.calculatesr()
}
else{
  console.log('ojdhdismjdfjh')
}

    });
      



}







calculatensr(){ 
  this.showspinner=true
  this.form2.get('date').setValue(Date())
    this.costbreakservice.marketratecostnsr(this.form2.value).toPromise().then(res => {
      console.log(res)
      if(res!=""){
        this.showspinner=false
      }
     this.newuserana2=res



    },

      error => { console.error('Error!', error) }
    )



  }


  calculatesr(){ 
  
    this.form2.get('date').setValue(Date())
      this.costbreakservice.marketsr(this.form2.value).toPromise().then(res => {
        console.log(res)
      //  this.newuserana2=res
  
  
  
      },
  
        error => { console.error('Error!', error) }
      )
  
  
  
    }









}