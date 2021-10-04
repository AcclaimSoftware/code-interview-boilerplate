const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.json("Hello World");
});

app.set("port", 3000);

const server = app.listen(app.get("port"), () => {
  console.log(`Express running at http://localhost:${server.address().port}`);
});
