import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly auth:Auth, private readonly firestore: Firestore) { }

  loginState = false;
  userEmail:string;
  userName:string;

  getUser(): User {
    return this.auth.currentUser;
  }

  getUser$(): Observable<User> {
    return of(this.getUser())
  }

  login(email:string, password:string) : Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email:string, password:string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email:string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout(): Promise<void> {
    console.log('logout');
    this.loginState = false;
    return signOut(this.auth);
  }

}
