//

import { Injectable } from '@angular/core';
import{ HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { Add } from '../entites/add.entity';
import { Product } from '../entites/product.entity';
import { UpdatenewitemratesComponent } from '../basrat/updatenewitemrates/updatenewitemrates.component';



@Injectable({
  providedIn: 'root'
})
export class NewitemService {

  constructor(private httpClient:HttpClient,private dialog: MatDialog) { }
//post

private formpost="http://localhost:3073/api/store"
store(userd){
  return this.httpClient.post<any>(this.formpost,userd);

}

private formpostall="http://localhost:3073/api/save"
save(userd){
  return this.httpClient.post<any>(this.formpostall,userd);

}





//getting year in users,rates tables
  private yearsubciv ="http://localhost:3073/api/yearcivbasrat"
  yearciv(){
    return this.httpClient.get(this.yearsubciv).toPromise().then(
      res=>res as  Add[]);
  
  }

  private yearsubele ="http://localhost:3073/api/yearelebasrat"
  yearele(){
    return this.httpClient.get(this.yearsubele).toPromise().then(
      res=>res as  Add[]);
  
  }


  //getting rates type for both Civil an elect

  private typeciv ="http://localhost:3073/api/typecivbasrat"
  civtype(){
      return this.httpClient.get(this.typeciv).toPromise().then(
        res=>res as  Add[]);
    
    }


  private typeele ="http://localhost:3073/api/typeelebasrat"
eletype(){
    return this.httpClient.get(this.typeele).toPromise().then(
      res=>res as  Add[]);
  
  }


  //group for materials

  private group ="http://localhost:3073/api/groupfi"
matgroup(){
    return this.httpClient.get(this.group).toPromise().then(
      res=>res as  Add[]);
  
  }

  //unit
 

  private unit ="http://localhost:3073/api/unite"
matunit(){
    return this.httpClient.get(this.unit).toPromise().then(
      res=>res as  Add[]);
  
  }

    //unit for update new items
 

    private unitu ="http://localhost:3073/api/unitupn"
    unitup(userd){
        return this.httpClient.post<any>(this.unitu,userd,{withCredentials: true} )
      
      }
    

  //newcode
  private code="http://localhost:3073/api/newcode"
  newcode(){
    return this.httpClient.get(this.code).toPromise().then(
      res=>res as  Product);
  }
 

    //compcode
    private ccode="http://localhost:3073/api/compcode"
    comcode(){
      return this.httpClient.get(this.ccode).toPromise().then(
        res=>res as  Product[]);
    }

    //comparing commoncode and new code
    private compcode="http://localhost:3073/api/1"
    cocode(){
      return this.httpClient.get(this.compcode).toPromise().then(
        res=>res as  Product);
    }


    //standard new
    private standard="http://localhost:3073/api/standard"
    standnew(){
      return this.httpClient.get(this.standard).toPromise().then(
        res=>res as  Product[]);
    }


   //view
   private view="http://localhost:3073/api/view"
   standnewview(userd){
     return this.httpClient.post<any>(this.view,userd)
     
   }




    //delete
    private deletenewuserdata="http://localhost:3073/api/deleterate/";
 
deleterate(id:string){
  return this.httpClient.delete(this.deletenewuserdata+id)
}


//update operation for new item rtes
private uppost ="http://localhost:3073/api/ratepost"
ratespost(userd){
  return this.httpClient.post<any>(this.uppost,userd);

}





 //displaying in table newitemratesupdate component
 private displaying="http://localhost:3073/api/display"
 disp(){
   return this.httpClient.get(this.displaying).toPromise().then(
     res=>res as  Product);
 }

//update new user data  in new item basic rates with usernaame
private updatenewuserdata1="http://localhost:3073/api/updatenewrates";
 
updatenew1(user){
  return this.httpClient.put(this.updatenewuserdata1,user)
}

}
