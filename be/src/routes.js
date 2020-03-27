"use strict";
const express = require("express");
const ngo = require("./features/ngo");
const incident = require("./features/incident");
const profile = require("./features/profile");
const session = require("./features/session");

const router = express.Router();

router.get("/ngo", ngo.index);
router.post("/ngo", ngo.create);

router.get("/incident", incident.index);
router.post("/incident", incident.create);
router.delete("/incident/:id", incident.delete);

router.get("/profile", profile.index);

router.post("/session", session.create);

module.exports = router;
