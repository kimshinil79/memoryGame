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
      if(!this.mgservice.selectedCategory.includes(category.engName)) {
        this.mgservice.selectedCategory.push(category.engName);
        this.mgservice.selectedCategoryItems = [];
        for (let category of this.mgservice.selectedCategory) {
          for ( let item of this.mgservice[category] ) {
            if (!this.mgservice.selectedCategoryItems.includes(item)) {
              this.mgservice.selectedCategoryItems.push(item)
            }          
          }
        }
        
      }
    }

    if(!category.nameChecked) {
      if(this.mgservice.selectedCategory.includes(category.engName)) {
        let indexCategory = this.mgservice.selectedCategory.indexOf(category.engName);
        this.mgservice.selectedCategory.splice(indexCategory, 1);
        this.mgservice.selectedCategoryItems = [];
        for (let category of this.mgservice.selectedCategory) {
          for ( let item of this.mgservice[category] ) {
            if (!this.mgservice.selectedCategoryItems.includes(item)) {
              this.mgservice.selectedCategoryItems.push(item)
            }          
          }
        }       
      }

    }

    if (this.mgservice.selectedCategoryItems.length > 0) {
      this.closeButtonValid = true;
      this.mgservice.newGameButtonValid = true;
    } else {
      this.closeButtonValid = false;
      this.mgservice.newGameButtonValid = false;
    }
  }

  selectAll() {
    this.mgservice.selectedCategory = [];
    this.mgservice.selectedCategoryItems = [];
    for (let category of this.mgservice.categories) {
      category.nameChecked = true;
      this.mgservice.selectedCategory.push(category.engName)
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
