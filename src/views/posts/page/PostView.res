// @@directive("'use client';")
@module external s: {..} = "@/views/posts/page/Postview.module.scss"

@react.component
let make = (~post) => {
  let frontMatter = FrontMatter.getFrontMatter(post)
  let trimmedPostContent = FrontMatter.removeFrontMatter(post)

  <article className={s["article"]}>
    <Layout.Spacing size={"3rem"} />
    <PostHeading frontMatter={frontMatter} />
    <ReactMarkdown
      components={{
        "img": (props: ReactMarkdown.imgProps) => {
          <img src={props.src} alt={props.alt} width={"100%"} height={"auto"} />
        },
      }}>
      {React.string(trimmedPostContent)}
    </ReactMarkdown>
  </article>
}
