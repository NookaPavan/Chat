import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-chat-list',
  template: `
    <div class="row sideBar">
      <pre class="well well-sm"> 🟢  Online</pre>
      <ng-container *ngFor ='let user of Actives'>
        <app-new-chat [name]='user'></app-new-chat>
      </ng-container>
    </div>  `,
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public Actives;

  constructor(private webservice : WebService) { }

  ngOnInit() {
    this.webservice.members.subscribe(msg => this.Actives = msg);
  }

}
