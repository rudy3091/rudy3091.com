import * as React from "react";
import $ from "../styles/Hamburger.module.scss";

import Menu from "./HamburgerMenu";

export default function Hamburger() {
  const [clicked, setClicked] = React.useState<boolean>(false);
  const svgClassName = clicked
    ? [$.clicked, $.hamburger].join(" ")
    : $.hamburger;

  return (
    <>
      <Menu hidden={!clicked} makeItHidden={() => setClicked(false)}></Menu>
      <div className={$.container}>
        <button
          onClick={() => setClicked((clicked) => !clicked)}
          role="button"
          className={$.button}
        >
          <svg
            className={svgClassName}
            viewBox="0 0 50 50"
            width="30"
            height="30"
          >
            <polyline className={$.line} points="0,5 50,5 45,5 0,45" />
            <polyline className={$.line} points="0,45 50,45 45,45 0,5" />
            <line
              className={[$.line, $.midline].join(" ")}
              x1="0"
              y1="25"
              x2="50"
              y2="25"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
