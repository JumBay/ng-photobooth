import * as express from "express";
import {CamembertController, CamembertRoute} from "camembert";
import {ImageService} from "../services/image.service";

const multer = require('multer');
const upload = multer();


@CamembertController('/api/file')
export class FileController {

  constructor(private imageService: ImageService) {
  }

  @CamembertRoute("POST", "/upload", [upload.single('file')])
  upload(res: express.Response, req: express.Request) {

    let date = new Date();

    let fileName = date.toISOString();

    this.imageService.saveMultipartImage(req.body, __dirname + '/../../files', fileName,
      (err, filePath) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.send(filePath + ' Saved');
        }
      })

  }
}
