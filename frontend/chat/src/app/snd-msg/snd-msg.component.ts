import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-snd-msg',
  template: `
      <div class="row message-body">
        <div class="col-sm-12 message-main-sender">
          <div class="sender">

            <ng-template [ngIf]="type(msg.msg) === 'string'" [ngIfElse]='audioMsg'>
              <div class="message-text" >
                {{msg.msg}}
              </div>
            </ng-template>

            <ng-template #audioMsg>
              <audio  controls>
                  <source [src]="convert(msg.msg)" type="audio/webm">
              </audio>
            </ng-template>

            <span class="message-time pull-right">
              Sun
            </span>
          </div>
        </div>
      </div>`,
  styleUrls: ['./snd-msg.component.css']
})
export class SndMsgComponent implements OnInit {

  @Input() public msg;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  type(obj) {
    return Object.prototype.toString.apply(obj).replace(/\[object (.+)\]/i, '$1').toLowerCase();
  };

  convert(data){  
    const file = new File([data], "voice.mp3");
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));;
  }
}
