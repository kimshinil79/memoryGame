import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
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
  loginfail = false;

  constructor(
    private readonly router:Router,
    private readonly auth: AuthenticationService,
    private readonly firestore: Firestore) { }

  ngOnInit() {
    this.url = this.router.url.substr(1);
    console.log('hha', this.router.url)
    if (this.url == 'signup') {
      this.pageTitle = "Create Your Account";
      this.actionButtonText = "계정생성";
    }

    if (this.url == "reset") {
      this.pageTitle = "Reset Your Password";
      this.actionButtonText = "비밀번호 재설정";
    }
  }

  handleUserCredentials(userCredentials) {
    const {email, password} = userCredentials;
    switch (this.url) {
      case 'login':
        this.login(email, password);
        break;
      case 'signup':
        this.signup(email, password);
        break;
      case 'reset':
        this.resetPassword(email);
        break;
    }
  }

  async login(email:string, password:string) {
    console.log(email, password)
    try {
      await this.auth.login(email, password);

      this.router.navigateByUrl('/tabs');
    } catch(error) {
      console.log("can't login!!")
      this.loginfail = true;
    }
  }

  async signup(email:string, password:string) {
    console.log(email, password);
    try {
      await this.auth.signup(email, password);
      const userId:string = this.auth.getUser().uid;
      const userCollection = collection(this.firestore, 'users/'+userId+'/profile/');
      
      addDoc(userCollection, {id :userId, name:'김신일'})

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
