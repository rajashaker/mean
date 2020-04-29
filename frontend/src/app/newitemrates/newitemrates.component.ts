import { Component, OnInit } from '@angular/core';
import { Product } from '../entites/product.entity';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../product.service';
import { Rates } from '../entites/rates.entity';

import { Newsub } from '../entites/newsubheads';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { UpdateitemratesComponent } from './updateitemrates/updateitemrates.component';
import { NotificationService } from '../services/notification.service';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import { Add } from '../entites/add.entity';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';

@Component({
  selector: 'app-newitemrates',
  templateUrl: './newitemrates.component.html',
  styleUrls: ['./newitemrates.component.css']
})
export class NewitemratesComponent implements OnInit {

  disableSelect1=false
  disableSelect2=false
  disableSelect3=false
  disableSelect4=false

  bala: Rates[];
  stanandnew: Rates[];
  

  listData: MatTableDataSource<any>
  displayedColumns: string[] = ['Code', 'Description', 'Unitvalue', 'Rate', 'currate'];
  displayedColumn: string[] = ['Code', 'Description', 'Unitvalue', 'Rate', 'currate', 'actions'];
  displayedColum: string[] = ['Code', 'Description', 'Unitvalue', 'Rate', 'currate'];

  dropciv:Product[];
  newitems:Product
  new1=""

  allsub=false
  ash: Rates[];
  unitss: Add[]
  add1 = false;
  point=false
  threesub=false
  foursub=false
  fivesub=false
  value: any;
  emp: any;
  selectedFood1: string;
  newVal: any
  show = false
  show1 = false;
  addnew = false;
  first = false;
  second = false;
  third = false;
  fourth = false;
  underexists=false;
  disi=false;
  g: Number
  b: string
  public title: string;
  public title1: string;
  public civ: string;
  public year: any;
  public subheaddesc: any;
  public user: any;
  public masterdes: any;
  public subdesc: any;
  public sub1desc: any;

  addnewunit = false;
  edittab=false
  public newunit: string;
  selectedFeatures: any;
  rt: any;
  newsub: Product[];
  newstandsub:Product[];
  under:Newsub[];
  under1:Newsub[];
  under2:Newsub[];


  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  form5: FormGroup;
  deleteform: FormGroup;
  a: any;
  m:any;
  m1:any;

  _id: any;
  c: string;
  e: string;
  f: string;
  viewnew = false;
  editnew = false;
  standardnew = false;
  sub2=true
  deletedata: any;
  under3: any;
  sub2desc: any;
  under4: any;
  sub3desc: any;
  underexists2=false;
  underexists3=false;
  underexists4=false;
  underexists5=false;
  isdisable=false;
  ss: any;
  titlesub2: string;
  ss1: any;
  ss2: any;
  ss3: any;

  subheads=false
  desctosave=false;
 

topic=true
step1=false
main=false
newone=false
hide=false
all=false
tit=false
public widgets: any;
new=false

imp=false
but=false



desxx=false
desxxx=false
desxxxx=false
desxxxxx=false


showrate=false


  constructor(private fb: FormBuilder, private productservice: ProductService, public dialog: MatDialog,
    private notification: NotificationService, ) {
    this.user = localStorage.auth_token;
    // this.units();
    // console.log(this.user)
    this.widgets = [
      { id: "sdkfjkd"},
   
  ];

  }

  opendialog() {
    const dialogRef = this.dialog.open(UpdateitemratesComponent, {
      width: '1000px',
      height: '400px'
})
  }


  ngOnInit() {
    let nameregex:RegExp=/^\d*\.?\d*$/;
    this.form = this.fb.group({
      Civ_Elec: ['', Validators.required],
      year: [, Validators.required],
      details: ['', Validators.required]


    })

    this.form1 = this.fb.group({
      Civ_Elec: ['', Validators.required],
      year: [, Validators.required],
      subheads: ['', Validators.required],
      subheaddes: [, Validators.required],
      username: [, Validators.required],
      mastercode: ['', Validators.required],
      mastercode1: [, Validators.required],
      masterdesc: [, Validators.required],
      submastercode: [''],
      submastercode1: [0],
      submasterdesc: [''],
      subcode: [''],
      subcode1: [0],
      subdesc: [''],
      ssubcode: [''],
      ssubcode1: [0],
      ssubdesc: [''],
      edit: ['YES'],
      srnsr: ['NSR'],
      pubpri: ['Private'],
      calquanity: [0],
      deviation: [0],
      ulength: [''],
      ubreadth: [''],
      uheight: [''],
      description: ['', Validators.required],
      unitval: [, Validators.required],
      unit: ['', [Validators.required,Validators.pattern('[0-9]{1,6}')]],
      rate: [, [Validators.required,Validators.pattern(nameregex)]],
      itemcode: [],
      summa: [],
      newunit: ['']
    })

    this.form2 = this.fb.group({
      Civ_Elec: ['', Validators.required],
      year: [, Validators.required],
      username: ['', Validators.required],
      usersubhead: [, Validators.required]


    })

    //update new  data ffrom the user
    this.form3 = this.fb.group({
      Civ_Elec: ['', Validators.required],
      year: [, Validators.required],
      username: ['', Validators.required],
      usersubhead: [, Validators.required]

    })
//deleting new user data
    this.deleteform = this.fb.group({
      _id:'',
      })
//update new  data ffrom the user
      this.form4 = this.fb.group({
        Civ_Elec: ['', Validators.required],
        year: [, Validators.required],
        username: ['', Validators.required],
        usersubhead: [, Validators.required]
  
      })

      //Add under existing item
      
      this.form5 = this.fb.group({
        Civ_Elec: ['', Validators.required],
        year: [, Validators.required],
        username: ['', Validators.required],
        //2
        usersubhead: ['', Validators.required],
        usersubheaddes:['',Validators.required],
       
        //2.1
        subhead1: ['', Validators.required],
      MasterCode1 :['', Validators.required],
      MasterDesc:['',Validators.required],
        
      //2.1.1
        usermastercode: [''],
        SubMasterCode1:[0], 
        SubMasterDesc: ['',], 

        //2.1.1.1
        usersubcode: [''],
        SubCode1 :[0 ],
        SubDesc :['', ],

//2.1.1.1.1
       userssubcode: [''], 
       SSubCode1: [0],
       SSubDesc: [''],
         
     
     
       
        
        
        edit: ['YES'],
        srnsr: ['NSR'],
        pubpri: ['Private'],
        calquanity: [0],
        deviation: [0],
        ulength: [''],
        ubreadth: [''],
        uheight: [''],
        description: ['', Validators.required],
        unitval: [, Validators.required],
        unit: ['', [Validators.required,Validators.pattern('[0-9]{1,6}')]],
        rate: [0, [Validators.required,Validators.pattern(nameregex)]],
        itemcode: [''],
        newunit: [''],
        summa:[''],
        summa1:['']


  })}

  getunit(){
    return this.form1.get('unit').hasError('required') ? 'Unit is required ' :
    this.form1.get('unit').hasError('pattern') ? 'Only numbers is to be entered.':'';
   
  }
  getrate(){
    return this.form1.get('rate').hasError('required') ? 'Rate is required ' :
    this.form1.get('rate').hasError('pattern') ? 'Only numbers is to be entered.':'';
   
  }

  getunit1(){
    return this.form5.get('unit').hasError('required') ? 'Unit is required ' :
    this.form5.get('unit').hasError('pattern') ? 'Only numbers is to be entered.':'';
   
  }
  getrate1(){
    return this.form5.get('rate').hasError('required') ? 'Rate is required ' :
    this.form5.get('rate').hasError('pattern') ? 'Only numbers is to be entered.':'';
   
  }

  onChange(event) {
    
    console.log(event.value)

  // console.log(this.form.get('year').value)
  if(this.form.get('year').value== null||""){
  
    this.editnew = false;
    this.viewnew = false;
    this.addnew = false;
    this.standardnew = false;
   this.underexists=false;

   
    // this.form.controls['details'].reset()
  }
else{
 
    const newVal = event.value;
    // console.log(newVal);
    if (newVal == "Add New Item Of Construction") {
      this.form1.controls['subheads'].reset()
      this.title = newVal
      this.addnew = true;
      this.viewnew = false;
      this.editnew = false;
      this.standardnew = false;
      this.underexists=false;
      this.form1.get('mastercode').setValue('')
      this.form1.get('mastercode1').setValue(0)
      this.form1.get('masterdesc').setValue('')
      this.form1.get('submastercode').setValue('')
      this.form1.get('submastercode1').setValue(0)
      this.form1.get('submasterdesc').setValue('')
      this.form1.get('subcode').setValue('')
      this.form1.get('subcode1').setValue(0)
      this.form1.get('subdesc').setValue('')
      this.form1.get('ssubcode').setValue('')
      this.form1.get('ssubcode1').setValue(0)
      this.form1.get('ssubdesc').setValue('')
      this.form1.get('description').setValue('')
      this.form1.get('unitval').setValue('')
      this.form1.get('unit').setValue('')
      this.form1.get('rate').setValue('')
     
       this.form1.get('itemcode').setValue('')

       this.main=false
       this.step1=false;

       this.first = false;
       this.second = false;
       this.third = false;
       this.fourth = false;
       this.newone=true;
       this.hide=true
       this.disi=false
       this.all=false
      // console.log(newVal)
    }
    //view the new user added items
    else if (newVal == "View Rates of New Item Of Construction") {
      this.viewnew = true;
      this.addnew = false;
      this.editnew = false;
      this.title = newVal;
      this.standardnew = false;
      this.underexists=false;
      // this.submitandview()
      this.main=false
      this.disi=false
      this.edittab=false
      this.form2.controls['usersubhead'].reset() 

      this.all=false
    }
    //edit
    else if (newVal == "Edit New Item Of Construction") {
      this.editnew = true;
      this.viewnew = false;
      this.addnew = false;
      this.standardnew = false;
      this.underexists=false;
       this.title = newVal;
       this.main=false
       this.disi=false 
       this.form3.controls['usersubhead'].reset() 
      this.edittab=false
      this.all=false
        }
    //view the new user added items and standard items

    else if (newVal == "View Standard And New Item Of Construction") {
      this.editnew = false;
      this.viewnew = false;
      this.addnew = false;
      this.underexists=false;
      this.standardnew = true;

      this.title = newVal;
      this.main=false
      this.disi=false
      this.edittab=false
      this.all=false
      this.form4.controls['usersubhead'].reset()}
//Add New Item Of Construction Under Standard & New Item
    else if (newVal == "Add New Item Of Construction Under Standard & New Item") {
      this.getsub(event);
      this.units()
      this.form5resteting();
      this.allsub=false

this.imp=false
this.but=true



this.all=true
this.new=false

      this.editnew = false;
      this.viewnew = false;
      this.addnew = false;
      this.standardnew = false;
     this.underexists=true;
      this.title = newVal;
      this.main=false
      this.disi=false
      this.underexists2=false
      this.underexists3=false
      this.underexists4=false
      this.underexists5=false
      this.subheads=false
      this.point=false
      this.threesub=false
      this.foursub=false
      this.fivesub=false
      this.desctosave=false
      this.tit=false
      }
    else if (newVal == "select") {
      this.editnew = false;
      this.viewnew = false;
      this.addnew = false;
      this.standardnew = false;
     this.underexists=false;
     this.main=false
     this.disi=false
     this.all=false
    }
  }

  }
  public xsubheads(event): void {  // event will give you full breif of action
    // console.log(event)
    // console.log(event.value)
    const newVale = event.value;
    // console.log(newVale);
    if (newVale == "x.x") {

      this.form1.get('mastercode').setValue('')
      this.form1.get('mastercode1').setValue(0)
      this.form1.get('masterdesc').setValue('')
      this.form1.get('submastercode').setValue('')
      this.form1.get('submastercode1').setValue(0)
      this.form1.get('submasterdesc').setValue('')
      this.form1.get('subcode').setValue('')
      this.form1.get('subcode1').setValue(0)
      this.form1.get('subdesc').setValue('')
      this.form1.get('ssubcode').setValue('')
      this.form1.get('ssubcode1').setValue(0)
      this.form1.get('ssubdesc').setValue('')
      this.form1.get('description').setValue('')
      this.form1.get('unitval').setValue('')
      this.form1.get('unit').setValue('')
      this.form1.get('rate').setValue('')





      this.subpar();
      this.newitem();
      this.units()
      this.units()
      this.newitem();
      this.newone=true
      this.first = true;
      this.second = false;
      this.third = false;
      this.fourth = false;
      

      this.main=true
      this.disi=true

      this.hide=true
    }
    else if (newVale == "x.x.x") {
     
      this.form1.get('mastercode').setValue('')
      this.form1.get('mastercode1').setValue(0)
      this.form1.get('masterdesc').setValue('')
      this.form1.get('submastercode').setValue('')
      this.form1.get('submastercode1').setValue(0)
      this.form1.get('submasterdesc').setValue('')
      this.form1.get('subcode').setValue('')
      this.form1.get('subcode1').setValue(0)
      this.form1.get('subdesc').setValue('')
      this.form1.get('ssubcode').setValue('')
      this.form1.get('ssubcode1').setValue(0)
      this.form1.get('ssubdesc').setValue('')
      this.form1.get('description').setValue('')
      this.form1.get('unitval').setValue('')
      this.form1.get('unit').setValue('')
      this.form1.get('rate').setValue('')
      this.subpar();
      this.newite()
      this.units()
      this.units()
      this.newite()
      this.second = true;
      this.first = false;
      this.third = false;
      this.fourth = false;
      this.hide=true
      this.disi=true
      this.main=true
      this.newone=false
    }
    else if (newVale == "x.x.x.x") {
      this.form1.get('mastercode').setValue('')
      this.form1.get('mastercode1').setValue(0)
      this.form1.get('masterdesc').setValue('')
      this.form1.get('submastercode').setValue('')
      this.form1.get('submastercode1').setValue(0)
      this.form1.get('submasterdesc').setValue('')
      this.form1.get('subcode').setValue('')
      this.form1.get('subcode1').setValue(0)
      this.form1.get('subdesc').setValue('')
      this.form1.get('ssubcode').setValue('')
      this.form1.get('ssubcode1').setValue(0)
      this.form1.get('ssubdesc').setValue('')
      this.form1.get('description').setValue('')
      this.form1.get('unitval').setValue('')
      this.form1.get('unit').setValue('')
      this.form1.get('rate').setValue('')
      this.subpar();
      this.newit()
      this.newit()
      this.units()
      this.units()
      
      this.third = true;
      this.second = false;
      this.first = false;
      this.fourth = false;
      this.disi=true
      this.main=true
      this.hide=true

      this.newone=false
    }

    else if (newVale == "x.x.x.x.x") {
      this.form1.get('mastercode').setValue('')
      this.form1.get('mastercode1').setValue(0)
      this.form1.get('masterdesc').setValue('')
      this.form1.get('submastercode').setValue('')
      this.form1.get('submastercode1').setValue(0)
      this.form1.get('submasterdesc').setValue('')
      this.form1.get('subcode').setValue('')
      this.form1.get('subcode1').setValue(0)
      this.form1.get('subdesc').setValue('')
      this.form1.get('ssubcode').setValue('')
      this.form1.get('ssubcode1').setValue(0)
      this.form1.get('ssubdesc').setValue('')
      this.form1.get('description').setValue('')
      this.form1.get('unitval').setValue('')
      this.form1.get('unit').setValue('')
      this.form1.get('rate').setValue('')
      this.subpar();
      this.newi()
      this.newi()
      this.units()
      this.units()
      this.first = false;
      this.second = false;
      this.third = false;
      this.fourth = true;

      this.hide=true
      this.main=true
      this.disi=true

      this.newone=false

    }

  }

  ui(event) {
    console.log(event.target.value)
    this.civ = event.target.value;
    this.form1.get('Civ_Elec').setValue(`${this.civ}`)
    this.form1.get('username').setValue(`${this.user}`)

    this.form2.get('Civ_Elec').setValue(`${this.civ}`)
    this.form2.get('username').setValue(`${this.user}`)

    this.form3.get('Civ_Elec').setValue(`${this.civ}`)
    this.form3.get('username').setValue(`${this.user}`)

    this.form4.get('Civ_Elec').setValue(`${this.civ}`)
    this.form4.get('username').setValue(`${this.user}`)

    this.form5.get('Civ_Elec').setValue(`${this.civ}`)
    this.form5.get('username').setValue(`${this.user}`)

  }
  di(event) {
    console.log(event.value)
    if(this.form.get('year').value!="" || this.form.get('year').value!=null){
     
    
    this.year = this.form.get('year').value
   
    this.form1.get('year').setValue(`${this.year}`)
    this.form2.get('year').setValue(`${this.year}`)
    this.form3.get('year').setValue(`${this.year}`)
    this.form4.get('year').setValue(`${this.year}`)
    this.form5.get('year').setValue(`${this.year}`)
    // console.log(this.year);
    this.editnew = false;
    this.viewnew = false;
    this.addnew = false;
    this.standardnew = false;
   this.underexists=false;
    this.form.controls['details'].reset()

if(this.form.get('year').value!="" && this.form.get('Civ_Elec').value!=""){
  this.subhead1()
}

    }
    if(this.form.get('year').value==""||this.form.get('year').value==null){
      this.show1=false
    }
    else{
      this.show1=true
    }

  }

xs(event){
  // console.log(event.value)
  if(event.value==""||undefined){
    this.step1=false
    this.form1.controls['summa'].reset()
  }
  else{
    this.step1=true
    this.form1.controls['summa'].reset()
  }
}


  civilyearofsr2007() {
    this.addnew = false;
    this.form.controls['year'].reset()
    this.form.controls['details'].reset()


    this.productservice.srciv().then(
      res => {
        this.dropciv = res;
        this.show = true;
        // this.show1 = true;

        console.log(res)
      },
      error => {
        // console.log(error);
      }
    );
  }
  electricalyearof2007() {
    this.addnew = false;
    this.form.controls['year'].reset()
    this.form.controls['details'].reset()


    this.productservice.srelec().then(
      res => {
        this.dropciv = res;
        this.show = true;
        // this.show1 = true;
        // console.log(res)

      },
      error => {
        console.log(error);
      }
    );
  }


  subhead(): void {
    this.productservice.dropciv().then(
      res => {
        this.ash = res;


        // console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  //submitting and geeting the subhead

  subhead1() {
    // console.log(this.form.value)

    this.productservice.rate(this.form.value)
      .subscribe(response =>
         console.log('Success!', response),

        error => console.error('Error!', error)
      )
    // this.table();
    this.subhead();
  }



  //display new itemcode
  // for two subheads
  newitem() {


    this.productservice.disnewitemcode().then(
      res => {
        this.newitems = res
        console.log(res)
        this.a = res.MasterCode1 + 1
        this.b = res.SubHeadCode + '.' + this.a
        this.form1.get('mastercode').setValue(`${this.b}`)
        this.form1.get('itemcode').setValue(`${this.b}`)
        this.form1.get('mastercode1').setValue(`${this.a}`)


      },
      error => {
        console.log(error);
      }
    );
  }

//for2 subheads
  newitem1() {


    this.productservice.disnewitemcode1().then(
      res => {
        this.newitems = res
        console.log(res)
        this.a = res.MasterCode1 + 1
        this.b = res.SubHeadCode + '.' + this.a
        this.form5.get('subhead1').setValue(`${this.b}`)
        this.form5.get('itemcode').setValue(`${this.b}`)
        this.form5.get('MasterCode1').setValue(`${this.a}`)

      },
      error => {
        console.log(error);
      }
    );
  }

  



  // for three subheads
  newite() {
    this.productservice.disnewitemcode().then(
      res => {
        this.newitems = res
        console.log(res)
        this.m=res.MasterCode1 + 1
        this.a =  1
        this.c = res.SubHeadCode + '.' + this.m
        this.b = res.SubHeadCode + '.' +  this.m + '.' + this.a
        this.form1.get('mastercode').setValue(`${this.c}`)
        this.form1.get('mastercode1').setValue(this.m)
        this.form1.get('submastercode').setValue(`${this.b}`)
        this.form1.get('submastercode1').setValue(`${this.a}`)
        this.form1.get('itemcode').setValue(`${this.b}`)

        
        // console.log(this.b)

      },
      error => {
        console.log(error);
      }
    );
  }



//for3 subheads
newite1() {
  this.productservice.disnewitemcode1().then(
    res => {
      this.newitems = res
      console.log(res)
      this.m=res.MasterCode1 + 1
      this.a =  1
      this.c = res.SubHeadCode + '.' + this.m
      this.b = res.SubHeadCode + '.' +  this.m + '.' + this.a
      this.form5.get('subhead1').setValue(`${this.c}`)
       this.form5.get('MasterCode1').setValue(this.m)
      this.form5.get('usermastercode').setValue(`${this.b}`)
      this.form5.get('SubMasterCode1').setValue(`${this.a}`)
      this.form5.get('itemcode').setValue(`${this.b}`)

      
      // console.log(this.b)

    },
    error => {
      console.log(error);
    }
  );
}


  // for four subheads
  newit() {
    this.productservice.disnewitemcode().then(
      res => {
        this.newitems = res
this.m=res.MasterCode1 + 1
this.m1=1
        this.a =  1
        this.c = res.SubHeadCode + '.' + this.m
        this.e = res.SubHeadCode + '.' + this.m + '.' + this.m1
        this.b = res.SubHeadCode + '.' + this.m + '.' + this.m1 + '.' + this.a
        this.form1.get('mastercode').setValue(`${this.c}`)
        this.form1.get('mastercode1').setValue(this.m)
        this.form1.get('submastercode').setValue(`${this.e}`)
        this.form1.get('submastercode1').setValue(this.m1)
        this.form1.get('subcode').setValue(`${this.b}`)
        this.form1.get('subcode1').setValue(`${this.a}`)

        this.form1.get('itemcode').setValue(`${this.b}`)

        // console.log(res)
        // console.log(this.b)
        // console.log(this.e)

      },
      error => {
        console.log(error);
      }
    );
  }


//for4 subheads
  newit1() {
    this.productservice.disnewitemcode1().then(
      res => {
        this.newitems = res
this.m=res.MasterCode1 + 1
this.m1=1
        this.a =  1
        this.c = res.SubHeadCode + '.' + this.m
        this.e = res.SubHeadCode + '.' + this.m + '.' + this.m1
        this.b = res.SubHeadCode + '.' + this.m + '.' + this.m1 + '.' + this.a
        this.form5.get('subhead1').setValue(`${this.c}`)
        this.form5.get('MasterCode1').setValue(this.m)
        this.form5.get('usermastercode').setValue(`${this.e}`)
        this.form5.get('SubMasterCode1').setValue(this.m1)
        this.form5.get('usersubcode').setValue(`${this.b}`)
        this.form5.get('SubCode1').setValue(`${this.a}`)

        this.form1.get('itemcode').setValue(`${this.b}`)

        // console.log(res)
        // console.log(this.b)
        // console.log(this.e)

      },
      error => {
        console.log(error);
      }
    );
  }


  // for ive subheads
  newi() {
    this.productservice.disnewitemcode().then(
      res => {
        this.newitems = res


        this.m=res.MasterCode1 + 1
        this.a =  1
        this.c = res.SubHeadCode + '.' + this.m
        this.f = res.SubHeadCode + '.' + this.m + '.' + 1
        this.e = res.SubHeadCode + '.' + this.m + '.' + 1 + '.' + 1
        this.b =  res.SubHeadCode + '.' + this.m + '.' + 1 + '.' + 1 + '.' + this.a
        this.form1.get('mastercode').setValue(`${this.c}`)
        this.form1.get('mastercode1').setValue(this.m)
        this.form1.get('submastercode').setValue(`${this.f}`)
        this.form1.get('submastercode1').setValue(1)
        this.form1.get('subcode').setValue(`${this.e}`)
        this.form1.get('subcode1').setValue(1)
        this.form1.get('ssubcode').setValue(`${this.b}`)
        this.form1.get('ssubcode1').setValue(`${this.a}`)

        this.form1.get('itemcode').setValue(`${this.b}`)


      },
      error => {
        console.log(error);
      }
    );
  }

  //for5 subheads
  newi1() {
    this.productservice.disnewitemcode1().then(
      res => {
        this.newitems = res


        this.m=res.MasterCode1 + 1
        this.a =  1
        this.c = res.SubHeadCode + '.' + this.m
        this.f = res.SubHeadCode + '.' + this.m + '.' + 1
        this.e = res.SubHeadCode + '.' + this.m + '.' + 1 + '.' + 1
        this.b =  res.SubHeadCode + '.' + this.m + '.' + 1 + '.' + 1 + '.' + this.a
        this.form5.get('subhead1').setValue(`${this.c}`)
        this.form5.get('MasterCode1').setValue(this.m)
        this.form5.get('usermastercode').setValue(`${this.f}`)
        this.form5.get('SubMasterCode1').setValue(1)
        this.form5.get('usersubcode').setValue(`${this.e}`)
        this.form5.get('SubCode1').setValue(1)
        this.form5.get('userssubcode').setValue(`${this.b}`)
        this.form5.get('SSubCode1').setValue(`${this.a}`)

        this.form5.get('itemcode').setValue(`${this.b}`)


      },
      error => {
        console.log(error);
      }
    );
  }







  //get unit
  units() {
    this.productservice.units().then(
      res => {
        this.unitss = res
        // console.log(res)
      },
      error => {
        console.log(error);
      }
    );

  }





  //partial submit
  subpar() {
    // console.log(this.form1.value)

    this.productservice.subp(this.form1.value).toPromise()
      .then(
        res => {
          this.subheaddesc = res._id.qw
          this.form1.get('subheaddes').setValue(`${this.subheaddesc}`)

          // console.log(res)


        },
        error => {
          console.log(error);
        })
  }



  description(event){
    // console.log(event.target.value)
    if (this.form1.get('summa').value == 'x.x') {
      this.masterdes = this.form1.get('description').value
      this.form1.get('masterdesc').setValue(`${this.masterdes}`)
      // this.subpar()
    }
    else if (this.form1.get('summa').value == 'x.x.x') {
      this.masterdes = this.form1.get('description').value
      this.form1.get('submasterdesc').setValue(`${this.masterdes}`)
      // this.subpar()
    }

    else if (this.form1.get('summa').value == 'x.x.x.x') {
      this.masterdes = this.form1.get('description').value
      this.form1.get('subdesc').setValue(`${this.masterdes}`)
      // this.subpar()
    }

    else if (this.form1.get('summa').value == 'x.x.x.x.x') {
      this.masterdes = this.form1.get('description').value
      this.form1.get('ssubdesc').setValue(`${this.masterdes}`)
      // this.subpar()
    }

   
  }


  
  ss11(event){
  
    console.log(event.target.value)
    if(event.target.value==""){
      this.form1.get('newunit').setValue("")
    }
    else{
    
    }
  }
  ss12(event){
    this.but=true
    console.log(event.target.value)
    if(event.target.value==""){
      this.form5.get('newunit').setValue("")
    }
    else{
  
    }
  }
  
  other(event){
  // console.log(event.value)
  if(event.value=="undefined"||event.value==""||event.value==null){
    this.form1.get('newunit').setValue("")
    this.form1.get('newunit').setValidators([Validators.required,Validators.pattern('[a-zA-Z ]*$')])
    this.addnewunit = true;
    // this.subpar()
  }
  else {
    this.form1.get('newunit').clearValidators()
    this.addnewunit = false;
    // this.subpar()
  }
}


others (event){
  if(event.value=="undefined"||event.value==""||event.value==null){
    this.form5.get('newunit').setValue("")
    this.form5.get('newunit').setValidators([Validators.required,Validators.pattern('[a-zA-Z ]*$')])
    this.addnewunit = true;
    // this.subpar()
  }
  else {
    this.form5.get('newunit').clearValidators()
    this.addnewunit = false;
    // this.subpar()
  }
}

  //adding units
  // adding(event) {
  //   console.log(this.form1.get('summa').value)
   
  // }

  vv() {
    // console.log(this.form1.get('newunit').value)
    this.selectedFeatures = this.form1.get('newunit').value
    // console.log(this.selectedFeatures)

    const newLocal =  {_id: this.selectedFeatures };
 
    this.rt = this.unitss.push(newLocal);
  
    this.form1.get('unitval').setValue(null)
    // console.log(this.unitss)
    this.addnewunit=false

   
  }

  sube() {

    {
      // console.log(this.form1.value)

      this.productservice.savenewtwo(this.form1.value)
        .toPromise().then(response => {
          // console.log('Success!', response)
          this.notification.success(response.msg);
this.hide=false
        },

          error => { console.error('Error!', error) }
        )


    }
  }


  //view standard and new items sr for submitting threee year,civ,username

  submitandview(event) {
    // console.log(event.value)

    
      // console.log(this.form2.value)
      this.productservice.usersub(this.form2.value)
        .toPromise()
        .then(
          res => {

            // console.log(res)
          
            if(res!=""){  console.log(res)
              this.newsub = res
             
              
            }
              else{
                this.newsub=res
              }
            
          },
          error => {
            console.log(error);
          })
          if(event.value!=""||undefined){
            this.submitandget()
            
                      }
                      else{
                        this.edittab=false
                      }
    
  }


  submitandget() {


    // console.log(this.form2.value)

    this.productservice.newuseradddata(this.form2.value)
      .toPromise()
      .then(
        res => {
          if(res!=""){
            this.bala = res
            this.listData = new MatTableDataSource(this.bala);
            this.edittab=true
          }
          else{
            this.bala = res
          }
         
          // console.log(res)

        },
        error => {
          console.log(error);
        })
  }


  //

  submit(event) {

    
      // console.log(this.form3.value)
      this.productservice.usersub(this.form3.value)
        .toPromise()
        .then(
          res => {
if(res!=""){  
  // console.log(res)
  this.newsub = res
 
  
}
  else{
    this.newsub=res
  }
           
          },
          error => {
            console.log(error);
          })
          console.log(event.value)
          if(event.value!=""||undefined){
this.submitget()

          }
          else{
            this.edittab=false
          }
    
  }


  submitget() {


    // console.log(this.form3.value)

    this.productservice.newuseradddata(this.form3.value)
      .toPromise()
      .then(
        res => {
          if(res!=""){
          this.bala = res
          this.listData = new MatTableDataSource(this.bala);
          this.edittab=true
          // console.log(res)
          }
          else{
            this.bala = res
            this.listData = new MatTableDataSource(this.bala);
            this.edittab=true
          }

        },
        error => {
          console.log(error);
        })
  }


  onSelect(element) {
    // console.log(element)
    this.productservice.newuserup(element)
      .toPromise()
      .then(
        res => {
          // console.log(res)
        },
        error => {
          console.log(error);
        })
    this.opendialog()
  }


  onSelectdelete(element) {
    // console.log(element._id)
    this.deletedata=element._id
    this.deleteform.get('_id').setValue(`${this.deletedata}`)
    if(confirm('Are you sure to delete this record ?')){
      this.productservice.deletenew(this.deleteform.value._id)
     .toPromise()
      .then(
        res => {
          // console.log(res)
          this.notification.warn('! Deleted successfully');
          // this.submit()
          this.submitget()
        },
        error => {
          console.log(error);
        })
     
      
    }}

    //View Standard And New Item Of Construction

  getingstandardsub(event) {
// console.log(this.form4.value)
this.productservice.newusersub(this.form4.value)
      .toPromise()
      .then(
        res => {
          if(res!=""){  
            console.log(res)
            this.newstandsub = res
                 
            
          }
            else{
              this.newstandsub = res
        
            }
          
          
         },
        error => {
          console.log(error);
        })
        if(event.value!=""||event.value!=undefined||event.value!=null){
          this.submitandshowing()
          
                    }
                    else if(event.value==""||event.value==undefined||event.value==null){
                      this.edittab=false
                      
                    }
                    else{

                    }
              
       
  }

  submitandshowing(){
    // console.log(this.form4.value)
    this.productservice.standnew(this.form4.value)
    .toPromise()
    .then(
      res => {
        if(res!=""){
        this.stanandnew=res
        this.listData = new MatTableDataSource(this.stanandnew);
        this.edittab=true
      }
        else{
          // this.stanandnew=res
          // this.listData = new MatTableDataSource(this.stanandnew);
          // this.edittab=true
        }
  console.log(res)
       },
      error => {
        console.log(error);
      })
     
}

//add new under items under subhed
getsub(event) {
  this.underexists2=false
              this.underexists3=false
              this.underexists4=false
              this.underexists5=false
 this.point=false
 this.threesub=false
 this.tit=false
 this.imp=false
  // console.log(event.value)

  this.productservice.undersubhead(this.form5.value)
        .toPromise()
        .then(
          res => {
            this.under = res
            if(res!==""){
              // this.underexists2=true
            
            
            
              this.form5.get('description').reset()
              this.form5.get('usersubheaddes').reset()
              this.form5.get('subhead1').reset()
              this.form5.get('MasterCode1').reset()
              this.form5.get('MasterDesc').reset()
              this.form5.get('usermastercode').reset()
              this.form5.get('SubMasterCode1').reset()
              this.form5.get('SubMasterDesc').reset()
              this.form5.get('usersubcode').reset()
              this.form5.get('SubCode1').reset()
              this.form5.get('SubDesc').reset()
              this.form5.get('userssubcode').reset()
              this.form5.get('SSubCode1').reset() 
              this.form5.get('SSubDesc').reset()
              this.form5.get('unitval').reset()
              this.form5.get('unit').reset()
              this.form5.get('rate').reset()
              this.form5.get('itemcode').reset()
              this.form5.get('newunit').reset()
              this.form5.get('summa').reset()
              this.form5.get('summa1').reset()

              if(event.value ==""||event.value ==undefined){
                this.underexists2=false
                 }
                 else if( this.form5.get('usersubhead').value!="" ||  this.form5.get('usersubhead').value!=null ){
 this.getsub1(event)
 this.underexists2=true    
 this.allsub=false
              }
     
              
            }
            else if(res==""){
              this.underexists2=false
              this.underexists3=false
              this.underexists4=false
              this.underexists5=false
              this.point=false
              this.tit=false
              this.imp=false
            }
            // console.log(this.under )
           },
          error => {
            console.log(error);
          })

                 
    }

//first subhead





    getsub1(event) {
      this.form5.controls['summa'].reset()
      this.but=true
if(event.value=="newitem"){
 
  this.disableSelect1=false
  this.disableSelect2=true
  this.disableSelect3=true
  this.disableSelect4=true
  console.log('this')

  this.form5.controls['summa1'].reset()
  this.underexists3=false
  this.underexists4=false
  this.underexists5=false
  this.threesub=false
  this.foursub=false
  this.fivesub=false
  this.point=false
  this.allsub=true
  this.tit=false;

  

}
else{ 
  this.form5.get('summa1').reset()
  this.allsub=false

      this.underexists4=false
      this.underexists5=false
      this.fivesub=false
      this.foursub=false
      this.form5.get('usermastercode').reset()
      this.threesub=false
      this.foursub=false
      this.fivesub=false
      this.imp=false
      this.tit=false
      this.point=false
      
            // console.log(event.value)
      // console.log(this.form5.value)

     


      this.productservice.undersubhead1(this.form5.value)
            .toPromise()
            .then(
              res => {
              console.log(res)
             
                  this.under1 = res
                  if(res!=""){
                  
                  
  
  if(event.value==""||event.value==undefined){
    console.log(event.value)
    this.underexists3=false
  }else if(this.form5.get('subhead1').value!="" ||  this.form5.get('subhead1').value!=null ||  this.form5.get('subhead1').value!=undefined){
    this.underexists3=true
    this.getsub2(event)
  }




}
else if(res==""){
   this.underexists2=false
              this.underexists3=false
              this.underexists4=false
              this.underexists5=false
              this.point=false
              this.tit=false
              this.imp=false
}

                
                // console.log(this.under1 )
               },
              error => {
                console.log(error);
              })  

             
        }}

       //second(mastercode)
    getsub2(event) {
      if(event.value=="newitem"){
        console.log('this')
        this.disableSelect1=true
        this.disableSelect2=false
        this.disableSelect3=true
        this.disableSelect4=true

        this.form5.controls['summa1'].reset()
        this.underexists3=false
        this.underexists4=false
        this.underexists5=false
        this.threesub=false
        this.foursub=false
        this.fivesub=false
        this.point=false
        this.allsub=true
      }
      else{ 
        this.allsub=false
      this.underexists5=false
      this.fivesub=false
      this.form5.get('usersubcode').reset()
    //   console.log(event.value)
    //  console.log( this.form5.get('subhead1').value)

      this.productservice.undersubhead2(this.form5.value)
            .toPromise()
            .then(
              res => {
                this.under2=res
                // console.log(res)
if(res==""){
  this.underexists3=false
 
}


              if(event.value==""||event.value==undefined){
                  this.underexists3=false
                  this.imp=false
               
              this.point=true
              this.tit=false
              this.threesub=false
              this.foursub=false
              this.fivesub=false
                }
               if( this.form5.get('subhead1').value!=null   && res==""){
                  this.tit=true
                  this.title1="ADD SUBHEADS"
                  this.point=true
               }
                   if(this.form5.get('usermastercode').value!=null   && res!=""){
              this.underexists5=false
              this.tit=false
              this.title1=""
              this.point=false
              this.imp=false
              this.threesub=false
              this.foursub=false
              this.fivesub=false
              this.getsub3(event)
           
                  this.form5.get('summa').reset()
                
                 
                }
               




               
              },
              error => {
                console.log(error);
              })
            }
          }
             
        
        

 //second(mastercode)
 getsub3(event) {
  if(event.value=="newitem"){
    console.log('this')
    this.disableSelect1=true
    this.disableSelect2=true
   this.disableSelect3=false
    this.disableSelect4=true

    this.form5.controls['summa1'].reset()
    this.underexists3=false
    this.underexists4=false
    this.underexists5=false
    this.threesub=false
    this.foursub=false
    this.fivesub=false
    this.point=false
    this.allsub=true
  }
  else{ 
    this.allsub=false

  this.underexists5=false
  this.fivesub=false
  this.form5.get('userssubcode').reset()
  this.fivesub=false
  this.tit=false
  //  console.log(event.value)

this.productservice.undersubhead3(this.form5.value)
        .toPromise()
        .then(
          res => {
        
            if(res ==""){
               this.underexists4=false
               this.under3=res
               if(this.form5.get('usermastercode').value!=null   && res==""){
                this.tit=true
                this.title1="ADD SUBHEADS"
                this.threesub=true
                this.point=false
                    this.foursub=false
                    this.fivesub=false
                this.imp=false
               
               
              }
             
            
            }if(res!=""){
             
              this.under3=res
              this.underexists4=true
            }

if(this.form5.get('usersubcode').value!=null   && res!=""){
 
              // this.tit=false
              // this.title1=""
              // this.point=false
              // this.imp=false
              // this.threesub=false
            
              this.getsub4(event)


}
           
            
            
           
           







            // console.log(this.under3 )





            
           },
          error => {
            console.log(error);
          })
        }
        
      }


    getsub4(event) {
      // if(event.value=="newitem"){
      //   console.log('this')
      //   this.disableSelect1=true
      //   this.disableSelect2=true
      //  this.disableSelect3=true
      //   this.disableSelect4=false
        
      //   this.form5.controls['summa1'].reset()
      //   this.underexists3=false
      //   this.underexists4=false
      //   this.underexists5=false
      //   this.threesub=false
      //   this.foursub=false
      //   this.fivesub=false
      //   this.point=false
      //   this.allsub=true
      // }
      // else{ 
      //   this.allsub=false
      
      this.underexists5=true
//  console.log('1')
//  console.log(event.value)
      this.form5.get('usersubcode').value
     
     
      this.productservice.undersubhead4(this.form5.value)
            .toPromise()
            .then(
              res => {
                this.under4=res
             
                if(res=""){
this.underexists5=false
                }    
if(this.form5.get('usersubcode').value!=null && this.under4==""){
  // console.log('gfxgfggghhhhhhhhhhhhhhhh')
  this.underexists5=false
  this.tit=true
  this.title1="ADD SUBHEADS"
  this.threesub=false
  this.point=false
      this.foursub=true
      this.fivesub=false
  this.imp=false
  this.form5.get('summa').reset()
  }
   
//  if(res!=""){
//     this.underexists5=true
//     this.tit=true
//     this.title1="ADD SUBHEADS"
//     this.threesub=false
//     this.point=false
//         this.foursub=false
//         this.fivesub=true
//     this.imp=false
//   }
  if(this.form5.get('userssubcode').value!=null && this.under4!=""){
    this.tit=true
    this.title1="ADD SUBHEADS"
    this.threesub=false
    this.point=false
        this.foursub=false
        this.fivesub=true
    this.imp=false
    this.form5.get('summa').reset()
  }



                





                // console.log(this.under4 )
               },
              error => {
                console.log(error);
              })
             
        }
    





        
        Addsubheads(event): void {  // event will give you full breif of action
          this.form5.get('description').setValue('')
  this.form5.get('unitval').setValue('')
  this.form5.get('unit').setValue('')
  this.form5.get('rate').setValue('')
  this.form5.get('itemcode').setValue('')
  this.form5.get('newunit').setValue('')
  this.form5.get('summa1').setValue('')
          const newVale = event.value;
          // console.log(event.value)
          // console.log(newVale);
          if (newVale == "x.x") {
          
           
            this.form5.get('usermastercode').setValue('')
            this.form5.get('SubMasterCode1').setValue(0)
            this.form5.get('SubMasterDesc').setValue('')
            
         this.form5.get('usersubcode').setValue('')
          this.form5.get('SubCode1').setValue(0)
          this.form5.get('SubDesc').setValue('')
   
        
    
          this.form5.get('userssubcode').setValue('')
          this.form5.get('SSubCode1').setValue(0)
          this.form5.get('SSubDesc').setValue('')
        
            // console.log(this.form5.value)


this.su2()
this.su2l()

//x.x.x.
this.threesub=false 
this.foursub=false 
this.fivesub=false 
this.point=true
this.imp=true
this.showrate=false


this.but=true
//
            
           
      
      
          }
          else if (newVale == "x.x.x") {
      //   console.log(this.form5.value)
      //   this.form5.get('usersubcode').setValue('')
      //   this.form5.get('SubCode1').setValue(0)
      //   this.form5.get('SubDesc').setValue('')
      //  this.form5.get('userssubcode').setValue('')
      //   this.form5.get('SSubCode1').setValue(0)
      //   this.form5.get('SSubDesc').setValue('')
        this.productservice.sxxx(this.form5.value).toPromise() .then(
          res => { 
            // console.log(res)
          
            this.form5.get('usersubheaddes').setValue(`${res[0].SubHeadDes}`)
            this.form5.get('MasterCode1').setValue(`${res[0].MasterCode1}`)
           this.form5.get('MasterDesc').setValue(`${res[0].MasterDesc}`)
                
         this.form5.get('usersubcode').setValue('')
          this.form5.get('SubCode1').setValue(0)
          this.form5.get('SubDesc').setValue('')
   
        this.form5.get('userssubcode').setValue('')
          this.form5.get('SSubCode1').setValue(0)
          this.form5.get('SSubDesc').setValue('')

     
            this.form5.get('ulength').setValue(`${res[0].ulength}`)
            this.form5.get('ubreadth').setValue(`${res[0].ubreadth}`)
            this.form5.get('uheight').setValue(`${res[0].uheight}`)
            if(res!=""){
              this.ab()
            this.imp=true
            this.but=true
            }
          
          },
          err=>{console.log(err)})
          
        
      
      
      
          
          
            this.second = true;
            this.first = false;
            this.third = false;
            this.fourth = false;

            // this.threesub=true 
            // this.foursub=false 
            // this.fivesub=false 
            // this.point=false 
      
      
          }
          else if (newVale == "x.x.x.x") {
          
         
            this.productservice.sxxxx(this.form5.value).toPromise() .then(
              res => { 
                this.form5.get('usersubheaddes').setValue(`${res[0].SubHeadDes}`)
                this.form5.get('MasterCode1').setValue(`${res[0].MasterCode1}`)
               this.form5.get('MasterDesc').setValue(`${res[0].MasterDesc}`)

               this.form5.get('SubMasterCode1').setValue(`${res[0].SubMasterCode1}`)
              this.form5.get('SubMasterDesc').setValue(`${res[0]. SubMasterDesc}`)

        
       
            this.form5.get('userssubcode').setValue('')
              this.form5.get('SSubCode1').setValue(0)
              this.form5.get('SSubDesc').setValue('')
    
         
                this.form5.get('ulength').setValue(`${res[0].ulength}`)
                this.form5.get('ubreadth').setValue(`${res[0].ubreadth}`)
                this.form5.get('uheight').setValue(`${res[0].uheight}`)
               
                // console.log(res)
                if(res!=""){
                  this.bc()
                  this.imp=true
                  this.but=true
                }
              
          },
              err=>{console.log(err)})
    


            
            this.threesub=false 
            this.foursub=true 
            this.fivesub=false 
            this.point=false 
      
          }
      
          else if (newVale == "x.x.x.x.x") {
            
            this.threesub=false 
            this.foursub=false 
            this.point=false 
            this.fivesub=true 

           
            this.productservice.sxxxxx(this.form5.value).toPromise() .then(
              res => { 
                this.form5.get('usersubheaddes').setValue(`${res[0].SubHeadDes}`)
                this.form5.get('MasterCode1').setValue(`${res[0].MasterCode1}`)
               this.form5.get('MasterDesc').setValue(`${res[0].MasterDesc}`)

               this.form5.get('SubMasterCode1').setValue(`${res[0].SubMasterCode1}`)
              this.form5.get('SubMasterDesc').setValue(`${res[0]. SubMasterDesc}`)

        
       
           
              this.form5.get('SubCode1').setValue(`${res[0].SubCode1}`)
              this.form5.get('SubDesc').setValue(`${res[0].SubDesc}`)
    
         
                this.form5.get('ulength').setValue(`${res[0].ulength}`)
                this.form5.get('ubreadth').setValue(`${res[0].ubreadth}`)
                this.form5.get('uheight').setValue(`${res[0].uheight}`)
               
                // console.log(res)
                if(res!=""){
                  this.cd()
          this.imp=true
          this.but=true
                }
              
          },
              err=>{console.log(err)})
    





            
      
      
      
          }

          else if(event.value="select"){
            
            this.but=false
            this.imp=false

          }
      
        }


        description1(event){
      
          console.log(event.target.value)
          // console.log(this.form5.get('summa').value )
          if ((this.form5.get('summa').value ||this.form5.get('summa1').value) == 'x.x') {
            this.masterdes = event.target.value
            this.form5.get('MasterDesc').setValue(`${this.masterdes}`)
            // this.subpar()
          }
          else if ((this.form5.get('summa').value ||this.form5.get('summa1').value) == 'x.x.x') {
            this.masterdes = this.form5.get('description').value
            this.form5.get('SubMasterDesc').setValue(`${this.masterdes}`)
            // this.subpar()
          }
      
          else if ((this.form5.get('summa').value ||this.form5.get('summa1').value) == 'x.x.x.x') {
            this.masterdes = this.form5.get('description').value
            this.form5.get('SubDesc').setValue(`${this.masterdes}`)
            // this.subpar()
          }
      
          else if ((this.form5.get('summa').value ||this.form5.get('summa1').value) == 'x.x.x.x.x') {
            this.masterdes = this.form5.get('description').value
            this.form5.get('SSubDesc').setValue(`${this.masterdes}`)
            // this.subpar()
          }
      
         
        }

               form5resteting(){
          this.form5.get('usersubhead').setValue(0)
              this.form5.get('description').reset()
              this.form5.get('usersubheaddes').reset()
              this.form5.get('subhead1').reset()
              this.form5.get('MasterCode1').setValue(0)
              this.form5.get('MasterDesc').reset()
              this.form5.get('usermastercode').reset()
              this.form5.get('SubMasterCode1').setValue(0)
              this.form5.get('SubMasterDesc').reset()
              this.form5.get('usersubcode').reset()
              this.form5.get('SubCode1').setValue(0)
              this.form5.get('SubDesc').reset()
              this.form5.get('userssubcode').reset()
              this.form5.get('SSubCode1').setValue(0)
              this.form5.get('SSubDesc').reset()
              this.form5.get('unitval').reset()
              this.form5.get('unit').reset()
              this.form5.get('rate').reset()
              this.form5.get('itemcode').reset()
              this.form5.get('newunit').reset()
              this.form5.get('summa').reset()
              this.form5.get('summa1').reset()

              


this.but=true
this.b=''
this.imp=false
this.point=false
this.threesub=false
this.fivesub=false
this.foursub=false
this.underexists2=false
this.underexists3=false
this.underexists4=false
this.underexists5=false
this.tit=false
this.allsub=false
this.showrate=false
        }
  
 

        addingdsd(event) {
          // console.log(this.form5.get('summa').value)
          if (this.form5.get('summa').value == 'x.x') {
            this.masterdes = this.form5.get('description').value
            // console.log( this.masterdes)
            this.form5.get('MasterDesc').setValue(`${this.masterdes}`)
         
          }
          else if (this.form5.get('summa').value == 'x.x.x') {
            this.masterdes = this.form5.get('description').value
            this.form5.get('SubMasterDesc').setValue(`${this.masterdes}`)
            
          }
      
          else if (this.form5.get('summa').value == 'x.x.x.x') {
            this.masterdes = this.form5.get('description').value
            this.form5.get('SubDesc').setValue(`${this.masterdes}`)
            
          }
       
          else if (this.form5.get('summa').value == 'x.x.x.x.x') {
            this.masterdes = this.form5.get('description').value
            this.form5.get('SSubDesc').setValue(`${this.masterdes}`)
            
          }
      
          // console.log(event.target.value)
          if (event.target.value == "others") {
            this.form5.get('unitval').setValue(null)
            this.addnewunit = true;
            
          }
          
        }
      
        vv1() {
        
          this.selectedFeatures = this.form5.get('newunit').value
     
          const newLocal = { _id: this.selectedFeatures };
           this.rt = this.unitss.push(newLocal);
       
          this.form5.get('unitval').setValue(null)
         this.addnewunit=false
         
        }
        code(event){
          if(event!=""){
            // this.code()
            console.log(event)
            this.showrate=true
              }
              else{
                this.showrate=false
              }
        }
      
        
      
 
        su2(){
          this.productservice.sub2(this.form5.value)
          .toPromise()
          .then(
            res => {
       console.log(res )
         this.form5.get('usersubhead').setValue(`${res[0].SubHeadCode}`)
         this.form5.get('usersubheaddes').setValue(`${res[0].SubHeadDes}`)
        //  this.form5.get('subhead1').setValue(`${res[0].MasterCode}`)
  
        this.form5.get('MasterCode1').setValue(`${res[0].MasterCode1}`)
        this.form5.get('MasterDesc').setValue(`${res[0].MasterDesc}`)
  
    
  
         this.form5.get('ulength').setValue(`${res[0].ulength}`)
         this.form5.get('ubreadth').setValue(`${res[0].ubreadth}`)
         this.form5.get('uheight').setValue(`${res[0].uheight}`)
        
    //  console.log(res[0].SubHeadCode)
  
  
  
             },
            error => {
              console.log(error);
            })
          }
          su2l(){
            this.productservice.sub2l(this.form5.value)
          .toPromise()
          .then(
            res => {
        //       console.log(res )
        //  console.log(res.MasterCode1 )
         this.a = res.MasterCode1 + 1
         this.b = res.SubHeadCode + '.' + this.a
        //  console.log(this.a)
        //  console.log(this.b)
         this.form5.get('MasterCode1').setValue(`${this.a}`)
                this.form5.get('itemcode').setValue(`${this.b}`)
                this.form5.get('subhead1').setValue(`${this.b}`)
  
        //  console.log(res.Itemcode)
  
             },
            error => {
              console.log(error);
            })
  
          }




  reset() {

    this.form1.controls['subheads'].reset()
    this.form1.controls['subheaddes'].reset()
    this.form1.controls['mastercode'].reset()
    this.form1.controls['mastercode1'].reset()
    this.form1.controls['masterdesc'].reset()
    this.form1.controls['description'].reset()
    this.form1.controls['unitval'].reset()
    this.form1.controls['unit'].reset()
    this.form1.controls['rate'].reset()
    this.form1.controls['itemcode'].reset()
    this.form1.controls['summa'].reset()
    this.hide=true
    this.disi=false;
    this.b=''
    this.e=''
    this.c=''
    this.f=''
    this.units()
    

      this.form1.get('mastercode').setValue('')
      this.form1.get('mastercode1').setValue(0)
      this.form1.get('masterdesc').setValue('')
      this.form1.get('submastercode').setValue('')
      this.form1.get('submastercode1').setValue(0)
      this.form1.get('submasterdesc').setValue('')
      this.form1.get('subcode').setValue('')
      this.form1.get('subcode1').setValue(0)
      this.form1.get('subdesc').setValue('')
      this.form1.get('ssubcode').setValue('')
      this.form1.get('ssubcode1').setValue(0)
      this.form1.get('ssubdesc').setValue('')
      this.form1.get('description').setValue('')
      this.form1.get('unitval').setValue('')
      this.form1.get('unit').setValue('')
      this.form1.get('rate').setValue(0)
this.step1=false
this.disi=false
this.newone=false
this.second=false
this.second=false
this.third=false
this.fourth=false
this.main=false
this.addnewunit=false
  }



  sa(){
  // console.log( this.form5.value)
  this.productservice.savex(this.form5.value).toPromise().then(response => {
    console.log('Success!', response)
    this.notification.success(response.msg);
this.but=false
  },

    error => { console.error('Error!', error) }
  )

  }





ab(){
  this.productservice.sxxxl(this.form5.value).toPromise().then(
    res => {
      console.log(res)
      this.newitems = res.Itemcode
      this.a = res._id.submastercode1+1
      this.c = res._id.subheadcode + '.' + res._id.mastercode1+'.'+this.a
 
      this.form5.get('SubMasterCode1').setValue(`${this.a}`)
      // this.form5.get('mastercode1').setValue(res.MasterCode1)
      // this.form5.get('submastercode').setValue(`${this.b}`)
      this.form5.get('usermastercode').setValue(`${this.c}`)
      this.form5.get('itemcode').setValue(`${this.c}`)

      this.b=this.c
      // console.log(res._id.submastercode1+1)
      
    },
    error =>{console.log(error)})

}



bc(){
  this.productservice.sxxxxl(this.form5.value).toPromise().then(
    res => {
      console.log(res)
      this.newitems = res.Itemcode
      this.a = res._id.subcode1+1
      this.c = res._id.subheadcode + '.' + res._id.mastercode1+'.'+res._id.submastercode1+'.'+this.a
 
      this.form5.get('SubCode1').setValue(`${this.a}`)
  
      this.form5.get('usersubcode').setValue(`${this.c}`)
      this.form5.get('itemcode').setValue(`${this.c}`)

      this.b=this.c
      // console.log(res._id.submastercode1+1)
      
    },
    error =>{console.log(error)})

}


cd(){

  this.productservice.sxxxxxl(this.form5.value).toPromise().then(
    res => {
      console.log(res)
      this.newitems = res.Itemcode
      this.a = res._id.ssubcode+1
      this.c = res._id.subheadcode + '.' + res._id.mastercode1+'.'+res._id.submastercode1+'.'+res._id.subcode1+ '.' + this.a
      // console.log(this.a)
      
 
      this.form5.get('SSubCode1').setValue(`${this.a}`)
  
      this.form5.get('userssubcode').setValue(`${this.c}`)
      this.form5.get('itemcode').setValue(`${this.c}`)

      this.b=this.c
      // console.log(res._id.submastercode1+1)
      
    },
    error =>{console.log(error)})

}









xsubheads1(event){
 this.new1 = event.value;
 console.log(this.new1)
  // console.log(this.form5.value)
  if(this.new1 =="x.x"){
    this.xx()
    this.desxx=true
    this.desxxx=false
    this.desxxxx=false
    this.desxxxxx=false

 }
 else if( this.new1=="x.x.x"){
  this.desxxx=true
  this.desxx=false
  this.desxxxx=false
  this.desxxxxx=false
  this.xxx()
 }
 else if( this.new1=="x.x.x.x"){
  this.desxxxx=true
  this.desxx=false
  this.desxxx=false
  this.desxxxxx=false
  this.xxxx()
 }
 else if( this.new1=="x.x.x.x.x"){
  this.desxxxx=false
  this.desxx=false
  this.desxxx=false
  this.desxxxxx=true
  this.xxxxx()
 }
 else if(this.new1=="" || this.new1==null || this.new1==undefined ){
   this.imp=false
 }


}


//for x.x in abb new items in under existing
xx(){
  
  // this.form5.get('usersubheaddes').setValue('')
  // this.form5.get('subhead1').setValue('')
  this.form5.get('MasterCode1').setValue(0)
  this.form5.get('MasterDesc').setValue('')
  this.form5.get('usermastercode').setValue('')
  this.form5.get('SubMasterCode1').setValue(0)
  this.form5.get('SubMasterDesc').setValue('')
  this.form5.get('usersubcode').setValue('')
  this.form5.get('SubCode1').setValue(0)
  this.form5.get('SubDesc').setValue('')
  this.form5.get('userssubcode').setValue('')
  this.form5.get('SSubCode1').setValue(0)
  this.form5.get('SSubDesc').setValue('')
  this.form5.get('SubDesc').setValue('')

  this.form5.get('description').setValue('')
  this.form5.get('unitval').setValue('')
  this.form5.get('unit').setValue('')
  this.form5.get('rate').setValue('')
  this.form5.get('itemcode').setValue('')
  this.form5.get('newunit').setValue('')
  this.form5.get('summa').setValue('')
  this.subpar1()
  this.newitem1()
this.imp=true


}


xxx(){
  console.log(this.form5.value)
  // this.ab()
  
  this.form5.get('description').setValue('')
  this.form5.get('unitval').setValue('')
  this.form5.get('unit').setValue('')
  this.form5.get('rate').setValue('')
  this.form5.get('itemcode').setValue('')
  this.form5.get('newunit').setValue('')
  this.form5.get('summa').setValue('')

  this.productservice.sxxx2(this.form5.value).toPromise() .then(
    res => { 
      // console.log(res)
    
      this.form5.get('usersubheaddes').setValue(`${res[0].SubHeadDes}`)
      this.form5.get('MasterCode1').setValue(`${res[0].MasterCode1}`)
     this.form5.get('MasterDesc').setValue(`${res[0].MasterDesc}`)
          
   this.form5.get('usersubcode').setValue('')
    this.form5.get('SubCode1').setValue(0)
    this.form5.get('SubDesc').setValue('')

  this.form5.get('userssubcode').setValue('')
    this.form5.get('SSubCode1').setValue(0)
    this.form5.get('SSubDesc').setValue('')


      this.form5.get('ulength').setValue(`${res[0].ulength}`)
      this.form5.get('ubreadth').setValue(`${res[0].ubreadth}`)
      this.form5.get('uheight').setValue(`${res[0].uheight}`)
      if(res!=""){
        this.ab()
      this.imp=true
      }
    
    },
    err=>{console.log(err)})








 
 


}
xxxx(){

   
  this.form5.get('description').setValue('')
  this.form5.get('unitval').setValue('')
  this.form5.get('unit').setValue('')
  this.form5.get('rate').setValue('')
  this.form5.get('itemcode').setValue('')
  this.form5.get('newunit').setValue('')
  this.form5.get('summa').setValue('')

  this.productservice.sxxxx2(this.form5.value).toPromise() .then(
    res => { 
      this.form5.get('usersubheaddes').setValue(`${res[0].SubHeadDes}`)
      this.form5.get('MasterCode1').setValue(`${res[0].MasterCode1}`)
     this.form5.get('MasterDesc').setValue(`${res[0].MasterDesc}`)

     this.form5.get('SubMasterCode1').setValue(`${res[0].SubMasterCode1}`)
    this.form5.get('SubMasterDesc').setValue(`${res[0]. SubMasterDesc}`)



  this.form5.get('userssubcode').setValue('')
    this.form5.get('SSubCode1').setValue(0)
    this.form5.get('SSubDesc').setValue('')


      this.form5.get('ulength').setValue(`${res[0].ulength}`)
      this.form5.get('ubreadth').setValue(`${res[0].ubreadth}`)
      this.form5.get('uheight').setValue(`${res[0].uheight}`)
     
      // console.log(res)
      if(res!=""){
        this.bc()
        this.imp=true
      }
    
},
    err=>{console.log(err)})

     // this.form5.get('MasterCode1').setValue(0)
  // this.form5.get('MasterDesc').setValue('')
  // this.form5.get('usermastercode').setValue('')
  // this.form5.get('SubMasterCode1').setValue(0)
  // this.form5.get('SubMasterDesc').setValue('')
  // this.form5.get('usersubcode').setValue('')
  // this.form5.get('SubCode1').setValue(0)
  // this.form5.get('SubDesc').setValue('')
  // this.form5.get('userssubcode').setValue('')
  // this.form5.get('SSubCode1').setValue(0)
  // this.form5.get('SSubDesc').setValue('')
  // this.form5.get('SubDesc').setValue('')

  // this.form5.get('description').setValue('')
  // this.form5.get('unitval').setValue('')
  // this.form5.get('unit').setValue('')
  // this.form5.get('rate').setValue('')
  // this.form5.get('itemcode').setValue('')
  // this.form5.get('newunit').setValue('')
  // this.form5.get('summa').setValue('')


  this.subpar1()
  // this.newit1()
}


xxxxx(){
   
  this.form5.get('description').setValue('')
  this.form5.get('unitval').setValue('')
  this.form5.get('unit').setValue('')
  this.form5.get('rate').setValue('')
  this.form5.get('itemcode').setValue('')
  this.form5.get('newunit').setValue('')
  this.form5.get('summa').setValue('')
  this.cd()
  this.imp=true
  // this.form5.get('MasterCode1').setValue(0)
  // this.form5.get('MasterDesc').setValue('')
  // this.form5.get('usermastercode').setValue('')
  // this.form5.get('SubMasterCode1').setValue(0)
  // this.form5.get('SubMasterDesc').setValue('')
  // this.form5.get('usersubcode').setValue('')
  // this.form5.get('SubCode1').setValue(0)
  // this.form5.get('SubDesc').setValue('')
  // this.form5.get('userssubcode').setValue('')
  // this.form5.get('SSubCode1').setValue(0)
  // this.form5.get('SSubDesc').setValue('')
  // this.form5.get('SubDesc').setValue('')

  // this.form5.get('description').setValue('')
  // this.form5.get('unitval').setValue('')
  // this.form5.get('unit').setValue('')
  // this.form5.get('rate').setValue('')
  // this.form5.get('itemcode').setValue('')
  // this.form5.get('newunit').setValue('')
  // this.form5.get('summa').setValue('')


  this.subpar1()
  // this.newi1()
}


subpar1() {
  console.log(this.form5.value)

  this.productservice.subp1(this.form5.value).toPromise()
    .then(
      res => {
        this.subheaddesc = res._id.qw
        this.form5.get('usersubheaddes').setValue(`${this.subheaddesc}`)
   console.log(res)
   if(res!=""){
    
   }else{}
      },
      error => {
        console.log(error);
      })
}


}












// getsub1() {
//   this.form5.controls['usermastercode'].reset()
// console.log(this.form5.value)



// this.ss=  this.form5.get('usersubhead').value
// console.log(this.ss)
// if(this.ss==undefined){
// this.underexists2=false

// console.log('bal')
// this.subheads=true
// this.titlesub2="Click SubHeads and select any one "
// }else{ 
// this.productservice.undersubhead1(this.form5.value)
//   .toPromise()
//   .then(
//     res => {
//       if(res!==""){
//         this.underexists2=true
//       this.underexists3=true
//       this.underexists4=false
//       this.underexists5=false
//         this.under1 = res
//     //   this.subdesc=res[0]._id.qws
//     //  this.form5.get('usersubheaddes').setValue(`${this.subdesc}`)
  
//       }
//       else if(res==""){
//         this.underexists2=false
//         this.underexists3=false
//         this.underexists4=false
//         this.underexists5=false
//         this.under1 = res
       
//       }
      
//       console.log(this.under1 )
//      },
//     error => {
//       console.log(error);
//     })  

   
// }}

// //second(mastercode)
// getsub2() {
// this.b=""
// this.fivesub=false
// this.desctosave=false
// this.point=false
// this.subheads=false
// console.log(this.form5.value)
// this.ss1=  this.form5.get('subhead1').value
// console.log(this.ss1)
// if(this.ss1==undefined){

// this.underexists3=false
// console.log('bal')
// this.subheads=true

// this.titlesub2="Click SubHead1 and select any one"
// }
// else { 

// this.productservice.undersubhead2(this.form5.value)
//   .toPromise()
//   .then(
//     res => {
  
//       if(res ==""){
//         this.threesub=false 
//         this.under2 = res
//         this.underexists3=false
//          this.underexists4=false
//          this.underexists5=false
//       // this.form5.get('subhead1').disable()
//      this. point=true
//      this.desctosave=true
//        this.title1="ADD SUBHEADS"
//        this.tit=true
//        this.new=true
//        this.form5.get('summa').reset()
       

//       }else if(res!=""){
//         this.tit=false
//         this.under2 = res
//         this.underexists2=true
//         this.underexists3=true
//         this.underexists4=true
    
//       }
//       console.log(this.under2 )
//      },
//     error => {
//       console.log(error);
//     })
//   }
   
// }


// //second(mastercode)
// getsub3() {
// this.fivesub=false
// this.b=""
// this.desctosave=false
// this.point=false
// this.subheads=false
// this.ss2=  this.form5.get('usermastercode').value
// console.log(this.ss2)
// if(this.ss2== undefined||this.ss2== null){
// this.subheads=true
// this.titlesub2="Click SubHead2 and select any one"
// this.underexists4=false

// }
// else{ 

// this.productservice.undersubhead3(this.form5.value)
// .toPromise()
// .then(
// res => {

//   if(res ==""){
    
//     this.threesub=true
//     this.tit=true
//    this.title1="ADD SUBHEADS"
//    this.underexists2=true
//    this.underexists3=true
//    this.underexists4=false
//    this.underexists5=false
//    this.new=true



//   }else if(res!=""){
  
//     this.under3 = res
//     this.underexists2=true
//     this.underexists3=true
//     this.underexists4=true
//     this.underexists5=true
//     this.tit=false
//   }
//   console.log(this.under3 )
//  },
// error => {
//   console.log(error);
// })
// }

// }


// getsub4() {
// this.fivesub=false
// this.b=""
// // console.log(event)
// // console.log(event.value)

// // console.log(this.form5.value)
// this.subheads=false
// this.desctosave=false
// this.ss3=  this.form5.get('usersubcode').value
// console.log(this.ss3)
// if(this.ss3== (undefined||null)){
// this.subheads=true
// this.titlesub2="Click SubHead3 and select any one"
// this.underexists5=false

// }
// else{ 
// this.productservice.undersubhead4(this.form5.value)
//   .toPromise()
//   .then(
//     res => {
  
//       if(res ==""){
        
      
//       this.point=false
//       this.threesub=false
//      this.fivesub=false
//      this.foursub=true
//      this.desctosave=true
//      this.tit=true
//         this.title1="ADD SUBHEADS"
//         this.underexists2=true
//         this.underexists3=true
//         this.underexists4=true
//         this.underexists5=false
//         this.new=true

//       }else if(res!=""){
      
//         this.under4 = res
//         this.underexists2=true
//         this.underexists3=true
//         this.underexists4=true
//         this.underexists5=true
//         this.fivesub=true
//         this.desctosave=true
//         this.title1="ADD SUBHEADS"
//         this.tit=true
//         this.new=true


    
//       }
//       console.log(this.under4 )
//      },
//     error => {
//       console.log(error);
//     })
   
// }
// }









