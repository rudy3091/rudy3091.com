@module external s: {..} = "@/views/shared/AlignCenter.module.scss"

@react.component
let make = (~children, ~full=false) => {
  let className = [s["container"]]
  if full {
    className->Array.push(s["full"])
  }
  let className = className->Array.joinWith(" ")
  <div className={className}> children </div>
}
