import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
  card_id: {type: String, unique:true},
  card_set: String,
  card_rarity: String,
  card_status: String,
  card_api: String,
  dual_card_name: String,
  card_name: String,
  card_cost: String,
  card_type: String,
  card_image: String,
  card_back: {
    card_name: String,
    card_type: String,
    card_image: String,
  },
});

const Cards = mongoose.model("Cards", cardSchema);

export default Cards;
