import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrateComponent } from './cmrate.component';

describe('CmrateComponent', () => {
  let component: CmrateComponent;
  let fixture: ComponentFixture<CmrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
