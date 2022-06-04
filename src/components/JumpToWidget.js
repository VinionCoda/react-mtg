import { Fragment } from "react";

const JumpToWidget = ({ setlist }) => {
  if (setlist === "undefined") return <p> Loading..</p>;

  return (
    <div className="side_bar__jumplist">
      <h3>
        <b> Jump to MTG set</b>
      </h3>

      <ul className="jumplist__ul">
        {setlist.map((set) => (
          <Fragment key={set.set_id}>
            <li><hr />
              <a href={`#${set.set_id}`}> {set.setname} </a>
              
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default JumpToWidget;
