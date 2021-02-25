import { Component, OnInit } from '@angular/core';

//Multilanguage
import { TranslateService } from '@ngx-translate/core';

//Themes
import { ThemeService } from '../services/theme.service';

//Storage
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  language: string = this.translateService.currentLang;
  checker: Boolean = false;

  constructor(private translateService: TranslateService, private theme: ThemeService, private storage: Storage) { }

  ngOnInit() {
    
    this.storage.get('theme').then((val)=>{
      if (val == 'dark') { 
        this.theme.enableDark();
        this.checker = true;
      }
      else { this.theme.enableLight(); }
    });
  }

  switchLanguage() {
    this.translateService.use(this.language);
  }

  changeTheme(event){
    if(event.detail.checked){
      this.theme.enableDark();
    }
    else{
      this.theme.enableLight();
    }
  }
}
