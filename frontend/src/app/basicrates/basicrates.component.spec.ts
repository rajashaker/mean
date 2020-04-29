import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicratesComponent } from './basicrates.component';

describe('BasicratesComponent', () => {
  let component: BasicratesComponent;
  let fixture: ComponentFixture<BasicratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
