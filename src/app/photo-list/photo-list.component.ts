import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../shared/photo.service";
import {Observable} from "rxjs";

@Component({
  selector: 'pb-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: string[] = [];

  total: Observable<number>;

  constructor(private photoService: PhotoService) {
    this.photos = this.photoService.getList();
    this.total = this.photoService.getTotal();
  }

  ngOnInit() {
  }

}
