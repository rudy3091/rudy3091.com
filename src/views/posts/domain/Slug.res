type t = string

let fromFrotMatter = (fm: FrontMatter.t) => {
  `posts/${FrontMatter.Service.formatDate(fm.date)}/${fm.slug}`
}
