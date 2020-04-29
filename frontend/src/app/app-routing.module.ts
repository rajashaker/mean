import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabourComponent } from './labour/labour.component';


import { AssComponent } from './ass/ass.component';

import { FirstpageComponent } from './firstpage/firstpage.component';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MaterialsComponent } from './materials/materials.component';

import { PlantsComponent } from './plants/plants.component';
import { CarriageComponent } from './carriage/carriage.component';

import { RatesComponent } from './rates/rates.component';
import { AnalysisfComponent } from './analysisf/analysisf.component';
import { NewcompComponent } from './newcomp/newcomp.component';
import { CostbreakupComponent } from './costbreakup/costbreakup.component';

import { SearchComponent } from './search/search.component';

// import { EleccostbreakupComponent } from './eleccostbreakup/eleccostbreakup.component';
import { InsidepageComponent } from './insidepage/insidepage.component';
// import { BasicratesComponent } from './basicrates/basicrates.component';
// import { DesandcostComponent } from './desandcost/desandcost.component';
// import { CmrateComponent } from './cmrate/cmrate.component';

import { NewitemratesComponent } from './newitemrates/newitemrates.component';
import { NewcostbreakupComponent } from './newcostbreakup/newcostbreakup.component';
import { BasratComponent } from './basrat/basrat.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DashboardGaurd } from './services/dashboardguard.service';
import { AdminComponent } from './admin/admin.component';
import { DropComponent } from './drop/drop.component';
import { UpdatenewitemratesComponent } from './basrat/updatenewitemrates/updatenewitemrates.component';
import { Newcostbreaup2partComponent } from './newcostbreakup/newcostbreaup2part/newcostbreaup2part.component';
import { EditanddeletenewcostbreakupComponent } from './newcostbreakup/editanddeletenewcostbreakup/editanddeletenewcostbreakup.component';




const routes: Routes = [
  {path:'L',component:  NewcompComponent  },
  {path:'Labour',component:  LabourComponent  },


  {path:'civ2013',component:  AssComponent  },
  
  {path:'first',component:FirstpageComponent},
  {path:'second',component:SecondpageComponent},
  {path:'main',component:MainpageComponent},
  {path:'mat',component:MaterialsComponent},

  {path:'plant',component:PlantsComponent},
  {path:'Carriage',component:CarriageComponent},

  {path:'rates',component:RatesComponent},
  {path:'cost',component:CostbreakupComponent},
  {path:'ana',component:AnalysisfComponent},

  {path:'search',component:SearchComponent},

  // {path:'eleccos',component:EleccostbreakupComponent},
  {path:'in',component:InsidepageComponent,},
  {path:'admin',component:AdminComponent,},

  // {path:'basicrates',component:BasicratesComponent},


  // {path:'des',component:DesandcostComponent},
  // {path:'cmr',component:CmrateComponent},
//new items
{path:'bas',component:BasratComponent},
  {path:'NIR',component:NewitemratesComponent},
  {path:'NCBU',component:NewcostbreakupComponent},

  {path:'NCup',component:UpdatenewitemratesComponent},


  {path:'summa', component:DatatableComponent},
  {path:'drop', component:DropComponent},  


  {path:'hello', component:Newcostbreaup2partComponent},  

  {path:'Endnewc', component:EditanddeletenewcostbreakupComponent},  



  
  {path:'**',redirectTo:'/first'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
