const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(_, res) {
    const data = await connection("ngo").select("*");
    console.info("ngo retrieving request: ", data);
    res.json({ entities: data || {} });
  },

  async create(req, res) {
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

    return res.json({ id });
  }
};
