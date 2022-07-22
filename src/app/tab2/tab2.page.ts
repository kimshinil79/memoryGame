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
  finalList = [];
  pictureIndex = ['0','1','2','3','4'];
  selectedIndex = "0"
  test = "../../assets/Pic/ant2.jpg"

  ngOnInit() {
    this.newExam();
  }



  newExam() {

    this.totalItemsList = [];
    this.itemListForExam = [];
    this.nonAnswerItemsList = [];
    this.finalList = [];

    this.selectedIndex = this.MGservice.suffleArray(this.pictureIndex)[0];

    for (let list of this.MGservice.categoriesList) {
      this.totalItemsList.push(...this.MGservice[list])
    }
    this.itemListForExam = this.MGservice.suffleArray(this.totalItemsList).slice(0, this.examNum).map(
      name =>"../../assets/Pic/" + name + this.selectedIndex + ".jpg");
    this.nonAnswerItemsList = this.totalItemsList.slice(10, this.totalItemsList.length-this.examNum).map(
      name =>"../../assets/Pic/" + name + this.selectedIndex + ".jpg");;
    

    let nonAnswerNum = 3;
    let startIndexForSlice = 0
    for (let answerItem of this.itemListForExam) {
      let tempList = [];
      tempList.push(answerItem);
      tempList.push(...this.nonAnswerItemsList.slice(startIndexForSlice, startIndexForSlice+nonAnswerNum))
      this.MGservice.suffleArray(tempList);
      this.finalList.push(tempList)
      startIndexForSlice = startIndexForSlice+3;

    }

  }



  

}
