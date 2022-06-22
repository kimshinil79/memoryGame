import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MGserveService } from 'src/app/services/mgserve.service';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss'],
})
export class SelectCategoryComponent implements OnInit {

  constructor(
    private selectCategoryPopOver: PopoverController,
    private mgservice: MGserveService
  ) { }

  categories=[];

  ngOnInit() {
    this.categories = this.mgservice.categories;
  }

  closePopover() {
    this.selectCategoryPopOver.dismiss();
  }

  checkBoxEvent(category) {
    if(category.nameChecked) {
      if(!this.mgservice.selectedCategory.includes(category.name)) {
        this.mgservice.selectedCategory.push(category.name)
      }
    }

    if(!category.nameChecked) {
      if(this.mgservice.selectedCategory.includes(category.name)) {
        let indexCategory = this.mgservice.selectedCategory.indexOf(category.name);
        this.mgservice.selectedCategory.splice(indexCategory, 1)
      }
    }
  }

  selectAll() {
    this.mgservice.selectedCategory = [];
    for (let category of this.mgservice.categories) {
      category.nameChecked = true;
      this.mgservice.selectedCategory.push(category.name)
    }
  }

  unselectAll() {
    for (let category of this.mgservice.categories) {
      category.nameChecked = false;
    }
    this.mgservice.selectedCategory = [];
  }

}
