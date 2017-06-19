import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Pagedetail} from './pagedetail';

@Injectable()
export class QAService {

    private getMethod = 'http://127.0.0.1:5000/ask/';
    private url: string;    

    constructor(private http: Http) { }    

    displayCardArray = [2,4,7];

    getAnswer(question): Observable<Pagedetail[]> {
        
        this.url = `${this.getMethod}${question}`

        return this.http.get(this.url)
        .map((_response: Response) => {                
                return _response.json();
                })
        .catch(this.handleError);
    }
    
    private onSuccess(resp : Response) {
        return this.getMock();
    }

    private handleError (error: Response | any) {    
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  lst: Array<Pagedetail>;
  pd1: Pagedetail;

  getMock(): Pagedetail[] {      

      this.lst = new Array<Pagedetail>();
      this.pd1 = {pageNum: 5, pageId: 'fgdfg', text: 'test string'}
      this.lst.push(this.pd1);

      this.pd1 = {pageNum: 6, pageId: 'fgdfg1', text: 'test string1'}
      this.lst.push(this.pd1);

      return this.lst;
  }

}