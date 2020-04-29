import { Injectable } from '@angular/core';
import{ HttpClient ,HttpErrorResponse} from '@angular/common/http';
import{Product} from './entites/product.entity'
import{RR} from './entites/rr'
// //http://localhost:3073/
//http://localhost:3073/
import{Su} from './entites/su'
import{Analysis} from './entites/analysis.entity';
import{throwError}from 'rxjs';
import{catchError}from'rxjs/operators';
import { Pr } from './entites/new.entity';
import{Rates} from './entites/rates.entity'
import { Rate } from './entites/rate.entity';
import { R } from './entites/r.entity';
import { Srhead } from './entites/srentity';
import { Radiorate } from './entites/radiorate.entity';
 import { Save } from './entites/savebasicrates.entity';
import { Cmpl } from './entites/basicratescmpl.entity';
// import{ BasicratesComponent}from'./basicrates/basicrates.component'
import { Cm } from './entites/newforrate.entity';
import { An } from './entites/descost.entity';
import{Try}from'./entites/try.entities'
import { saving } from './entites/sampo.enitity';
import { AnalysisfComponent } from './analysisf/analysisf.component';
import { login } from './entites/login.entity';
import { Add } from './entites/add.entity';
import { Srr } from './entites/srrr.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  constructor(   private httpClient:HttpClient) { }

    //rates dropdown for civil
   

    private elecdropdown:string='http://localhost:3073/api/appointmentform/elecdrop'
    private civdropdown:string='http://localhost:3073/api/appointmentform/civdrop'
//year(labour,material,plants,carriage of rates)
civdrop(){
  return this.httpClient.get(this.civdropdown).toPromise().then(res=>res as Product[]);
}
elecdrop(){
  return this.httpClient.get(this.elecdropdown).toPromise().then(res=>res as Product[]);
}
//*
//register(userdata)=>storing the civ and year(labour,material,plants,carriage of rates)
  
  private _url="http://localhost:3073/api/enroll";
register(userdata){
  return this.httpClient.post<any>(this._url,userdata);
}

// rates for all type 
private labour="http://localhost:3073/api/lobour";
private materials="http://localhost:3073/api/Materials";
private plant="http://localhost:3073/api/Plants";
private Carriage="http://localhost:3073/api/Carriage";
lab(){
  return this.httpClient.get(this.labour).toPromise().then(res=>res as Pr[]);
}
mat(){
  return this.httpClient.get(this.materials).toPromise().then(res=>res as Pr[]);
}
plants(){
  return this.httpClient.get(this.plant).toPromise().then(res=>res as Pr[]);
}
carr(){
  return this.httpClient.get(this.Carriage).toPromise().then(res=>res as Pr[]);
}
//*

// ***start**
// rates component
// rates component for subheads for elect and civil
private sr2007civdropdown:string="http://localhost:3073/api/sr2007civdrop";
private sr2007elecdropdown:string="http://localhost:3073/api/sr2007elecdrop";

srciv(){
  return this.httpClient.get(this.sr2007civdropdown).toPromise().then(res=>res as Product[]);
}
srelec(){
  return this.httpClient.get(this.sr2007elecdropdown).toPromise().then(res=>res as Product[]);
}








//register(userdata)=>storing the civ and year and subheads for sr2007 table
private url="http://localhost:3073/api/rate";
rate(userdata){
  return this.httpClient.post<any>(this.url,userdata);
}


//subheads dropdown from sr2007 for both civil and elect
private Civdroprate="http://localhost:3073/api/subhead";
dropciv(){
  return this.httpClient.get(this.Civdroprate).toPromise().then(res=>res as Rates[]);
}


//get method for rates from srtable
//table displaying in rates component
private subheaddes="http://localhost:3073/api/Subheaddes";
sub(){
  return this.httpClient.get(this.subheaddes).toPromise().then(res=>res as Rates[]);
}

// *********end rates component******


// *********start costbreakup component******
private senditemcode="http://localhost:3073/api/code"
sendcode(userdata){
  return this.httpClient.post<any>(this.senditemcode,userdata);
}
// *********start analysisf  component******
//heading for costbreakup (civil)
private heading ="http://localhost:3073/api/costciv";
headciv(){
  return this.httpClient.get(this.heading).toPromise().then(res=>res as Srhead[]);
}


//display records from analysisf 
private displayanalysis="http://localhost:3073/api/cbu1";
labo(){
  return this.httpClient.get(this.displayanalysis).toPromise().then(res=>res as Analysis[]);
}
//total for the above records
private tota="http://localhost:3073/api/cbtot";
newtot(){
  return this.httpClient.get(this.tota).toPromise().then(res=>res as Analysis[]);
}

// *********end analysisf  component******




// *********start mainpage component******
//getting all states from state table
private state="http://localhost:3073/api/state";

stateapi(){
  return this.httpClient.get(this.state).toPromise().then(res=>res as Analysis[]);
}
//registering data from new user
private newuser="http://localhost:3073/api/newuserreg"
registering(userdata){
  return this.httpClient.post<any>(this.newuser,userdata);
}



//check mail for new user
private email="http://localhost:3073/api/dispmail"
dispmail(){
  return this.httpClient.get(this.email).toPromise().then(
    res=>res as  Analysis[]);

}


private loggedIn=false;
private signin="http://localhost:3073/api/authlog"

login(UserName: string, Accesscode: string){
  return this.httpClient.post(this.signin,{UserName: UserName, password: Accesscode},{withCredentials: true}).toPromise().then(res => {
   this.loggedIn=(res as any).count == 1;
    return res;
   });
 }

 logout(): void{
  this.loggedIn = false;
 }

 isLoggedIn(): boolean{
  return this.loggedIn; }

// *********end mainpage component******

//  ***********Admin Component************

private temptableuser="http://localhost:3073/api/temp"
disptempuser(){
  return this.httpClient.get(this.temptableuser).toPromise().then(
    res=>res as  login[]);

}

//checking
private ne="http://localhost:3073/api/check"
check(userd){
  return this.httpClient.post<any>(this.ne,userd);
}
private neq="http://localhost:3073/api/check1"
check1(userd){
  return this.httpClient.post<any>(this.neq,userd);
}
private neq1="http://localhost:3073/api/check2"
check2(userd){
  return this.httpClient.post<any>(this.neq1,userd);
}

private neq2="http://localhost:3073/api/check3"
check3(userd){
  return this.httpClient.post<any>(this.neq2,userd);
}

// ********** end Admin component***





// ***********new item rates component*************

//getting the last ittemcode of sr2007 table
private getnewitemcode ="http://localhost:3073/api/newitemsr"
disnewitemcode(){
  return this.httpClient.get(this.getnewitemcode).toPromise().then(
    res=>res as  Product);

}

private getnewitemcode1 ="http://localhost:3073/api/newitemsr1"
disnewitemcode1(){
  return this.httpClient.get(this.getnewitemcode1).toPromise().then(
    res=>res as  Product);

}







private subpa ="http://localhost:3073/api/newitemsrsubpar"
subp(userd){
  return this.httpClient.post<any>(this.subpa,userd);

}
private subpa1 ="http://localhost:3073/api/newitemsrsubpar1"
subp1(userd){
  return this.httpClient.post<any>(this.subpa1,userd);

}


//getting unitvalue
private unit ="http://localhost:3073/api/newitemunit"
units(){
  return this.httpClient.get(this.unit).toPromise().then(
    res=>res as  Add[]);

}
// private unit1 ="http://localhost:3073/api/newitemunit1"
// units1(){
//   return this.httpClient.get(this.unit1).toPromise().then(
//     res=>res as  Add[]);

// }


//save for newitem rates for x.x

private savetwo ="http://localhost:3073/api/newitemssrsavetwo"
savenewtwo(userd){
  return this.httpClient.post<any>(this.savetwo,userd);

}

//getting user subheads
private usersubheads ="http://localhost:3073/api/userbubhead"
usersub(userd){
  return this.httpClient.post<any>(this.usersubheads,userd);

}


//posting subheads for required user and get the user entered data
private newuseraddeddata ="http://localhost:3073/api/newusersrdata"
newuseradddata(userd){
  return this.httpClient.post<any>(this.newuseraddeddata,userd);

}

//update operation for new item rtes
private uppost ="http://localhost:3073/api/newup"
newuserup(userd){
  return this.httpClient.post<any>(this.uppost,userd);

}

//getting the records and displaying in  updateitemsrates
private newdatadisplay ="http://localhost:3073/api/newdisplay"
newuserdata(){
  return this.httpClient.get(this.newdatadisplay).toPromise().then(
    res=>res as Srr);
  
}

//update new user data with usernaame
private updatenewuserdata="http://localhost:3073/api/updatedata";
 
updatenew(user){
  return this.httpClient.put(this.updatenewuserdata,user)
}

//delete new user data with usernaame

private deletenewuserdata="http://localhost:3073/api/deletedata/";
 
deletenew(id:string){
  return this.httpClient.delete(this.deletenewuserdata+id)
}

//get subheads for the standard and new itemform
private standardsub ="http://localhost:3073/api/stansub"
newusersub(userd){
  return this.httpClient.post<any>(this.standardsub,userd);

}

private standardnewdata ="http://localhost:3073/api/stanandnew"
standnew(userd){
  return this.httpClient.post<any>(this.standardnewdata,userd);

}


// add under existing items
private undersub ="http://localhost:3073/api/subheadunder"
undersubhead(userd){
  return this.httpClient.post<any>(this.undersub,userd);

}

private undersub1 ="http://localhost:3073/api/subheadunde1"
undersubhead1(userd){
  return this.httpClient.post<any>(this.undersub1,userd);

}


private undersub2 ="http://localhost:3073/api/subheadunde2"
undersubhead2(userd){
  return this.httpClient.post<any>(this.undersub2,userd);

}

private undersub3 ="http://localhost:3073/api/subheadunde3"
undersubhead3(userd){
  return this.httpClient.post<any>(this.undersub3,userd);

}

private undersub4 ="http://localhost:3073/api/subheadunde4"
undersubhead4(userd){
  return this.httpClient.post<any>(this.undersub4,userd);

}


//add underw existing items
//for x.x

private twosub ="http://localhost:3073/api/addx.x"
sub2(userd){
  return this.httpClient.post<any>(this.twosub,userd);

}

private twosubl ="http://localhost:3073/api/addx.xl"
sub2l(userd){
  return this.httpClient.post<any>(this.twosubl,userd);

}

private savexx ="http://localhost:3073/api/s"
savex(userd){
  return this.httpClient.post<any>(this.savexx,userd);

}


//addx.x.x.x
private savexxx ="http://localhost:3073/api/addx.x.x"
sxxx(userd){
  return this.httpClient.post<any>(this.savexxx,userd);

}
//addx.x.x.x2
private savexxx2 ="http://localhost:3073/api/addx.x.x2"
sxxx2(userd){
  return this.httpClient.post<any>(this.savexxx2,userd);

}




//addx.x.x.xl
private savexxxl ="http://localhost:3073/api/addx.x.xl"
sxxxl(userd){
  return this.httpClient.post<any>(this.savexxxl,userd);

}


//four
//addx.x.x.x.x
private savexxxx ="http://localhost:3073/api/addx.x.x.x"
sxxxx(userd){
  return this.httpClient.post<any>(this.savexxxx,userd);

}


private savexxxx2 ="http://localhost:3073/api/addx.x.x.x2"    
sxxxx2(userd){
  return this.httpClient.post<any>(this.savexxxx2,userd);

}


//addx.x.x.x.xl
private savexxxxl ="http://localhost:3073/api/addx.x.x.xl"
sxxxxl(userd){

  
  return this.httpClient.post<any>(this.savexxxxl,userd);

}

//five

//addx.x.x.x.x.x
private savexxxxx ="http://localhost:3073/api/addx.x.x.x.x"
sxxxxx(userd){
  return this.httpClient.post<any>(this.savexxxxx,userd);

}


//addx.x.x.x.xl
private savexxxxxl ="http://localhost:3073/api/addx.x.x.x.xl"
sxxxxxl(userd){
  return this.httpClient.post<any>(this.savexxxxxl,userd);

}


//**********end new item rates component************* */

private newsrsave="http://localhost:3073/api/newsave"
newsr(userdata){
  return this.httpClient.post<any>(this.newsrsave,userdata);
}








private po ="http://localhost:3073/api/addpo"
po1(userd){
  return this.httpClient.post<any>(this.po,userd);

}








//curreent market rate

// private fir="http://localhost:3073/api/all";
// initem(){
//   return this.httpClient.get(this.fir).toPromise().then(res=>res as Try[]);
// }
//displaying from users table
// private fin="http://localhost:3073/api/re";
// dis(){
//   return this.httpClient.get(this.fin).toPromise().then(res=>res as Try[]);
// }
// //total for the above items
// private tot="http://localhost:3073/api/res";
// finaltotal(){
//   return this.httpClient.get(this.tot).toPromise().then(res=>res as Try[]);
// }


// private del="http://localhost:3073/api/d";
// delete(){
//   return this.httpClient.delete(this.del);
// }

// private upd="http://localhost:3073/api/up2";
 
// Upcmr(pro:Cm){
//   return this.httpClient.put(this.upd,pro)
// }



// Update3(product:Cm){
//   return this.httpClient.put(this.BASE_URL +'up3/',product);
// }
  
  
 
  

  
 
// Update2(product:Cm){
//   return this.httpClient.put(this.BASE_URL +'up2/',product);
// }
 
 
 
  // Update1(product:Cm){
  //   return this.httpClient.put(this.BASE_URL +'update1/'+product._id,product);
  // }

  // private updatecostbreakup="http://localhost:3073/api/first";
  // private updatecostbreakup="http://localhost:3073/api/first";

  








// sel:Cm
// selected:Cmpl;
// select:Cmpl[];

// sdd:BasicratesComponent

 //storing the data for sr2007
   
   //storing the data for sr2007 itemcode
  //  private rl="http://localhost:3073/api/code";

   //rate
  

 
//
  private Ci:string='http://localhost:3073/api/analysis'



private subfc="http://localhost:3073/api/Sub";




  // private Civelec:string='/http://localhost:3073/api/appointmentform/civelec'

 


 
 // storing the values ratetable for itemcode
//  en(user:Su){
//   return this.httpClient.post<any>(this.rl,user);
// }
 

// storing the values srtable


// rat(use:R){
//   return this.httpClient.post<any>(this.url,use);
// }




//analysis
  // bal(){
  //   return this.httpClient.get(this.Ci).toPromise().then(res=>res as Analysis[]);
  // }
// civelec labour materials plants carriage
  


 //rates dropdown for civil





// subforcurrentrate(){
//   return this.httpClient.get(this.subfc).toPromise().then(res=>res as Rates[]);
// }





//aarthi



// private carri="http://localhost:3073/api/q";
// private mater="http://localhost:3073/api/w";


//http://localhost:3073/


//electrical costbreakup details
// private electricalcos="http://localhost:3073/api/elecos";

// eleccos(){
//   return this.httpClient.get(this.electricalcos).toPromise().then(res=>res as Analysis[]);
// }






// carria(){
//   return this.httpClient.get(this.carri).toPromise().then(res=>res as Analysis[]);
// }

// materi(){
//   return this.httpClient.get(this. mater).toPromise().then(res=>res as Analysis[]);
// }


//http://localhost:3073/api for civil cost breakup calculation
// private http://localhost:3073/api2="http://localhost:3073/api/2";
// private http://localhost:3073/api3="http://localhost:3073/api/3";
// private http://localhost:3073/api4="http://localhost:3073/api/4";
// private http://localhost:3073/api5="http://localhost:3073/api/5";
// private http://localhost:3073/api6="http://localhost:3073/api/6";
// private water="/http://localhost:3073/api/45";


// a2(){
//   return this.httpClient.get(this.http://localhost:3073/api2).toPromise().then(res=>res as Analysis[]);
// }

// a3(){
//   return this.httpClient.get(this.http://localhost:3073/api3).toPromise().then(res=>res as Analysis[]);
// }
// a4(){
//   return this.httpClient.get(this.http://localhost:3073/api4).toPromise().then(res=>res as Analysis[]);
// }
// a5(){
//   return this.httpClient.get(this.http://localhost:3073/api5).toPromise().then(res=>res as Analysis[]);
// }
// a6(){
//   return this.httpClient.get(this.http://localhost:3073/api6).toPromise().then(res=>res as Analysis[]);
// }




//radiorate
// private civradiorate="http://localhost:3073/api/bascivi";
// private elecradiorate="http://localhost:3073/api/baselec";


// civBasic(){
//   return this.httpClient.get(this.civradiorate).toPromise().then(res=>res as Radiorate[]);
// }

// elecBasic(){
//   return this.httpClient.get(this.elecradiorate).toPromise().then(res=>res as Radiorate[]);
// }


//// storing the values for  BASICRATES 
// private civrad="http://localhost:3073/api/bascstor";

// ratesforbasic(use:Save){
//   return this.httpClient.post<any>(this.civrad,use);
// }

//// fetching the values for  BASICRATES 
// private civr="http://localhost:3073/api/bascrates";
// bascrates(){
//   return this.httpClient.get(this.civr).toPromise().then(res=>res as Cmpl[]);
// }

//update
//  private BASE_URL:string="http://localhost:3073/api/";
// Update(element:Cmpl){
//   // return this.httpClient.put(this.update+select._id,select)
//   return this.httpClient.put(this.BASE_URL +'up/'+element._id,element);
// }
// Update(product:Cm){
//   return this.httpClient.put(this.BASE_URL +'up/'+product._id,product);
// }
// update(product:Product){
//   return this.httpClient.put(this.BASE_URL +'update/'+product._id,product);

// update(product:Product){
//   return this.httpClient.put(this.BASE_URL +'update/'+product._id,product);
// }
}


  // civdrop():Observable<Product[]>{
  //   return this.httpClient.get<Product[]>(this.civdropdown).pipe(catchError(this.handleError));
  // }
  // private handleError(error:HttpErrorResponse){
  //   if(error.error instanceof ErrorEvent){
  //     console.error('An Error Occurred:',error.error.message)
  //   }
  //   else{
  //     console.error(`Backend returned code ${error.status},`+`body was:${error.error}`)
  //   }
  //   return throwError('Something bad happened .please try again later')
  // }




  // civelect(){
  //   return this.httpClient.get(this. Civelec).toPromise().then(res=>res as Sr[]);
  // }
 
  

