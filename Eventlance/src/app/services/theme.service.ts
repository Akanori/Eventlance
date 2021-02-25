import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

//Storage
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2
  
  systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  

  constructor(private renderFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document, private storage: Storage) {
    this.renderer = this.renderFactory.createRenderer(null, null);
   }

  enableDark(){
    document.body.setAttribute('data-theme', 'dark');
    this.systemDark.addListener(this.colorTest);
    this.storage.set('theme', 'dark');
  }

  enableLight(){
    document.body.setAttribute('data-theme', 'light');
    this.systemDark.addListener(this.colorTest);
    this.storage.set('theme', 'light');
  }

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
