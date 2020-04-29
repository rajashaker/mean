import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisfComponent } from './analysisf.component';

describe('AnalysisfComponent', () => {
  let component: AnalysisfComponent;
  let fixture: ComponentFixture<AnalysisfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
