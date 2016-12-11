import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../shared/photo.service";

@Component({
  selector: 'pb-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  private photos: string[] = [];

  constructor(private photoService: PhotoService) {
    this.photos = this.photoService.getList();
  }

  ngOnInit() {
  }

}
