const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height) / 100;

  if (isNaN(weight) || isNaN(height) || height === 0) {
    res.status(400).send("Invalid input");
    return;
  }

  try {
    const bmi = weight / (height * height);
    res.status(200).send(`Your BMI: ${bmi.toFixed(2)}`);
  } catch (error) {
    res.status(400).send("Invalid expression");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
