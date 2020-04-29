import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssComponent } from './ass/ass.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropComponent } from './drop/drop.component';
import { LabourComponent } from './labour/labour.component';

import { FirstpageComponent } from './firstpage/firstpage.component';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MaterialsComponent } from './materials/materials.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { PlantsComponent } from './plants/plants.component';
import { CarriageComponent } from './carriage/carriage.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RatesComponent } from './rates/rates.component';
import { AnalysisfComponent } from './analysisf/analysisf.component';
import { NewcompComponent } from './newcomp/newcomp.component';
import { CostbreakupComponent } from './costbreakup/costbreakup.component';
import { DatatableComponent } from './datatable/datatable.component';
// import { EleccostbreakupComponent } from './eleccostbreakup/eleccostbreakup.component';
import { SearchComponent } from './search/search.component';
import { InsidepageComponent } from './insidepage/insidepage.component';
// import { BasicratesComponent } from './basicrates/basicrates.component';
// import { DesandcostComponent } from './desandcost/desandcost.component';
// import { CmrateComponent } from './cmrate/cmrate.component';

import { NewitemratesComponent } from './newitemrates/newitemrates.component';
import { NewcostbreakupComponent } from './newcostbreakup/newcostbreakup.component';
import { BasratComponent } from './basrat/basrat.component';
import { ExcelService } from './services/excel.service';
import { DashboardGaurd } from './services/dashboardguard.service';
import { AdminComponent } from './admin/admin.component';
import { UpdateitemratesComponent } from './newitemrates/updateitemrates/updateitemrates.component';
import { UpdatenewitemratesComponent } from './basrat/updatenewitemrates/updatenewitemrates.component';
import { NewcostbreaupService } from './services/newcostbreaup.service';
import { NewitemService } from './services/newitem.service';
import { Newcostbreaup2partComponent } from './newcostbreakup/newcostbreaup2part/newcostbreaup2part.component';
import { EditanddeletenewcostbreakupComponent } from './newcostbreakup/editanddeletenewcostbreakup/editanddeletenewcostbreakup.component';
import { UpdatecurrentmaketrateComponent } from './newcostbreakup/updatecurrentmaketrate/updatecurrentmaketrate.component';







@NgModule({
  declarations: [
    AppComponent,
    AssComponent,
   
    DropComponent,
    LabourComponent,
   
    FirstpageComponent,
    SecondpageComponent,
    MaterialsComponent,
    MainpageComponent,
  
    PlantsComponent,
    CarriageComponent,
   
    RatesComponent,
    AnalysisfComponent,
    NewcompComponent,
    CostbreakupComponent,
    DatatableComponent,
    SearchComponent,

    // EleccostbreakupComponent,
 
     InsidepageComponent,
    // BasicratesComponent,
    // DesandcostComponent,
    // CmrateComponent,
    
    NewitemratesComponent,
    NewcostbreakupComponent,
    BasratComponent,
    AdminComponent,
    UpdateitemratesComponent,
    UpdatenewitemratesComponent,
    Newcostbreaup2partComponent,
    EditanddeletenewcostbreakupComponent,
    UpdatecurrentmaketrateComponent
 
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule, BrowserAnimationsModule,ReactiveFormsModule,
     MaterialModule,Ng2SearchPipeModule 
  ],
  providers: [ProductService,ExcelService,DashboardGaurd,NewcostbreaupService,NewitemService],
  bootstrap: [AppComponent],
  entryComponents:[DatatableComponent,AnalysisfComponent, UpdateitemratesComponent,UpdatenewitemratesComponent,
  Newcostbreaup2partComponent,UpdatecurrentmaketrateComponent]
})
export class AppModule { }
