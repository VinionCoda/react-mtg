import express from "express";
import Cards from "../models/card.model.js";

const cardRouter = express.Router();

cardRouter.route("/").get((req, res) => {
  Cards.find()
    .then((cards) => res.json(cards))
    .catch((err) => console.log(err));
});

cardRouter.route("/addCard").post(async (req, res) => {
  const card = req.body;
  const newCard = new Cards(card);
  await newCard
    .save()
    .then((cards) => res.json(cards))
    .catch((err) => res.json({ error: err }));
});

cardRouter.route("/addCollection").post(async (req, res) => {
  const collection = req.body.data;

const set_arr =  new_list.reduce((accumulator, object) => {
    const result = accumulator.find((e) => e.card_name === object.card_name);
    if (
      typeof result === "undefined" ||
      result.card_name !== object.card_name
    ) {
      accumulator.push(object);
    }
    return accumulator;
  }, []);

  Cards.insertMany(collection, (err, docs) => {
    if (err === null) {
      res.json({ status: "Success" });
    } else {
      res.json({ status: "Failed" });
    }
  });
});

export default cardRouter;
