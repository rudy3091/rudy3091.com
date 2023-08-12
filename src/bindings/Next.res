module FetchResp = {
  type t<'a>
  @send external json: t<'a> => promise<'a> = "json"
  @send external text: t<'a> => promise<string> = "text"
}

@val external fetch: (string, 'params) => promise<FetchResp.t<'a>> = "fetch"

module Link = {
  @module("next/link") @react.component
  external make: (
    ~href: string,
    ~_as: string=?,
    ~prefetch: bool=?,
    ~replace: option<bool>=?,
    ~shallow: option<bool>=?,
    ~passHref: option<bool>=?,
    ~children: React.element,
  ) => React.element = "default"
}

module Head = {
  @module("next/head") @react.component
  external make: (~children: React.element) => React.element = "default"
}

module Error = {
  @module("next/error") @react.component
  external make: (~statusCode: int, ~children: React.element) => React.element = "default"
}
