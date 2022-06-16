import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, User, UserCredential } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly auth:Auth) { }

  getUser(): User {
    return this.auth.currentUser;
  }

  getUser$(): Observable<User> {
    return of(this.getUser())
  }

}
