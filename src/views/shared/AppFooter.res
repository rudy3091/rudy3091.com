@module external s: {..} = "@/views/shared/AppFooter.module.scss"

@react.component
let make = () => {
  let year = Js.Date.make()->Js.Date.getFullYear->Js.Math.floor_int

  <footer className={s["container"]}>
    {React.string(`(C) ${year->Belt.Int.toString} @rudy3091`)}
  </footer>
}
