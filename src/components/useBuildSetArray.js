const useBuildSetArray = (collection, setdb) => {
  let arr = [];
  collection.forEach((card) => {
    card.card_version.forEach((ver) => {
      const x = setdb.findIndex((set) => {
        return set.card_set_id === ver.card_set_id;
      });
      const y = arr.findIndex((set) => {
        return set.card_set_id === ver.card_set_id;
      });
      if (x < 0 && y < 0) {
        arr.push(ver);
      }
    });
  });
  return arr;
};

export default useBuildSetArray;
