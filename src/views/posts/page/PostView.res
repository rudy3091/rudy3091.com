// @@directive("'use client';")
@module external s: {..} = "@/views/posts/page/Postview.module.scss"

@react.component
let make = (~postContent) => {
  let frontMatter = FrontMatter.Service.fromContent(postContent)
  let trimmedPostContent = Post.Service.removeFrontMatter(postContent)

  <article className={s["article"]}>
    <Layout.Spacing size={"5rem"} />
    <PostHeading frontMatter={frontMatter} />
    <ReactMarkdown
      components={{
        "img": (props: ReactMarkdown.imgProps) => {
          <img src={props.src} alt={props.alt} width={"100%"} height={"auto"} />
        },
        "h1": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.H1> props.children </PostElement.H1>
        },
        "h2": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.H2> props.children </PostElement.H2>
        },
        "h3": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.H3> props.children </PostElement.H3>
        },
        "h4": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.H4> props.children </PostElement.H4>
        },
        "h5": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.H5> props.children </PostElement.H5>
        },
        "h6": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.H6> props.children </PostElement.H6>
        },
        "p": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.P> props.children </PostElement.P>
        },
        "a": (props: ReactMarkdown.anchorProps) => {
          <PostElement.A
            href={props.href} title={props.title->Option.orElse(Some(""))->Option.getExn}>
            props.children
          </PostElement.A>
        },
        "ul": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.Ul> props.children </PostElement.Ul>
        },
        "ol": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.Ol> props.children </PostElement.Ol>
        },
        "li": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.Li> props.children </PostElement.Li>
        },
        "blockquote": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.Blockquote> props.children </PostElement.Blockquote>
        },
        "code": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.Code> props.children </PostElement.Code>
        },
        "pre": (props: ReactMarkdown.childrenOnly) => {
          <PostElement.Pre> props.children </PostElement.Pre>
        },
      }}>
      {React.string(trimmedPostContent)}
    </ReactMarkdown>
  </article>
}
