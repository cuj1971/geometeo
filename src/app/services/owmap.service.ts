import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { IWeather } from '../interfaces/iweather';


@Injectable({
  providedIn: 'root'
})
export class OWMapService {
  // The BehaviorSubject will store the instance into memory and allows us to emit new values
  private _weather: BehaviorSubject<IWeather> = new BehaviorSubject<IWeather>(null);
  // The Observable is just a limited version of BehaviorSubject to expose to public
  public weather$: Observable<IWeather> = this._weather.asObservable();

  appId = environment.openWeatherMapId;

  constructor(private _http: HttpClient) {
    }

  async fetchWeather(coords){
    console.log('fetchWeather(coords):', coords);
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.appId}&units=metric`;
    
    
    /*
    return this._http.get<any>(endPoint).pipe(
      tap(res => this._weather.next(res)),
      switchMap(() => this.getWeather())
    )
    */
    
    const response = await this._http.get<IWeather>(endPoint).toPromise();
    this._weather.next(response);

  }

  public getWeather(){
    return this.weather$;
  }
}
