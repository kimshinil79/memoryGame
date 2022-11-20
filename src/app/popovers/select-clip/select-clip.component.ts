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

  
  YouTubeURL = ""

  ngOnInit() {
  }



  OK() {
    this.popover.dismiss({'YouTubeURL':this.YouTubeURL})
  }

}
