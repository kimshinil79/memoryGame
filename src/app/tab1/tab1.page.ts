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
    for (let i=0;i<this.MGservice.gameDimensionX;i++){
      this.rows.push(i.toString())
    }
    for (let j=0;j<this.MGservice.gameDimensionY;j++) {
      this.columns.push(j.toString())
    }
  }



  rows = [];
  columns = [];
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
    this.MGservice.picTypeNum = this.MGservice.gameDimensionX * this.MGservice.gameDimensionY /2
    this.randomAnimalXYparing = this.MGservice.randomPositionPic();
    this.firstPicBlank = false;
    this.secondPicBlank = false;
    this.rows=[];
    this.columns=[];
    for (let i=0;i<this.MGservice.gameDimensionX;i++){
      this.rows.push(i.toString())
    }
    for (let j=0;j<this.MGservice.gameDimensionY;j++) {
      this.columns.push(j.toString())
    }
  }

  // async createPopover(ev:any) {
  //   const pop = await this.popover.create({
  //     component:DimensionpopComponent,
  //     event: ev
  //   });
    
    
  //   return pop.present()

  // }

  async createPopover(ev:any) {
    const pop = await this.popover.create({
      component:DimensionpopComponent,
      event: ev
    });
    pop.present()
    
    return pop.onDidDismiss().then(
      (data:any) => {
        if(data.data['selection']) {
          this.newGame();
        }
      }
    )

  }

}


