import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';
import { Observable, of, fromEvent } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SafesecurityPipe } from '../pipes/safesecurity.pipe';
import { SelectClipComponent } from '../popovers/select-clip/select-clip.component';
import { Camera, GalleryImageOptions } from '@capacitor/camera';
//import { LoadingController } from '@ionic/angular';
import { FilePicker} from '@robingenz/capacitor-file-picker'
import { CompareMovieService } from '../services/compare-movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private screenOrientation: ScreenOrientation, 
    private popover : PopoverController,
    public safeSecurity: SafesecurityPipe,
    private compareMovieService: CompareMovieService,
    //private loader: LoadingController,
  ) {}

  orientation = 'default';
  firstMovie = "https://www.youtube.com/embed/1VAn7CX_omg";
  youtubeURLfromPopOver = "";
  secondMovie="../../assets/attentionHaim.mp4";
  imgs = [];


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
          const youtubeId1 = firstClip.split('/').pop();
          this.firstMovie = "https://www.youtube.com/embed/"+youtubeId1
        } else {
          this.firstMovie = "../../assets/"+firstClip
        }
        if (secondClip.includes('https://youtu.be')) {
          const youtubeId2 = firstClip.split('/').pop();
          this.secondMovie = "https://www.youtube.com/embed/"+youtubeId2
        } else {
          this.secondMovie = "../../assets/"+secondClip;
        }

      }
    
    )
  }
  
  async pickFiles(){
    const result = await FilePicker.pickFiles({
      types:['video/mp4'],
      multiple: false,
    })
    console.log(result)
  }
 
  pickVideo() {
    this.pickFiles();
    
    
  }

  
}
