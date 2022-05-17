import { Component } from '@angular/core';
import { MGserveService } from '../services/mgserve.service';
import { popoverController } from '@ionic/core';
import { DimensionpopComponent } from '../popovers/dimensionpop/dimensionpop.component';
import { PopoverController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private MGservice: MGserveService, 
    private popover:PopoverController
  ) {}

  randomAnimalXYparing = {}

  ngOnInit() {
    this.randomAnimalXYparing = this.MGservice.randomPositionPic();
    console.log(this.randomAnimalXYparing);
  }



  rows = ['0','1','2','3'];
  columns = ['0','1','2','3'];
  firstPicBlank = false;
  secondPicBlank = false;
  firstClickedXY = "";
  secondClickedXY ="";
  firstSelectedPic = "";
  secondSelectedpic = "";
  clickCount = 0;
  
  clickCard(row:string, col:string) {
    if (this.clickCount == 0) {
      this.firstPicBlank = true;
      this.firstClickedXY = row.toString()+col.toString(); 
      this.firstSelectedPic = this.randomAnimalXYparing[this.firstClickedXY];
      this.clickCount++;
      this.secondPicBlank = false;
    } else  {
      this.secondClickedXY = row.toString()+col.toString();
      if (this.firstClickedXY != this.secondClickedXY) {
        this.secondPicBlank = true;
        this.secondSelectedpic = this.randomAnimalXYparing[this.secondClickedXY];
        this.clickCount = 0;
      }
      
    }    
    
  }

  newGame() {
    this.randomAnimalXYparing = this.MGservice.randomPositionPic();
    this.firstPicBlank = false;
    this.secondPicBlank = false
  }

  async createPopover(ev:any) {
    const pop = await this.popover.create({
      component:DimensionpopComponent,
      event: ev
    });
    return await pop.present();
  }

}


