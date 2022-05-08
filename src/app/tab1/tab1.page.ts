import { Component } from '@angular/core';
import { MGserveService } from '../services/mgserve.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private MGservice: MGserveService
  ) {}

  rows = [0,1,2,3,4,5];
  columns = [0,1,2,3,4,5];
  
  clickCard() {
    this.MGservice.clickedX = 0;
  }

}


