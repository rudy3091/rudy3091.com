@react.component
let make = (~frontMatter: FrontMatter.t) => {
  <div>
    <h2> {frontMatter.title->React.string} </h2>
    <div> {frontMatter.date->React.string} </div>
  </div>
}
