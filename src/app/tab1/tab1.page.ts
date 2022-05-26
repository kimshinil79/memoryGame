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
    public MGservice: MGserveService, 
    private popover:PopoverController,
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
  matchedCardXY = [];
  totalClickCount = 0;
  audio = new Audio();
  americanBritish = ["american", "british"]
  // clickedCardColor = "pink";
  // unclickedCardColor = "green"
  // cardColor = "blue";
  currentClicked = [];
  // firstClickedColor = "blue";
  // secondClickedColor = "pink";
  firstClicked = "";
  secondClicked = "";
  
  clickCard(row:string, col:string) {

    let test = document.getElementById('card').style.width;
    console.log("test", test);

    let rand = Math.floor(Math.random()*this.americanBritish.length);
    let pronouciation = this.americanBritish[rand];
    
    if (this.clickCount == 0) {
      this.firstClicked = row.toString()+col.toString();
      this.currentClicked = [];
      this.currentClicked.push(row.toString()+col.toString())
      this.firstPicBlank = true;
      this.firstClickedXY = row.toString()+col.toString(); 
      this.firstSelectedPic = this.randomAnimalXYparing[this.firstClickedXY];
      this.clickCount++;
      this.secondPicBlank = false;
      this.audio.src = "../../assets/soundFolder/" + this.firstSelectedPic.slice(0, -5)+"("+pronouciation+").mp3";
      console.log(this.audio.src)
      this.audio.load();
      this.audio.play();
    } else  {
      this.secondClicked = row.toString()+col.toString();
      this.currentClicked.push(row.toString()+col.toString());
      this.secondClickedXY = row.toString()+col.toString();
      if (this.firstClickedXY != this.secondClickedXY) {
        this.secondPicBlank = true;
        this.secondSelectedpic = this.randomAnimalXYparing[this.secondClickedXY];

        if (this.firstSelectedPic != this.secondSelectedpic) {
          this.totalClickCount++;
        }
        this.clickCount = 0;
        this.audio.src = "../../assets/soundFolder/" + this.secondSelectedpic.slice(0, -5)+"("+pronouciation+").mp3";
        console.log(this.audio.src)
        this.audio.load();
        this.audio.play();
      }
    }
    
    if (this.firstSelectedPic == this.secondSelectedpic && this.clickCount == 0) {
      this.totalClickCount++;
      this.matchedCardXY.push(this.firstClickedXY, this.secondClickedXY);
    }

    // this.nativeAudio.preloadSimple('test', '../../assets/anaconda(amerian).mp3').then(()=>console.log('haha'));
    // this.nativeAudio.play('test');

    
    
    
  }

  newGame() {
    
    this.currentClicked=[];
    this.totalClickCount = 0;
    this.matchedCardXY = [];
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



  async createPopover() {
    const pop = await this.popover.create({
      component:DimensionpopComponent,
      //event: ev
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


