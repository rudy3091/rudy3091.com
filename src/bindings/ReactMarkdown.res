type imgProps = {
  src: string,
  alt: string,
}

type components<'a> = {"img": imgProps => React.element}

@react.component @module("react-markdown")
external make: (~children: React.element, ~components: components<'a>=?) => React.element =
  "default"
