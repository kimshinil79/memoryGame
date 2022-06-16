import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  url: string;
  pageTitle = "Sign In";
  actionButtonText = "Sign In";

  constructor(private readonly router:Router) { }

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
  }

  async signup(email:string, password:string) {
    console.log(email, password);
  }

  async resetPassword(email:string) {
    console.log(email);
  }

}
