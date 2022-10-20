import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';
import { FilePicker} from '@robingenz/capacitor-file-picker'
import { CompareMovieService } from 'src/app/services/compare-movie.service';


@Component({
  selector: 'app-select-clip',
  templateUrl: './select-clip.component.html',
  styleUrls: ['./select-clip.component.scss'],
})
export class SelectClipComponent implements OnInit {

  constructor(
    private popover: PopoverController,
    private compareMovieService : CompareMovieService
  ) { }

  firstClip = "https://youtu.be/mzkbi6xNmSg"
  secondClip = ""

  ngOnInit() {
    this.firstClip = this.compareMovieService.firstClip;
    this.secondClip = this.compareMovieService.secondClip;
  }

  async pickFiles1(){
    const result = await FilePicker.pickFiles({
      types:['video/mp4'],
      multiple: false,
    })
    this.compareMovieService.firstClip = result['files'][0]['name'];
    this.firstClip = this.compareMovieService.firstClip;
  }

  async pickFiles2(){
    const result = await FilePicker.pickFiles({
      types:['video/mp4'],
      multiple: false,
    })
    this.compareMovieService.secondClip = result['files'][0]['name'];
    this.secondClip = this.compareMovieService.secondClip;
  }

  OK() {
    this.compareMovieService.firstClip = this.firstClip;
    this.compareMovieService.secondClip = this.secondClip;
    this.popover.dismiss({'firstClip':this.firstClip, 'secondClip':this.secondClip})
  }

}
