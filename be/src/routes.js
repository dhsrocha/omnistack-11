"use strict";
const express = require("express");
const ngo = require("./features/ngo")

const router = express.Router();

router.get("/ngo", ngo.index);
router.post("/ngo", ngo.create);

module.exports = router;
