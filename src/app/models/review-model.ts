export class ReviewModel {
  public id: number;

  public message: string;

  public reviewer: string;

  constructor(id:number,
              message:string,
              reviewer:string) {
    this.reviewer = reviewer;
    this.message = message;
    this.id = id;
  }
}
