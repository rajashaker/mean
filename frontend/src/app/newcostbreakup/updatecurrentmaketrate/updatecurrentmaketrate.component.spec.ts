import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecurrentmaketrateComponent } from './updatecurrentmaketrate.component';

describe('UpdatecurrentmaketrateComponent', () => {
  let component: UpdatecurrentmaketrateComponent;
  let fixture: ComponentFixture<UpdatecurrentmaketrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecurrentmaketrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecurrentmaketrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
