# 길찾기 Tutorial

**💡 튜토리얼의 목표**

**Vite로 Vanilla Typescript 프로젝트를 생성하고 `kt-map-sdk-js`와`kt-map-sdk-geomaster` 를 npm 으로 설치 후 경로탐색하는 방법을 이 튜토리얼에서 설명합니다.** 

**장소 검색하기 튜토리얼 기반의 튜토리얼이므로 검색 튜토리얼을 진행한 후 진행해주세요.**

**출발지, 도착지를 검색하여 선택한 후 경로탐색을 통해 길찾기 결과를 지도에 표시하는 과정을 설명합니다.**

- `kt-map-sdk-js` 사용에 대한 자세한 설명은 kt-map-sdk-js의 설명을 참고해주세요

# 사전 Setting

`장소검색 튜토리얼` 의 `POI 검색 기능 추가하기` 까지 완료한 후 진행해주세요.

# 출발지, 도착지 입력받기

### 검색어 입력창 띄우기

화면 상단에 검색어 입력창을 띄우는 방법은 아래와 같습니다. 

기존 index.html에 div 태그를 통하여 레이아웃을 구성하고, 출발지와 도착지를 입력할 수 있는 input태그와 검색 버튼을 추가합니다. 길찾기 버튼도 추가합니다.

```jsx
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="text/css" rel="stylesheet" href="index.css" />
    <title>ktmap-geomaster-route-tutorial</title>
  </head>
  <body>
    <div id="map">
      <div class="search">
        <div class="search-ctrl">
          <input
              id="search-start"
              type="text"
              name="search"
              placeholder="출발지를 입력하세요"
          />
          <button id="search-btn-start">🔍︎</button>
            <input
            id="search-end"
            type="text"
            name="search"
            placeholder="도착지를 입력하세요"
          />
          <button id="search-btn-end">🔍︎</button>
          <div><button id="route">길찾기</button></div>
        </div>
      </div>
    </div>
  </body>
  <script type="module" src="/src/index.ts" ></script>
</html>

```

> index.css
> 

```css

/* 검색창 */
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
  height: 130px;
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

#search-end {
  margin-top:0px;
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

/* 길찾기 버튼 */
#route {
  position: relative;
  cursor: pointer;
  float:right;
  margin:3px;
  width: 100px;
  height: 30px;
  color: #4A90E1;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -.8px;
  border: 1px solid #4A90E1;
  border-radius: 20px;
}
#route:hover {
  box-shadow: 0 0 5px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22);
}

```

npm으로 kt-map-sdk-js 라이브러리와 kt-map-sdk-geomaster를 설치합니다.

```bash
npm install kt-map-sdk-js
npm install kt-map-sdk-geomaster
```

src 폴더에 index.ts 파일을 생성하고, ktGms.Map을 생성합니다.

> index.ts
> 

```tsx
import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: {{KEY}}
})
```

출발지, 도착지 검색어 입력창과 길찾기 버튼이 렌더링 된 화면은 아래와 같습니다.

![스크린샷 2024-03-20 오후 11.15.37.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_1.png?raw=true)

# 자동완성 기능과 POI 검색기능 추가하기

상세한 설명은 `장소검색 튜토리얼` 을 참고하세요.

### 자동완성 기능 추가하기

검색어 입력할 때 input 이벤트를 감지하여 geomaster의 자동완성 메소드를 사용하여 결과를 받아오고, 그 결과를 화면에 추가합니다. 

debounce 함수를 따로 정의하여 무효한 api 호출을 줄입니다.

### 검색 기능 추가하기 - geomaster의 place 메소드 호출하기

자동완성 결과를 클릭했을 때와 검색 돋보기 버튼을 클릭했을 때 geomaster의 place 메소드를 호출하도록 이벤트리스너를 추가하겠습니다.

> index.ts
> 

```tsx
import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: {{KEY}}
})

let start = document.getElementById('search-start') as HTMLInputElement // 출발지 입력 input
let end = document.getElementById('search-end') as HTMLInputElement // 도착지 입력 input
let input = ''
let searchStart = document.getElementById('search-btn-start') // 출발지 검색 버튼
let searchEnd = document.getElementById('search-btn-end') // 도착지 검색 버튼

let search = document.querySelector('.search') // search div
let routeBtn = document.getElementById('route') // 검색어 입력 버튼

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

// 검색어를 입력하면 자동완성 되도록 이벤트리스너를 설정합니다
start?.addEventListener('input', (e: any) => {
  input = 'start'
  inputChange(start.value)
})

// 검색어를 입력하면 자동완성 되도록 이벤트리스너를 설정합니다
end?.addEventListener('input', (e: any) => {
  input = 'end'
  inputChange(end.value)
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
const inputChange = debounce((val) => makeAutocomplete(val), 200)

// geomaster의 자동완성 메소드를 실행하고, 그 결과를 화면에 띄우는 함수입니다
async function makeAutocomplete(term: string) {
  // 기존 자동완성 결과가 화면에 있으면 삭제합니다
  document.getElementById('autocomplete')?.remove()
  // 자동완성 할 용어가 없다면 함수를 종료합니다
  if (!term) return

  // 자동완성 결과를 화면에 띄우기 위한 div 영역을 생성합니다
  const autocomplete = document.createElement('div')
  autocomplete.id = 'autocomplete'
  input === 'end' ? (autocomplete.style.top = '100px') : (autocomplete.style.top = '65px')

  search?.appendChild(autocomplete)

  // geomaster의 자동완성 메소드를 실행합니다
  const result = await searchService.autocomplete({ terms: term, type: 'POI' })

  // 자동완성 결과를 순회하며 화면에 추가합니다
  result.suggests.map((suggest: any) => {
    // 자동완성 결과 리스트 1개에 대한 div 영역을 생성합니다
    const list = document.createElement('div')
    list.id = suggest.poiId
    list.innerText = suggest.terms
    autocomplete.appendChild(list)

    // 자동완성 결과를 클릭했을 때, 장소를 검색하도록 이벤트리스너를 추가합니다
    list.addEventListener('click', (e: any) => {
      searchPlace(suggest.terms)
    })
  })
}

// 자동완성 외 다른 영역 클릭 시 자동완성 영역이 사라지도록 설정합니다
function removeAutocompleteDivByMouseClick() {
  document.addEventListener('click', (e: any) => {
    document.getElementById('autocomplete')?.remove()
  })
}
removeAutocompleteDivByMouseClick()

// 돋보기 버튼 누르면 검색 되도록 이벤트리스너를 설정합니다
searchStart?.addEventListener('click', (e: any) => {
  searchPlace(start.value)
})

// 돋보기 버튼 누르면 검색 되도록 이벤트리스너를 설정합니다
searchEnd?.addEventListener('click', (e: any) => {
  searchPlace(end.value)
})

// 검색어에 맞게 geomaster의 place(장소 찾기) 메소드를 실행하고, 그 결과를 띄우는 함수입니다
async function searchPlace(term: string) {
  if (!term) return
  let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50 })
  makePoi(result.numberOfPois, result.pois)
}

// 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
function makePoi(numberOfAddress: number, poi: Array<any>) {
  map.setCenter(poi[0].point) // 첫번째 결과로 지도 중심을 셋팅합니다

  // 기존 poi 결과 목록이 화면에 있으면 삭제합니다
  document.getElementById('poi-result')?.remove()

  // poi 결과를 렌더링할 영역을 생성합니다
  const poiResult = document.createElement('div')
  poiResult.id = 'poi-result'
  poiResult.innerHTML = `
    <div id="top">장소 ${numberOfAddress}건</div>
    <div id="list-result"></div>
  `
  search?.appendChild(poiResult)

  const listResult = document.getElementById('list-result') // 결과목록 화면 영역

  // 기존에 추가한 레이어와 소스가 있으면 제거합니다
  if (map.getSource('poi-source')) map.removeSource('poi-source')
  if (map.getLayer('poi-layer')) map.removeLayer('poi-layer')

  poi.forEach((p: any, index: number) => {
    // 화면에 결과 목록 추가합니다
    const list = document.createElement('div')
    list.className = 'list'
    list.innerHTML += `
        <div class="name" id="name${index}">
          <span>[${index + 1}]</span>${p.name} ${p.branch}
        </div>
        <div class="info">${p.category.masterName}</div>
        <div class="address">${p.address.siDo} ${p.address.siGunGu} ${p.address.street}</div>
        <div class="address">지번) ${p.address.eupMyeonDong} ${p.address.houseNumber}</div>

    `
    listResult?.appendChild(list)

  })
}

```

자동완성과 POI 검색 관련 CSS 입니다.

> index.css
> 

```tsx

/* 자동완성 */
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

/* poi 결과 */
#poi-result {
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
  height: 95%;
}

#poi-result .list {
  cursor: pointer;
  padding-left: 10px;
  padding-top: 17px;
  padding-bottom: 17px;
  border-bottom: 1px solid #e8e8e8;
}
#poi-result .list:hover {
  background-color: rgb(234, 234, 234);
}
#poi-result .list .name span {
  width: 30px;
  text-align: center;
  display: inline-block;
}
#poi-result .list .name{
  font: 16px "KTfontMedium";
  font-weight: 600;
  padding-bottom: 3px;
}
#poi-result .list .info {
  padding-left: 30px;
}
#poi-result .list .address {
  padding-left: 30px;
  color:#707070
}

#poi-result .icon {
  padding: 3px;
  border-radius: 10px;
  font: 13px "KTfontMedium";
  width: 40px !important;
  display: inline-block;
  text-align: center;
}

```

자동완성 화면은 아래와 같습니다.

![스크린샷 2024-03-20 오후 11.34.07.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_2.png?raw=true)

POI 검색 결과 화면은 아래와 같습니다.

![스크린샷 2024-03-20 오후 11.34.30.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_3.png?raw=true)

# 출발지, 도착지 설정

POI 검색 결과 리스트 중 하나를 선택했을 때 선택한 값을 출발지 또는 도착지로 설정하고, 마커를 지도에 표기합니다.

위에서 작성했던 makePoi 에 리스트 클릭 이벤트 리스너를 추가하고, 마커를 생성하는 makeMarker 함수를 구현합니다.

1. 이전에 선택한 항목이 있다면 제거합니다.
2. 선택한 항목에 selected className을 가진 div를 추가하여 도착지, 출발지를 표기해 줍니다.
3. 선택한 좌표로 센터를 이동합니다.
4. 선택한 좌표에 마커를 생성합니다. ( makeMarker() )

> index.ts
> 

```tsx
...

let startMarker: ktGms.overlay.Marker
let endMarker: ktGms.overlay.Marker

...

// 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
function makePoi(numberOfAddress: number, poi: Array<any>) {
  map.setCenter(poi[0].point) // 첫번째 결과로 지도 중심을 셋팅합니다

  // 기존 poi 결과 목록이 화면에 있으면 삭제합니다
  document.getElementById('poi-result')?.remove()

  // poi 결과를 렌더링할 영역을 생성합니다
  const poiResult = document.createElement('div')
  poiResult.id = 'poi-result'
  poiResult.innerHTML = `
    <div id="top">장소 ${numberOfAddress}건</div>
    <div id="list-result"></div>
  `
  search?.appendChild(poiResult)

  const listResult = document.getElementById('list-result') // 결과목록 화면 영역

  // 기존에 추가한 레이어와 소스가 있으면 제거합니다
  if (map.getSource('poi-source')) map.removeSource('poi-source')
  if (map.getLayer('poi-layer')) map.removeLayer('poi-layer')

  poi.forEach((p: any, index: number) => {
    // 화면에 결과 목록 추가합니다
    const list = document.createElement('div')
    list.className = 'list'
    list.innerHTML += `
        <div class="name" id="name${index}">
          <span>[${index + 1}]</span>${p.name} ${p.branch}
        </div>
        <div class="info">${p.category.masterName}</div>
        <div class="address">${p.address.siDo} ${p.address.siGunGu} ${p.address.street}</div>
        <div class="address">지번) ${p.address.eupMyeonDong} ${p.address.houseNumber}</div>

    `
    listResult?.appendChild(list)

    // 결과 클릭 시 그 결과를 중심으로 셋팅하고 마커 띄우는 이벤트리스너를 설정합니다
    **list.addEventListener('click', (e) => {
      // 이전에 선택한 항목이 있다면 제거합니다.
      var prev = document.querySelector('.selected')
      prev?.remove()

      // 선택했을 때 리스트에 도착지, 출발지를 표기해줍니다.
      const clicked = document.createElement('div')
      clicked.className = 'selected'
      clicked.innerHTML += `${input === 'end' ? '도착지' : '출발지'}`
      clicked.style.border = `${input === 'end' ? '2px solid red' : '2px solid blue'}`

      var name = document.getElementById(`name${index}`)
      name?.appendChild(clicked)

      // 선택한 좌표로 센터를 이동합니다.
      map.setCenter(p.point)

      // 선택한 좌표로 마커를 생성합니다.
      makeMarker(p)
    })**
  })
  
  ...
  
  const makeMarker = function (poi: any) {
  let marker
  input === 'start' ? (marker = startMarker) : (marker = endMarker)
  if (marker) {
    marker.remove() // 기존에 마커가 있다면 제거합니다.
  }
  if (input === 'start') {
    // 출발지 위치의 마커를 생성합니다.
    startMarker = new ktGms.overlay.Marker({
      lngLat: poi.lngLat, //좌표
    }).addTo(map)
  } else if (input === 'end') {
    // 도착지 위치의 마커를 생성합니다.
    endMarker = new ktGms.overlay.Marker({
      lngLat: poi.lngLat, //좌표
      color: '#AD0216',
    }).addTo(map)
  }
}

```

출발지 ‘광화문’ 검색 후 ‘광화문역 서울5호선’을 선택하여 목록에 ‘출발지’라고 표기되고, 마커가 생성된 화면입니다.

![스크린샷 2024-03-20 오후 11.45.43.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_4.png?raw=true)

도착지 ‘판교역’ 검색 후 ‘판교역 신분당선’을 선택하여 목록에 도착지라고 표기되고, 마커가 생성된 화면입니다.

![스크린샷 2024-03-20 오후 11.47.23.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_5.png?raw=true)

# 길찾기 기능 추가하기

### geomaster의 route메소드 호출하기

길찾기 버튼을 클릭했을 때 geomaster의 route 메소드를 호출하도록 이벤트리스너를 추가하겠습니다.

1. RouteService 객체를 생성합니다.
2. 길찾기 버튼을 클릭했을 때 경로탐색 할 수 있도록 이벤트 리스너를 설정합니다.
3. 지도의 bound를 출발지와 도착지로 설정합니다.
4. RouteService의 route 함수를 호출합니다. 
    
    ( 출발지마커의 위치와 도착지마커의 위치, 경로탐색 타입 (0: 최적경로, 7: 최소시간, 3: 최단거리, 2: 무료도로 우선 )
    
5. route 길찾기 결과의 좌표결과를 저장하고, 좌표 값들을 LineLayer로 추가합니다.
6. 방향을 알 수 있도록 화살표 레이어도 추가합니다.
7. route 길찾기 결과의 시간, 거리, 통행료 정보를 표시합니다.
8. 길찾기 type ( 적극추천, 가장빠름, 가장짧음, 통행료무료) 을 선택할 수 있는 탭 UI도 생성합니다.
9. 경로 목록을 표출하기 위해 TBT(Turn By Turn) 정보를 불러옵니다. 
    
    

> index.ts
> 

```tsx

...

let routeResult: any

// RouteService 객체를 생성합니다
const routeService = new geomaster.RouteService({ accessKey: 'YOUR_ACCESS_TOKEN' })

// 길찾기 버튼을 클릭했을 때 경로탐색하도록 이벤트리스너를 설정합니다
routeBtn?.addEventListener('click', async (e: any) => {
  // 지도의 bound를 출발지 마커와 도착지마커로 설정합니다.
  map.fitBounds([startMarker.getLngLat(), endMarker.getLngLat()])

  // routeService의 route 메소드를 호출합니다.
  // 출발지마커의 위치와 도착지마커의 위치, 경로탐색 타입 (0: 최적경로, 7: 최소시간, 3: 최단거리, 2: 무료도로 우선)
  routeResult = await routeService.route({ start: startMarker.getLngLat(), end: endMarker.getLngLat(), rp_type: '0;7;3;2' })
  routeHandler(0)
})


async function routeHandler(rpType: number) {
  // 응답 값의 coordinates 결과를 저장합니다.
  let coordinates = routeResult[rpType].geoJSON.coordinates

  // coordinates 데이터를 표시할 소스를 추가합니다.
  map.addSource('LineString', new ktGms.source.GeoJSONSource('LineString', { data: new ktGms.geometry.LineString(coordinates) }))

  // Line Layer를 추가합니다
  map.addLayer(
    new ktGms.layer.LineLayer(
      'LineString',
      new ktGms.style.LineStyle(
        {
          'line-color': '#278dd6',
          'line-width': 7,
        },
        {
          'line-join': 'round',
          'line-cap': 'round',
        },
      ),
      'LineString',
    ),
  )
  // 화살표 이미지를 불러옵니다.
  const is = await arrowHeadImage('#fff')
  if (!map.getImage('arrow-head')) map.addImage('arrow-head', is as any)

  // 방향을 알 수 있도록 화살표를 표시해주는 Layer 입니다.
  map.addLayer(
    new ktGms.layer.LineSymbolicLayer(
      'arrow',
      new ktGms.style.SymbolStyle(
        {},
        {
          visibility: 'visible',
          'symbol-placement': 'line',
          'icon-image': 'arrow-head',
          'symbol-spacing': 70,
          'icon-offset': [0, 0],
        },
      ),
      'LineString', //"route" 소스 데이터 사용
    ),
  )

  // POI 결과 영역을 제거합니다.
  document.getElementById('poi-result')?.remove()

  // 길찾기 결과를 렌더링할 영역을 생성합니다
  makeRouteResult(rpType)
}

function makeRouteResult(rpType: number) {
  let res = routeResult[rpType]

  const routeResultDiv = document.createElement('div')
  routeResultDiv.id = 'route-result'

  routeResultDiv.innerHTML = `
      <div class="tabMenu" id="tabMenu">
        <ul>
          <li id="li0">
            <a>적극추천</a>
          </li>
          <li class="" id="li1">
            <a>가장빠름</a>
          </li>
          <li class="" id="li2">
            <a>가장짧음</a>
          </li>
          <li class="" id="li3">
            <a>통행료무료</a>
          </li>
        </ul>
      </div>
      <div class="info">
        <span id="time">${timeConversion(res.time)} </span>
        <span id="distance">${distanceConversion(res.distance)}</span>
        <div>통행료 ${res.totalToll.toLocaleString()}원</div>
      </div>
      <div id="list-result"></div>
    `

  search?.appendChild(routeResultDiv)

  const li = document.getElementById(`li${rpType}`)
  if (li) li.className = ' current'
  const tab = document.getElementById('tabMenu')

  tab?.addEventListener('click', (e: any) => {
    if (map.getLayer('LineString')) map.removeLayer('LineString')
    if (map.getLayer('arrow')) map.removeLayer('arrow')
    if (map.getSource('LineString')) map.removeSource('LineString')

    if (routeResultDiv) routeResultDiv.remove()
    const rpType: any = { 적극추천: 0, 가장빠름: 1, 가장짧음: 2, 통행료무료: 3 }

    routeHandler(rpType[e.target.innerText])
  })

  let tbts = res.tbts
  const listResult = document.getElementById('list-result') // 결과목록 화면 영역
  tbts.forEach((tbt: any, index: number) => {
    // 화면에 결과 목록 추가합니다
    const list = document.createElement('div')
    list.id = 'list'
    list.innerHTML += `
          <div class="name">
            <span class="index">[${index + 1}]</span>
            ${tbt.shtDirName ? tbt.shtDirName : tbt.tbtName ?? ''} ${tbt.typeString}
            <span class="distance">${distanceConversion(tbt.nextDistance)}</span>
          </div>
      `
    listResult?.appendChild(list)
  })
}

// 초 -> 시간,분으로 변환해주는 함수
function timeConversion(seconds: number) {
  if (seconds < 61) {
    return addZero(seconds) + '초'
  }
  // sec
  var hours = Math.floor(seconds / 3600)
  var mins = Math.floor((seconds - hours * 3600) / 60)
  return (hours ? addZero(hours) + '시간' : '') + addZero(mins) + '분'

  function addZero(num: number) {
    return (num < 10 ? '0' : '') + num
  }
}

// m 단위를 km로 변경해주는 함수
function distanceConversion(length: number) {
  if (!length) return ''
  return length >= 1000 ? length / 1000 + 'km' : length + 'm'
}

// 화살표 이미지를 불러오는 함수
const arrowHeadImage = (color: any) => {
  const param = { color: color, size: 16, rotation: 90 }
  const data = `<svg width='${param.size}' height='${param.size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' version='1.1'><polygon fill='${param.color}' stroke='gray' stroke-width='1' points='20,90 50,10 80,90 50,70' transform='rotate(${param.rotation} 50 50)'/></svg>`
  return new Promise((resolve) => {
    const img = new Image(param.size, param.size)
    img.src = 'data:image/svg+xml;base64,' + btoa(data)
    img.onload = () => resolve(createImageBitmap(img))
  })
}


```

기존 makeAutocomplete 함수에 경로탐색 결과, 길찾기 경로를 제거하는 코드도 추가해 줍니다.
> index.ts
> 
```tsx
// geomaster의 자동완성 메소드를 실행하고, 그 결과를 화면에 띄우는 함수입니다
async function makeAutocomplete(term: string) {
  // 길찾기 결과 영역을 제거합니다.
  document.getElementById('route-result')?.remove()
  if (map.getLayer('LineString')) map.removeLayer('LineString')
  if (map.getLayer('arrow')) map.removeLayer('arrow')
  if (map.getSource('LineString')) map.removeSource('LineString')

  ...
}

```


> index.css
> 

```css
...
/* 길찾기 결과 */
#route-result {
  height: 76vh;
  margin-top: 10px;
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
  background-color: #fff;
  padding: 15px;
  overflow: auto;
  width: 360px;
}

#route-result #time {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -1.6px;
}
#route-result #distance {
  font: 13px "KTfontMedium";
}

#route-result #list-result {
  /* overflow: auto; */
  height: 95%;
}

#route-result #list {
  cursor: pointer;
  padding-left: 10px;
  padding-top: 17px;
  padding-bottom: 17px;
  border-bottom: 1px solid #e8e8e8;
}
#route-result #list:hover {
  background-color: rgb(234, 234, 234);
}
#route-result #list .name .index {
  width: 30px;
  text-align: center;
  display: inline-block;
}

#route-result #list .name .distance {
  font: 13px "KTfontMedium";
}
#route-result #list .name{
  font: 16px "KTfontMedium";
  font-weight: 600;
  padding-bottom: 3px;
}
#route-result #list .info {
  padding-left: 30px;
}
#route-result #list .address {
  padding-left: 30px;
  color:#707070
}

.tabMenu ul {
  list-style: none;
  display:flex;
  padding:0px;
  margin-bottom: 18px;
}

.tabMenu ul li {
  width: 100%;

}
.tabMenu ul li a {
  display: block;
    height: 40px;
    line-height: 40px;
    color: #888;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -.6px;
    text-align: center;
    text-decoration: none;
}
.tabMenu ul li.current a {
  color: #4A90E1;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  border: 1px solid gray;
  border-radius: -2px;
  border-bottom: 0px;
}

#route-result .info {
  padding-bottom: 13px;
  border-bottom: 1px solid #4A90E1;
}

.none {
  display: none;
}
```


광화문 → 판교역으로 길찾기 한 결과 화면입니다.

![스크린샷 2024-03-21 오전 10.50.34.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_6.png?raw=true)

길찾기 유형 탭을 선택하여 각 유형 별 경로와 상세경로 정보를 알 수 있습니다. ( 통행료 무료 )

![스크린샷 2024-03-21 오전 10.51.12.png](https://ktmobility1.github.io/mapsdk_example/web/tutorial_md/route/img/route_7.png?raw=true)

# 전체 코드

전체 코드는 [route](https://github.com/ktmobility1/mapsdk_example/tree/main/web/tutorial_md/route/project) 에서 확인할 수 있습니다.

