@module external s: {..} = "@/views/posts/page/Postview.module.scss"

@react.component
let make = (~post) => {
  let frontMatter = FrontMatter.getFrontMatter(post)
  let trimmedPostContent = FrontMatter.removeFrontMatter(post)

  <article className={s["article"]}>
    <PostHeading frontMatter={frontMatter} />
    <ReactMarkdown
    // components={{
    //   "img": props => <Next.Image src={props["src"]} alt={props["alt"]} />,
    // }}>
    >
      {React.string(trimmedPostContent)}
    </ReactMarkdown>
  </article>
}
