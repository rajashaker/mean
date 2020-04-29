import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccostbreakupComponent } from './eleccostbreakup.component';

describe('EleccostbreakupComponent', () => {
  let component: EleccostbreakupComponent;
  let fixture: ComponentFixture<EleccostbreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleccostbreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleccostbreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
