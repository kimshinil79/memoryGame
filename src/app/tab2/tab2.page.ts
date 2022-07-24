import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public MGservice: MGserveService,
    private popover: PopoverController,
  ) {}

  totalItemsList = [];
  itemListForExam = [];
  itemListforExamWithJpg = [];
  nonAnswerItemsList = [];
  nonAnswerItemsListWithJpg = [];
  examNum = 10;
  finalList = [];
  pictureIndex = ['0','1','2','3','4'];
  selectedIndex = "0"
  answerIndexList = [];
  selectedNumList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  americanBritish = ["american", "british"]
  audio = new Audio();

  ngOnInit() {
    this.newExam();
  }



  newExam() {

    this.totalItemsList = [];
    this.itemListForExam = [];
    this.itemListforExamWithJpg = [];
    this.nonAnswerItemsList = [];
    this.nonAnswerItemsListWithJpg = [];
    this.finalList = [];
    this.answerIndexList = [];

    this.selectedIndex = this.MGservice.suffleArray(this.pictureIndex)[0];

    for (let list of this.MGservice.categoriesList) {
      this.totalItemsList.push(...this.MGservice[list])
    }
    this.itemListForExam = this.MGservice.suffleArray(this.totalItemsList).slice(0, this.examNum)
    this.itemListforExamWithJpg = this.itemListForExam.map(name =>"../../assets/Pic/" + name + this.selectedIndex + ".jpg");

    this.nonAnswerItemsList = this.totalItemsList.slice(10, this.totalItemsList.length-this.examNum)
    this.nonAnswerItemsListWithJpg = this.nonAnswerItemsList.map(name =>"../../assets/Pic/" + name + this.selectedIndex + ".jpg");;
    

    let nonAnswerNum = 3;
    let startIndexForSlice = 0
    for (let answerItem of this.itemListforExamWithJpg) {
      let tempList = [];
      tempList.push(answerItem);
      tempList.push(...this.nonAnswerItemsListWithJpg.slice(startIndexForSlice, startIndexForSlice+nonAnswerNum))
      this.MGservice.suffleArray(tempList);
      let answerIndex = tempList.indexOf(answerItem)
      this.answerIndexList.push(answerIndex);
      this.finalList.push(tempList)
      startIndexForSlice = startIndexForSlice+3;

    }
    console.log(this.itemListForExam)
    console.log(this.answerIndexList)


  }

  makeSound(index) {
    let rand = Math.floor(Math.random()*this.americanBritish.length);
    let pronouciation = this.americanBritish[rand];
    this.audio.src = "../../assets/soundFolder/" + this.itemListForExam[index]+"("+pronouciation+").mp3";
    this.audio.load();
    this.audio.play();
  }

  makeSelectedItem(questionNum, selectedNum) {
    for (let index of ["0","1","2","3"]) {
      let id = questionNum.toString()+index;
      document.getElementById(id).style.border = "none"  
    }
    this.selectedNumList[questionNum] = selectedNum;
    document.getElementById(questionNum.toString()+selectedNum.toString()).style.border = "solid"
    document.getElementById(questionNum.toString()+selectedNum.toString()).style.borderColor = "red"
    console.log(this.selectedNumList)
  }

  scoring() {
    let rightAnswerNum = 0;
    for (let i = 0;i<10;i++) {
      if (this.answerIndexList[i] == this.selectedNumList[i]) {
        rightAnswerNum = rightAnswerNum+1;
      }
    }
    this.MGservice.score = rightAnswerNum*10;
    this.scorePopover();

  }

  async scorePopover() {
    const pop = await this.popover.create({
      component: ScoreComponent
    });
    return pop.present()
  }



  

}
