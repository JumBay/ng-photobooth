import {CamembertInjectable} from "camembert";
const fs = require('fs');

@CamembertInjectable()
export class ImageService {

  saveMultipartImage(requestBody: any, directory: string, fileName: string, cb: <Function>(err, filePath) => void) {

    let matches = requestBody.file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    let base64Data = matches[2];

    let filePath = directory + '/' + fileName + '.jpeg';

    fs.writeFile(filePath, base64Data, 'base64', function (err) {
      cb(err, filePath);
    });

  }
}
