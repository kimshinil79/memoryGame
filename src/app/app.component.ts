import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';
import { SelectCategoryComponent } from './popovers/select-category/select-category.component';
import { SelectPlayerComponent } from './popovers/select-player/select-player.component';
import { SplashScreen } from '@capacitor/splash-screen';
import { AuthenticationService } from './authentication/authentication.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { MGserveService } from './services/mgserve.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private popover: PopoverController,
    public auth: AuthenticationService,
    private readonly firestore:Firestore,
    private MGservice : MGserveService
  ) {}

  async ngOnInit() {
    SplashScreen.show({
      showDuration:5000,
      autoHide: false
    })
    // this.auth.userEmail = this.auth.getUser().email;
    // const docRef = doc(this.firestore, "users", this.auth.userEmail);
    // const docSnap = await getDoc(docRef);
    // if(docSnap.exists()) {
    //   this.auth.userName = docSnap.data()['name'];
    //   this.MGservice.selectedPlayer = [];
    //   this.MGservice.selectedPlayer.push(this.auth.userName);
    // } else {
    //   console.log("No such document!")
    // }

  }

  async createPlayerSelectPopover() {
    const pop2 = await this.popover.create({
      component:SelectPlayerComponent
    });
    return pop2.present();
   }

  async selectCategory() {
    const pop1 = await this.popover.create({
      component: SelectCategoryComponent
    });
    return pop1.present();
  }
   
}
