import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ScoreComponent } from '../popovers/score/score.component';
import { MGserveService } from '../services/mgserve.service';
import { Observable, of, fromEvent } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SafesecurityPipe } from '../pipes/safesecurity.pipe';
import { SelectClipComponent } from '../popovers/select-clip/select-clip.component';
import { Camera, GalleryImageOptions } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { FilePicker} from '@robingenz/capacitor-file-picker'

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
    private loader: LoadingController,
  ) {}

  orientation = 'default';
  youtubeURL = "https://www.youtube.com/embed/1VAn7CX_omg";
  youtubeURLfromPopOver = "";
  videoFile="../../assets/haim.mp4";
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
          const youtubeId = firstClip.split('/').pop();
          this.youtubeURL = "https://www.youtube.com/embed/"+youtubeId
        }
      }
    
    )
  }

  // pickVideo() {
  //   this.loader.create({
  //     message: "기다려줘유..."
  //   }).then((ele) => {
  //     ele.present();
  //     let options:GalleryImageOptions = {
  //       correctOrientation:true
  //     }
  //     Camera.pickImages(options).then((val)=>{
  //       console.log(val)
  //       let images = val.photos;
  //       this.imgs = [];
  //       for (let i = 0; i<images.length;i++) {
  //         this.imgs.push(images[i].webPath);
  //         console.log(this.imgs)
  //       }
  //       ele.dismiss()
  //     })

  //   })
  // }
  
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
