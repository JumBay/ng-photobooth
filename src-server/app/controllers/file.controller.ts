import * as express from "express";
import {CamembertController, CamembertRoute} from "camembert";
import {ImageService} from "../services/image.service";

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer();


@CamembertController('/api/file')
export class FileController {

  constructor(private imageService: ImageService) {
  }

  private getFilesPath() {
    return __dirname + '/../../files';
  }

  @CamembertRoute("POST", "/upload", [upload.single('file')])
  upload(res: express.Response, req: express.Request) {

    let date = new Date();

    let fileName = date.toISOString();

    this.imageService.saveMultipartImage(req.body, this.getFilesPath(), fileName,
      (err, filePath) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.send(filePath + ' Saved');
        }
      })

  }

  @CamembertRoute("GET", "/total")
  getTotal(res: express.Response) {

    fs.readdir(this.getFilesPath(), (err, items) => {

      if (err) {
        res.status(500).send(err);
        return;
      }
      let total = 0;

      items.forEach(item => {
        if (item !== '.gitkeep') {
          total++;
        }
      });

      res.send({total: total});

    });

  }
}
