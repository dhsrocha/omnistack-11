"use strict";
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express(routes);
app.use(express.json());
app.use(cors({
  // https:some-site-to-deploy.com.br # in case of production environments.
}));

app.use(routes);
app.listen(3333);
