"use strict";
const environment_1 = require("./environment");
const express = require("express");
const camembert_1 = require("camembert");
const bodyParser = require('body-parser');
const path = require('path');
camembert_1.Camembert.configure(environment_1.environment, (app, routes) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
    routes.forEach((route) => {
        app[route.httpMethod](route.path, route.middleware);
    });
}).start();
//# sourceMappingURL=index.js.map