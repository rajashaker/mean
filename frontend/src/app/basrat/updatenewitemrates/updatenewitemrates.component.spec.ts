import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenewitemratesComponent } from './updatenewitemrates.component';

describe('UpdatenewitemratesComponent', () => {
  let component: UpdatenewitemratesComponent;
  let fixture: ComponentFixture<UpdatenewitemratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatenewitemratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatenewitemratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
