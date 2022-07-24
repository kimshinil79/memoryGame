import { Injectable } from '@angular/core';
import { CanActivate,  UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { addDoc, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly auth: Auth, private readonly router: Router,
    private readonly firestore: Firestore,
    private readonly authService: AuthenticationService) {}

  canActivate():  Promise<boolean | UrlTree> {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(this.auth, (user) => {
          if(user) {
            console.log('logged in!!')
            resolve(true);
          } else {
            reject('No user logged in');
            this.router.navigateByUrl('/login');
          }
        })
      })
  }
  
}
