import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidepageComponent } from './insidepage.component';

describe('InsidepageComponent', () => {
  let component: InsidepageComponent;
  let fixture: ComponentFixture<InsidepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsidepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsidepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
