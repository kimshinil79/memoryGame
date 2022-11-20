import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';
import { Observable, of, fromEvent } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SafesecurityPipe } from '../pipes/safesecurity.pipe';
import { SelectClipComponent } from '../popovers/select-clip/select-clip.component';
import { Camera, GalleryImageOptions } from '@capacitor/camera';
//import { LoadingController } from '@ionic/angular';
import { CompareMovieService } from '../services/compare-movie.service';
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Device } from '@capacitor/device'

const APP_DIRECTORY = Directory.Documents; 

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
    private route: ActivatedRoute,
    private router: Router,
    //private loader: LoadingController,

  ) {}

  orientation = 'default';
  firstMovie = "C:/Users/alien/Downloads/NewJeansAttention.mp4";
  secondMovie="../../assets/haim.mp4";
  firstMovieYoutube = true;
  secondMovieYoutube = false;
  currentFolder = '';
  OS = "";



  async ngOnInit() {
    this.currentFolder = this.route.snapshot.paramMap.get('folder') || '';
    console.log('folder', this.currentFolder)
    console.log('DIRECTORY!!', APP_DIRECTORY)
    this.screenOrientation.onChange().subscribe(
      ()=>{
        if (this.orientation == "default") {
          this.orientation = "landscape"
        } else {
          this.orientation = "default";
        }
      }
    )
    this.OS = await (await Device.getInfo()).operatingSystem;
  }

  async selectClipPopover() {
    const pop = await this.popover.create({
      component: SelectClipComponent
    })

    pop.present();

    return pop.onDidDismiss().then(
      (data:any) => {
        const YouTubeURL = data.data['YouTubeURL']
        console.log(YouTubeURL)
      }
    )
  }
  

  firstClipSelect($event) {
    const fileName = $event.target.files[0].name;
    console.log('haha', fileName)
    if (this.OS == "windows") {
      this.firstMovie = "../assets/"+fileName
    }
  }

  secondClipSelect($event) {
    const fileName = $event.target.files[0].name;
    console.log('haha', fileName)
    if (this.OS == "windows") {
      this.secondMovie = "../assets/"+fileName
    }
  }

  

  
}
