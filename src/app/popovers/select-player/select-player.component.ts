import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';
import { MGserveService } from 'src/app/services/mgserve.service';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss'],
})
export class SelectPlayerComponent implements OnInit {

  constructor(
    private selectPlayerPopOver: PopoverController,
    private mgservice:MGserveService
  ) { }

  players = [];

  ngOnInit() {
    this.players = this.mgservice.players;
  }

  closePopover() {
    this.selectPlayerPopOver.dismiss();
  }

  checkBoxEvent() {
    this.mgservice.selectedPlayer = [];
    for(let player of this.players) {
      if (player.nameChecked) {
        this.mgservice.selectedPlayer.push(player.name);
      }
    }
    this.mgservice.scoreList=[];
    for (let k=0;k<this.mgservice.selectedPlayer.length;k++){
      this.mgservice.scoreList.push(0);
    }
  }

  selectAll(){
    for (let player of this.players) {
      player.nameChecked = true;
    }
  }

  unselectAll(){
    for (let player of this.players) {
      player.nameChecked = false;
    }
  }

}
