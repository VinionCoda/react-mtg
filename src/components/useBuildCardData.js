import { useState, useEffect } from "react";

const useGetCardsByCollection = (cardlist) => {
  const [test, setTest] = useState({
    object: "list",
    not_found: [],
    data: [],
    error: "first_run",
  });

  useEffect(() => {
    if (Object.keys(cardlist).length > 0) {
      const url = "https://api.scryfall.com/cards/collection";
      const data = {
        identifiers: cardlist,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.object !== "error") {
            data.error = "";
            setTest(data);
          } else {
            throw data;
          }
        })
        .catch((err) => {
          console.log(err);
          setTest({
            object: "error",
            not_found: [],
            data: [],
            error: err,
          });
        });
    }
  }, [cardlist]);

  return test;
};

const useGetCardVersion = (collection) => {
  const [state, setState] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  useEffect(() => {
    const promises = [];
    const fetchData = async (card) => {
      const data = await fetch(card.prints_search_uri);
      const res = await data.json();
      card.version = res.data;
      return card;
    };

    for (var card in collection.data) {
      promises.push(fetchData(collection.data[card]));
    }

    Promise.all(promises).then((results) => {
      setState({
        object: "list",
        not_found: collection.not_found,
        data: results,
      });
    });
  }, [collection]);

  return state;
};

const useCreateCardData = (collection) => {
  const [state, setState] = useState({
    object: "list",
    not_found: [],
    data: [],
  });

  useEffect(() => {
    /*Create temp list of Scryed format cards removing
      empty objects. */
    const temp_list = collection.data.filter(
      (card) => Object.keys(card).length > 0
    );

    //Creating new list of Club format cards
    let new_list =
      Object.keys(temp_list).length > 0
        ? temp_list.map((card, key) => {
            //select original print
            let temp_card = card.version.filter(
              (card) => card.reprint === false
            );

            //filter only legal prints
            const print_versions = card.version.filter(
              (version) =>
                version.set_id === "c1c7eb8c-f205-40ab-a609-767cb296544e" ||
                version.set_id === "d7efccd6-55bc-4fb8-9138-e72577510a99" ||
                ((version.legalities.pioneer === "legal" ||
                  version.legalities.pioneer === "banned") &&
                  (version.set_type === "expansion" ||
                    version.set_type === "core"))
            );

            //select most recent reprint or original print
            temp_card =
              print_versions.length > 0
                ? print_versions.reduce((previousValue, currentValue) =>
                    previousValue.released_at >= currentValue.released_at
                      ? previousValue
                      : currentValue
                  )
                : temp_card[0];

            //build new Club format card
            let new_card = {
              card_id: temp_card.id,
              card_set: temp_card.set_id,
              card_set_uri: temp_card.set_uri,
              card_setname: temp_card.set_name,
              card_rarity: temp_card.rarity,
              card_status: "banned",
              card_api: temp_card.uri,
              card_legality: temp_card.legalities.pioneer,
              card_release: temp_card.released_at,
              card_name: temp_card.name,
              card_cost: temp_card.mana_cost,
              card_type: temp_card.type_line,             
              card_back: {},
              dual_card_name: "",
            };

            //add extra data if card is flip or transform
            if (
              typeof card.card_faces != "undefined" &&
              Object.keys(card.card_faces).length > 0
            ) {
              new_card.dual_card_name = temp_card.name;
              new_card.card_name = temp_card.card_faces[0].name;
              new_card.card_cost = temp_card.card_faces[0].mana_cost;
              new_card.card_type = temp_card.card_faces[0].type_line;
              new_card.card_image = temp_card.card_faces[0].image_uris.normal;
              new_card.card_back = {
                card_name: temp_card.card_faces[1].name,
                card_type: temp_card.card_faces[1].type_line,
                card_image: temp_card.card_faces[1].image_uris.normal,
              };
            }
            else {
              new_card.card_image = temp_card?.image_uris.normal;
            }

            //sets rarity as css format
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

    //Removes duplcicate cards
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

const useBuildCardData = (cardlist) => {

  //build card object collection from remote api
  const collection = useGetCardsByCollection(cardlist);

  //rebuild card object collection using date released
  const rebuild = useGetCardVersion(collection);

  //create new formated card object array
  const card_set = useCreateCardData(rebuild);

  console.log("Built Card Data");

  return card_set;
};

export default useBuildCardData;
