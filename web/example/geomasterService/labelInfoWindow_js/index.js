import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'

const map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.09634, 37.51145],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
})

// POI 장소를 찾는 비동기 함수입니다.
const poiSearch = async (poi_id) => {
  //SearchService 객체를 생성합니다
  const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

  // POI Search API를 호출합니다
  const response = await searchService.placeById({ id: poi_id })
  const data = { ...response }

  // 찾은 데이터가 없다면 공백을 리턴합니다
  if (data.pois.length === 0) {
    return ''
  }

  // poi 변수에 데이터를 저장합니다
  const poi = data.pois[0]
  const homepage = poi.extension && poi.extension.homepageURL ? poi.extension.homepageURL : ''
  const roadAddress = poi.address.siDo + ' ' + poi.address.siGunGu + ' ' + poi.address.street + ' ' + poi.address.streetNumber
  const landAddress = poi.address.eupMyeonDong + ' ' + poi.address.houseNumber
  const photoURL = poi.extension && poi.extension.photoURL ? poi.extension.photoURL : ''

  // InfoWindow에 들어갈 HTML 내용을 리턴합니다
  return `
		<div>
			<div style="font-weight:bold;">${poi.name}</div>
			<hr></hr>
			<div style="display:flex">
				<div>
					<div class="info">
						<span class="kind">${poi.category.masterName}</span>
						<span class="tel"></span>
						<a href="${homepage}" target="_blank" class="web" style="display:${homepage === '' ? 'none' : 'inline'}">홈페이지</a>
					</div>
					<div class="address">${roadAddress}</div>
					<div class="address">
						<span style="background-color:#777; color:white; margin-right:2px; padding:2px; border-radius:4px;">지번</span>${landAddress}
					</div>
				</div>
				<div style="width:8px"></div>
				<div>
					<img src="${photoURL}" alt="" style="width: 64px; height: 64px; border-radius: 12px;"/>
				</div>
			<div>
		</div>
	`
}

map.on('load', (_) => {
  const labelLayers = map.getStyle().layers.filter((layer) => layer.id.includes('poi_label'))
  labelLayers.forEach((layer) => {
    // POI 라벨 위에서 마우스 커서가 포인터로 되게 합니다
    map.onLayer('mousemove', layer.id, async (e) => {
      const features = map.queryRenderedFeatures(e.point)
      const pois = features.filter((info) => info.layer.id.includes('poi_label'))
      if (pois.length > 0) {
        map.getCanvas().style.cursor = 'pointer'
      }
    })

    // POI 라벨에서 마우스가 떠날 때 커서가 grab으로 되게 합니다
    map.onLayer('mouseleave', layer.id, async (e) => {
      map.getCanvas().style.cursor = 'grab'
    })

    // POI 라벨을 클릭했을 때 POI Search API를 호출하여 해당 장소에 대한 정보를 받아와서 InfoWindow로 표출합니다
    map.onLayer('click', layer.id, async (e) => {
      const features = map.queryRenderedFeatures(e.point)
      const pois = features.filter((info) => info.layer.id.includes('poi_label'))
      if (pois.length > 0) {
        const htmlStr = await poiSearch(pois[0].properties.poi_id)
        new ktGms.overlay.InfoWindow().setLngLat(e.lngLat).setHTML(htmlStr).addTo(map)
      }
    })
  })
})
