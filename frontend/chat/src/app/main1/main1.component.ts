import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main1',
  template: `
        <div class="col-sm-4 side">
          <div class="side-one"> 
            <app-lbox-nav></app-lbox-nav>
            <app-search></app-search>
            <app-chat-list></app-chat-list>
          </div>
          <div class="side-two">
            <div class="row newMessage-heading">
              <div class="row newMessage-main">
                <div class="col-sm-2 col-xs-2 newMessage-back">
                  <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </div>
                <div class="col-sm-10 col-xs-10 newMessage-title">
                  New Chat
                </div>
              </div>
            </div>

            <app-search></app-search>
            <div class="row compose-sideBar">
              <app-new-chat></app-new-chat>
            </div>
          </div>
        </div>`,
  styleUrls: ['./main1.component.css']
})
export class Main1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
