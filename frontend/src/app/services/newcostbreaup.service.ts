import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import{ HttpClient ,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Add } from '../entites/add.entity';
import { Analysisfdata } from '../entites/analysisfdata.entity';

@Injectable({
  providedIn: 'root'
})
export class NewcostbreaupService {

  constructor(private httpClient:HttpClient) { }

  private civyear ="http://localhost:3073/api/costcivnew1"
  getyear(){
    // const par=new HttpParams().set()
    return this.httpClient.get(this.civyear).toPromise().then(
      res=>res as  Add[]);

  }


  private elecyear ="http://localhost:3073/api/costelectnew1"
  getyear1(){
    // const par=new HttpParams().set()
     return this.httpClient.get(this.elecyear).toPromise().then(
      res=>res as  Add[]);

  }

 

//subheads
  private sub ="http://localhost:3073/api/sub"
  subh(userd){
    return this.httpClient.post<any>(this.sub,userd ,{withCredentials: true}  );
  
  }

//showing the sr  item in table (user's data)
  private showsr ="http://localhost:3073/api/sr"
  ssr(userd){
    return this.httpClient.post<any>(this.showsr,userd ,{withCredentials: true}  );
  
  }
  
  
  //subheads for  when itemcode is clicked

  private costsubheads ="http://localhost:3073/api/cossub"
  coss(userd){
    return this.httpClient.post<any>(this.costsubheads,userd ,{withCredentials: true}  );
  
  }

  //byclicking subhead and get srtable

  private srtab ="http://localhost:3073/api/srdata"
  srtable(userd){
    return this.httpClient.post<any>(this.srtab,userd ,{withCredentials: true}  );
  
  }

   //post sr data  with itemcode

   private srdat ="http://localhost:3073/api/postsr"
   srdata(userd){
     return this.httpClient.post<any>(this.srdat,userd ,{withCredentials: true}  );
   
   }

   
   //post sr data  with code
   private code ="http://localhost:3073/api/postcode"
   codedata(userd){
     return this.httpClient.post<any>(this.code,userd ,{withCredentials: true}  );
   
   }

 //viewdata
 private viewdata  ="http://localhost:3073/api/viewdata"
 vdata(userd){
  return this.httpClient.post<any>(this.viewdata,userd ,{withCredentials: true}  );

}

//update data for cost break up in itemcode

private updatec ="http://localhost:3073/api/updatecos"
updata(userd){
 return this.httpClient.put<any>(this.updatec,userd ,{withCredentials: true}  );

}


//update data for cost break up in itemcode

private updatecal ="http://localhost:3073/api/updatecal"
updatacal(userd){
 return this.httpClient.put<any>(this.updatecal,userd ,{withCredentials: true}  );

}


//delete cost breakup data
//delete new user data with usernaame

private deletenewuserdata="http://localhost:3073/api/deletecos/";
 
deletecos(id:string){
  return this.httpClient.delete(this.deletenewuserdata+id)
}



//submiitting the form and get the ratetype

private ratetype ="http://localhost:3073/api/ratetype"
type(userd){
  return this.httpClient.post<any>(this.ratetype,userd ,{withCredentials: true}  );

}

//submitting and getting the rate table data with ratestype
private ratedata ="http://localhost:3073/api/ratedata"
ratedatas(userd){
  return this.httpClient.post<any>(this.ratedata,userd ,{withCredentials: true}  );

}


//saving new coast breakup from analysisf
private anadata ="http://localhost:3073/api/checking"
anadatas(userd){
  return this.httpClient.post<any>(this.anadata,userd ,{withCredentials: true}  );

}





  private under ="http://localhost:3073/api/soo"
  un(userd){
    return this.httpClient.post<any>(this.under,userd,  {withCredentials: true}  );
  
  }

  
  private messageSource = new BehaviorSubject<any>('');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message) {
     this.messageSource.next(message)
    console.log('message from service')
    console.log(message)
  }

  private messageSourc = new BehaviorSubject<any>('');
  currentMessag = this.messageSourc.asObservable();
  changeMessag(message) {
     this.messageSourc.next(message)
    console.log('message from service1')
    console.log(message)
  }


  //update data for current market in update current market rate component

  private updaterate = new BehaviorSubject<any>('');
  currentrate = this.updaterate.asObservable();
  Message(message) {
     this.updaterate.next(message)
    console.log('message from service updateurrentrate' )
   console.log(message)
  }


//in newitemcostbreak up component
//edit and delete tab



  private viewcos ="http://localhost:3073/api/viewcos"
  viewcosbasic(userd){
    return this.httpClient.post<any>(this.viewcos,userd ,{withCredentials: true}  );
  
  }

//total
  private totalfornew ="http://localhost:3073/api/totalnewcos"
  totalfor(userd){
    return this.httpClient.post<any>(this.totalfornew,userd ,{withCredentials: true}  );
  
  }


// calculating usermarket in costbreakup with specific subheads and updateit
private calculatedusersr ="http://localhost:3073/api/calculatedsr"
totalforsr(userd){
  return this.httpClient.post<any>(this.calculatedusersr,userd ,{withCredentials: true}  );

}

private costmarket ="http://localhost:3073/api/market"
marketratecost(userd){
  return this.httpClient.post<any>(this.costmarket,userd ,{withCredentials: true}  );

}

private costbreaktot ="http://localhost:3073/api/totalsruser"
marketratecost1(userd){
  return this.httpClient.post<any>(this.costbreaktot,userd ,{withCredentials: true}  );

}


private updaterates ="http://localhost:3073/api/updatting"
updatarate(userd){
 return this.httpClient.put<any>(this.updaterates,userd ,{withCredentials: true}  );

}

private costbreaktotnsr ="http://localhost:3073/api/nsr"
marketratecostnsr(userd){
  return this.httpClient.post<any>(this.costbreaktotnsr,userd ,{withCredentials: true}  );

}


private costsr ="http://localhost:3073/api/sr55"
marketsr(userd){
  return this.httpClient.post<any>(this.costsr,userd ,{withCredentials: true}  );

}

}
