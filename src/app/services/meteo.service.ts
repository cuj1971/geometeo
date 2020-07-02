import { Injectable } from '@angular/core';
import { OWMapService } from './owmap.service';
import { LocalisationService } from './localisation.service';
import { IWeather } from '../interfaces/iweather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  currentCoords: any;
  public weatherReport$: Observable<IWeather>;
  //weather$: Observable<any>;
  public weather: IWeather;
  //public weather:any;

  constructor(private _owmap: OWMapService, private _localisation: LocalisationService) { 
    
  }

  async handleGeoEvents() {
    await this._localisation.getCurrentPosition();
    this.currentCoords = this._localisation.data;
    console.log('this.currentCoords', this.currentCoords);
  }
  
  async makeGeoWeatherRequest(){
    await this._owmap.fetchWeather(this.currentCoords);
    this.weatherReport$ = this._owmap.weather$;
    }

/*
  subscribeWeather() {
    this._owmap
     .fetchWeather(this.currentCoords)
     .subscribe(data => {
       this.weather = data;
     }, err => {
     console.error(err);        
   });
 }
*/

}
