import { Component } from '@angular/core';
import { MGserveService } from '../services/mgserve.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private MGservice: MGserveService
  ) {}

  randomAnimalXYparing = {}

  ngOnInit() {
    this.randomAnimalXYparing = this.MGservice.randomPositionPic();
    console.log(this.randomAnimalXYparing);
  }



  rows = ['0','1','2','3'];
  columns = ['0','1','2','3'];
  firstClickedXY = "";
  secondClickedXY ="";
  firstSelectedPic = "";
  secondSelectedpic = "";
  clickCount = 0;
  
  clickCard(row, col) {
    if (this.clickCount == 0) {
      this.firstClickedXY = row.toString()+col.toString();
      this.firstSelectedPic = this.randomAnimalXYparing[this.firstClickedXY]
      this.secondSelectedpic = "";
      this.clickCount++;
      console.log(this.clickCount);
    } else  {
      this.secondClickedXY = row.toString()+col.toString();
      this.secondSelectedpic = this.randomAnimalXYparing[this.secondClickedXY];
      this.clickCount = 0;
    }    
    
  }

}


