const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/question", (req, res) => {
  res.sendFile(path.join(__dirname, "src/component/question.html"));
});

app.get("/result/[1-5]", (req, res) => {
  res.sendFile(path.join(__dirname, "src/component/result.html"));
});

app.post("/submit", (req, res) => {
  const data = req.body;
  let sumScore = 0;
  for (let item in data) {
    sumScore += parseInt(data[item]);
  }
  if (sumScore <= 20) {
    return res.redirect("/result/1");
  } else if (sumScore <= 30) {
    return res.redirect("/result/2");
  } else if (sumScore <= 40) {
    return res.redirect("/result/3");
  } else if (sumScore <= 50) {
    return res.redirect("/result/4");
  } else if (sumScore <= 60) {
    return res.redirect("/result/5");
  } else {
    return res.redirect("/result/6");
  }
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
