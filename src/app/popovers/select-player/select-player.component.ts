import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MGserveService } from 'src/app/services/mgserve.service';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss'],
})
export class SelectPlayerComponent implements OnInit {

  constructor(
    private selectPlayerPopOver: PopoverController,
    private mgservice:MGserveService,
    private auth:AuthenticationService
  ) { }

  players = [];

  ngOnInit() {
    this.players = this.mgservice.players;
  }

  cancel() {
    this.selectPlayerPopOver.dismiss({"closing":false})
  }

  save() {
    this.selectPlayerPopOver.dismiss({"closing":true});
  }

  checkBoxEvent(player) {
    if (player.nameChecked) {
      if (!this.mgservice.selectedPlayer.includes(player.name)) {
        this.mgservice.selectedPlayer.push(player.name)
      }
    }
    
    if (!player.nameChecked) {
      if ( this.mgservice.selectedPlayer.includes(player.name)) {
        let indexPlayer = this.mgservice.selectedPlayer.indexOf(player.name);
        this.mgservice.selectedPlayer.splice(indexPlayer, 1)
      }
    }

    this.mgservice.scoreList=[];
    for (let k=0;k<this.mgservice.selectedPlayer.length;k++){
      this.mgservice.scoreList.push(0);
    }
  }

  selectAll(){
    this.mgservice.selectedPlayer = [];
    this.mgservice.selectedPlayer.push(this.auth.userName);
    for (let player of this.mgservice.players) {
      player.nameChecked = true;
      this.mgservice.selectedPlayer.push(player.name);
    }
  }

  unselectAll(){
    for (let player of this.mgservice.players) {
      player.nameChecked = false;
    }
    this.mgservice.selectedPlayer = [];
    this.mgservice.selectedPlayer.push(this.auth.userName)
  }

}
