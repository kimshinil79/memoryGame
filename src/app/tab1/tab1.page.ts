import { Component } from '@angular/core';
import { MGserveService } from '../services/mgserve.service';
import { popoverController } from '@ionic/core';
import { DimensionpopComponent } from '../popovers/dimensionpop/dimensionpop.component';
import { PopoverController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { SelectPlayerComponent } from '../popovers/select-player/select-player.component';
import { AuthenticationService } from '../authentication/authentication.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public MGservice: MGserveService, 
    private popover:PopoverController,
    private menu:MenuController, 
    public auth: AuthenticationService
  ) {}

  randomItemXYparing = {}

  userName: string;

  ngOnInit() {
    console.log(this.MGservice.selectedCategoryItems);
    this.randomItemXYparing = this.MGservice.randomPositionPic();
    for (let k=0;k<this.MGservice.selectedPlayer.length;k++){
      this.MGservice.scoreList.push(0);
      console.log('haha', this.MGservice.scoreList)
    }
    for (let i=0;i<this.MGservice.gameDimensionX;i++){
      this.rows.push(i.toString())
    }
    for (let j=0;j<this.MGservice.gameDimensionY;j++) {
      this.columns.push(j.toString())
    }
    this.createPlayerSelectPopover();
    if (this.MGservice.selectedCategoryItems.length >0) {
      this.MGservice.newGameButtonValid = true;
    }
    this.userName = this.auth.getUser().email
    console.log('userName', this.userName)
    
    
  }



  rows = [];
  columns = [];
  firstPicBlank = false;
  secondPicBlank = false;
  firstClickedXY = "00";
  secondClickedXY ="00";
  firstSelectedPic = "";
  secondSelectedpic = "";
  clickCount = 0; //0이면 첫번째 사진이 클릭된 것으로 인식, 1이면 두번째 사진이 클릭된 것으로 인식, 턴이 바뀌면 다시 0이 된다.
  matchedCardXY = [];
  totalClickCount = 0;
  audio = new Audio();
  americanBritish = ["american", "british"]

  currentClicked = [];

  firstClicked = "";
  secondClicked = "";
  clickCountforTimer = 0;

  playerNum = 0;
  whoIsTurnIndex = 0;


  

  
  clickCard(row:string, col:string) {

    if (this.matchedCardXY.includes(row+col)) {
      return
    }

    if (this.matchedCardXY.includes(this.firstClickedXY) && this.matchedCardXY.includes(this.secondClickedXY)) {
      document.getElementById(this.firstClickedXY).style.backgroundImage="";
      document.getElementById(this.secondClickedXY).style.backgroundImage="";
      document.getElementById(this.firstClickedXY).style.backgroundColor = "rgb(164, 216, 239)"
      document.getElementById(this.secondClickedXY).style.backgroundColor = "rgb(164, 216, 239)"
      document.getElementById(this.firstClickedXY).style.border = "none"
      document.getElementById(this.secondClickedXY).style.border = "none"
    }

    if(this.MGservice.selectedPlayer.length<2){
      this.clickCountforTimer++;
    }    

    let rand = Math.floor(Math.random()*this.americanBritish.length);
    let pronouciation = this.americanBritish[rand];
    
    if (this.clickCount == 0) {

      document.getElementById(this.firstClickedXY).style.backgroundImage = "";
      document.getElementById(this.secondClickedXY).style.backgroundImage = "";
      this.firstClickedXY = row+col; 
      this.currentClicked = [];
      this.currentClicked.push(this.firstClickedXY)
      this.firstPicBlank = true;
    
      this.firstSelectedPic = this.randomItemXYparing[this.firstClickedXY];

      this.clickCount++;
      this.secondPicBlank = false;
      document.getElementById(this.firstClickedXY).style.backgroundImage = "url('../../assets/Pic/"+this.firstSelectedPic+"')";
      document.getElementById(this.firstClickedXY).style.backgroundSize = "80% 100%"
      document.getElementById(this.firstClickedXY).style.backgroundRepeat = "no-repeat"
      document.getElementById(this.firstClickedXY).style.backgroundPosition = "center";
      this.audio.src = "../../assets/soundFolder/" + this.firstSelectedPic.slice(0, -5)+"("+pronouciation+").mp3";
      this.audio.load();
      this.audio.play();
    } else  {
      this.secondClickedXY = row+col;
      this.currentClicked.push(this.secondClickedXY);
      
      if (this.firstClickedXY != this.secondClickedXY) {
        this.secondPicBlank = true;
        this.secondSelectedpic = this.randomItemXYparing[this.secondClickedXY];

        document.getElementById(this.secondClickedXY).style.backgroundImage = "url('../../assets/Pic/"+this.secondSelectedpic+"')";
        document.getElementById(this.secondClickedXY).style.backgroundSize = "80% 100%"
        document.getElementById(this.secondClickedXY).style.backgroundRepeat = "no-repeat";
        document.getElementById(this.secondClickedXY).style.backgroundPosition = "center"

        if (this.firstSelectedPic != this.secondSelectedpic) {
          this.totalClickCount++;
          if (this.whoIsTurnIndex < this.MGservice.selectedPlayer.length-1) {
            this.whoIsTurnIndex++;
          } else {
            this.whoIsTurnIndex =0;
          }
          
        }
        this.clickCount = 0;
        this.audio.src = "../../assets/soundFolder/" + this.secondSelectedpic.slice(0, -5)+"("+pronouciation+").mp3";
        this.audio.load();
        this.audio.play();
      }
    }
    
    if (this.firstSelectedPic == this.secondSelectedpic && this.clickCount == 0) {
      this.totalClickCount++;
      this.matchedCardXY.push(this.firstClickedXY, this.secondClickedXY);
      this.MGservice.scoreList[this.whoIsTurnIndex]++;
    }

    if (this.clickCountforTimer == 1) {
      this.timerStart();
    }

    if (this.matchedCardXY.length === this.rows.length * this.columns.length){
      this.timerStop();
    }
    
  }

  newGame() {

    this.MGservice.scoreList=[];
    this.whoIsTurnIndex = 0;
    this.playerNum = this.MGservice.selectedPlayer.length;
    this.currentClicked=[];
    this.totalClickCount = 0;
    this.matchedCardXY = [];
    this.MGservice.picTypeNum = this.MGservice.gameDimensionX * this.MGservice.gameDimensionY /2
    this.randomItemXYparing = this.MGservice.randomPositionPic();
    this.firstPicBlank = false;
    this.secondPicBlank = false;
    this.rows=[];
    this.columns=[];
    this.time = "00:00.000";
    this.timerStop();
    this.clickCountforTimer = 0;
    for (let i=0;i<this.MGservice.gameDimensionX;i++){
      this.rows.push(i.toString())
    }
    for (let j=0;j<this.MGservice.gameDimensionY;j++) {
      this.columns.push(j.toString())
    }
    for (let k=0;k<this.MGservice.selectedPlayer.length;k++){
      this.MGservice.scoreList.push(0);
    }

    let colTag = document.getElementsByName('card');
    for (let i=0;i<colTag.length;i++) {
      let col = colTag[i];
      col.style.backgroundImage = "";
      col.style.backgroundColor = "rgb(73, 142, 157)";
      col.style.border = "none";
      col.style.borderColor = "rgb(117, 217, 222)";
      col.style.borderWidth = "3px";
    }
      
  }


  async createGameSizePopover() {
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

  async createPlayerSelectPopover() {
   const pop2 = await this.popover.create({
     component:SelectPlayerComponent
   });
   return pop2.present();
  }

  public time = "00:00.000";
  public started = null;
  public timebegan = null;

  timerStart() {

    this.timebegan = new Date();

    this.started = setInterval(this.clockrunning.bind(this), 10);
  }

  timerStop() {
    //this.time = "00:00.000";
    clearInterval(this.started);
  }

  zeroPrefix(num, digit){
    let zero = '';
    for(let i = 0;i<digit;i++){
      zero+='0';
    }
    return (zero+num).slice(-digit);
  }

  clockrunning() {
    let currentTime:any = new Date();
    let timeElapsed:any = new Date(currentTime-this.timebegan);

    let min = timeElapsed.getUTCMinutes();
    let sec = timeElapsed.getUTCSeconds();
    let ms = timeElapsed.getUTCMilliseconds();

    this.time = this.zeroPrefix(min, 2) + ":" + this.zeroPrefix(sec,2) + ":" + this.zeroPrefix(ms, 3);
  }

  saveRecord() {
    this.MGservice.addRecord(this.time);
  }

  

}


