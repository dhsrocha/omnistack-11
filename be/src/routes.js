"use strict";
const express = require("express");
const crypto = require("crypto");

const connection = require("./database/connection");

const router = express.Router();

router.get("/ngo", async (_, req) => {
  req.json({ entities: await connection("ngo").select("*") });
});

router.post("/ngo", async (req, res) => {
  const data = req.body;
  console.info({ "ngo creating request: ": data });
  const { name, email, whatsapp, city, uf } = req.body;

  const id = crypto.randomBytes(4).toString("HEX");

  await connection("ngo").insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });

  res.json({ id });
});

module.exports = router;
