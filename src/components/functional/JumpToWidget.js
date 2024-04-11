import React, { Fragment, useState } from "react";

const JumpToWidget = ({ setlist }) => {
  const [filterText, setFilterText] = useState("");

  if (setlist === undefined) return <p>Loading..</p>;

  // Filter the setlist based on the filterText
  const filteredSetlist = setlist.filter(set =>
    set.setname.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="side_bar__jumplist">
      <h3>
        <b>Jump to MTG set</b>
      </h3>
      <input
        type="search"
        id="jump_to_set"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search sets..."
      />

      <div className="jump_scroll">
        <ul className="jumplist__ul">
          {filteredSetlist.map((set) => (
            <Fragment key={set.set_id}>
              <li>
                <a href={`#${set.set_id}`}>{set.setname}</a>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JumpToWidget;
