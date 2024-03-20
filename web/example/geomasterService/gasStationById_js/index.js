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

// 주유소의 placeId를 정의합니다
let placeId = {
  fly1: {
    name: '우전산업주유소',
    placeId: 'f9e438a9-ef62-3554-89ae-c9f469c7270f',
  },
  fly2: {
    name: '태영비엠셀프주유소',
    placeId: '96817932-3f75-340b-9ef1-157e2606ddae',
  },
  fly3: {
    name: '순우리주유소',
    placeId: 'df9f6a71-c824-3db9-b494-47a9a1340ae1',
  },
  fly4: {
    name: '학셀프주유소',
    placeId: '2e24be0c-f66a-37a2-9ca8-6ff59a832ac5',
  },
  fly5: {
    name: '한울주유소',
    placeId: '32f79d25-5171-31ee-843e-bf32a6a55b1d',
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
    let data = await searchService.gasStationById({ id: value.placeId })
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
