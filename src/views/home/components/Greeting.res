@module external s: {..} = "@/views/home/components/Greeting.module.scss"

@react.component
let make = () => {
  <div className={s["container"]}>
    <div>
      <span className={s["bigtext"]}> {"Hello world"->React.string} </span>
    </div>
    <p className={s["text"]}>
      {"I am Hyeonmin Kim, a yet another frontend developer who loves hacky stuff. \
        For me, the world is full of 'unknown's and 'unsolved's."->React.string}
    </p>
    <p className={s["text"]}>
      {"As a developer, I would like to call myself a 'digital explorer' \
        who explores these unknowns in this infinite world."->React.string}
    </p>
    <p className={s["text"]}>
      {"I love my job and I love to learn new things. \
        I'm always open to new challenges and opportunities. \
        Thank you for visiting my page!"->React.string}
    </p>
  </div>
}
