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

// 주차장의 placeId를 정의합니다
let placeId = {
  fly1: {
    name: '강남구청주차장',
    placeId: 'c1d85681-bdc5-380b-89a5-167ece440f81',
  },
  fly2: {
    name: '여의도주차장',
    placeId: 'e9484ead-8961-3d1e-8bfa-bd906dd401c0',
  },
  fly3: {
    name: '종로구주차장',
    placeId: '0aa78502-dba3-34c2-a9df-c69079038d86',
  },
  fly4: {
    name: '뚝섬주차장',
    placeId: '37f7f468-5ac3-3206-a374-cd9c34a9c4e7',
  },
  fly5: {
    name: '마포구주차장',
    placeId: 'bb3c3474-2cb8-3966-b4b1-61c85e726e32',
  },
}

let marker: ktGms.overlay.Marker

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

Object.entries(placeId).map(([key, value]) => {
  // 버튼을 가져옵니다
  let btn = document.getElementById(key)

  // 버튼에 클릭리스너를 추가합니다
  btn?.addEventListener('click', async () => {
    let data = await searchService.parkingLotById({ id: value.placeId })
    ;(document.getElementById('features') as HTMLElement).innerHTML = JSON.stringify(data, null, 2)
    console.log(data)
    // 기존 마커가 있으면 삭제하고, 선택한 장소를 지도에 마커로 표시합니다
    if (marker) marker.remove()
    marker = new ktGms.overlay.Marker({
      lngLat: [data.pois[0].point.lng, data.pois[0].point.lat],
    }).addTo(map)

    // place 좌표로 지도를 이동합니다
    map.flyTo({ center: [data.pois[0].point.lng, data.pois[0].point.lat], offset: [-200, 0], speed: 2 })
  })
})
