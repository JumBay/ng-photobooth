import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable, Observer} from "rxjs";

@Injectable()
export class PhotoService {
  private lastPhotos: string[] = [];
  private limit = 30;

  private totalObserver: Observer<number>;
  private totalObservable: Observable<number>;


  constructor(private http: Http) {
  }

  upload(src: string) {
    let input = new FormData();

    input.append("file", src);

    this.http.post('/api/file/upload', input)
      .subscribe(() => {
        this.addToList(src);
        this.getTotalFromServer();
      })

  }

  addToList(src: string) {
    this.lastPhotos.unshift(src);
    if (this.lastPhotos.length > this.limit) {
      this.lastPhotos.pop();
    }
  }

  getList() {
    return this.lastPhotos;
  }

  private getTotalFromServer() {
    this.http
      .get('/api/file/total')
      .map((res) => res.json().total)
      .subscribe(res => {
        this.totalObserver.next(res);
      });
  }

  getTotal(): Observable<number> {
    if (!this.totalObservable) {
      this.totalObservable = Observable.create(observer => {

        this.totalObserver = observer;
      });

    }

    this.getTotalFromServer();

    return this.totalObservable;
  }
}
