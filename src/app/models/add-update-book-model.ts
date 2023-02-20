import {BookModel} from "./book-model";

export class AddUpdateBookModel {
  public id: number;

  public title: string;

  public author: string;

  public cover: string;

  public content: string;

  public genre: string;

  public constructor(id: number,
                     title: string,
                     author: string,
                     cover: string,
                     content: string,
                     genre: string) {
    this.genre = genre;
    this.content = content;
    this.cover = cover;
    this.author = author;
    this.title = title;
    this.id = id;
  }

  toBookModel(): BookModel {
    return new BookModel(this.id, this.title, this.author, [], 0, this.cover, this.content, this.genre);
  }
}
