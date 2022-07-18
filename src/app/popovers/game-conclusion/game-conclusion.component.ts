import { Component, OnInit } from '@angular/core';
import { MGserveService } from 'src/app/services/mgserve.service';

@Component({
  selector: 'app-game-conclusion',
  templateUrl: './game-conclusion.component.html',
  styleUrls: ['./game-conclusion.component.scss'],
})
export class GameConclusionComponent implements OnInit {

  constructor(
    public mgservice:MGserveService
  ) { }

  maxScore:number;
  maxScoreIndexList = [];

  ngOnInit() {
    this.findIndexOfMaxScore();
  }

  findMaxScore() {
    this.maxScore = Math.max(...this.mgservice.scoreList);
   }

  findIndexOfMaxScore() {
    this.findMaxScore();
    let fromIndex = this.mgservice.scoreList.indexOf(this.maxScore);
    while(fromIndex !=-1) {
      this.maxScoreIndexList.push(fromIndex);
      fromIndex = this.mgservice.scoreList.indexOf(this.maxScore, fromIndex+1)
    }
  }

}
