import {Injectable} from '@angular/core';

@Injectable()
export class PhotoService {
  private srcPhotos: string[] = ['http://www.rogueamoeba.com/global/images/icons/96/freebies@2x.png'];

  constructor() {
  }

  addToList(src: string) {
    this.srcPhotos.unshift(src);
  }

  getList() {
    return this.srcPhotos;
  }
}
