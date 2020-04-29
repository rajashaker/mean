import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewitemratesComponent } from './newitemrates.component';

describe('NewitemratesComponent', () => {
  let component: NewitemratesComponent;
  let fixture: ComponentFixture<NewitemratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewitemratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewitemratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
