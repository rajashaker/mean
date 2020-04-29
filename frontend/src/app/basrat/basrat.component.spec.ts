import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasratComponent } from './basrat.component';

describe('BasratComponent', () => {
  let component: BasratComponent;
  let fixture: ComponentFixture<BasratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
