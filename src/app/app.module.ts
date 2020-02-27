import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// firebase
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@environments/environment';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// @ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// http
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as fromEffects from '@store/effects';
import * as fromServices from '@services/index';
import * as fromGuards from '@guards/index';


const PROVIDERS = [
  { provide: 'API_TOKEN', useValue: environment.token },
  ...fromServices.SERVICES,
  ...fromGuards.guards
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,

    // firebase
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,

    // ngrx
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(fromEffects.EFFECTS),

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestore,
    PROVIDERS,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
