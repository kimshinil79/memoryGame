import { Component } from '@angular/core';
import { MGserveService } from '../services/mgserve.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public MGservice: MGserveService
  ) {}

  totalItemsList = [];
  itemListForExam = [];
  nonAnswerItemsList = [];
  examNum = 10;
  pictureIndex = ['0','1','2','3','4'];

  ngOnInit() {
    this.newExam();
  }

  newExam() {
    for (let list of this.MGservice.categoriesList) {
      this.totalItemsList.push(...this.MGservice[list])
    }
    this.itemListForExam = this.MGservice.suffleArray(this.totalItemsList).slice(0, this.examNum);
    this.nonAnswerItemsList = this.totalItemsList.slice(10, this.totalItemsList.length-this.examNum)
    let selectedIndex = this.MGservice.suffleArray(this.pictureIndex)[0]


  }



  

}
