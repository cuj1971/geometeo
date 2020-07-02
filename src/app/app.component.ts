import { Component } from '@angular/core';
import { Plugins, Motion } from '@capacitor/core';
import { LocalisationService } from './services/localisation.service';
import { OWMapService } from './services/owmap.service';
import { Observable } from 'rxjs';
import { IWeather } from './interfaces/iweather';
import { MeteoService } from './services/meteo.service';
import { Platform, ToastController } from '@ionic/angular';

// const { Motion, Camera  } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  //weather: IWeather;
  weatherData$:Observable<IWeather>;
  myDate = Date.now();

  constructor(private _meteoService:MeteoService,
    private _platform: Platform,
    private _toastCtrl: ToastController){
      
      this._platform.ready().then(platform => {
        this.displayToastInstall();
        console.log('hi');
        
      })
      
      this.getStarted();
  }

  async getStarted(){
    await this._meteoService.handleGeoEvents();
    await this._meteoService.makeGeoWeatherRequest();
    this.weatherData$ = this._meteoService.weatherReport$;
  }

  async displayToastInstall(platform = null) {
    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = platform || window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);
    // Checks if should display install popup notification:
    console.log(platform, isIos(), !isInStandaloneMode());
    if (isIos() && !isInStandaloneMode()) {
      const toast = await this._toastCtrl.create({
        header: 'Install PWA',
        message: 'Please click ok to install PWA',
        buttons: [
          {
            text: 'Ok',
            role: 'ok'
          }
        ]
      });
      await toast.present();

    }
  }

}