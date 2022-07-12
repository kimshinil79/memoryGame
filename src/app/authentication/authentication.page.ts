import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { MGserveService } from '../services/mgserve.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  url: string;
  pageTitle = "Sign In";
  actionButtonText = "Sign In";

  constructor(
    private readonly router:Router,
    private readonly auth: AuthenticationService,
    private readonly firestore: Firestore,
    private readonly MGservice:MGserveService) { }
    

  ngOnInit() {
    this.url = this.router.url.substr(1);

    if (this.url == 'signup') {
      this.pageTitle = "Create Your Account";
      this.actionButtonText = "계정생성";
    }

    if (this.url == "reset") {
      this.pageTitle = "Reset Your Password";
      this.actionButtonText = "비밀번호 재설정";
    }
    this.getPlayersList();
  }

  handleUserCredentials(userCredentials) {
    const {email, password, name} = userCredentials;
    switch (this.url) {
      case 'login':
        this.login(email, password);
        break;
      case 'signup':
        this.signup(email, password, name);
        break;
      case 'reset':
        this.resetPassword(email);
        break;
    }
  }

  async getPlayersList() {
    const mainuser = this.auth.getUser().email;
    let playersTemp = [];
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    querySnapshot.forEach((document) => {
      playersTemp.push(document.id);
    })
    for await (let player of playersTemp) {
      if (player != mainuser) {
        const docRef = doc(this.firestore, "users", player);
        const docSnap = await getDoc(docRef);
        const name = docSnap.data()['name'];
        this.MGservice.players.push({name:name, email:player, nameChecked:false})
      }      
    }
    
  }

  async login(email:string, password:string) {
    try {
      await this.auth.login(email, password);
      this.auth.userEmail = this.auth.getUser().email;
      const docRef = doc(this.firestore, "users", this.auth.userEmail);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        this.auth.userName = docSnap.data()['name'];
        this.MGservice.selectedPlayer = [];
        this.MGservice.selectedPlayer.push(this.auth.userName);
        this.getPlayersList();
      } else {
        console.log("No such document!")
      }

      this.router.navigateByUrl('/tabs');
    } catch(error) {
      console.log("can't login!!")
      this.auth.loginState = true;
    }
  }

  async signup(email:string, password:string, name:string) {
    try {
      await this.auth.signup(email, password);
      
      const userId:string = this.auth.getUser().uid;
      this.auth.userEmail = this.auth.getUser().email;
      setDoc(doc(this.firestore, "users", email), {name:name, userId:userId});
      const docRef = doc(this.firestore, "users", this.auth.userEmail);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        this.auth.userName = docSnap.data()['name'];
        this.MGservice.selectedPlayer = [];
        this.MGservice.selectedPlayer.push(this.auth.userName);
        this.getPlayersList();
      } else {
        console.log("No such document!")
      }
      const userCollection = collection(this.firestore, 'users/');
      
      // addDoc(userCollection, {id :userId, name:'김신일'})
      
      this.router.navigateByUrl('/tabs');
    } catch(error) {
      console.log(error);
    }
  }

  async resetPassword(email:string) {
    console.log(email);
    try {
      await this.auth.resetPassword(email);
      console.log('email sent')
      this.router.navigateByUrl('/tabs');
    } catch(error) {
      console.log('error : ', error);
    }
  }

}
