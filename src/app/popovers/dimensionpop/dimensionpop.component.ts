import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MGserveService } from 'src/app/services/mgserve.service';

@Component({
  selector: 'app-dimensionpop',
  templateUrl: './dimensionpop.component.html',
  styleUrls: ['./dimensionpop.component.scss'],
})
export class DimensionpopComponent implements OnInit {

  constructor(
    private popover: PopoverController,
    private mgservice:MGserveService
  ) { }

  row = 4;
  col = 4; 
  selection = true;

  ngOnInit() {
    this.row = this.mgservice.gameDimensionX;
    this.col = this.mgservice.gameDimensionY;
  }

  closePopover() {
    this.selection = false;
    this.popover.dismiss({ 'closing': false });
  }

  save() {
    this.mgservice.gameDimensionX = this.row;
    this.mgservice.gameDimensionY = this.col;
    this.selection = true;
    this.popover.dismiss({ 'closing': true });
  }


  rowUp() {
    if (this.row < 10) {
      this.row = this.row+2;
    }
  }

  rowDown() {
    if (this.row > 2) {
      this.row = this.row-2;
    }
  }

  colUp() {
    if (this.col <8) {
      this.col = this.col+2;
    }
    
  }

  colDown() {
    if (this.col >2) {
      this.col = this.col-2;
    }
  }

}
