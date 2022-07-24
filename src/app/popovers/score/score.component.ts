import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MGserveService } from 'src/app/services/mgserve.service';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {

  constructor(
    public MGservice: MGserveService,
    public auth: AuthenticationService,
    private readonly firestore:Firestore
  ) { }

  score = 0;
  userName = ""

  async ngOnInit() {
    this.score = this.MGservice.score;
    this.auth.userEmail = this.auth.getUser().email;
    const docRef = doc(this.firestore, "users", this.auth.userEmail);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      this.userName = docSnap.data()['name'];
    }

    console.log(this.userName);
  }

}
