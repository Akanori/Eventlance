import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../_types/user';
import { NavController, ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private toast: ToastController, private menuCtrl: MenuController) { }

  async loginWithEmailAndPassword(user: User, redirectToURL?: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        // Logged in
        if (redirectToURL) {
          this.router.navigateByUrl(redirectToURL);

        }
      }
    }
    catch (e) {
      this.toast.create({
        message: `Fehler beim Login!`,
        duration: 3000
      }).then(toast => toast.present());
      this.router.navigateByUrl('/login');
    }
  }

  async createUserWithEmailAndPassword(user: User, redirectToURL?: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);

      if (result) {
        await (await this.afAuth.currentUser).updateProfile({
          displayName: user.displayName,
          photoURL: ''
        }
        );


        this.toast.create({
          message: `Benutzer ${result.user.email} erfolgreich registriert!`,
          duration: 3000
        }).then(toast => toast.present());

      }
      if (redirectToURL) {
        this.router.navigateByUrl(redirectToURL);
      }
    }
    catch (e) {
      console.log(e);
      this.toast.create({
        message: `Registrierung fehlgeschlagen!`,
        duration: 3000
      }).then(toast => toast.present());
    }
  }

  logout() {
    this.menuCtrl.enable(false);
    this.afAuth.signOut().then(() => {
      console.log("User succesfully logged out!");
      this.router.navigateByUrl('/login');
    });
  }
}
