type components = {"img": {"src": string, "alt": string} => React.element}

@react.component @module("react-markdown")
external make: (~children: React.element, ~components: components=?) => React.element = "default"
