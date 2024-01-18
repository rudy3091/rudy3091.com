@module external s: {..} = "@/views/shared/NavigationBar.module.scss"

@react.component
let make = () => {
  let links = ["Posts", "Memos"]
  <AlignCenter>
    <nav className={s["container"]}>
      <Layout.Spacing size={"1rem"} />
      <ul className={s["flex-row"]}>
        {links
        ->Js.Array2.map(link =>
          <li className={s["li"]} key={link}>
            <Next.Link href={`/${link->Js.String2.toLowerCase}`}> {React.string(link)} </Next.Link>
          </li>
        )
        ->React.array}
      </ul>
    </nav>
  </AlignCenter>
}
