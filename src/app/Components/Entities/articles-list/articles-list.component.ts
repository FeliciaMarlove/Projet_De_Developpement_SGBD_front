import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleService} from '../../../Services/article-service';
import {Article} from '../../../Models/article';
import {Router} from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  private articles: Article[];
  @Output() clickEvent: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.initArticles();
  }

  onClick(article: Article) {
      this.clickEvent.emit(article);
      this.initArticles();
  }

  initArticles() {
    this.articleService.readArticles().subscribe( articles => this.articles = articles);
  }

  onRefresh() {
    this.initArticles();
  }
}
