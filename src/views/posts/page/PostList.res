let mapFrontMatters = async postTitles => {
  open Js.Array2
  let frontMatterPromises = postTitles->map(async postTitle => {
    let content = await Post.Service.getPostContentByTitle(postTitle)
    content->FrontMatter.Service.fromContent
  })

  await Js.Promise2.all(frontMatterPromises)
}

@react.component
let make = async () => {
  let postTitles = Post.Service.getAllPostTitles()
  let frontMatters = await mapFrontMatters(postTitles)
  frontMatters->Array.sort(FrontMatter.Service.sortFrontmatterByDate)

  <>
    <Layout.Spacing size={"5rem"} />
    {frontMatters
    ->Js.Array2.map(fm => {
      let slug = Slug.fromFrotMatter(fm)
      <article key={slug}>
        <Next.Link href={slug}>
          <PostEntryLink date={fm.date} title={fm.title} />
        </Next.Link>
      </article>
    })
    ->React.array}
  </>
}
