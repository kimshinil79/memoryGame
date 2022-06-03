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

  checkBoxEvent(player) {
    if (player.nameChecked) {
      this.mgservice.selectedPlayer.push(player.name)
    }
    
    if (!player.nameChecked) {
      if ( this.mgservice.selectedPlayer.includes(player.name)) {
        let indexPlayer = this.mgservice.selectedPlayer.indexOf(player.name);
        console.log('index', indexPlayer)
        this.mgservice.selectedPlayer.splice(indexPlayer, 1)
      }
    }
    console.log(this.mgservice.selectedPlayer)

    this.mgservice.scoreList=[];
    for (let k=0;k<this.mgservice.selectedPlayer.length;k++){
      this.mgservice.scoreList.push(0);
    }
  }

  selectAll(){
    for (let player of this.mgservice.players) {
      player.nameChecked = true;
    }
  }

  unselectAll(){
    for (let player of this.mgservice.players) {
      player.nameChecked = false;
    }
  }

}
