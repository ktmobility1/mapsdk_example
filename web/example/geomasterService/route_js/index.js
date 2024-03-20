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

// SearchService 객체를 생성합니다
const routeService = new geomaster.RouteService({ accessKey: 'YOUR_ACCESS_TOKEN' })

let startBtn = document.getElementById('start')
let endBtn = document.getElementById('end')
let routeBtn = document.getElementById('route')

let startMarker;
let endMarker;
let clicked = ''

// 출발지 버튼에 클릭리스너를 추가합니다
startBtn.addEventListener('click', () => {
  clicked = 'start'
  // 지도 mousemove 이벤트에 마커생성 콜백 리스너를 추가합니다.
  map.on('mousemove', makeMarker)
})

// 도착지 버튼에 클릭리스너를 추가합니다
endBtn.addEventListener('click', () => {
  clicked = 'end'
  // 지도 mousemove 이벤트에 마커생성 콜백 리스너를 추가합니다.
  map.on('mousemove', makeMarker)
})

// 길찾기 버튼에 클릭리스너를 추가합니다
routeBtn.addEventListener('click', async () => {
  // routeService의 route함수를 호출하여 출발지 위치 -> 도착지 위치 경로탐색 결과를 얻어옵니다.
  const res = await routeService.route({ start: startMarker.getLngLat(), end: endMarker.getLngLat() })

  // 응답 값의 coordinates 결과를 저장합니다.
  let coordinates = res[0].geoJSON.coordinates

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
