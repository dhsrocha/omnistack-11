"use strict";
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const data = await connection("incident")
      .limit(5)
      .offset((page - 1) * 5)
      .select("*");
    console.info({ "Received retrieving request": data });
    res.json({ entities: data || {} });
  },
  async create(req, res) {
    const data = req.body;
    console.info({ "incident creating request: ": data });
    const { title, description, value } = req.body;

    const ngo_id = auth(req, res);

    const [id] = await connection("incident")
      .insert({
        title,
        description,
        value,
        ngo_id
      })
      .returning("id");

    return res.json({ id });
  },
  async delete(req, res) {
    const { id } = req.params;
    console.info({ "Received deleting request for id: ": id });

    const ngo_id = auth(req, res);

    const incident = await connection("incident")
      .where("id", id)
      .select("ngo_id")
      .first();

    if (incident.ngo_id !== ngo_id)
      res.status(401).json({ error: "Operation not permitted." });

    await connection("incident")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};

function auth(req, res) {
  const ngo_id = req.headers.authorization;
  if (!ngo_id)
    res
      .status(401)
      .json({ message: "Absent authorization header." })
      .send();
  return ngo_id;
}
