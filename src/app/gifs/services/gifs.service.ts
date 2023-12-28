import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey: string = 'vuQ8tHqW4U9YspABJGrC0dxdCSI3GAmF';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.getLocalStorage();
  }

  public get getTagHistory() {
    return [...this._tagHistory];
  }

  public setSearchTag(tag: string):void {
    if (tag.length===0) return;

    this.organizeHistory(tag);

    const httpParams = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag)
    ;

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params: httpParams})
    .subscribe( resp => {
      this.gifList = resp.data;
    });
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.getTagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.slice(0, 9);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private getLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse( localStorage.getItem('history')! );

    if (this.setSearchTag.length > 0) {
      this.setSearchTag(this._tagHistory[0])
    }

  }

}
