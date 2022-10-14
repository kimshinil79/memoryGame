import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';
import { Observable, of, fromEvent } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SafesecurityPipe } from '../pipes/safesecurity.pipe';
import { SelectClipComponent } from '../popovers/select-clip/select-clip.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private screenOrientation: ScreenOrientation, 
    private popover : PopoverController,
    public safeSecurity: SafesecurityPipe
  ) {}

  orientation = 'default';
  youtubeURL = "https://www.youtube.com/embed/1VAn7CX_omg";
  youtubeURLfromPopOver = "";


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

  async selectClipPopover() {
    const pop = await this.popover.create({
      component: SelectClipComponent
    })

    pop.present();

    return pop.onDidDismiss().then(
      (data:any) => {
        const firstClip = data.data['firstClip'];
        const secondClip = data.data['secondClip'];
        if (firstClip.includes('https://youtu.be')) {
          const youtubeId = firstClip.split('/').pop();
          this.youtubeURL = "https://www.youtube.com/embed/"+youtubeId
        }
      }
    
    )
  }

  




}
