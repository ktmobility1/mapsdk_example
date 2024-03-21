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
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

// search 버튼
let searchBtn = document.getElementById('search')

// search 버튼 클릭 핸들러
searchBtn?.addEventListener('click', async () => {
  // 기존에 생성한 layer, source 가 있다면 삭제
  if (map.getLayer('gasStationLayer')) map.removeLayer('gasStationLayer')
  if (map.getSource('geojsonSource_point')) map.removeSource('geojsonSource_point')

  // 현재 지도의 bound(경계좌표)를 가져옵니다.
  let bound = map.getBound()

  // 현재 bound로 gasStation 검색합니다.
  const data = await searchService.gasStation({ numberOfResults: 50, filters: { bound: { right: bound._ne.lng, top: bound._ne.lat, left: bound._sw.lng, bottom: bound._sw.lat } } })

  // 검색 결과가 없을 때 화면 표시
  if (data.pois.length == 0) {
    const overlay = document.querySelector('.overlay')
    const message = document.createElement('div')
    message.id = 'message'
    message.innerText = '검색된 결과가 없습니다'
    overlay?.appendChild(message)
    return
  }

  // 주유소 좌표와 주유소 이름을 pointGeo 형태의 배열로 저장합니다
  const geometry: ktGms.geometry.PointGeo[] = []
  data.pois.forEach((poi) => {
    geometry.push(
      new ktGms.geometry.PointGeo(
        [poi.point.lng, poi.point.lat], //좌표
        { name: poi.name }, //속성 정보
      ),
    )
  })

  // geometry PoinGeo[]가 data가 되는 geoJSONSource 를 생성합니다.
  let source_point: ktGms.source.GeoJSONSource = new ktGms.source.GeoJSONSource('geojsonSource_point', {
    data: geometry,
    maxzoom: 18,
    cluster: true,
    attribution: 'Attribution',
    buffer: 128,
    clusterRadius: 200,
  })

  if (source_point) {
    map.addLayer(
      new ktGms.layer.ClusterLayer(
        'gasStationLayer',
        new ktGms.style.CircleStyle(
          {
            'circle-color': '#FF0000',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          },
          {},
        ),
        source_point,
        '#FFFFFF',
        '#FF0000',
        '#000000',
        'name',
        '',
      ),
    )
  }

  map.onLayer('leaveClick', 'gasStationLayer', (event) => {
    alert(event.properties.address)
  })
})
