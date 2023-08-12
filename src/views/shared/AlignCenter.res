@module external s: {..} = "@/views/shared/AlignCenter.module.scss"

@react.component
let make = (~children) => {
  <div className={s["container"]}> children </div>
}
