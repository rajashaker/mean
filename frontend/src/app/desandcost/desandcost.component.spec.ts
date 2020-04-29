import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesandcostComponent } from './desandcost.component';

describe('DesandcostComponent', () => {
  let component: DesandcostComponent;
  let fixture: ComponentFixture<DesandcostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesandcostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesandcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
