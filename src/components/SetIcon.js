import { useState, useEffect } from "react";

const SetIcon = ({ set_id, css }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const url = `https://api.scryfall.com/sets/${set_id}`;
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
  }, [set_id]);

  return <span className={`set_icon ${css}`} style={state}></span>;
};

export default SetIcon;