const express = require("express");
const cors = require("cors");
const { validateToken } = require("./validatorService");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/validateToken", (req, res) => {
  const isValid = validateToken(req.body.token);
  res.json({ isValid });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
