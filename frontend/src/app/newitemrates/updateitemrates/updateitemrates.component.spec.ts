import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateitemratesComponent } from './updateitemrates.component';

describe('UpdateitemratesComponent', () => {
  let component: UpdateitemratesComponent;
  let fixture: ComponentFixture<UpdateitemratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateitemratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateitemratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
