let fromFrotMatter = (fm: FrontMatter.t) => {
  `posts/${FrontMatter.formatDate(fm.date)}/${fm.slug}`
}
