import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notify',
  template: `
  <div class="row message-online">
    <div class="col-sm-4 offset-lg-4 online">
      <h6>{{msg.name}} has {{msg.status}}!!</h6>
    </div>
  </div>
  `,
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Input() public msg; 

  constructor() { }

  ngOnInit() {
  }

}
