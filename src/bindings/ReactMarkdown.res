type imgProps = {
  src: string,
  alt: string,
}

type anchorProps = {
  children: React.element,
  href: string,
  title: option<string>,
}

type childrenOnly = {children: React.element}

type components<'a> = {
  "img": imgProps => React.element,
  "h1": childrenOnly => React.element,
  "h2": childrenOnly => React.element,
  "h3": childrenOnly => React.element,
  "h4": childrenOnly => React.element,
  "h5": childrenOnly => React.element,
  "h6": childrenOnly => React.element,
  "p": childrenOnly => React.element,
  "a": anchorProps => React.element,
  "ul": childrenOnly => React.element,
  "ol": childrenOnly => React.element,
  "li": childrenOnly => React.element,
  "blockquote": childrenOnly => React.element,
  "code": childrenOnly => React.element,
  "pre": childrenOnly => React.element,
}

@react.component @module("react-markdown")
external make: (~children: React.element, ~components: components<'a>=?) => React.element =
  "default"
