import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

//Multilanguage
import { TranslateService } from '@ngx-translate/core';

//Storage
import { Storage } from '@ionic/storage';

//Themes
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Events', url: '/events', icon: 'home' },
    { title: 'Custommers', url: '/custommers', icon: 'people' },
    { title: 'Open Payments', url: '/open-payments', icon: 'cash' },
    { title: 'Products', url: '/products', icon: 'cart' },
    { title: 'Reports', url: '/reports', icon: 'stats-chart' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController,
    private translate: TranslateService,
    private theme: ThemeService,
    private storage: Storage
  ) {
    this.initializeApp();
    this.checkSidemenuDisplay(router.url);
  }
  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.checkSidemenuDisplay(event.url)
      }
    });

    this.checkTheme();
    this.checkLanguage();
  }

  checkSidemenuDisplay(url: string) {
    let removeSidemenuForURLs = ['/login', '/register', '/willkommen'];
    if (removeSidemenuForURLs.includes(url)) {
      this.menuCtrl.enable(false);
    }
    else {
      this.menuCtrl.enable(true);
    }
  }

  checkTheme() {
    this.storage.get('theme').then((val) => {
      if (val == null) {
        this.storage.set('theme', 'dark');
        this.theme.enableDark();
      } else {
        if (val == 'dark') { this.theme.enableDark(); }
        else { this.theme.enableLight(); }
      }
    });
  }

  checkLanguage(){
    this.storage.get('language').then((val) => {
      if(val == null){
        this.translate.setDefaultLang('en');
        this.storage.set('language', 'en');
      }else{
        if (val == 'en') { this.translate.setDefaultLang('en'); }
        else { this.translate.setDefaultLang('de'); }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
    //  this.statusBar.styleDefault();
    //  this.splashScreen.hide();
    //  this.menuCtrl.enable(false);
    });
  }
}
