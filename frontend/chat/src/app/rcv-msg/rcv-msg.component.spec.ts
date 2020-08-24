import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcvMsgComponent } from './rcv-msg.component';

describe('RcvMsgComponent', () => {
  let component: RcvMsgComponent;
  let fixture: ComponentFixture<RcvMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcvMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcvMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
