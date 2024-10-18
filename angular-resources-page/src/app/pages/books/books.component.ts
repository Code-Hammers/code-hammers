import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Book {
  id: string;
  title: string;
  author: string;
  link: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Book[]>('http://localhost:8080/api/books')
      .subscribe((data) => (this.books = data));
  }
}
