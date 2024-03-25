# kt-map-sdk-geomaster로 장소 검색하기

**💡 튜토리얼의 목표**

**Vite로 Vanilla Typescript 프로젝트를 생성하고 `kt-map-sdk-js`와`kt-map-sdk-geomaster` 를 npm 으로 설치 후 장소를 검색하고 지도에 띄우는 방법을 이 튜토리얼에서 설명합니다. 검색어 입력창을 만들고, 자동완성 기능을 추가하고, 검색된 장소를 지도에 표시하는 과정을 설명합니다.**

- `kt-map-sdk-js` 사용에 대한 자세한 설명은 kt-map-sdk-js의 설명을 참고해주세요

# Getting Start

### API key 발급

1. KT API 사이트 *[(https://apilink.kt.co.kr/)](https://apilink.kt.co.kr/)* 접속

2. 계정 가입 및 로그인

3. 권한신청 메뉴로 이동

4. API 신청 > 일반개발자 | 개인사업자 | 법인사업자 | GiGA Genie 제휴법인 중 해당 소속 선택

5. 정보입력 후 권한 신청

### Node.js and npm 준비

1. [https://nodejs.org/en](https://nodejs.org/en) 에 접속하여 node.js 설치합니다 
2. npm 및 node 버전 확인을 통해 설치가 잘 되었는지 확인합니다

```jsx
//npm 버전 확인
cmd > npm -v 

//node 버전 확인
cmd > node -v
```

# Project Setting

vite를 사용하여 Vanilla Typescript 프로젝트를 생성합니다. 

### 프로젝트 초기 셋팅 및 지도 띄우기

Vanilla Typescript 프로젝트의 레이아웃을 구성하겠습니다.

index.html 파일에 `<body>` 태그를 활용하여 화면 영역을 구성합니다.

지도가 들어갈 수 있도록 `<div>` 태그를 활용하여 id=”map”으로 설정하여 지도 영역을 구성합니다.

> index.html
> 

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="text/css" rel="stylesheet" href="index.css" />
    <title>ktmap-geomaster-searchpoi-tutorial</title>
  </head>
  <body>
    <div id="map"></div>
  </body>
  <script type="module" src="/src/index.ts" ></script>
</html>
```

전체적인 구조의 css를 정의합니다.

> index.css
> 

```css
body {
  margin: 0;
  padding: 0;
}

html,
body,
#map {
  width: 100%;
  height: 100%;
}
```

npm으로 kt-map-sdk-js 라이브러리를 설치합니다.

```bash
npm install kt-map-sdk-js
```

src 폴더에 index.ts 파일을 생성하고, ktGms.Map을 생성합니다.

> index.ts
> 

```tsx
import ktGms from 'kt-map-sdk-js'

let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})
```

KT Map이 렌더링 된 화면은 아래와 같습니다

![image0](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchpoi/img/image0.png?raw=true)

### geomaster 패키지 설치

npm으로 kt-map-sdk-geomaster 패키지를 설치합니다

```bash
npm install kt-map-sdk-geomaster
```

# 자동완성 기능 추가하기

### 검색어 입력창 띄우기

화면 상단에 검색어 입력창을 띄우는 방법은 아래와 같습니다. 

기존 index.html에 div 태그를 통하여 레이아웃을 구성하고, 검색어를 입력할 수 있는 input태그와 검색 버튼을 추가합니다.

> index.html
> 

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="text/css" rel="stylesheet" href="index.css" />
    <title>ktmap-geomaster-searchpoi-tutorial</title>
  </head>
  <body>
    <div id="map">
      <div class="search">
        <div class="search-ctrl">
          <input
              id="search-input"
              type="text"
              name="search"
              placeholder="검색어를 입력하세요"
          />
          <button id="search-btn">🔍︎</button>
        </div>
      </div>
    </div>
  </body>
  <script type="module" src="/src/index.ts" ></script>
</html>

```

검색어 입력창과 관련된 css는 아래와 같이 작성합니다

> index.css
> 

```css
// ..지도 관련 css는 생략
.search {
  z-index: 1;
  position: absolute;
  margin-left: 12px;
}

.search-ctrl {
  z-index: 1;
  margin-top: 12px;
  top: 12px;
  left: 12px;
  width: 384px;
  min-height: 48px;
  padding: 3px 0 0;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
}

.search-ctrl input[type="text"] {
  z-index: 1;
  margin-left: 12px;
  width: 334px;
  min-height: 40px;
  padding: 3px 0 0;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 16px;
  font: 16px "KTfontMedium";
  outline: none;
}

.search-ctrl button {
	position: absolute;
  height: 45px;
  background-color: transparent;
  border-color: transparent;
  border-radius: 3px;
  cursor: pointer;
  float: right;
  font-size:20px
}
```

검색어 입력창이 렌더링 된 화면은 아래와 같습니다.

![image1](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchpoi/img/image1.png?raw=true)

### 자동완성 기능 추가하기

검색어 입력할 때 input 이벤트를 감지하여 geomaster의 자동완성 메소드를 사용하여 결과를 받아오고, 그 결과를 화면에 추가합니다. 

input 이벤트를 감지할 때 [ㅅ, 스, 스ㅌ, 스타,..] 처럼 모든 이벤트를 감지하고 api를 호출하는 것을 비효율적입니다. debounce 함수를 따로 정의하여 무효한 api 호출을 줄입니다.

> index.ts
> 

```tsx
// ... 지도 추가 부분 생략

let input = document.getElementById('search-input') as HTMLInputElement // 검색어 입력 input
let btn = document.getElementById('search-btn') // 검색어 입력 버튼
let search = document.querySelector('.search') // search div

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

// 검색어를 입력하면 자동완성 되도록 이벤트리스너를 설정합니다
input?.addEventListener('input', (e: any) => {
  inputChange()
})

// debounce 함수를 정의합니다
const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = fn(...args)
    }, delay)
    return result
  }
}

// debounce 함수를 사용하여 자동완성 메소드를 호출합니다. 무효한 키 입력이 api를 호출하지 않도록 하기 위함입니다
const inputChange = debounce(() => makeAutocomplete(input.value), 200)

// geomaster의 자동완성 메소드를 실행하고, 그 결과를 화면에 띄우는 함수입니다
async function makeAutocomplete(term: string) {
  // 기존 자동완성 결과가 화면에 있으면 삭제합니다
  document.getElementById('autocomplete')?.remove()
  // 자동완성 할 용어가 없다면 함수를 종료합니다
  if (!term) return

  // 자동완성 결과를 화면에 띄우기 위한 div 영역을 생성합니다
  const autocomplete = document.createElement('div')
  autocomplete.id = 'autocomplete'
  search?.appendChild(autocomplete)

  // geomaster의 자동완성 메소드를 실행합니다
  const result = await searchService.autocomplete({ terms: term })

  // 자동완성 결과를 순회하며 화면에 추가합니다
  result.suggests.map((suggest: any) => {
    // 자동완성 결과 리스트 1개에 대한 div 영역을 생성합니다
    const list = document.createElement('div')
    list.id = suggest.poiId
    list.innerText = suggest.terms
    autocomplete.appendChild(list)
  })
}

// 자동완성 외 다른 영역 클릭 시 자동완성 영역이 사라지도록 설정합니다
function removeAutocompleteDivByMouseClick() {
  document.addEventListener('click', (e: any) => {
    document.getElementById('autocomplete')?.remove()
  })
}
removeAutocompleteDivByMouseClick()
```

자동완성 영역의 스타일을 추가합니다

> index.css
> 

```css
#autocomplete {
  position: absolute;
  top: 65px;
  background-color: #fff;
  margin-left: 12px;
  margin-top:3px;
  border-radius: 4px;
  width: 334px;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
}

#autocomplete div {
  padding: 10px 0px 10px 10px;
  font: 16px "KTfontMedium";
}
#autocomplete div:hover {
  cursor: pointer;
  background-color: rgb(234, 234, 234);
}
```

‘스타벅스’ 입력하고 자동완성된 화면은 아래와 같습니다

![image2](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchpoi/img/image2.png?raw=true)

# POI 검색 기능 추가하기

### 화면 영역 셋팅

poi 검색 결과와 페이징처리를 화면에 렌더링할 수 있도록 html과 css로 셋팅하겠습니다.

> index.html
> 

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link type="text/css" rel="stylesheet" href="index.css" />
  <title>ktmap-geomaster-searchpoi-tutorial</title>
</head>

<body>
  <div id="map">
    <div class="search">
      <div class="search-ctrl">
        <input id="search-input" type="text" name="search" placeholder="검색어를 입력하세요" />
        <button id="search-btn">🔍︎</button>
      </div>
      <div id="poi-result"> <!--poi결과-->
        <div id="top"></div> <!--장소 개수-->
        <div id="list-result"> <!--poi검색 결과 리스트-->
      </div>

      <div id="bottom">
        <div class="before" id="prev-button">〈〈</div>
        <div id="pagination-numbers"></div>
        <div class="next" id="next-button">〉〉</div>
      </div>
    </div>
    </div>
  </div>
</body>
<script type="module" src="/src/index.ts"></script>

</html>
```

> index.css
> 

```css
...
/* poi 결과 */
#poi-result {
  display: none;
  height: 85vh;
  margin-top: 10px;
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
  background-color: #fff;
}

#poi-result #top {
  height: 28px;
  padding-left: 15px;
  padding-top: 12px;
  border-bottom: 1px solid #e8e8e8;
  font:14px "KTfontMedium";
}

#poi-result #list-result {
  overflow: scroll;
  height: 90%;
}

#poi-result #list {
  cursor: pointer;
  padding-left: 10px;
  padding-top: 17px;
  padding-bottom: 17px;
  border-bottom: 1px solid #e8e8e8;
}
#poi-result #list:hover {
  background-color: rgb(234, 234, 234);
}
#poi-result #list .name span {
  width: 40px;
  text-align: center;
  display: inline-block;
}
#poi-result #list .name{
  font: 16px "KTfontMedium";
  font-weight: 600;
  padding-bottom: 3px;
}
#poi-result #list .info {
  padding-left: 30px;
}
#poi-result #list .address {
  padding-left: 30px;
  color:#707070
}

/* 검색창 페이징처리 */
#bottom {
  padding-top: 10px;
  border-top: 1px solid #e8e8e8;
  display:flex;
  justify-content:center;
  color:rgb(78, 78, 78);
}
#pagination-numbers {
  width:90%;
  display: flex;
  justify-content: center;
}
#pagination-numbers div {
  width: 8%;
  text-align: center;
  cursor: pointer;
}
#pagination-numbers .active {
  color:#000;
  font-weight: 600;
}

#pagination-numbers div:hover {
  color:#000;
  font-weight: 600;
}
#prev-button, #next-button {
  cursor: pointer;
}
```

### geomaster의 place 메소드 호출하기

자동완성 결과를 클릭했을 때와 검색 돋보기 버튼을 클릭했을 때 geomaster의 place 메소드를 호출하도록 이벤트리스너를 추가하겠습니다.

자동완성 결과를 순회하며 화면에 추가할 때 이벤트리스너도 함께 추가합니다.

> index.ts
> 

```tsx
// 자동완성 결과를 순회하며 화면에 추가합니다
result.suggests.map((suggest: any) => {
  // 자동완성 결과 리스트 1개에 대한 div 영역을 생성합니다
  const list = document.createElement('div')
  list.id = suggest.poiId
  list.innerText = suggest.terms
  autocomplete.appendChild(list)

  // 자동완성 결과를 클릭했을 때, 장소를 검색하도록 이벤트리스너를 추가합니다
  list.addEventListener('click', (e: any) => {
    searchPlace(suggest.terms, 1)
  })
})
```

돋보기 버튼을 클릭했을 때 검색 되도록 이벤트리스너를 설정하고, searchPlace 메소드에서 geomaster의 place 메소드를 실행합니다

> index.ts
> 

```tsx
// 돋보기 버튼 누르면 검색 되도록 이벤트리스너를 설정합니다
btn?.addEventListener('click', (e: any) => {
  searchPlace(input.value, 1)
})

// 검색어에 맞게 geomaster의 place(장소 찾기) 메소드를 실행하고, 그 결과를 띄우는 함수입니다
async function searchPlace(term: string) {
  if (!term) return
  let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50 })

	// 페이징 객체를 생성합니다. 페이징 객체 생성을 통해 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄웁니다. 다음 설명에 나옵니다
  let pagination = new Pagination(
    paginationNumbers, // 페이지 div
    nextButton, // 다음 버튼 div
    prevButton, // 이전 버튼 div
    Math.ceil(result.numberOfPois / 50), // 전체 페이지 개수
    async (e: number) => {
      // 페이지 클릭 시 수행할 함수
      let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50, start: 50 * (e - 1) })
      makePoi(result.numberOfPois, result.pois, e - 1)
    },
  )
  pagination.makePagination() 
}
```

### 페이징 객체 생성

POI 장소 검색 결과는 한번에 최대 50개까지 받을 수 있습니다. 50개씩 끊어서 화면에 렌더링하기 위해 페이징 객체를 생성합니다. 페이징 객체에는 페이지 관련 파라미터와 페이지 클릭 시 실행할 콜백함수를 넣습니다. 

index.ts와 같은 경로에 pagination.ts파일을 생성하고 아래와 같이 Pagination 객체를 생성합니다

> pagination.ts
> 

```tsx
export class Pagination {
  paginationNumbers // 페이지 div
  nextButton // 다음 버튼 div
  prevButton // 이전 버튼 div
  pageCount // 전체 페이지 개수
  currentPage // 현재 페이지
  displayFirstPage //현재 보여지는 페이지 중 첫 페이지
  displayEndPage // 현재 보여지는 페이지 중 마지막 페이지
  paginationLimit = 10 // 현재 보여지는 페이지 개수
  changePageFunc // 페이지 클릭 시 수행할 함수

  constructor(paginationNumbers: HTMLDivElement, nextButton: HTMLDivElement, prevButton: HTMLDivElement, totalPage: number, changePageFunc: Function) {
    this.paginationNumbers = paginationNumbers
    this.nextButton = nextButton
    this.prevButton = prevButton
    this.pageCount = totalPage
    this.currentPage = 1
    this.displayFirstPage = 1
    this.displayEndPage = this.paginationLimit < this.pageCount ? this.paginationLimit : this.pageCount
    this.changePageFunc = (e: any) => changePageFunc(e)
  }

  // 페이징에 페이지 1개 추가
  appendPageNumber = (index: any) => {
    const pageNumber = document.createElement('div')
    pageNumber.className = 'pagination-number'
    pageNumber.innerHTML = index
    pageNumber.setAttribute('page-index', index)
    pageNumber.setAttribute('aria-label', 'Page ' + index)
    pageNumber.addEventListener('click', () => {
      this.setCurrentPage(index)
    })
    this.paginationNumbers.appendChild(pageNumber)
  }

  // 페이징에 페이지 추가
  getPaginationNumbers = () => {
    document.querySelectorAll('.pagination-number').forEach((button) => {
      button.remove()
    })
    for (let i = this.displayFirstPage; i <= this.displayEndPage; i++) {
      this.appendPageNumber(i)
    }
  }

  // 페이지 active 시키기
  handleActivePageNumber = () => {
    document.querySelectorAll('.pagination-number').forEach((button) => {
      button.classList.remove('active')
      const pageIndex = Number(button.getAttribute('page-index'))
      if (pageIndex == this.currentPage) {
        button.classList.add('active')
      }
    })
  }

  // 페이지 클릭 시 셋팅
  setCurrentPage = (pageNum: number) => {
    this.currentPage = pageNum
    this.handleActivePageNumber()
    this.changePageFunc(pageNum)
  }

  // 페이징 만들기
  // 객체 생성 후 해당 메소드만 호출하면 됩니다
  makePagination = () => {
    this.getPaginationNumbers()
    this.setCurrentPage(1)

    // 이전 버튼에 클릭 이벤트 추가
    this.prevButton.addEventListener('click', () => {
      if (this.displayFirstPage - this.paginationLimit > 0) {
        this.displayFirstPage -= this.paginationLimit
        this.displayEndPage = this.displayFirstPage + this.paginationLimit - 1
        this.getPaginationNumbers()
      }
      this.setCurrentPage(this.displayFirstPage)
    })

    // 다음 버튼에 클릭 이벤트 추가
    this.nextButton.addEventListener('click', () => {
      if (this.displayFirstPage + this.paginationLimit < this.pageCount) {
        this.displayFirstPage += this.paginationLimit
        this.displayEndPage = this.displayEndPage + this.paginationLimit < this.pageCount ? this.displayEndPage + this.paginationLimit : this.pageCount
        this.getPaginationNumbers()
      }
      this.setCurrentPage(this.displayFirstPage)
    })
  }
}

```

Pagination 클래스 파일을 생성했다면, index.ts 파일에서 pagination을 가져와 import 합니다

> index.ts
> 

```tsx
import { Pagination } from './pagination' 
```

장소를 찾을 수 있도록 Pagination 객체에 페이징 처리와 관련된 HtmlElement과 페이지 클릭 시 수행할 콜백 함수를 추가해줍니다

> index.ts
> 

```tsx
// 페이징 처리 관련
const paginationNumbers = document.getElementById('pagination-numbers') as HTMLDivElement
const nextButton = document.getElementById('next-button') as HTMLDivElement
const prevButton = document.getElementById('prev-button') as HTMLDivElement

// 검색어에 맞게 geomaster의 place(장소 찾기) 메소드를 실행하고, 그 결과를 띄우는 함수입니다
async function searchPlace(term: string, page: number) {
  if (!term) return
  // poi 결과 목록 화면을 보여줍니다
  document.getElementById('poi-result')!.style.display = 'block'

  let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50, start: 50 * (page - 1) })

  // 장소 총 개수를 보여줍니다
  const poiResultCount = document.getElementById('top') as HTMLDivElement
  poiResultCount.innerHTML = `장소 ${result.numberOfAddress}건`

  // 페이징 객체를 생성합니다
  let pagination = new Pagination(
    paginationNumbers, // 페이지 div
    nextButton, // 다음 버튼 div
    prevButton, // 이전 버튼 div
    Math.ceil(result.numberOfPois / 50), // 전체 페이지 개수
    async (e: number) => {
      // 페이지 클릭 시 수행할 함수
      let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50, start: 50 * (e - 1) })
      // 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
      makeDisplayPoiList(result.pois, e - 1)
    },
  )
  pagination.makePagination()
}
```

검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 지도에 추가하는 함수를 생성합니다

> index.ts
> 

```tsx
// 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
function makeDisplayPoiList(poi: Array<any>, page: number) {
  map.setCenter(poi[0].point) // 첫번째 결과로 지도 중심을 셋팅합니다

  // 기존 poi 결과 목록이 화면에 있으면 삭제합니다
  document.querySelectorAll('#list').forEach((list) => {
    list.remove()
  })

  // 결과 리스트를 보여줍니다
  const listResult = document.getElementById('list-result') // 결과목록 화면 영역
  const listGeometry: Array<ktGms.geometry.PointGeo> = [] // poi 결과 배열
  let selectedMarker: ktGms.overlay.Marker

  poi.forEach((p: any, index: number) => {
    // 화면에 결과 목록 추가합니다
    const list = document.createElement('div')
    list.id = 'list'
    list.innerHTML += `
        <div class="name"><span>[${index + 1 + 50 * page}]</span>${p.name} ${p.branch}</div>
        <div class="info">${p.category.masterName}</div>
        <div class="address">${p.address.siDo} ${p.address.siGunGu} ${p.address.street}</div>
        <div class="address">지번) ${p.address.eupMyeonDong} ${p.address.houseNumber}</div>
    `
    listResult?.appendChild(list)

    // 결과 클릭 시 그 결과를 중심으로 셋팅하고 마커 띄우는 이벤트리스너를 설정합니다
    list.addEventListener('click', (_) => {
      map.setCenter(p.point)
      selectedMarker?.remove()
      selectedMarker = new ktGms.overlay.Marker({ lngLat: [p.point.lng, p.point.lat] }).addTo(map)
    })

    // poi 결과 배열에 geometry 객체를 추가합니다
    listGeometry.push(new ktGms.geometry.PointGeo([p.point.lng, p.point.lat], { name: `${p.name} ${p.branch}`, info: p.category.masterName, address: `${p.address.siDo} ${p.address.siGunGu} ${p.address.street}` }))
  })
  // 지도에 결과를 표시합니다
  setSource(listGeometry)
}

// 레이어 소스를 셋팅하는 함수입니다. 이전에 레이어를 생성한 적 없다면 생성하고, 레이어가 있다면 소스만 변경합니다
function setSource(data: Array<ktGms.geometry.PointGeo>) {
  if (!map.getLayer('poi-layer')) {
    AddLayer(data)
    return
  }
  map.getSource('poi-source')?.setData(data)
}

// 지도에 poi 결과를 표시하기 위해 레이어를 추가하는 함수입니다
function AddLayer(data: Array<ktGms.geometry.PointGeo>) {
  // 기존에 추가한 레이어와 소스가 있으면 제거합니다
  if (map.getLayer('poi-layer')) map.removeLayer('poi-layer')
  if (map.getSource('poi-source')) map.removeSource('poi-source')

  // 소스 데이터를 생성합니다
  const source = new ktGms.source.GeoJSONSource('poi-source', {
    data: data,
  })

  // 클러스터 레이어를 추가합니다
  map.addLayer(
    new ktGms.layer.ClusterLayer(
      'poi-layer',
      new ktGms.style.CircleStyle(
        {
          'circle-color': '#0076ff',
          'circle-radius': 7,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
        {},
      ),
      source,
      '#ccc',
      '#0076ff',
      '#0000FF',
      'name',
      '',
    ),
  )

  // 레이어 클릭 시 인포윈도우로 정보가 뜨도록 이벤트를 설정합니다
  map.onLayer('click', 'poi-layer', (e: any) => {
    let properties = e.features[0].properties
    console.log(properties)

    let html = `<div>
        <div style="font-weight:bold;">${properties.name}</div>
        <hr></hr>
        <div style="display:flex">
            <div>
                <div class="info">
                    <span class="kind">(${properties.info})</span>
                </div>
                <div class="address">${properties.address}</div>
            </div>
        <div>
    </div>`
    new ktGms.overlay.InfoWindow().setLngLat(e.lngLat).setHTML(html).addTo(map)
  })
}
```

### 검색 결과를 목록으로 나타내고 지도에 띄우기

geomaster의 place 메소드를 호출하여 얻은 결과를 목록으로 나타내고, 클러스터 레이어로 지도에 띄우겠습니다.

> index.ts
> 

```tsx
...
// 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
function makePoi(numberOfAddress: number, poi: Array<any>, page: number) {
  map.setCenter(poi[0].point) // 첫번째 결과로 지도 중심을 셋팅합니다

  // 기존 poi 결과 목록이 화면에 있으면 삭제합니다
  document.querySelectorAll('#list').forEach((list) => {
    list.remove()
  })

  // poi 결과 목록 화면을 보여줍니다
  document.getElementById('poi-result')!.style.display = 'block'

  // 장소 총 개수를 보여줍니다
  const poiResultCount = document.getElementById('top') as HTMLDivElement
  poiResultCount.innerHTML = `장소 ${numberOfAddress}건`

  // 결과 리스트를 보여줍니다
  const listResult = document.getElementById('list-result') // 결과목록 화면 영역
  const listGeometry: Array<ktGms.geometry.PointGeo> = [] // poi 결과 배열
  let selectedMarker: ktGms.overlay.Marker

  poi.forEach((p: any, index: number) => {
    // 화면에 결과 목록 추가합니다
    const list = document.createElement('div')
    list.id = 'list'
    list.innerHTML += `
        <div class="name"><span>[${index + 1 + 50 * page}]</span>${p.name} ${p.branch}</div>
        <div class="info">${p.category.masterName}</div>
        <div class="address">${p.address.siDo} ${p.address.siGunGu} ${p.address.street}</div>
        <div class="address">지번) ${p.address.eupMyeonDong} ${p.address.houseNumber}</div>
    `
    listResult?.appendChild(list)

    // 결과 클릭 시 그 결과를 중심으로 셋팅하고 마커 띄우는 이벤트리스너를 설정합니다
    list.addEventListener('click', (_) => {
      map.setCenter(p.point)
      selectedMarker?.remove()
      selectedMarker = new ktGms.overlay.Marker({ lngLat: [p.point.lng, p.point.lat] }).addTo(map)
    })

    // poi 결과 배열에 geometry 객체를 추가합니다
    listGeometry.push(new ktGms.geometry.PointGeo([p.point.lng, p.point.lat], { name: `${p.name} ${p.branch}`, info: p.category.masterName, address: `${p.address.siDo} ${p.address.siGunGu} ${p.address.street}` }))
  })

  // 지도에 결과를 표시합니다
  AddLayer(listGeometry)
}

// 지도에 poi 결과를 표시하기 위해 레이어를 추가하는 함수입니다
function AddLayer(data: Array<ktGms.geometry.PointGeo>) {
  // 기존에 추가한 레이어와 소스가 있으면 제거합니다
  if (map.getLayer('poi-layer')) map.removeLayer('poi-layer')
  if (map.getSource('poi-source')) map.removeSource('poi-source')

  // 소스 데이터를 생성합니다
  const source = new ktGms.source.GeoJSONSource('poi-source', {
    data: data,
  })

  // 클러스터 레이어를 추가합니다
  map.addLayer(
    new ktGms.layer.ClusterLayer(
      'poi-layer',
      new ktGms.style.CircleStyle(
        {
          'circle-color': '#0076ff',
          'circle-radius': 7,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
        {},
      ),
      source,
      '#ccc',
      '#0076ff',
      '#0000FF',
      'name',
      '',
    ),
  )
}
// 레이어 클릭 시 인포윈도우로 정보가 뜨도록 이벤트를 설정합니다
map.onLayer('click', 'poi-layer', clickLayerEvent)

function clickLayerEvent(e: any) {
  let properties = e.features[0].properties

  let html = `<div>
      <div style="font-weight:bold;">${properties.name}</div>
      <hr></hr>
      <div style="display:flex">
          <div>
              <div class="info">
                  <span class="kind">(${properties.info})</span>
              </div>
              <div class="address">${properties.address}</div>
          </div>
      <div>
  </div>`
  new ktGms.overlay.InfoWindow().setLngLat(e.lngLat).setHTML(html).addTo(map)
}
```

‘스타벅스’ 검색 결과는 다음과 같습니다.

![image3](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/searchpoi/img/image3.png?raw=true)

# 카테고리 별 검색 기능 추가하기

### 화면에 카테고리 영역 추가하기

카테고리를 선택 할 수 있도록 select 태그를 사용하여 화면에 영역을 추가합니다

> index.html
> 

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link type="text/css" rel="stylesheet" href="index.css" />
  <title>ktmap-geomaster-searchpoi-tutorial</title>
</head>

<body>
  <div id="map">
    <div class="search">
      <div class="search-ctrl">
        <input id="search-input" type="text" name="search" placeholder="검색어를 입력하세요" />
        <button id="search-btn">🔍︎</button>
      </div>
      <div id="poi-result"> <!--poi결과-->
        <div id="top"></div> <!--장소 개수-->
        <div id="list-result"> <!--poi검색 결과 리스트-->
      </div>

      <div id="bottom">
        <div class="before" id="prev-button">〈〈</div>
        <div id="pagination-numbers"></div>
        <div class="next" id="next-button">〉〉</div>
      </div>
    </div>
    </div>
    <div class="selectbox"> <!--카테고리 검색-->
      <select id="master">
        <option disabled selected value="">카테고리 검색</option>
      </select>
    </div>
  </div>
</body>
<script type="module" src="/src/index.ts"></script>

</html>
```

> index.css
> 

```css
...
/* 카테고리 selectbox */
.selectbox {
  z-index: 1;
  position: absolute;
  right: 12px;
  margin-top: 12px;
}

.selectbox select {
  width: 300px;
  min-height: 40px;
  padding: 3px 10px 0;
  border: 1px solid transparent;
  border-radius: 16px;
  font: 16px "KTfontMedium";
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
}
```

### 카테고리 MASTER 코드 가져오기

geomaster의 searchService.categoryList 메소드를 사용하여 카테고리 검색 selectbox에 카테고리 리스트를 추가합니다

> index.ts
> 

```tsx
// 카테고리 검색 Selectbox에 카테고리 리스트를 추가합니다
let master = document.getElementById('master') as HTMLSelectElement
async function getMaster() {
  const masterResult = await searchService.categoryList({ type: 'MASTER' })
  masterResult.categoryList?.forEach((a: any) => {
    // select에 option 태그를 추가합니다
    let option = document.createElement('option')
    option.innerText = a.name
    option.value = a.code ?? ''
    master.appendChild(option)
  })
}

getMaster()
```

### 카테고리에 맞는 POI 장소 검색

selectbox에서 카테고리 선택 시 POI 장소 검색하는 이벤트리스너를 추가합니다.  

> index.ts
> 

```tsx
// selectbox에서 카테고리 데이터를 선택했을 때 장소를 검색하는 이벤트리스너를 추가합니다
master?.addEventListener('input', async (_) => {
  document.getElementById('poi-result')!.style.display = 'none'

  let result = await searchService.place({ filters: { category: { code: master.value } }, numberOfResults: 50 })
  const listGeometry: Array<ktGms.geometry.PointGeo> = [] // poi 결과 배열
  result.pois.forEach((p: any, index: number) => {
    // poi 결과 배열에 geometry 객체를 추가합니다
    listGeometry.push(new ktGms.geometry.PointGeo([p.point.lng, p.point.lat], { name: `${p.name} ${p.branch}`, info: p.category.masterName, address: `${p.address.siDo} ${p.address.siGunGu} ${p.address.street}` }))
  })
  AddLayer(listGeometry)
})
```

# 전체 코드

전체 코드는 ~~~깃 에서 확인할 수 있습니다.