export class Movie {
  public title: string;
  public duration: number;
  public genres: string[];

  constructor(title: string, duration: number, genres: string[]) {
    this.title = title;
    this.duration = duration;
    this.genres = genres;
  }
}
