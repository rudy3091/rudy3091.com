type style = {date: string}
@module external s: style = "@/views/posts/components/PostEntryLink.module.scss"

@react.component
let make = (~date, ~title) => {
  <>
    <span className={s.date}>
      {"@{"->React.string}
      {date->React.string}
      {"} "->React.string}
    </span>
    <span> {title->React.string} </span>
  </>
}
