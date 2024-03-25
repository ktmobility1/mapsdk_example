import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

//지도를 생성합니다
let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})

// KT 5대 사옥의 placeId를 정의합니다
let placeId = {
  fly1: {
    name: '가평휴게소 전기차충전소',
    placeId: 'd03121ba-1687-38bd-9347-ecd0bfd3bbb8',
  },
  fly2: {
    name: '김천휴게소 전기차충전소',
    placeId: '9c97c604-5cf8-3f35-8231-f3d7bd7f3d6c',
  },
  fly3: {
    name: '거창휴게소 전기차충전소',
    placeId: '2e366372-068b-3bb7-878c-c42e5f31d304',
  },
  fly4: {
    name: '군산휴게소 전기차충전소',
    placeId: 'e1b29a52-22e3-35ff-986b-1787b66fad4d',
  },
  fly5: {
    name: '대천휴게소 전기차충전소',
    placeId: 'f3337f7c-c4d7-302f-a4cf-653194edddb1',
  },
}

let marker;

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

Object.entries(placeId).map(([key, value]) => {
  // 버튼을 가져옵니다
  let btn = document.getElementById(key)

  // 버튼에 클릭리스너를 추가합니다
  btn.addEventListener('click', async () => {
    let data = await searchService.evStationById({ id: value.placeId })
    ;(document.getElementById('features')).innerHTML = JSON.stringify(data, null, 2)

    // 기존 마커가 있으면 삭제하고, 선택한 장소를 지도에 마커로 표시합니다
    if (marker) marker.remove()
    marker = new ktGms.overlay.Marker({
      lngLat: [data.pois[0].point.lng, data.pois[0].point.lat],
    }).addTo(map)

    // place 좌표로 지도를 이동합니다
    map.flyTo({ center: [data.pois[0].point.lng, data.pois[0].point.lat], offset: [-200, 0], speed: 2 })
  })
})
