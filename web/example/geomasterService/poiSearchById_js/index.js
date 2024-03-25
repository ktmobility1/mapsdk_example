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
    name: 'kt송파사옥',
    placeId: '5d1172b9-1d4e-3d8f-bd5a-3231a8d788fa',
  },
  fly2: {
    name: 'kt우면연구개발센터',
    placeId: 'c0396a4a-5d79-3aae-9c2f-2f18d7b9ee5e',
  },
  fly3: {
    name: 'kt분당사옥',
    placeId: 'b399b9ba-bc8d-380e-bca4-1db06c1217ee',
  },
  fly4: {
    name: 'kt광화문사옥',
    placeId: 'd14a9672-3104-3deb-9fd5-df9b91d3fb54',
  },
  fly5: {
    name: 'kt판교사옥',
    placeId: '2271c80e-7cc0-3651-8979-8fcfbb9a0bcf',
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
    let data = await searchService.placeById({ id: value.placeId })
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
