import {ReviewModel} from "./review-model";

export class BookModel {
  public id: number;

  public title: string;

  public author: string;

  public reviews: ReviewModel[];

  public cover: string;

  public content: string;

  public genre: string;

  public rating: number;

  public constructor(id: number,
                     title: string,
                     author: string,
                     reviews: ReviewModel[],
                     rating: number,
                     cover: string,
                     content: string,
                     genre: string) {
    this.rating = rating;
    this.genre = genre;
    this.content = content;
    this.cover = cover;
    this.reviews = reviews;
    this.author = author;
    this.title = title;
    this.id = id;
  }

}
