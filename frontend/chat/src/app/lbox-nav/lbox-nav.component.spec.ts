import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LboxNavComponent } from './lbox-nav.component';

describe('LboxNavComponent', () => {
  let component: LboxNavComponent;
  let fixture: ComponentFixture<LboxNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LboxNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LboxNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
