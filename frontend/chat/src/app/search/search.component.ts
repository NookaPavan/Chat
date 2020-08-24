import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template:`
        <div class="row searchBox">
        <div class="col-sm-12 searchBox-inner">
          <div class="form-group has-feedback">
            <input id="searchText" type="text" class="form-control" name="searchText" placeholder="Search">
            <span class="glyphicon glyphicon-search form-control-feedback"></span>
          </div>
        </div>
        </div>`,
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
