@module("fs") external readFileSync: string => Node.Buffer.t = "readFileSync"
@module("path") @variadic external resolve: array<string> => string = "resolve"
@val external dirname: string = "__dirname"
@val @scope("process") external env: {..} = "env"

type t = {
  frontMatter: FrontMatter.t,
  content: string,
}

module Service_ = {
  let sourceDirectory = resolve([Node.Process.cwd(), "_posts"])

  let getPostContent = path => {
    let path = resolve([dirname, sourceDirectory, `${path}/index.md`])
    readFileSync(path)->Node.Buffer.toString
  }

  let getPostContentByName = name => {
    getPostContent(name)
  }

  let getAllPostTitles = () => {
    sourceDirectory->Node.Fs.readdirSync
  }
}

module Service = {
  let baseUrl = "http://localhost:3000/_posts"

  let getPostContentByTitle = async title => {
    let res = await Next.fetch(`${baseUrl}/${title}/index.md`, {"cache": "force-cache"})
    await res->Next.FetchResp.text
  }

  let getAllPostTitles = () => {
    [
      "closure-in-javascript",
      "types-and-javascript",
      "experiment-on-cors",
      "frontend-without-javascript",
      "function-vs-arrow-function",
      "module-system-in-js",
      "reactive-programming-and-rxjs",
      "strict-mode",
      "terminal-productivity",
      "var-let-const",
      "wasm-from-scratch",
      "x86-assembly",
    ]
  }
}
