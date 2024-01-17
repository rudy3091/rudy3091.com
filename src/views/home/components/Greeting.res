@module external s: {..} = "@/views/home/components/Greeting.module.scss"

module And = {
  @react.component
  let make = () => {
    " and "->React.string
  }
}

module Comma = {
  @react.component
  let make = () => {
    " , "->React.string
  }
}

module Name = {
  @react.component
  let make = () => {
    <>
      {"Hi, my name is "->React.string}
      <span className={s["bigtext"]}> {Introduction.Bio.name->React.string} </span>
    </>
  }
}

module Job = {
  @react.component
  let make = () => {
    <>
      {"I am "->React.string}
      <span className={s["bigtext"]}> {Introduction.Bio.job->React.string} </span>
    </>
  }
}

module Location = {
  @react.component
  let make = () => {
    <>
      {"who lives in "->React.string}
      <span className={s["bigtext"]}> {Introduction.Bio.location->React.string} </span>
    </>
  }
}

module Interest = {
  @react.component
  let make = () => {
    <>
      {"I love "->React.string}
      <span className={s["bigtext"]}> {Introduction.Bio.interest->React.string} </span>
    </>
  }
}

module Domain = {
  @react.component
  let make = () => {
    <>
      {"I am currently working on "->React.string}
      <span className={s["bigtext"]}> {Introduction.Bio.domain->React.string} </span>
    </>
  }
}

@react.component
let make = () => {
  <div>
    <Name />
    <Comma />
    <br />
    <And />
    <Job />
    <Comma />
    <br />
    <Location />
    <Comma />
    <br />
    <And />
    <Interest />
    <Comma />
    <br />
    <And />
    <Domain />
  </div>
}
