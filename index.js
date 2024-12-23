import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  console.log("POST", req.body);
  const { name, price } = req.body;
  const newData = { id: nextId++, name: name, price: price };
  teaData.push(newData);
  res.status(201).send(newData);
});

//get all tea
app.get("/teas", (req, res) => {
  console.log("GET", req.body);
  res.status(201).send(teaData);
});

// get tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  return res.status(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index == -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send("Tea  deleted");
});

app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});
