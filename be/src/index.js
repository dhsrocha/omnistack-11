const express = require("express");

const app = express();
app.use(express.json())

app.get("/", (_, res) => {
  res.json({ msg: "Hello world!" });
});

app.listen(3333);
