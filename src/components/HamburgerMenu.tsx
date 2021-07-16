import * as React from "react";
import $ from "../styles/HamburgerMenu.module.scss";

import { tagsData } from "../meta/index";

type HamburgerMenuProps = {
  hidden: boolean;
  makeItHidden: React.MouseEventHandler;
};

export default function HamburgerMenu(props: HamburgerMenuProps) {
  const menuClassName = props.hidden
    ? [$.hidden, $.container].join(" ")
    : $.container;

  return (
    <div className={menuClassName}>
      <div className={$.opaque}>
        {tagsData.map((tag) => (
          <div className={$.tag}>
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className={$.margin} onClick={props.makeItHidden}></div>
    </div>
  );
}
