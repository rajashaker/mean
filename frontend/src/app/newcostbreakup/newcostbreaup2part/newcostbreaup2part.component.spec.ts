import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Newcostbreaup2partComponent } from './newcostbreaup2part.component';

describe('Newcostbreaup2partComponent', () => {
  let component: Newcostbreaup2partComponent;
  let fixture: ComponentFixture<Newcostbreaup2partComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newcostbreaup2partComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Newcostbreaup2partComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
