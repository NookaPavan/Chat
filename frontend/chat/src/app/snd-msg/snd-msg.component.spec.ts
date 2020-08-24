import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SndMsgComponent } from './snd-msg.component';

describe('SndMsgComponent', () => {
  let component: SndMsgComponent;
  let fixture: ComponentFixture<SndMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SndMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SndMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
