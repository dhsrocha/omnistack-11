"use strict";
const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const name = await connection("ngo")
      .where("id", id)
      .select("name")
      .first();

    if (!name)
      return res
        .status(400)
        .json({ error: "No NGO has been found for this ID." });

    return res.json(name);
  }
};
