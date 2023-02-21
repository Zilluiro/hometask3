import { Injectable } from '@angular/core';
import { data } from '../data/data'
import {Observable, of, Subject} from "rxjs";
import {BookModel} from "../models/book-model";
import {AddUpdateBookModel} from "../models/add-update-book-model";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  editBookSubject: Subject<BookModel> = new Subject<BookModel>();

  constructor() { }

  getAllBooks(): Observable<BookModel[]> {
    return of(data);
  }

  getRecommendedBooks(): Observable<BookModel[]> {
    return of(this.shuffle([... data]));
  }

  getBookDetails(bookId: number): Observable<BookModel | undefined>{
    return of(data.find(x => x.id == bookId));
  }

  addUpdateBook(model: AddUpdateBookModel): Observable<number> {
    let found = data.find(x => x.id == model.id);
    // add book
    if (model.id == 0 || !found){
      model.id = data.length + 1;
      data.push(model.toBookModel());
      return of(model.id);
    }

    // update book
    found.title = model.title;
    found.author = model.author;
    found.content = model.content;
    found.cover = model.cover;
    found.genre = model.genre;

    return of(found.id);
  }

  deleteBook(id: number){
    const index = data.findIndex(x => x.id == id);
    if (index > -1) {
      data.splice(index, 1);
    }
  }

  private shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };
}
