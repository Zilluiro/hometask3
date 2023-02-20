import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {BookModel} from "../../models/book-model";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  books$: Observable<BookModel[]> | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getRecommendedBooks(): void{
    this.books$ = this.bookService.getRecommendedBooks();
  }

  getAllBooks(): void{
    this.books$ = this.bookService.getAllBooks();
  }
}
