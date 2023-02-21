import {Component, Input} from '@angular/core';
import {BookModel} from "../../models/book-model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {
  @Input() book: BookModel | undefined;
  constructor(private activeModal: NgbActiveModal) {
  }

  close() {
    this.activeModal.close();
  }
}
