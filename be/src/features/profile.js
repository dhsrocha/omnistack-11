"use strict";
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ngo_id = req.headers.authorization;

    if (!ngo_id)
      res
        .status(401)
        .json({ message: "Absent authorization header." })
        .send();

    const data = await connection("incident")
      .where("ngo_id", ngo_id)
      .select("*");
    console.info({ "Received retrieving request": data });

    return res.json({ entities: data || {} });
  }
};
