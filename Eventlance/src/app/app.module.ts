import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// AngularFire2 importieren
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Environments importieren
import { environment } from "../environments/environment";

// Guard für Willkommensseite
import { WelcomeGuard } from './_core/welcome.guard';

//Multilanguage
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//Storrage
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuthGuard,
    WelcomeGuard
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}

