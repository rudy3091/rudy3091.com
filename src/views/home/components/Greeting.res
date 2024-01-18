@module external s: {..} = "@/views/home/components/Greeting.module.scss"

module And = {
  @react.component
  let make = () => {
    <span className={s["text"]}> {" and "->React.string} </span>
  }
}

module Comma = {
  @react.component
  let make = () => {
    <span className={s["text"]}> {" , "->React.string} </span>
  }
}

module Name = {
  @react.component
  let make = () => {
    <>
      <span className={s["text"]}> {"Hi, my name is "->React.string} </span>
      <span className={s["bigtext"]}> {Introduction.Bio.name->React.string} </span>
    </>
  }
}

module Job = {
  @react.component
  let make = () => {
    <>
      <span className={s["text"]}> {"I am "->React.string} </span>
      <span className={s["bigtext"]}> {Introduction.Bio.job->React.string} </span>
    </>
  }
}

module Location = {
  @react.component
  let make = () => {
    <>
      <span className={s["text"]}> {"who lives in "->React.string} </span>
      <span className={s["bigtext"]}> {Introduction.Bio.location->React.string} </span>
    </>
  }
}

module Interest = {
  @react.component
  let make = () => {
    <>
      <span className={s["text"]}> {"I love "->React.string} </span>
      <span className={s["bigtext"]}> {Introduction.Bio.interest->React.string} </span>
    </>
  }
}

@react.component
let make = () => {
  <div className={s["container"]}>
    <Layout.Hstack>
      <Name />
      <Comma />
    </Layout.Hstack>
    <Layout.Hstack>
      <And />
      <Job />
      <Comma />
    </Layout.Hstack>
    <Layout.Hstack>
      <And />
      <Interest />
    </Layout.Hstack>
  </div>
}
