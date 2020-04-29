import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcostbreakupComponent } from './newcostbreakup.component';

describe('NewcostbreakupComponent', () => {
  let component: NewcostbreakupComponent;
  let fixture: ComponentFixture<NewcostbreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcostbreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcostbreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
