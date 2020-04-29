import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostbreakupComponent } from './costbreakup.component';

describe('CostbreakupComponent', () => {
  let component: CostbreakupComponent;
  let fixture: ComponentFixture<CostbreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostbreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostbreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
