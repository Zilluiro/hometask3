import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {AddUpdateBookModel} from "../../models/add-update-book-model";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  editBookForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl("", [Validators.required, Validators.maxLength(128)]),
    coverFile: new FormControl(),
    cover: new FormControl("", [Validators.required]),
    genre: new FormControl("", [Validators.required, Validators.maxLength(32)]),
    author: new FormControl("", [Validators.required, Validators.maxLength(64)]),
    content: new FormControl("", [Validators.required])
  });

  isEntryNew = true;

  constructor(private bookService: BookService) {
    bookService.editBookSubject.subscribe(x => {
        let copy = {... x, cover: ""};
        this.editBookForm.patchValue(copy);
        this.isEntryNew = false;
      }
    );
  }

  addOrUpdate() {
    if (this.editBookForm.invalid){
      return;
    }

    const values = this.editBookForm.value;

    const model = new AddUpdateBookModel(values.id, values.title, values.author,
      values.cover, values.content, values.genre);
    this.bookService.addUpdateBook(model);
  }

  clear() {
    this.isEntryNew = true;
    this.editBookForm.reset();
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      const file = fileList.item(0);
      if (file != null){
        this.convertFileToBase64(file).subscribe(x => {
            this.editBookForm.patchValue({"cover" : x});
          }
        );
      }
    }
  }

  convertFileToBase64(file : File): Observable<string>{
    return new Observable<string>(observer => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onerror = observer.error;
      reader.onabort = observer.error;
      reader.onload = () => {
        observer.next(reader.result as string);
      }

      return { unsubscribe: reader.abort }
    });
  }
}
