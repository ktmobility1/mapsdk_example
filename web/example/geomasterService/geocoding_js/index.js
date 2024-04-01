import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

//지도를 생성합니다.
const map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})

let marker
let infoWindow

map.on('click', async (e) => {
  //지도를 클릭했을 때의 위경도 좌표를 저장합니다
  const lngLat = e.lngLat

  // SearchService 객체를 생성합니다
  const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

  // geocoding 메소드를 호출합니다
  const data = await searchService.geocode({ geocodeTerm: { lng: lngLat.lng, lat: lngLat.lat } })
  const address = data.residentialAddress[0]

  // 기존 마커가 있으면 삭제하고, 새로 클릭한 곳에 마커를 생성합니다
  if (marker) marker.remove()
  marker = new ktGms.overlay.Marker({
    lngLat: [lngLat.lng, lngLat.lat],
  }).addTo(map)

  let html = `
  <h3>${address.parcelAddress ? address.parcelAddress[0].fullAddress : ''}</h3>
  ${address.roadAddress && address.roadAddress.length > 0 ? '<h4>[지번]' + address.roadAddress[0].fullAddress + '</h4>' : ''}
    (위도: ${lngLat.lat}  경도: ${lngLat.lng})
  `
  // geocoding 메소드를 호출하여 얻은 주소를 infoWindow로 표출합니다
  infoWindow = new ktGms.overlay.InfoWindow().setHTML(html)
  marker.setInfoWindow(infoWindow, true)
})
