let mapFrontMatters = async postTitles => {
  open Js.Array2
  let frontMatterPromises = postTitles->map(async postTitle => {
    let content = await Post.Service.getPostContentByTitle(postTitle)
    content->FrontMatter.getFrontMatter
  })

  await Js.Promise2.all(frontMatterPromises)
}

@react.component
let make = (~postTitles: array<string>) => {
  (
    async () => {
      let frontMatters = await mapFrontMatters(postTitles)

      frontMatters
      ->Js.Array2.map(fm => {
        let slug = Slug.fromFrotMatter(fm)
        <article key={slug}>
          <Next.Link href={slug}> {fm.title->React.string} </Next.Link>
        </article>
      })
      ->React.array
    }
  )()
}
