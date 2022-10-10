import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';
import { Observable, of, fromEvent } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(

  ) {}


  ngOnInit() {

    const button = document.querySelector('ion-button')
    fromEvent(document, 'click').subscribe(
      (value)=>console.log(value['clientX'])
    )

  }




}
