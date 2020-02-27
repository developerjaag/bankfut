import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Profile } from '@models/profile.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore
  ) { }


  loginGoogle() {
    const toReturn = this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return from(toReturn);
  }

  setPersistence() {
    const toReturn = this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);
    return from(toReturn);
  }

  initAuthListener() {
    return this.afAuth.authState;
  }

  createDocumentUser(profile: Profile) {
    const toReturn = this.afs.collection('Users').doc(profile.uid).set({
      ...profile
    });
    return from(toReturn);
  }

  logout() {
    const toReturn = this.afAuth.auth.signOut();
    return from(toReturn);
  }
}
