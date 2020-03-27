"use strict";
const express = require("express");
const ngo = require("./features/ngo");
const incident = require("./features/incident");

const router = express.Router();

router.get("/ngo", ngo.index);
router.post("/ngo", ngo.create);

router.get("/incident", incident.index);
router.post("/incident", incident.create);
router.delete("/incident/:id", incident.delete);

module.exports = router;
