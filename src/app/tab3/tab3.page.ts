import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';
import { Observable, of, fromEvent } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private screenOrientation: ScreenOrientation
  ) {}

  orientation = 'default';
  youtubeId = "https://www.youtube.com/embed/1VAn7CX_omg";


  ngOnInit() {
    this.screenOrientation.onChange().subscribe(
      ()=>{
        if (this.orientation == "default") {
          this.orientation = "landscape"
        } else {
          this.orientation = "default";
        }
      }
    )
  }

  




}
