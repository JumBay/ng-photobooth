import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class PhotoService {
  private srcPhotos: string[] = [];

  constructor(private http: Http) {
  }

  upload(src: string) {
    let input = new FormData();

    input.append("file", src);

    this.http.post('/api/file/upload', input)
      .subscribe(() => {
        this.addToList(src);
      })

  }

  addToList(src: string) {
    this.srcPhotos.unshift(src);
  }

  getList() {
    return this.srcPhotos;
  }
}
