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
    console.log(this.players);
  }

  closePopover() {
    this.selectPlayerPopOver.dismiss();
  }

}
