import { useState, useEffect } from "react";

const ReturnToTopButton = () => {
  const [view, setView] = useState("none");

  const topFunction = () => {
    window.location.href = "#main_top";
  };

  useEffect(() => {
    const setVisibility = () => {
      if (
        (document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40) && window.innerWidth > 610
      ) {
        setView("block");
      } else {
        setView("none");
      }
    };

    window.addEventListener("scroll", setVisibility);

    setVisibility();

    return () => window.removeEventListener("scroll", setVisibility);
  });

  return (
    <button
      id="myBtn"
      style={{ display: `${view}` }}
      title="Go to top"
      onClick={topFunction}
    >
      Top
    </button>
  );
};

export default ReturnToTopButton;
