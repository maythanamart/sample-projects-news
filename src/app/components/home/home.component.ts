import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news!: News[];
  currentNews!: News;

  newsDialog: boolean = false;
  flagEdit: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.refreshNews();
  }

  refreshNews() {
    this.appService.getNews(3).then(res => this.news = res);
  }

  updateStatus(id: number) {
    var currentStatus = this.news.find(x => x.NewsId == id)?.Status || 0;
    this.appService.updateStatusNews(id.toString(), currentStatus).then(_ => this.refreshNews());
  }

  viewDetail(id: number) {
    console.log(id);
    this.currentNews = this.news.find(x => x.NewsId == id) || new News();
    this.flagEdit = false;
    this.newsDialog = true;
  }
  editDetail(id: number) {
    this.currentNews = this.news[id-1];
    this.flagEdit = true;
    this.newsDialog = true;
  }

  cancel = () => this.newsDialog = false;
  resetForm() {
    this.currentNews = new News();
  }
}
