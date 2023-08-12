---
title: "밑바닥부터 시작하는 웹 어셈블리(근데 이제 실패를 곁들인)"
author: "김현민 @rudy3091"
date: "2021-10-25"
slug: "wasm-from-scratch"
---

## 개요

웹 어셈블리는 최신 웹 브라우저에서 실행할 수 있는 새로운 유형의 코드입니다. 웹 어셈블리 이전에는 브라우저에서 오직 자바스크립트만이 실행 가능했습니다. 하지만 관련 툴체인의 등장으로 브라우저는 C/C++, Rust 같은 로우레벨 언어들을 컴파일해 실행할 수 있게 되었습니다. 이러한 코드들은 웹 상에서 네이티브에 가까운 속도로 실행될 수 있어 더 좋은 사용자 경험을 제공할 수 있게 되었습니다.

이번 포스트에서는 웹 어셈블리의 이론적 배경이나 역사보다는, 실제로 웹 어셈블리 개발환경을 구성하고 코드를 작성해보며 얼마나 성능이 향상되는지 실험해본 결과와 그 과정에서의 시행착오를 공유합니다. 웹 어셈블리의 원리와 처리 과정에 관한 내용은 [링크](https://d2.naver.com/helloworld/8257914)에서 확인할 수 있습니다. 이 포스트에서는 `Rust` 언어와 툴체인 `wasm-bindgen`을 사용했습니다. 본문에서 사용한 실험방법에는 잘못된 부분이 있음에 주의해주세요.

## 개발환경 구성하기

웹 어셈블리는 `.wasm`이라는 확장자를 가지는 파일로 컴파일됩니다. 이러한 파일들은 인간보단 컴퓨터에 가까운 바이너리 파일입니다. 웹 어셈블리 모듈을 사용하기 위해선 `WebAssembly.compile()`, `WebAssembly.instantiate()` 같은 메소드들을 이용해 컴파일하고 인스턴스화 해줘야 합니다. 또한 웹 어셈블리는 아직까지 ES module 시스템과 통합되어 사용할 수 없기 때문에 import 문을 사용해 브라우저에서 사용할 방법이 없습니다. 따라서 웹팩과 같은 번들러를 이용해 웹 어셈블리 코드를 로드하겠습니다. 번들러를 사용하지 않는 방법은 [MDN의 문서](https://developer.mozilla.org/ko/docs/WebAssembly/Loading_and_running) 또는 Rust의 웹 어셈블리 툴체인 [wasm-bindgen 가이드](https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html)에서 확인하실 수 있습니다.

### 웹팩 설정하기

단순히 Rust를 이용한 웹 어셈블리 코드를 작성해보는것이 목적이라면, 공개된 [템플릿](https://github.com/rustwasm/rust-webpack-template)을 사용하는 것도 좋은 방법입니다. 하지만, 이 포스트에서 저는 밑바닥부터 프로젝트 세팅을 쌓아올리는것이 목적이기 때문에 직접 웹팩 설정파일을 구성해보겠습니다(라고 했지만 템플릿 설정을 많이 참고했습니다).

우선 웹팩과 관련 모듈들을 설치해줍니다. html 파일을 굳이 작성하지 않기 위해 `html webpack plugin`도 추가해줍니다.

```bash
$ yarn add --dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

wasm-bindgen 에서 타입스크립트 타이핑을 지원해주기 때문에 타입스크립트로 작성해보겠습니다. 관련 모듈들 역시 추가해줍니다.

```bash
$ yarn add --dev typescript ts-loader
```

웹 어셈블리를 위한 웹팩 로더 역시 추가해줍니다.

```bash
$ yarn add --dev @wasm-tools/wasm-pack-plugin
```

이제 웹팩 설정을 구성해보겠습니다. 타입스크립트 파일은 `ts-loader`를 통해 로드하면 되고, 웹 어셈블리 파일은 `wasm-pack-loader`가 로드하도록 하면 됩니다. 주의할 점은, npm 이나 yarn 을 통해 웹팩을 설치하게 되면 latest 버전인 5 버전이 설치되기 때문에, experiments 옵션의 웹 어셈블리 관련 옵션을 켜줘야됩니다. 이 내용은 [웹팩의 관련문서](https://webpack.js.org/configuration/experiments/)에서 설명하고 있습니다. 설치했던 html 플러그인과 웹 어셈블리 로더는 plugins로 넣어줍니다. 애플리케이션 실행은 `webpack-dev-server`를 통해 진행하도록 하겠습니다. 완성한 웹팩 설정파일은 아래와 같습니다.

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  entry: "./lib/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".wasm"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
  mode: "development",
};
```

## 코드 써보기

이제 프로젝트 세팅을 완료했으니 코드를 작성해보겠습니다.

### 성능 출력 함수

```typescript
function getTime(f: () => void, iter: number): number {
  let sum = 0;
  for (let i = 0; i < iter; i++) {
    performance.mark("start");
    f();
    performance.mark("end");
    const result = performance.measure("time", "start", "end");
    performance.clearMarks();
    sum += result.duration;
  }
  return sum / iter;
}
```

성능을 확인하기 위해 `performance api`([docs](https://developer.mozilla.org/ko/docs/Web/API/Performance))를 사용했습니다. `getTIme` 함수는 두개의 인자를 전달받습니다. 첫번째는 실행시간을 측정할 함수, 두번째는 반복횟수입니다. 반복횟수가 높아질수록 실행시간의 편차 역시 낮아져 더 신뢰성 있는 결과를 얻을 수 있을것입니다. 물론 이 `getTime`함수가 반환하는 값이 낮을수록 더 좋은 성능을 나타냅니다.

### 웹 어셈블리 모듈 로드

웹 어셈블리 바이너리는 컴파일되고 나서야 실행될 수 있기 때문에 웹 어셈블리 모듈은 비동기적으로 로드합니다. 타입스크립트 환경에서는 이때 로드된 모듈의 타입을 지정해야 하는데, 이는 `typeof` 키워드로 해결할 수 있습니다.

```typescript
type WasmType = typeof import("../pkg"); // wasm 바이너리의 경로: ../pkg
import("../pkg").then((wasm: WasmType) => {
  // do something
});
```

## 수치연산 성능 테스트

이제 진짜 코드를 작성해보겠습니다. 가장 먼저, 단순한 수치연산 성능을 비교해보겠습니다.

### 단순 덧셈연산

첫번째는 단순 덧셈연산입니다. 1,000,000 개의 숫자를 반복해서 더해보겠습니다. 더해줄 숫자는 1-10 사이의 난수 배열을 전달하겠습니다.

```rust
#[wasm_bindgen(js_name = sumRandomArray)]
pub fn sum_random_array(array: js_sys::Int32Array) -> i32 {
    let mut sum = 0;
    array.for_each(&mut |x, _, _| { sum += x; });
    sum
}
```

```typescript
// 난수 배열 생성 함수
function makeRandomArray(): Int32Array {
  const random = () => Math.floor(Math.random() * 10);
  const randArray = Array.from(new Array(1_000_000), () => random());
  return Int32Array.from(randArray);
}

const array = makeRandomArray();
// 자바스크립트 덧셈연산
const jsTime = getTIme(() => {
  array.reduce((acc, x) => acc + x, 0);
}, 100);
// 웹 어셈블리 덧셈연산
const wasmTime = getTime(() => {
  wasm.sumRandomArray(array); // wasm 변수는 위에서 import 한 웹 어셈블리 모듈 객체
}, 100);

// 성능 확인
console.log("[js]", jsTime, "ms"); // [js] 8.07 ms
console.log("[wasm]", wasmTime, "ms"); // [wasm] 159.63 ms
```

결과는 놀랍게도 웹 어셈블리가 수십배 느린 성능을 보였습니다. 바로 다음 실험을 해보겠습니다.

## 배열 성능 테스트

### Int32Array 를 이용한 32바이트 signed integer 타입 배열

```rust
#[wasm_bindgen(js_name = setArrayValue)]
pub fn set_array_value(array: js_sys::Int32Array) {
    unsafe {
        array.copy_from(&[2; 1_000_000]);

        // 에러가 발생하는 코드
        // let n = 2;
        // array.copy_from(&[n; 1_000_000]);

        // 에러는 발생하지 않지만, 벡터 자료구조는 성능이 너무 안 좋음
        // let n = 2;
        // array.copy_from(&vec![n; 1_000_000]);
    };
}
```

```typescript
// 빈 배열 생성
const array = new Int32Array(1_000_000);
// 웹 어셈블리 성능 측정
const wasmTime = getTime(() => {
  wasm.setArrayValue(array);
}, 100);
// 자바스크립트 성능 측정
const jsTime = getTime(() => {
  array.fill(1);
}, 100);

// 성능 확인
console.log("[wasm]", wasmTime, "ms"); // [wasm] 0.56 ms
console.log("[js]", jsTime, "ms"); // [js] 0.21 ms
```

위의 결과와 같이 또 웹 어셈블리가 더 좋지 않은 성능을 보였습니다. Rust 언어에서 배열은 가변 크기를 허용하지 않습니다. 하지만 `js_sys::Int32Array.copy_from()` 메소드에는 자바스크립트에서 전달해주는 typed array 와 Rust의 배열은 크기가 같아야 한다는 제약조건이 있습니다. 따라서 Rust 배열의 길이값에 변수를 사용할 수 없어 값을 하드코딩할 수 밖에 없습니다.

또한 자바스크립트 쪽에서 값을 변수를 통해 전달하는 방식으로 Rust 코드를 작성하면 `memory access out of bounds`에러가 발생합니다. 이를 방지하기 위해 가변 크기를 허용하는 자료구조인 벡터를 사용하게되면, 성능이 급격하게 떨어집니다. 이렇게 변수를 사용할 수 없는 환경인 데다, 성능까지 자바스크립트에 떨어지니 굳이 사용할 이유가 없어 보입니다. 그렇다면 DOM api 성능을 측정해 보겠습니다.

## DOM Api 성능 테스트

### Cell 과 Row 노드 만들기

```rust
pub fn make_cell(idx: i32) -> web_sys::Element {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();

    // create the element we're gonna append
    let val = document.create_element("div").unwrap();
    val.set_class_name("cell");
    val.set_attribute("data-cell-idx", &idx.to_string()).unwrap();
    val
}

#[wasm_bindgen(js_name = makeRow)]
pub fn make_row(idx: i32, n: i32) -> web_sys::Element {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let row = document.create_element("div").unwrap();
    row.set_class_name("row");
    row.set_attribute("data-row-idx", &idx.to_string()).unwrap();
    for i in 0..n {
        row.append_child(&make_cell(i)).unwrap();
    }
    row
}
```

```typescript
function makeCell() {
  const cell = document.createElement("div");
  cell.className = "cell";
  return cell;
}

function makeRow(idx: number, n: number) {
  const row = document.createElement("div");
  row.className = "row";
  row.setAttribute("data-row-idx", idx.toString());
  for (let i = 0; i < n; i++) {
    row.appendChild(makeCell());
  }
  return row;
}

const wasmTime = getTime(() => {
  const app = document.querySelector("#app")!;
  for (let i = 0; i < 100; i++) {
    app.appendChild(wasm.makeRow(i, 1000));
  }
}, 1);
const jsTime = getTime(() => {
  const app = document.querySelector("#app")!;
  for (let i = 0; i < 100; i++) {
    app.appendChild(makeRow(i, 1000));
  }
}, 1);

// 성능 측정
console.log("[wasm]", wasmTime, "ms"); // [wasm] 685.30 ms
console.log("[js]", jsTime, "ms"); // [js] 228.10 ms

const wasmTime2 = getTime(() => {
  const app = document.querySelector("#app")!;
  for (let i = 0; i < 100; i++) {
    app.appendChild(wasm.makeRow(i, 100));
  }
}, 1);
const jsTime2 = getTime(() => {
  const app = document.querySelector("#app")!;
  for (let i = 0; i < 100; i++) {
    app.appendChild(makeRow(i, 100));
  }
}, 1);

// 성능 측정
console.log("[wasm]", wasmTime2, "ms"); // [wasm] 135.60 ms
console.log("[js]", jsTime2, "ms"); // [js] 14.40 ms
```

Rust의 `web_sys` crate 에서 제공하는 DOM api wrapper 를 이용해 `row` 엘리먼트와 `cell` 엘리먼트를 만들어 자식 엘리먼트로 붙여주는 코드입니다. 1000 개의 cell을 만들어 `#app` 셀렉터를 가진 노드에 붙여주고 있습니다. 하지만 이런 DOM api 접근 역시 웹 어셈블리가 자바스크립트보다 느립니다.

한가지 주목할만한 사실은, 한 row 에 들어가는 엘리먼트를 1000 개에서 100개로 낮췄을 때, 자바스크립트가 동작을 수행하는데 걸리는 시간은 약 1/20 배로 줄었지만, 웹 어셈블리는 약 1/4 으로 줄었다는 점입니다. 이는 자바스크립트는 반복의 횟수가 늘어남에 따라 성능 저하도 기하급수적으로 늘어나지만, 웹 어셈블리는 이와 다르게 성능 저하 폭이 낮다는 것을 의미합니다.

## BFS 알고리즘 구현

```rust
// algo.rs
// Rust로 작성한 bfs 탐색 알고리즘 코드
use std::collections::VecDeque;
use wasm_bindgen::prelude::*;

const WIDTH: usize = 1000;
const HEIGHT: usize = 1000;

const MOVES: [(i32, i32); 4] = [(1, 0), (0, 1), (-1, 0), (0, -1)];

static mut VISITED: [bool; WIDTH * HEIGHT + 1] = [false; WIDTH * HEIGHT + 1];

fn get_index(x: i32, y: i32) -> usize {
    (y + x * WIDTH as i32) as usize
}

unsafe fn search(
    ix: i32,
    iy: i32,
    array: &[u8; WIDTH * HEIGHT],
) {
    let mut queue = VecDeque::new();
    VISITED[get_index(ix, iy)] = true;
    queue.push_back((ix, iy));

    while queue.len() != 0 {
        if let Some((x, y)) = queue.pop_front() {
            // web_sys::console::log_2(&JsValue::from(x), &JsValue::from(y));

            for (dx, dy) in MOVES {
                let nx = x + dx;
                let ny = y + dy;
                if nx < 0 || ny < 0 { continue; }

                let next = get_index(nx, ny);
                let in_boundary = 0 < next && next < WIDTH * HEIGHT;
                if in_boundary && !VISITED[next] && array[next] != 1 {
                    queue.push_back((nx, ny));
                    VISITED[next] = true;
                }
            }
        }
    }
}

#[wasm_bindgen(js_name = findPath)]
pub fn find_path(pixel_map: js_sys::Uint8Array) {
    let mut arr = [0_u8; WIDTH * HEIGHT];
    pixel_map.copy_to(&mut arr);
    unsafe {
        search(0, 0, &arr);
        VISITED = [false; WIDTH * HEIGHT + 1];
    }
}
```

```typescript
// algo.ts
// bfs 탐색 알고리즘 구현 코드
import { getIndex } from "./index";

export const WIDTH = 1000;
export const HEIGHT = 1000;

const VISITED = new Array(WIDTH * HEIGHT + 1).fill(false);
const MOVES = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export function search(ix: number, iy: number, arr: Uint8Array) {
  const array = Array.from(arr);
  const queue: [number, number][] = [];
  VISITED[getIndex(ix, iy)] = true;
  queue.push([ix, iy]);

  while (queue.length !== 0) {
    const item = queue.shift();
    const x = item![0];
    const y = item![1];

    for (const [dx, dy] of MOVES) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0) {
        continue;
      }

      const next = getIndex(nx, ny);
      const inBoundary = 0 < next && next < WIDTH * HEIGHT;
      if (inBoundary && !VISITED[next] && array[next] !== 1) {
        queue.push([nx, ny]);
        VISITED[next] = true;
      }
    }
  }
}
```

```typescript
import { WIDTH, HEIGHT, search } from "./algo";

// pixelMap 배열 생성
// 0 이면 이동할 수 있는 픽셀, 1이면 이동할 수 없는 픽셀
// 웹 어셈블리 모듈로 전달해주기 위해 Uint8Array 타입 배열로 선언
// WIDTH === 1000;
// HEIGHT === 1000;
export const pixelMap = new Uint8Array(WIDTH * HEIGHT);

// index.ts
// 성능 측정
const wasmTime = getTime(() => {
  wasm.findPath(pixelMap);
}, 1);
console.log("[wasm]", wasmTime, "ms"); // [wasm] 2295.90 ms

const jsTime = getTime(() => {
  search(0, 0, pixelMap);
}, 1);
console.log("[js]", jsTime, "ms"); // [js] 152.60 ms
```

주석에서 설명한 것과 같이, 1000 \* 1000 크기의 배열을 선언해, 이를 탐색합니다. 이때 배열의 값이 0이라면 이동할 수 있는 픽셀, 1이라면 이동할 수 없는 픽셀이라 간주합니다. 1,000,000 개의 픽셀을 bfs 알고리즘으로 모두 탐색했을 때 걸리는 시간을 측정했습니다.

결과는 자바스크립트 152.60 ms, 웹 어셈블리 2295.90 ms 입니다. 이쯤되니 뭔가 이상합니다. 테스트 환경은 모두 chromium 기반 브라우저인 brave browser 에서 시행되었습니다. 브라우저에 따라 뭔가 바뀌는 점이 있는지 알아보기 위해 사파리 브라우저에서 실행해보았습니다. 결과는 웹 어셈블리가 자바스크립트보다 빨랐습니다.

![safari](/_posts/wasm-from-scratch/safari.png)

하지만 이상한 점은 또 있었습니다. 위 화면에서 새로고침을 누르면 자바스크립트가 훨씬 더 느려집니다.

![safari-refresh](/_posts/wasm-from-scratch/safari-refresh.png)

이 현상을 발견하고, [reddit의 포스트](https://www.reddit.com/r/WebAssembly/comments/kk9vuv/webassembly_much_slower_than_js_in_this_benchmark/)를 하나 찾았습니다. 이 포스트의 글쓴이는 C++ 코드를 웹 어셈블리로 컴파일하는데, 단순 덧셈 연산에서 저와 동일하게 웹 어셈블리 코드가 자바스크립트보다 더 성능이 떨어지는 문제를 겪고 있었습니다. 글쓴이가 발견한 바에 따르면

> I almost figured out the problem - it was slow because the Developer Tools were open! More specifically, it slowed down WASM in Chrome and Firefox and it slowed down JS in Safari, very weird. Without Developer Tools the times are almost equal.

개발자 도구가 열려있을 때, 크롬과 파이어폭스에서는 웹 어셈블리 코드가 느려지고, 사파리에서는 자바스크립트 코드가 느려졌습니다. 개발자 도구가 열려있지 않을 때는 두 코드가 거의 비슷한 시간에 실행되었다고 합니다.

이 포스트와 댓글들을 하나하나 읽은 후, 아래 사진과 같이 chrome 브라우저의 experimental 옵션을 켜주는 것과 같은 시도를 해봤지만, 결과는 그대로였습니다. 하지만 개발자 도구를 껐을 때에는 확실히 웹 어셈블리의 성능이 높아진 것을 확인할 수 있었습니다.

![chrome-enable-wasm](/_posts/wasm-from-scratch/chrome-enable-wasm.png)

![chrome-devtools-off](/_posts/wasm-from-scratch/chrome-devtools-off.png)

![chrome-devtools-on](/_posts/wasm-from-scratch/chrome-devtools-on.png)

개발자 도구를 껐을 때(위)는 웹 어셈블리 코드가 약 723 ms, 켜놓은 채(아래)로 코드를 실행했을 때에는 2276 ms 에 실행되었습니다. 이전 사파리 브라우저에서 실행된 것과는 정 반대의 결과입니다. 이에 대한 이유는 알아낼 수 없었습니다. [여기에 소개된](https://www.secmem.org/blog/2020/02/19/How-to-use-wasm-with-Rust/)것과 같이 N-Queen 알고리즘의 성능측정 케이스는 크롬에서도 웹 어셈블리가 더 빨랐지만, 이것이 어떠한 기준을 가지는지 정확하게 알 수 없었습니다.

## 마치며

웹 어셈블리가 2015년에 처음 제안된 최신 기술인 만큼, 브라우저 벤더별, 엔진별로 구현이 다르고 아직 완전하지 않은 것으로 보입니다. 또 C/C++ 또는 Rust 언어로만 완전한 하나의 웹 애플리케이션을 작성하지 않는 이상, 자바스크립트와 혼용할 수 밖에 없습니다. 어떤 경우에 성능향상을 얻을 수 있고, 어떤 경우에 그냥 자바스크립트로 엔진의 최적화를 이용하는것이 더 좋은 성능을 내는지 이번 실험결과로 결정지을 수 없었으므로, 실제 성능을 측정해보고 더 적합한 기술을 선택하는 것이 최선일 거라 생각됩니다.

본문에서는 Rust와 C/C++ 언어를 사용한 웹 어셈블리를 언급했지만, [awesome-wasm-langs 레포](https://github.com/appcypher/awesome-wasm-langs)에서 확인할 수 있는 바로는, 현재 40개 이상의 언어가 웹 어셈블리 포맷으로 컴파일될 수 있다고 합니다. 2019년 W3C 가 웹 어셈블리를 웹의 네번째 공식 언어로 선언한 만큼, 웹 어셈블리는 많은 잠재성을 지닌 미래 웹의 근간이 될 기술이라 생각됩니다.

## 레퍼런스

MDN - performance api: [https://developer.mozilla.org/ko/docs/Web/API/Performance](https://developer.mozilla.org/ko/docs/Web/API/Performance)  
MDN - 웹 어셈블리의 컨셉: [https://developer.mozilla.org/ko/docs/WebAssembly/Concepts](https://developer.mozilla.org/ko/docs/WebAssembly/Concepts)  
naver d2 - 2020년과 이후 JavaScript의 동향 - WebAssembly: [https://d2.naver.com/helloworld/8257914](https://d2.naver.com/helloworld/8257914)  
stackoverflow - Access the DOM in WebAssembly: [https://stackoverflow.com/questions/59708546/access-the-dom-in-webassembly](https://stackoverflow.com/questions/59708546/access-the-dom-in-webassembly)  
web assembly use cases: [https://webassembly.org/docs/use-cases/](https://webassembly.org/docs/use-cases/)  
web assembly core specifications: [https://webassembly.github.io/spec/core/](https://webassembly.github.io/spec/core/)  
rustwasm/rust-webpack-template: [https://github.com/rustwasm/rust-webpack-template](https://github.com/rustwasm/rust-webpack-template)  
webpack - experiments: [https://webpack.js.org/configuration/experiments/](https://webpack.js.org/configuration/experiments/)  
reddit- wasm is slow in chrome: [https://www.reddit.com/r/WebAssembly/comments/kk9vuv/webassembly_much_slower_than_js_in_this_benchmark/](https://www.reddit.com/r/WebAssembly/comments/kk9vuv/webassembly_much_slower_than_js_in_this_benchmark/)  
mbasso/awesome-wasm: [https://github.com/mbasso/awesome-wasm](https://github.com/mbasso/awesome-wasm)  
appcypher/awesome-wasm-langs: [https://github.com/appcypher/awesome-wasm-langs](https://github.com/appcypher/awesome-wasm-langs)  
World Wide Web Consortium (W3C) brings a new language to the Web as WebAssembly becomes a W3C Recommendation: [World Wide Web Consortium (W3C) brings a new language to the Web as WebAssembly becomes a W3C Recommendation](https://www.w3.org/2019/12/pressrelease-wasm-rec.html.en)
