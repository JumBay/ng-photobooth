import {environment} from "./environment";
import * as express from "express";
import {Camembert, CamembertRouting} from "camembert";
const bodyParser = require('body-parser');
const path = require('path');


Camembert.configure(environment, (app: express.Application, routes: CamembertRouting[]) => {

  // Parsers for POST data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../dist')));


  // Catch all other routes and return the index file
  app.get('*', (req, res, next) => {
    if (req.url.match('/api/')) {
      next();
    } else {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
  });


  //Register the routes
  routes.forEach((route) => {
    app[route.httpMethod](route.path, route.middleware);
  });

}).start();
