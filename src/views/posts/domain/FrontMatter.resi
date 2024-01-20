type t = {title: string, date: string, author: string, slug: string}
let re: Re.t
module Service: {
  let formatDate: Js.String2.t => string
  let fromContent: string => t
  let sortFrontmatterByDate: (t, t) => float
}
