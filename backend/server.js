import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import cardRouter from "./routes/cards.js";

const app = express();
const port = 5000;
const uri = "mongodb+srv://mtgclub:R3actmean@cluster0.bmjla.mongodb.net/mtgclub?retryWrites=true&w=majority" ;

app.use(cors());
app.use(express.json());

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
console.log("Mongodb connection established");
});

app.get('/', (req, res) => {
  res.send('Cleaver MTG Club API')
});
app.use('/cards', cardRouter);


app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});