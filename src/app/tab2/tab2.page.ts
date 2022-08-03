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
  selectionNum = 0;
  answerIndexList = [];
  selectedNumList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  finalResultTFList = [];
  americanBritish = ["american", "british"]
  audio = new Audio();

  questionPage:number = 0;
  submitted = false;

  newGame = true;

  ngOnInit() {
    this.newExam();
  }
  ngAfterViewInit() {
    console.log("loaded")
    //this.displayFirstQuestion();
    this.changeQuestionPage(0);
  }



  async newExam() {

    this.totalItemsList = [];
    this.itemListForExam = [];
    this.itemListforExamWithJpg = [];
    this.nonAnswerItemsList = [];
    this.nonAnswerItemsListWithJpg = [];
    this.finalList = [];
    this.answerIndexList = [];
    this.selectedNumList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.questionPage = 0;
    this.newGame = true;
    this.selectionNum = 0;
    this.submitted = false;
    

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
    console.log(this.finalList)

    this.displayFirstQuestion();
    this.changeQuestionPage(0);

  }

  displayFirstQuestion() {

    for (let pageNum=0;pageNum<10;pageNum++) {
      let tempPageId = "page"+pageNum.toString();
      let tempElement = document.getElementById(tempPageId)
      if (tempPageId == "page0" && tempElement != null) {
        console.log('page0')
        tempElement.style.display = ""
      } 
      if (tempPageId !="page0" && tempElement != null) {
        console.log(tempPageId)
        tempElement.style.display = "none"
      }
      

      for (let itemNum=0;itemNum<4;itemNum++) {
        let tempId = "test"+pageNum.toString()+itemNum.toString();
        let tempItem =  document.getElementById(tempId)
        if (tempItem !=null) {
          tempItem.style.border = "none"
        }
        
      }

    }
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
      let id = "test"+questionNum.toString()+index;
      document.getElementById(id).style.border = "none"  
    }
    this.selectedNumList[questionNum] = selectedNum;
    document.getElementById("test"+questionNum.toString()+selectedNum.toString()).style.border = "solid"
    document.getElementById("test"+questionNum.toString()+selectedNum.toString()).style.borderColor = "red"
    document.getElementById("test"+questionNum.toString()+selectedNum.toString()).style.borderWidth = "3px"
    console.log(this.selectedNumList);
    this.selectionNum = this.selectionNum+1;
  }

  changeQuestionPage(pageNum) {

    this.questionPage = pageNum;
    let id = "question"+pageNum.toString();
    for (let num=0;num<10;num++) {
      let tempId = "question"+num.toString();
      if (id == tempId) {
        document.getElementById(id).style.display = "";
      } else {
        document.getElementById(tempId).style.display="none"
      }
    }
  }

  previousQuestion() {
    this.changeQuestionPage(this.questionPage-1);
  }

  nextQuestion() {
    this.changeQuestionPage(this.questionPage+1);
  }

  scoring() {
    let rightAnswerNum = 0;
    this.submitted = true;
    this.finalResultTFList = [];
    for (let i = 0;i<10;i++) {
      if (this.answerIndexList[i] == this.selectedNumList[i]) {
        rightAnswerNum = rightAnswerNum+1;
        this.finalResultTFList.push(true);
      } else {
        this.finalResultTFList.push(false)
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
