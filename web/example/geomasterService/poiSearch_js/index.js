import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

//지도를 생성합니다.
let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})

//search 버튼
let searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', async () => {
  let searchInput = document.getElementById('search-input')

  // SearchService 객체를 생성합니다
  const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

  // place 메소드를 호출합니다
  const data = await searchService.place({ filters: { terms: searchInput.value, point: map.getCenter() } })

  // 결과의 첫 번째 장소만 저장합니다
  const place = data.pois[0]
  ;(document.getElementById('features')).innerHTML = JSON.stringify(place, null, 2)

  // place를 지도에 마커로 표시합니다
  let marker = new ktGms.overlay.Marker({
    lngLat: [place.point.lng, place.point.lat],
  }).addTo(map)

  // place 좌표로 지도를 이동합니다
  map.flyTo({ center: [place.point.lng, place.point.lat], offset: [-200, 0], speed: 2 })
})
