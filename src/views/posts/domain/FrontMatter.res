open Js.String2

type t = {
  title: string,
  date: string,
  author: string,
  slug: string,
}

let formatDate = date => {
  date->split("-")->Js.Array2.joinWith("/")
}

let re = %re("/---\n([\s\S]*?)\n---/")

let removeFrontMatter = content => {
  content->replaceByRe(re, "")
}

let getByKey = (arr, target) =>
  arr
  ->Js.Array2.find(pair => {
    switch pair {
    | [key, _] => key == target
    | _ => Js.Exn.raiseError(`frontmatter key-value parsing failed: ${arr->Js.Array2.toString}`)
    }
  })
  ->Belt.Option.getExn
  ->Js.Array2.unsafe_get(1)

let shouldRemoveQuote = (x: string) => x->get(0) == `'` && x->get(x->length - 1) == `'`
let removeQuote = x => x->slice(~from=1, ~to_=x->length - 1)

let shouldRemoveDoubleQuote = (x: string) => x->get(0) == `"` && x->get(x->length - 1) == `"`
let removeDoubleQuote = x => x->slice(~from=1, ~to_=x->length - 1)

let parse = fm => {
  let splitKeyValue = line =>
    line
    ->splitByRe(%re("/:\s?/"))
    ->Js.Array2.map(Belt.Option.getExn)
    ->Js.Array2.map(x => shouldRemoveDoubleQuote(x) ? removeDoubleQuote(x) : x)
    ->Js.Array2.map(x => shouldRemoveQuote(x) ? removeQuote(x) : x)

  fm
  ->split("\n")
  ->Js.Array2.map(splitKeyValue)
  ->(
    thunk => {
      title: thunk->getByKey("title"),
      date: thunk->getByKey("date"),
      author: thunk->getByKey("author"),
      slug: thunk->getByKey("slug"),
    }
  )
}

let getFrontMatter = content => {
  re
  ->Js.Re.exec_(content)
  ->Belt.Option.getExn
  ->Js.Re.captures
  ->Js.Array2.map(x => {
    x->Js.Nullable.toOption->Belt.Option.getExn
  })
  ->Js.Array2.pop
  ->Belt.Option.getExn
  ->parse
}
