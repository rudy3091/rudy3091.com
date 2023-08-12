---
title: "터미널을 활용해 생산성 향상시키기"
slug: "terminal-productivity"
date: "2022-11-29"
author: "김현민 @rudy3091"
---

본 포스트에서는 생산성을 향상시키기 위한 고민의 결과로 나온 터미널 활용법을 소개합니다.

터미널을 사용하다보면 마우스에 손이 갈 일이 확실히 줄어 좋았는데요, 저처럼 게으른 사람들에게 이것은 축복과도 같은 일이었습니다. 타이핑을 하다가 손을 움직일 일이 줄었으니까요.

이번 공유에서는 터미널을 사용함에 있어 미세한 팁들과 쓸만한 터미널 유틸리티들을 소개함과 동시에, 읽는 이의 흥미를 위해 최대한 기술적 배경과 복잡한 코드를 지양하려 노력했습니다.

그러면서도 단순히 터미널을 꾸미는 것이 아닌 실제로 유용하게 터미널을 사용하는데 필요한 것들을 정리해봤습니다.

## 터미널

> A **computer terminal** is an electronic or electromechanical hardware device that can be used for entering data into, and transcribing data from, a computer or a computing system.

대충 컴퓨터의 입출력을 담당하는 역할을 하는 하드웨어 라고 요약할 수 있겠습니다.

태초에 존재했던 컴퓨터는 천공카드를 사용하여 명령을 내릴 수 있었습니다.

이때 20세기 중반에 사용되던 IBM 천공카드의 column 개수가 80개였는데, 이때의 80 column은 현대에도 영향을 미쳐, 터미널의 `기본` column width로 채택되고 있습니다.

![Untitled](/_posts/terminal-productivity/tp1.png)

![Untitled](/_posts/terminal-productivity/tp2.png)

### tty

이후에는 `teletypewriter`, tty 가 사용되었습니다.

타자기의 키보드에 입력하는 내용이 컴퓨터의 입력으로 전달되고, 연결되어 있는 라인 프린터가 컴퓨터에서의 출력을 인간에게 전달하는 역할을 합니다.

이것이 command line interface의 조상이 되었고, 현재까지도 Unix 시스템에서 `/dev/tty`이라는 파일이름에 영향을 끼치게 되었습니다.

현대에 와서는 이 tty를 에뮬레이션하는 `gnome terminal`, `Terminal.app`등의 터미널 에뮬레이터가 “터미널” 이라 불리고 있습니다.

이 아티클에서 말하는 “터미널” 역시 이 터미널 에뮬레이터를 의미합니다.

터미널의 뒷편에서 일어나는 일들에 대해 더 자세히 알고 싶다면 https://yakout.io/blog/terminal-under-the-hood/ 를 참고해주세요.

## 커서 다루기

이렇게 유구한 역사를 가진 터미널의 첫인상은 조금 답답합니다.

많은 사람들이 컴퓨터를 사용할 때, 이미 GUI에 익숙해져서 입력 커서를 마우스로 움직이지 못하고, 화살표를 하나하나 눌러 이동하는 불편함을 호소합니다.

하지만 이러한 불편함을 해소할 수 있는 기능이 존재합니다(터미널 환경에 따라 지원).

https://www.makeuseof.com/linux-bash-terminal-shortcuts/

```
<- 앞쪽       뒤쪽 ->
wwww wwww wwww wwww
        |
        ^ 커서
```

- `ctrl + a`: 라인 가장 앞으로 이동
- `ctrl + e`: 라인 가장 뒤로 이동
- `ctrl + w`: 한 단어 지우기
- `ctrl + u`: 커서 앞쪽 모두 지우기
- `ctrl + k`: 커서 뒤쪽 모두 지우기
- `ctrl + y`: 제거한 내용 복/붙
- `ctrl + l`: 스크린 clear
- `ctrl + -`: undo
- `ctrl + z`: 현재 프로세스를 background로 보내기
- 이외에도 유용한 기능이 있습니다 (ex. ESC + t: 마지막 두 단어를 교체, `mv`, `cp` 명령어 등 사용 시 유용)

위 목록과 같이 command line에 입력된 값을 쉽게 수정할 수 있는 단축키가 존재하지만, 좀 더 강력한 기능을 사용할 수 있게 하는 명령어도 존재합니다.

### 명령 편집모드

```
$ set -o vi
```

위 명령어를 사용하면, 목록에 있는 `ctrl + a` 등의 사용이 힘들다는 단점이 존재하지만 vi 키바인딩을 이용해 커맨드 라인 상에 입력된 문자를 수정할 수 있습니다.

해당 기능을 끄는 명령어는 아래와 같습니다.

```
$ set -o emacs
```

### 이스케이프 시퀀스

또한 터미널의 제어를 위한 표준이 존재합니다.

https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797

`ANSI Escape Sequences` 라고 불리는 이 표준은 터미널 에뮬레이터에서 커서의 위치, 색, 폰트 스타일 등을 제어할 수 있게 합니다.

터미널은 이 시퀀스들을 텍스트가 아닌 명령으로 해석하기 때문에 이들을 화면에 출력해도 텍스트의 형태로 출력되지 않고 터미널의 상태가 변하게 됩니다.

지금 터미널을 열어서 아래 명령어를 입력해보면, 푸른색으로 볼드처리된 **Hello!**를 보실 수 있을것입니다.

```
$ echo '\x1b[1;34mHello!'
```

또한 아래 명령어를 입력하면 현재 라인 이전의 모든 글자가 사라지는 마법을 사용할 수 있습니다.

(사실은 사라지는게 아니라 위로 밀어서 없애버리는 동작입니다.)

```
$ echo '\x1b[H'
```

간단한 쉘 스크립트를 작성해 간이 로딩 화면을 만들 수도 있습니다.

```bash
#!/bin/bash

echo -e '\x1b[?1049h' # 스크린 로드
echo -e '\x1b[?25l'   # 커서 숨기기

printf '\x1b[0;0H'    # 0, 0 지점으로 이동 (newline 없애기 위해 printf 사용)

printf 'Hello world'  # Hello world 출력

printf '.'
sleep 1               # 1초 대기
printf '.'
sleep 1               # 1초 대기
printf '.'
sleep 1               # 1초 대기

echo -e '\x1b[?1049l' # 스크린 복귀
echo -e '\x1b[?25h'   # 커서 보이기
```

```bash
#!/bin/sh

printf '\x1b[?1049h' # 스크린 로드
printf '\x1b[?25l'   # 커서 숨기기

STR='Hello world'

# tput 명령어를 이용해 터미널 사이즈 계산
WIDTH=$(( $(tput cols) / 2 - $(echo $STR | wc -m ) / 2 ))
HEIGHT=$(( $(tput lines) / 2 - 1 ))

# 터미널 스크린 중앙으로 커서 이동
printf '\x1b[%s;%sH' $HEIGHT $WIDTH

printf '$STR'        # Hello world 출력

printf '.'
sleep 1
printf '.'
sleep 1
printf '.'
sleep 1              # 1초씩 대기

printf '\x1b[?1049l' # 스크린 닫기
printf '\x1b[?25h'   # 커서 보이기
```

이 Escape sequence 를 사용한 재미있는 예제가 있습니다.

[donut.c](https://www.a1k0n.net/2011/07/20/donut-math.html) 라는 유명한 코드인데, 이 코드를 컴파일하여 실행하면 터미널 상에 3D 도넛 모양을 렌더링합니다.

여기서도 Escape sequence를 사용하여 프레임마다 화면을 갱신하며 3D 모델을 렌더링하고 있습니다.

이 코드가 동작하는 원리는 아래 유튜브 영상에서 간단히 설명하고 있으니 가볍게 보시면 재밌을거라 생각됩니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/sW9npZVpiMI?start=183" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

https://youtu.be/sW9npZVpiMI?t=183

```
						 k;double sin()
         ,cos();main(){float A=
       0,B=0,i,j,z[1760];char b[
     1760];printf("**\x1b[2J**");for(;;
  ){memset(b,32,1760);memset(z,0,7040)
  ;for(j=0;6.28>j;j+=0.07)for(i=0;6.28
 >i;i+=0.02){float c=sin(i),d=cos(j),e=
 sin(A),f=sin(j),g=cos(A),h=d+2,D=1/(c*
 h*e+f*g+5),l=cos      (i),m=cos(B),n=s\
in(B),t=c*h*g-f*        e;int x=40+30*D*
(l*h*m-t*n),y=            12+15*D*(l*h*n
+t*m),o=x+80*y,          N=8*((f*e-c*d*g
 )*m-c*d*e-f*g-l        *d*n);if(22>y&&
 y>0&&x>0&&80>x&&D>z[o]){z[o]=D;;;b[o]=
 ".,-~:;=!*#$@"[N>0?N:0];}}/*#****!!-*/
  printf("**\x1b[H**");for(k=0;1761>k;k++)
   putchar(k%80?b[k]:10);A+=0.04;B+=
     0.02;}}/*****####*******!!=;:~
       ~::==!!!**********!!!==::-
         .,~~;;;========;;;:~-.
             ..,--------,*/
```

- beautify & optimization 추가된 코드

  ```c
  #include <stdint.h>
  #include <stdio.h>
  #include <string.h>
  #include <unistd.h>

  #define R(mul,shift,x,y) \
    _=x; \
    x -= mul*y>>shift; \
    y += mul*_>>shift; \
    _ = 3145728-x*x-y*y>>11; \
    x = x*_>>10; \
    y = y*_>>10;

  int8_t b[1760], z[1760];

  void main() {
    int sA=1024,cA=0,sB=1024,cB=0,_;
    for (;;) {
      memset(b, 32, 1760);  // text buffer
      memset(z, 127, 1760);   // z buffer
      int sj=0, cj=1024;
      for (int j = 0; j < 90; j++) {
        int si = 0, ci = 1024;  // sine and cosine of angle i
        for (int i = 0; i < 324; i++) {
          int R1 = 1, R2 = 2048, K2 = 5120*1024;

          int x0 = R1*cj + R2,
              x1 = ci*x0 >> 10,
              x2 = cA*sj >> 10,
              x3 = si*x0 >> 10,
              x4 = R1*x2 - (sA*x3 >> 10),
              x5 = sA*sj >> 10,
              x6 = K2 + R1*1024*x5 + cA*x3,
              x7 = cj*si >> 10,
              x = 40 + 30*(cB*x1 - sB*x4)/x6,
              y = 12 + 15*(cB*x4 + sB*x1)/x6,
              N = (-cA*x7 - cB*((-sA*x7>>10) + x2) - ci*(cj*sB >> 10) >> 10) - x5 >> 7;

          int o = x + 80 * y;
          int8_t zz = (x6-K2)>>15;
          if (22 > y && y > 0 && x > 0 && 80 > x && zz < z[o]) {
            z[o] = zz;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
          R(5, 8, ci, si)  // rotate i
        }
        R(9, 7, cj, sj)  // rotate j
      }
      for (int k = 0; 1761 > k; k++)
        putchar(k % 80 ? b[k] : 10);
      R(5, 7, cA, sA);
      R(5, 8, cB, sB);
      usleep(15000);
      printf("\x1b[23A");
    }
  }
  ```

## 몇가지 명령어

### 파이프

파이프는 여러 쉘 명령어를 연결할 수 있게 합니다.

일반적으로 명령어를 실행했을 때에 입력은 stdin(키보드)으로부터 받아들이게 되는데, 이를 파이프를 이용하면 변경할 수 있습니다.

파이프에는 여러 종류가 존재하지만 가장 흔히 사용되는 파이프는 `|`(stdin 소스 지정), `>`(stdout을 파일에 write) 등이 있습니다.

```bash
echo 'abcd
efgh
ijkl' | grep 'a' # `|` 오른쪽 명령어에 `|` 왼쪽 명령어의 stdout을 stdin으로 입력

echo 'hello' > a.txt # `a.txt` 파일에 `>` 왼쪽 명령어의 stdout을 write
echo 'world' >> a.txt # `a.txt` 파일에 `>>` 왼쪽 명령어의 stdout을 write and append
```

### &

&는 쉘 명령어를 백그라운드에서 실행하도록 지정합니다.

이 동작들의 목록은 `jobs` 라는 명령어를 통해 확인할 수 있으며, `fg` 명령어를 통해 foreground로 가져올 수 있습니다.

`ctrl + z` 를 이용해 현재 프로세스를 백그라운드로 보내는 것과 동일합니다.

```bash
# 백그라운드에서 src/index.ts 가 열려있는 vim 프로세스 생성됨
# 현재 터미널에 보이진 않지만 실행되고 있는 상태
# fg 입력시 foreground로 불러와서 편집 가능
$ vim src/index.ts &
```

여러 개의 명령어를 `&`을 이용해 체이닝할수도 있습니다.

이 경우 병렬로 실행되기 때문에 각 명령어는 서로서로 영향을 미치지 않습니다.

### &&

&& 명령어는 쉘 명령어를 순차적으로 실행하도록 지정합니다.

많은 package.json 파일에서 사용하고 있는 형태라 이미 익숙하게 사용하고 있을거라 생각됩니다.

`&`와는 다르게 아래와 같이 `&&`로 연결된 명령어들 중 하나라도 실패할 경우 이후 명령어가 실행되지 않는다는 특징이 있습니다.

![Untitled](/_posts/terminal-productivity/tp3.png)

### cd

아주 단순히 현재 디렉토리를 옮기는 change directory 명령입니다.

하지만 cd 명령어에는 비밀이 있습니다.

shell script 로 작성한 cd 명령은 현재 열려있는 쉘에 영향을 미치지 못한다는 것입니다.

즉, 아래와 같은 쉘 스크립트를 실행해도 현재 쉘의 디렉토리를 `src/components`로 변경할 수 없습니다.

```bash
#!/bin/sh

cd src/components
```

```bash
# 쉘 스크립트 실행
~/proj $ ./cd.sh
~/proj $ _
```

이를 해결하기 위해선 아래와 같은 방식으로 쉘 스크립트를 실행해야 합니다.

```bash
~/proj $ . ./cd.sh
~/proj/src/components $ _
```

이것은 환경변수 설정에도 동일하게 적용되어, 쉘 스크립트를 이용해 환경변수를 세팅하는 스크립트를 작성하고 싶다면 위와 같이 쉘 스크립트를 실행해야 합니다.

### jq

간단한 요청에 대해 json 형식의 응답을 확인해보고 싶을 때 curl을 자주 사용합니다.

`jq` 명령어는 입력으로 들어온 문자열을 가공해 json 형식으로 보여줍니다.

```jsx
curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5'

/*
[
  {
    "sha": "d25341478381063d1c76e81b3a52e0592a7c997f",
    "commit": {
      "author": {
        "name": "Stephen Dolan",
        "email": "mu@netsoc.tcd.ie",
        "date": "2013-06-22T16:30:59Z"
      },
      "committer": {
        "name": "Stephen Dolan",
        "email": "mu@netsoc.tcd.ie",
        "date": "2013-06-22T16:30:59Z"
      },
      "message": "Merge pull request #162 from stedolan/utf8-fixes\n\nUtf8 fixes. Closes #161",
      "tree": {
        "sha": "6ab697a8dfb5a96e124666bf6d6213822599fb40",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/6ab697a8dfb5a96e124666bf6d6213822599fb40"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/d25341478381063d1c76e81b3a52e0592a7c997f",
      "comment_count": 0
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/d25341478381063d1c76e81b3a52e0592a7c997f",
    "html_url": "https://github.com/stedolan/jq/commit/d25341478381063d1c76e81b3a52e0592a7c997f",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/d25341478381063d1c76e81b3a52e0592a7c997f/comments",
    "author": {
      "login": "stedolan",
...
*/
```

`less` 명령어를 이용하면 긴 응답을 페이지네이션을 추가하여 확인할 수 있습니다.

물론 이때 navigation에 화살표 키를 이용할 수도 있으나, 보통 이런 터미널 명령어들은 vim 키맵을 따르기 때문에 `u`, `d`, `5d`, `g` 등의 키를 통한 빠른 navigation을 지원합니다

```jsx
curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' | jq | less
```

`jq` 명령어에 옵션을 주게 되면 이러한 응답 json 데이터를 조작하는것 역시 가능합니다.

```jsx
curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' | jq '.[0] | {authorName: .author.login}'

/*
{
  "authorName": "wader"
}
*/
```

### pbcopy & pbpaste

터미널 상에서 출력되는 내용을 복사/붙여넣기 해야 할 경우가 존재합니다.

하지만 이럴 때마다 마우스에 손을 움직이고, 마우스 커서를 목표하는 텍스트에 드래그하는 과정은 너무 귀찮습니다.

이를 위한 명령어 역시 존재합니다.

```bash
# 클립보드에 github_key.token 의 내용을 복사
$ cat ./github_key.token | pbcopy

# curl의 결과 json을 클립보드에 복사
$ curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' | pbcopy

# 클립보드에 저장되어있는 값을 파일에 쓰기
$ pbpaste > sample.md
```

macos에만 존재하는 명령어이지만, 은근히 유용하게 쓸 수 있는 명령어입니다.

## 유틸리티

여기까지 Unix 시스템에 기본적으로 존재하는 명령어들을 살펴보았습니다.

이 외에도 여러 사람들이 이미 개발해둔 터미널 유틸리티들이 많이 존재합니다.

### tmux

https://github.com/tmux/tmux/wiki/Getting-Started

### lazygit

https://github.com/jesseduffield/lazygit#tutorials

### zoxide

https://github.com/ajeetdsouza/zoxide#getting-started

## 개발

> **고도로 발달한 vim은 vscode와 구별할 수 없다(?)**

오직 터미널과 vim만을 이용해서 개발 업무를 처리하는 것 역시 가능합니다.

vim에는 기본 기능을 확장할 수 있는 플러그인 시스템이 존재합니다.

그 중에서도 [coc.nvim](https://github.com/neoclide/coc.nvim) 이라는 플러그인이 존재하는데, 이 플러그인은 `language server protocol`이라는 것을 이용해서 vim에서도 vscode와 같은 자동완성 등의 편의기능을 사용할 수 있게 합니다.

![Untitled](/_posts/terminal-productivity/tp4.png)

### language server protocol

[https://learn.microsoft.com/ko-kr/visualstudio/extensibility/language-server-protocol?view=vs-20212](https://learn.microsoft.com/ko-kr/visualstudio/extensibility/language-server-protocol?view=vs-2022)

![Untitled](/_posts/terminal-productivity/tp5.png)

vscode의 language server와의 통신을 나타내는 그림입니다.

jsonrpc 라는 기술을 이용해 에디터와 language server가 통신하며 `go to definition` 같은 기능들을 제공합니다.

아래는 microsoft 공식 문서에서 소개하고 있는 c++ 문서의 `go to definition` 통신 시의 응답/요청 페이로드입니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "textDocument/definition",
  "params": {
    "textDocument": {
      "uri": "file:///p%3A/mseng/VSCode/Playgrounds/cpp/use.cpp"
    },
    "position": {
      "line": 3,
      "character": 12
    }
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "uri": "file:///p%3A/mseng/VSCode/Playgrounds/cpp/provide.cpp",
    "range": {
      "start": {
        "line": 0,
        "character": 4
      },
      "end": {
        "line": 0,
        "character": 11
      }
    }
  }
}
```

위와 같은 language server protocol을 이용하여 아래 사진과 같이 vim 환경에서도 자동완성 및 타입 추론 등의 기능을 지원받을 수 있습니다.

![Untitled](https://camo.githubusercontent.com/ea345e71d256e0bda72ec57d04a4d45a6cba21a3703486049a5d312a9d662383/68747470733a2f2f616c66732e6368696775612e636e2f6469616e796f752f646174612f706c6174666f726d2f64656661756c742f32303232303830312f323032322d30382d303125323030322d31342d30332e323032322d30382d303125323030325f31355f31362e676966)

### neovim

이렇게 편리한 기능을 제공하는 vim에게는 한단계 업그레이드 된 `neovim`이라는 친구가 있습니다.

내장 터미널 에뮬레이터, 비동기 job control 등의 개선사항이 이뤄졌다고 하는데, 제가 생각하기에 neovim을 사용해야 하는 가장 큰 이유는 lua 기반의 확장성입니다.

lua를 이용해 작성된 수많은 플러그인들을 이용하면 neovim을 한단계 더 IDE에 가깝게 사용할 수 있습니다.

- [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)

<img width="100%" src="https://camo.githubusercontent.com/3d59e34d1f406890adf620546d3d97017ce0aacda034b1788c66fa872f192134/68747470733a2f2f692e696d6775722e636f6d2f5454546a6136742e676966" alt="Untitled" />

- [nvim-tree.lua](https://github.com/nvim-tree/nvim-tree.lua)

![Untitled](/_posts/terminal-productivity/tp6.png)

![Untitled](/_posts/terminal-productivity/tp7.png)

## 마무리

여기까지 효과적인 터미널 사용에 대한 미세한 팁들을 공유드렸습니다.

저에게 있어서는 코드를 작성할 때 생산성을 향상시킨다면 품질에 대한 고민을 할 시간이 조금이라도 늘지 않을까 라는 생각으로 시작한 터미널 다루기였습니다.

점점 수단이 아닌 목적이 되어가는 느낌을 받은 적도 있었지만, 이 과정이 즐거웠다면 그것만으로도 의미있는 시간이 아니었을까 싶습니다.

![Untitled](/_posts/terminal-productivity/tp8.png)
