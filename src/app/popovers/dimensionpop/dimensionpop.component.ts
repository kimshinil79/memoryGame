import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-dimensionpop',
  templateUrl: './dimensionpop.component.html',
  styleUrls: ['./dimensionpop.component.scss'],
})
export class DimensionpopComponent implements OnInit {

  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}

  closePopover() {
    this.popover.dismiss();
  }

}
