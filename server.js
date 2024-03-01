require("./src/lib/db");
const express = require("express");

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", require("./src/routes/user"));
app.use("/api/v1/admin", require("./src/routes/admin"));
app.use("/api/v1/characters", require("./src/routes/character"));
app.use("/api/v1/business", require("./src/routes/business"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
