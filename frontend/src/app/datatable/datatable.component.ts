import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, FormControlName} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material'

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  
form:FormGroup=new FormGroup({
  Civ_Elec:new FormControl(''),
  type:new FormControl(''),
  groupm:new FormControl(''),
  schyear:new FormControl(''),
  description:new FormControl(''),
  Unit:new FormControl(''),
  Rate:new FormControl(''),
  marketrate:new FormControl(''),
  Eqfactor:new FormControl(''),
  Unitvalue:new FormControl('')

})
  

onclear(){
  this.form.reset();
}
  

}
