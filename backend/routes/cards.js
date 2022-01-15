import express from "express";
import Cards from "../models/card.model.js";


const cardRouter = express.Router();


cardRouter.route('/').get((req,res)=>{
Cards.find()
    .then(cards =>res.json(cards))
    .catch (err=> console.log(err));

});

cardRouter.route('/addCard').post(async (req,res)=>{
  const card = req.body;  
  const newCard = new Cards(card);
  await newCard.save()
        .then(cards =>res.json(cards))
        .catch (err=> res.json({error :err}));    
    });
    

export default cardRouter;