"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const express = require("express");
const camembert_1 = require("camembert");
const image_service_1 = require("../services/image.service");
const multer = require('multer');
const upload = multer();
let FileController = class FileController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    upload(res, req) {
        let date = new Date();
        let fileName = date.toISOString();
        this.imageService.saveMultipartImage(req.body, __dirname + '/../../files', fileName, (err, filePath) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(filePath + ' Saved');
            }
        });
    }
};
__decorate([
    camembert_1.CamembertRoute("POST", "/upload", [upload.single('file')]), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, Object]), 
    __metadata('design:returntype', void 0)
], FileController.prototype, "upload", null);
FileController = __decorate([
    camembert_1.CamembertController('/api/file'), 
    __metadata('design:paramtypes', [image_service_1.ImageService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map