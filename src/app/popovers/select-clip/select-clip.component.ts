import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';

@Component({
  selector: 'app-select-clip',
  templateUrl: './select-clip.component.html',
  styleUrls: ['./select-clip.component.scss'],
})
export class SelectClipComponent implements OnInit {

  constructor(
    private popover: PopoverController
  ) { }

  firstClip = ""
  secondClip = ""

  ngOnInit() {}

  OK() {
    this.popover.dismiss({'firstClip':this.firstClip, 'secondClip':this.secondClip})
  }

}
