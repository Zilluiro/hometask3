import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookModel} from "../../models/book-model";
import {BookService} from "../../services/book.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViewBookComponent} from "../view-book/view-book.component";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
  @Input()
  book: BookModel | undefined;

  constructor(private bookService: BookService, private modalService: NgbModal) {
  }

  edit() {
    if (this.book) {
      this.bookService.editBookSubject.next(this.book);
    }
  }

  details() {
    const modalRef = this.modalService.open(ViewBookComponent, {"size" : "lg"});
    modalRef.componentInstance.book = this.book;
  }
}
