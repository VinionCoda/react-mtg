import { useEffect, useState } from "react";
const useBuildCardData = (collection) => {
  const [state, setState] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  useEffect(() => {
    const temp_list = collection.data.filter(
      (card) => Object.keys(card).length > 0
    );

    let new_list =
      Object.keys(temp_list).length > 0
        ? temp_list.map((card, key) => {
            const temp_version = card.version.filter(
              (version) =>
                version.set_id === "c1c7eb8c-f205-40ab-a609-767cb296544e" ||
                version.set_id === "d7efccd6-55bc-4fb8-9138-e72577510a99" ||
                (version.legalities.pioneer === "legal" &&
                  (version.set_type === "expansion" ||
                    version.set_type === "core"))
            );

            let temp_card =
              temp_version.length > 0
                ? temp_version.reduce((previousValue, currentValue) =>
                    previousValue.released_at >= currentValue.released_at
                      ? previousValue
                      : currentValue
                  )
                : card;

            if (
              temp_card.legalities.pioneer === "not_legal" &&
              temp_card.set_id !== "c1c7eb8c-f205-40ab-a609-767cb296544e" &&
              temp_card.set_id !== "d7efccd6-55bc-4fb8-9138-e72577510a99"
            ) {
              temp_card = card.version.filter(
                (ver) => ver.reprint === false
              )[0];
            }

            let new_card = {
              card_id: temp_card.id,
              card_set: temp_card.set_id,
              card_setname: temp_card.set_name,
              card_rarity: card.rarity,
              card_status: card.status,
              card_api: temp_card.uri,
              card_legality: temp_card.legalities.pioneer,
              card_release: temp_card.released_at,
            };

            new_card.card_version = temp_version.map((card) => {
              return {
                card_id: card.id,
                card_uri: card.uri,
                card_set_id: card.set_id,
                card_set_name: card.set_name,
                card_set_uri: card.set_uri,
                card_release: card.released_at,
              };
            });

            if (
              typeof card.card_faces != "undefined" &&
              Object.keys(card.card_faces).length > 0
            ) {
              new_card.dual_card_name = card.name;
              new_card.card_name = card.card_faces[0].name;
              new_card.card_cost = card.card_faces[0].mana_cost;
              new_card.card_type = card.card_faces[0].type_line;
              new_card.card_image = temp_card.card_faces[0].image_uris.normal;
              new_card.card_back = {
                card_name: card.card_faces[1].name,
                card_type: card.card_faces[1].type_line,
                card_image: temp_card.card_faces[1].image_uris.normal,
              };
            } else {
              new_card.card_name = card.name;
              new_card.card_cost = card.mana_cost;
              new_card.card_type = card.type_line;
              new_card.card_image = temp_card.image_uris.normal;
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
          })
        : [];

    const final_list =
      Object.keys(new_list).length > 0
        ? new_list.reduce((accumulator, object) => {
            const result = accumulator.find(
              (e) => e.card_name === object.card_name
            );
            if (
              typeof result === "undefined" ||
              result.card_name !== object.card_name
            ) {
              accumulator.push(object);
            }
            return accumulator;
          }, [])
        : [];

    setState({
      object: "list",
      not_found: collection.not_found,
      data: final_list,
    });
  }, [collection]);

  return state;
};

export default useBuildCardData;
