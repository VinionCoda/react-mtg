import { useState, useEffect } from "react";

/* Returns a Set Object */
const useGetSetSVG = (id) => {
  const [state, setState] = useState({});
  useEffect(() => {
    const url = `https://api.scryfall.com/sets/${id}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const uri = data.icon_svg_uri;
        setState({
          backgroundImage: `url('${uri}')`,
        });
      });
  }, [id]);

  return state;
};

export default useGetSetSVG;
