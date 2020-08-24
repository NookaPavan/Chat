import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main2',
  template: `
          <div class="col-sm-8 conversation">
              <app-lbox-nav></app-lbox-nav>
              <app-conversation></app-conversation>
          </div>`,
  styleUrls: ['./main2.component.css']
})
export class Main2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
