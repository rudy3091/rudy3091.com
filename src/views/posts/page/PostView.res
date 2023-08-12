@react.component
let make = (~post) => {
  let frontMatter = FrontMatter.getFrontMatter(post)
  let trimmedPostContent = FrontMatter.removeFrontMatter(post)

  <article>
    <PostHeading frontMatter={frontMatter} />
    <ReactMarkdown> {React.string(trimmedPostContent)} </ReactMarkdown>
  </article>
}
