import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'
import tbts from './tbtType.json'
let tbtsData: any = tbts
let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: 'Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9',
})

let start = document.getElementById('search-start') as HTMLInputElement // 출발지 입력 input
let end = document.getElementById('search-end') as HTMLInputElement // 도착지 입력 input
let input = ''
let searchStart = document.getElementById('search-btn-start') // 출발지 검색 버튼
let searchEnd = document.getElementById('search-btn-end') // 도착지 검색 버튼

let search = document.querySelector('.search') // search div
let routeBtn = document.getElementById('route') // 검색어 입력 버튼

let startMarker: ktGms.overlay.Marker
let endMarker: ktGms.overlay.Marker
let routeResult: any

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9' })
// RouteService 객체를 생성합니다
const routeService = new geomaster.RouteService({ accessKey: 'Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9' })

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

    // 결과 클릭 시 그 결과를 중심으로 셋팅하고 마커 띄우는 이벤트리스너를 설정합니다
    list.addEventListener('click', (e) => {
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
    })
  })
}

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
            ${tbt.shtDirName ? tbt.shtDirName : tbt.tbtName ?? ''} ${tbtsData[tbt.type]}
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
