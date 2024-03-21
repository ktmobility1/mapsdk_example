import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

//지도를 생성합니다.
let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.017422, 37.49144],
  zoom: 12,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})

// oneNaviService 객체를 생성합니다
const oneNaviService = new geomaster.OneNavi()

let startBtn = document.getElementById('start')
let endBtn = document.getElementById('end')
let onenaviBtn = document.getElementById('onenavi')
let result = document.getElementById('result')

let startMarker: ktGms.overlay.Marker
let endMarker: ktGms.overlay.Marker
let clicked = ''

// 출발지 버튼에 클릭리스너를 추가합니다
startBtn?.addEventListener('click', () => {
  clicked = 'start'
  // 지도 mousemove 이벤트에 마커생성 콜백 리스너를 추가합니다.
  map.on('mousemove', makeMarker)
})

// 도착지 버튼에 클릭리스너를 추가합니다
endBtn?.addEventListener('click', () => {
  clicked = 'end'
  // 지도 mousemove 이벤트에 마커생성 콜백 리스너를 추가합니다.
  map.on('mousemove', makeMarker)
})

// 원내비 버튼에 클릭리스너를 추가합니다
onenaviBtn?.addEventListener('click', async () => {
  // oneNaviService의 getSchemeUrl을 호출하여 원내비로 연동할 수 있는 스키마 url을 받아옵니다
  const res = oneNaviService.getSchemeUrl({ start: startMarker.getLngLat(), end: endMarker.getLngLat() })

  // 우측 상단의 원내비결과 화면에 텍스트를 렌더링합니다
  result.innerText = res
})

// 지도를 클릭했을 때 mousemove 이벤트 콜백리스너는 제거하고
// 마커생성 함수를 호출합니다.
map.on('click', (e) => {
  if (clicked) {
    map.off('mousemove', makeMarker)
    makeMarker(e)
    clicked = ''
  }
})

// 마커를 생성하는 함수입니다.
const makeMarker = function (e) {
  let marker
  clicked === 'start' ? (marker = startMarker) : (marker = endMarker)
  if (marker) {
    marker.remove() // 기존에 마커가 있다면 제거합니다.
  }
  if (clicked === 'start') {
    // 출발지 위치의 마커를 생성합니다.
    startMarker = new ktGms.overlay.Marker({
      lngLat: e.lngLat, //좌표
    }).addTo(map)
  } else if (clicked === 'end') {
    // 도착지 위치의 마커를 생성합니다.
    endMarker = new ktGms.overlay.Marker({
      lngLat: e.lngLat, //좌표
      color: '#AD0216',
    }).addTo(map)
  }
}
