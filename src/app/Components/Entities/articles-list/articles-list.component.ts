import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../Services/article-service';
import {Article} from '../../../Models/article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  private articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.readArticles().subscribe( x => this.articles = x);
    console.log(this.articles);
  }

}
