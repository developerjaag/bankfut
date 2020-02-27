// core and third party libraries
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

// rxjs

// states
import { AuthState } from '@store/states/auth.state';

// actions
import { authSetProfile } from '@store/actions/auth/auth.actions';

// selectors

// models
import { Profile } from '@models/profile.model';

// services
import { AuthService } from '@services/auth.service';

// components


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private authService: AuthService,
    private readonly afs: AngularFirestore,
    private store: Store<AuthState>
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.listenerAuth();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  listenerAuth() {
    this.authService.initAuthListener().subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.getProfileData(fbUser.uid);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  getProfileData(uid) {

    const usersRef = this.afs.firestore.collection('Users').doc(uid);
    usersRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const objectProfile: Profile = {
          uid: doc.id,
          email: data.email,
          name: data.name
        };
        objectProfile.avatar = data.avatar ? data.avatar : null;
        this.setProfile(objectProfile);
        this.router.navigate(['/tabs/goals']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  // set profile on store
  setProfile(profile: Profile) {
    const action = authSetProfile({ profile });
    this.store.dispatch(action);
  } // end setProfile



}
