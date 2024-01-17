module CssModuleUnit = {
  let width = (classNames: {..}, n: int) => {
    switch n {
    | 1 => classNames["width-1"]
    | 2 => classNames["width-2"]
    | 3 => classNames["width-3"]
    | 4 => classNames["width-4"]
    | 5 => classNames["width-5"]
    | 6 => classNames["width-6"]
    | 7 => classNames["width-7"]
    | 8 => classNames["width-8"]
    | 9 => classNames["width-9"]
    | 10 => classNames["width-10"]
    | _ => Exn.raiseError("Invalid width")
    }
  }

  let height = (classNames: {..}, n: int) => {
    switch n {
    | 1 => classNames["height-1"]
    | 2 => classNames["height-2"]
    | 3 => classNames["height-3"]
    | 4 => classNames["height-4"]
    | 5 => classNames["height-5"]
    | 6 => classNames["height-6"]
    | 7 => classNames["height-7"]
    | 8 => classNames["height-8"]
    | 9 => classNames["height-9"]
    | 10 => classNames["height-10"]
    | _ => Exn.raiseError("Invalid height")
    }
  }
}

module Vstack = {
  @module external s: {..} = "@/views/shared/Vstack.module.scss"

  @react.component
  let make = (~children: React.element, ~height: int=10) => {
    let className = [s["container"], CssModuleUnit.height(s, height)]->Array.joinWith(" ")
    <div className={className}> children </div>
  }
}

module Hstack = {
  @module external s: {..} = "@/views/shared/Hstack.module.scss"

  @react.component
  let make = (~children: React.element, ~width: int=10) => {
    let className = [s["container"], CssModuleUnit.width(s, width)]->Array.joinWith(" ")
    <div className={className}> children </div>
  }
}

module Spacing = {
  @react.component
  let make = (~size: option<string>=?) => {
    let size = size->Option.getWithDefault("1rem")
    <div style={ReactDOM.Style.make(~height=size, ())} />
  }
}

module JustifyContent = {
  @module external s: {..} = "@/views/shared/JustifyContent.module.scss"

  @react.component
  let make = (~children: React.element) => {
    <div className={s["container"]}> children </div>
  }
}
