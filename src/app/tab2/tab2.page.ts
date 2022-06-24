import { Component } from '@angular/core';
import { MGserveService } from '../services/mgserve.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public MGservice: MGserveService
  ) {}
  
  aaa = null;
  ngOnInit() {
    console.log('tab2222')
  }

  test() {
    document.getElementById('aa').style.backgroundImage = "url('../../assets/animalPic/anaconda0.jpg')"
    document.getElementById('aa').style.backgroundSize = "100% 100%"
  }

  test2() {
    document.getElementById('bb').style.backgroundImage = "url('../../assets/Pic/orange4.jpg')"
    this.MGservice.readFile('../../assets/Pic/orange4.jpg');
  }

  

}
