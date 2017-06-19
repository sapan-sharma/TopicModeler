import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';

import 'rxjs/add/observable/of';
import {QAService} from './qa.service';

import { Element } from './element';
import {Pagedetail} from './pagedetail';

export class AnswerDetail{
  id: number;
  pageDetails: Pagedetail[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './font-awesome.css'],
  providers: [QAService]
})



export class AppComponent{

  constructor(private qaService: QAService){}

  errorMessage: string;

  id=0;
  inputText = '';
  qStyle= {'text-align':'left', 'margin':'0', 'color':'#000'};
  aStyle= {'text-align':'right', 'margin':'0', 'color':'#000'};
  showStyle= {'display': 'inline'};
  hideStyle= {'display':'none'};
  displayCardArray = [2,4,7];


  element: Element;
  pagedetails: Pagedetail[];
  
  pageIds: string[];
  texts: string[];
  pageUrls: string[];
  rdurl = 'http://localhost:3000/#';
  iUrl: string;
 
  queue = new Array<Element>();

  addRow(){
    this.id = this.id + 1;
    //add question    
    this.element = {type: 'question', id: this.id, user: 'John Doe', value: this.inputText, style: this.qStyle,
      sentStyle: this.showStyle, btnStyle: this.hideStyle, pageIds: [], texts: [], pageUrls: []};
    this.queue.push(this.element);      
    
    this.getAnswer();

    this.inputText = '';
  }  


  getAnswer(): void{

    this.pagedetails = new Array<Pagedetail>();
    this.pageIds = new Array<string>();
    this.texts = new Array<string>();
    this.pageUrls = new Array<string>();

    this.qaService.getAnswer(this.inputText)
                  .subscribe(
                    pds => {pds.forEach(pd => {
                              this.pagedetails.push(pd);
                              this.pageIds.push(pd.pageId);
                              this.texts.push(pd.text);
                              this.iUrl = `${pd.pageNum}`;
                              this.pageUrls.push(this.iUrl);
                            })},
                    error => this.errorMessage = <any>error
                 );           
    // if (this.displayCardArray.includes(this.id))
    // {
    this.element= {type: 'answer', id: this.id, user: 'Assistant', value: 'Here you go!' , style: this.aStyle,
                sentStyle: this.hideStyle, btnStyle: this.showStyle, pageIds: this.pageIds, texts: this.texts,
              pageUrls: this.pageUrls};
    // }    
    // else
    // {
    // this.element = {type: 'answer', id: this.id, user: 'Assistant', value: 'Malesuada erat. Donec cursus sed eros sit amet volutpa.', style: this.aStyle,
    // sentStyle: this.hideStyle, btnStyle: this.hideStyle};
    // }     
    this.queue.push(this.element)
  }  

}