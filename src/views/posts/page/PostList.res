let mapFrontMatters = async postTitles => {
  open Js.Array2
  let frontMatterPromises = postTitles->map(async postTitle => {
    let content = await Post.Service.getPostContentByTitle(postTitle)
    content->FrontMatter.getFrontMatter
  })

  await Js.Promise2.all(frontMatterPromises)
}

@react.component
let make = () => {
  (
    async () => {
      let postTitles = Post.Service.getAllPostTitles()
      let frontMatters = await mapFrontMatters(postTitles)

      <>
        <Layout.Spacing size={"5rem"} />
        {frontMatters
        ->Js.Array2.map(fm => {
          let slug = Slug.fromFrotMatter(fm)
          <article key={slug}>
            <Next.Link href={slug}> {fm.title->React.string} </Next.Link>
          </article>
        })
        ->React.array}
      </>
    }
  )()
}
