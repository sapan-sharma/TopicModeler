"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
var qa_service_1 = require("./qa.service");
var AnswerDetail = (function () {
    function AnswerDetail() {
    }
    return AnswerDetail;
}());
exports.AnswerDetail = AnswerDetail;
var AppComponent = (function () {
    function AppComponent(qaService) {
        this.qaService = qaService;
        this.id = 0;
        this.inputText = '';
        this.qStyle = { 'text-align': 'left', 'margin': '0', 'color': '#000' };
        this.aStyle = { 'text-align': 'right', 'margin': '0', 'color': '#000' };
        this.showStyle = { 'display': 'inline' };
        this.hideStyle = { 'display': 'none' };
        this.displayCardArray = [2, 4, 7];
        this.rdurl = 'http://localhost:3000/#';
        this.queue = new Array();
    }
    AppComponent.prototype.addRow = function () {
        this.id = this.id + 1;
        //add question    
        this.element = { type: 'question', id: this.id, user: 'John Doe', value: this.inputText, style: this.qStyle,
            sentStyle: this.showStyle, btnStyle: this.hideStyle, pageIds: [], texts: [], pageUrls: [] };
        this.queue.push(this.element);
        this.getAnswer();
        this.inputText = '';
    };
    AppComponent.prototype.getAnswer = function () {
        var _this = this;
        this.pagedetails = new Array();
        this.pageIds = new Array();
        this.texts = new Array();
        this.pageUrls = new Array();
        this.qaService.getAnswer(this.inputText)
            .subscribe(function (pds) {
            pds.forEach(function (pd) {
                _this.pagedetails.push(pd);
                _this.pageIds.push(pd.pageId);
                _this.texts.push(pd.text);
                _this.iUrl = "" + pd.pageNum;
                _this.pageUrls.push(_this.iUrl);
            });
        }, function (error) { return _this.errorMessage = error; });
        // if (this.displayCardArray.includes(this.id))
        // {
        this.element = { type: 'answer', id: this.id, user: 'Assistant', value: 'Here you go!', style: this.aStyle,
            sentStyle: this.hideStyle, btnStyle: this.showStyle, pageIds: this.pageIds, texts: this.texts,
            pageUrls: this.pageUrls };
        // }    
        // else
        // {
        // this.element = {type: 'answer', id: this.id, user: 'Assistant', value: 'Malesuada erat. Donec cursus sed eros sit amet volutpa.', style: this.aStyle,
        // sentStyle: this.hideStyle, btnStyle: this.hideStyle};
        // }     
        this.queue.push(this.element);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css', './font-awesome.css'],
        providers: [qa_service_1.QAService]
    }),
    __metadata("design:paramtypes", [qa_service_1.QAService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map