import { useEffect, useState } from "react";
const useFormSetBuilder = (collection) => {
  const [state, setState] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  useEffect(() => {

  console.log(collection);
    const temp_list = collection.data.filter(
      (card) => Object.keys(card).length > 0
    );

    let new_list = temp_list.map((card) => {
      let new_card = {
        card_id: card.id,
        card_set: card.set_id,
        card_rarity: card.rarity,
        card_status: card.status,
        card_api: card.uri,
      };

      if (
        typeof card.card_faces != "undefined" &&
        Object.keys(card.card_faces).length > 0
      ) {
        new_card.dual_card_name = card.name;
        new_card.card_name = card.card_faces[0].name;
        new_card.card_cost = card.card_faces[0].mana_cost;
        new_card.card_type = card.card_faces[0].type_line;
        new_card.card_image = card.card_faces[0].image_uris.normal;
        new_card.card_back = {
          card_name: card.card_faces[1].name,
          card_type: card.card_faces[1].type_line,
          card_image: card.card_faces[1].image_uris.normal,
        }
      } else {
        new_card.card_name = card.name;
        new_card.card_cost = card.mana_cost;
        new_card.card_type = card.type_line;
        new_card.card_image = card.image_uris.normal;
        new_card.card_back = {};
        new_card.dual_card_name = "";
      }


      switch (card.rarity) {
        case "uncommon":
          new_card.rarity_css = "set_icon--uncommon";
          break;
        case "rare":
          new_card.rarity_css = "set_icon--rare";
          break;
        case "mythic":
          new_card.rarity_css = "set_icon--mythic";
          break;
        default:
          new_card.rarity_css = "";
      }

      return new_card;
    });

    const final_list = new_list.reduce((accumulator, object) => {
      const result = accumulator.find((e) => e.card_name === object.card_name);
      if (
        typeof result === "undefined" ||
        result.card_name !== object.card_name
      ) {
        accumulator.push(object);
      }
      return accumulator;
    }, []);

    setState({
      object: "list",
      not_found: collection.not_found,
      data: final_list,
    });
  }, [collection]);

  return state;
};

export default useFormSetBuilder;
