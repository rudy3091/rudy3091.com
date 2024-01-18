@module external s: {..} = "@/views/posts/components/PostElement.module.scss"

module H1 = {
  @react.component
  let make = (~children) => {
    <h1 className={s["h1"]}> children </h1>
  }
}

module H2 = {
  @react.component
  let make = (~children) => {
    <h2 className={s["h2"]}> children </h2>
  }
}

module H3 = {
  @react.component
  let make = (~children) => {
    <h3 className={s["h3"]}> children </h3>
  }
}

module H4 = {
  @react.component
  let make = (~children) => {
    <h4 className={s["h4"]}> children </h4>
  }
}

module H5 = {
  @react.component
  let make = (~children) => {
    <h5 className={s["h5"]}> children </h5>
  }
}

module H6 = {
  @react.component
  let make = (~children) => {
    <h6 className={s["h6"]}> children </h6>
  }
}

module P = {
  @react.component
  let make = (~children) => {
    <p className={s["p"]}> children </p>
  }
}

module A = {
  @react.component
  let make = (~children, ~href, ~title) => {
    <a className={s["a"]} href={href} title={title}> children </a>
  }
}

module Ul = {
  @react.component
  let make = (~children) => {
    <ul className={s["ul"]}> children </ul>
  }
}

module Ol = {
  @react.component
  let make = (~children) => {
    <ol className={s["ol"]}> children </ol>
  }
}

module Li = {
  @react.component
  let make = (~children) => {
    <li className={s["li"]}> children </li>
  }
}

module Blockquote = {
  @react.component
  let make = (~children) => {
    <blockquote className={s["blockquote"]}> children </blockquote>
  }
}

module Code = {
  @react.component
  let make = (~children) => {
    <code className={s["code"]}> children </code>
  }
}

module Pre = {
  @react.component
  let make = (~children) => {
    <pre className={s["pre"]}> children </pre>
  }
}
