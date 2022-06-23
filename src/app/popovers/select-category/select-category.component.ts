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
  closeButtonValid = true;

  ngOnInit() {
  }

  closePopover() {
    this.selectCategoryPopOver.dismiss();
  }

  checkBoxEvent(category) {
    if(category.nameChecked) {
      if(!this.mgservice.selectedCategory.includes(category.name)) {
        this.mgservice.selectedCategory.push(category.name);
        for ( let item of this.mgservice[category.engName] ) {
          if (!this.mgservice.selectedCategoryItems.includes(item)) {
            this.mgservice.selectedCategoryItems.push(item)
          }          
        }
      }
    }

    if(!category.nameChecked) {
      if(this.mgservice.selectedCategory.includes(category.name)) {
        let indexCategory = this.mgservice.selectedCategory.indexOf(category.name);
        this.mgservice.selectedCategory.splice(indexCategory, 1);
        for (let item2 of this.mgservice[category.engName]) {
          let indexItem = this.mgservice.selectedCategoryItems.indexOf(item2);
          this.mgservice.selectedCategoryItems.splice(indexItem, 1)
        }        
      }

    }

    if (this.mgservice.selectedCategoryItems.length > 0) {
      console.log("zzz?", this.mgservice.selectedCategoryItems)
      this.closeButtonValid = true;
      this.mgservice.newGameButtonValid = true;
    } else {
      console.log('zero')
      this.closeButtonValid = false;
      this.mgservice.newGameButtonValid = false;
    }
  }

  selectAll() {
    this.mgservice.selectedCategory = [];
    this.mgservice.selectedCategoryItems = [];
    for (let category of this.mgservice.categories) {
      category.nameChecked = true;
      this.mgservice.selectedCategory.push(category.name)
      for (let item of this.mgservice[category.engName]) {
        this.mgservice.selectedCategoryItems.push(item)
      }
    }
    this.closeButtonValid = true;
    this.mgservice.newGameButtonValid = true;
  }

  unselectAll() {
    for (let category of this.mgservice.categories) {
      category.nameChecked = false;
    }
    this.mgservice.selectedCategory = [];
    this.mgservice.selectedCategoryItems = [];
    this.closeButtonValid = false;
    this.mgservice.newGameButtonValid = false;
  }

}
