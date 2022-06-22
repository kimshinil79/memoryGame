import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';
import { SelectCategoryComponent } from './popovers/select-category/select-category.component';
import { SelectPlayerComponent } from './popovers/select-player/select-player.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private popover: PopoverController
  ) {}

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
