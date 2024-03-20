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

let selectbox = document.querySelector('.selectbox')
let sido = document.getElementById('sido')

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' })

// '시도' 값을 가져오는 함수입니다
async function getSido() {
  const sidoResult = await searchService.stepByStep()
  sidoResult.address.forEach((a) => {
    appendOption(a.siDo, sido)
  })
}

// 선택한 '시도'에 맞는 '시군구' 데이터를 가져오는 함수입니다
async function getSigungu(selectedSido) {
  // '시군구' selectbox가 있다면 삭제하고 새로 생성합니다
  document.getElementById('sigungu').remove()
  document.getElementById('eupmyeondong').remove()
  let sigunguSelect = document.createElement('select')
  sigunguSelect.id = 'sigungu'
  appendOption('Select an SIGUNGU code', sigunguSelect, true)

  // searchService.stepByStep를 사용하여 선택한 '시도'에 맞는 '시군구' 데이터를 가져옵니다
  const sigunguResult = (await searchService.stepByStep({ siDo: selectedSido })) 

  // '시군구'데이터를 option으로 추가합니다
  sigunguResult.address.forEach((a) => {
    appendOption(a.siGunGu, sigunguSelect)
  })

  selectbox.appendChild(sigunguSelect)
  //'시군구'를 선택했을 때 '읍면동' selectbox가 뜨는 이벤트리스너를 추가합니다
  sigunguSelect.addEventListener('input', (_) => {
    getEupmyeondong(selectedSido, sigunguSelect.value)
  })
}

// 선택한 '시도'와 '시군구'에 맞는 '읍면동' 데이터를 가져오는 함수입니다
async function getEupmyeondong(selectedSido, selectedSigungu) {
  // '시군구' selectbox가 있다면 삭제하고 새로 생성합니다
  document.getElementById('eupmyeondong').remove()
  let eupmyeondongSelect = document.createElement('select')
  eupmyeondongSelect.id = 'eupmyeondong'
  appendOption('Select an EUPMYEONDONG code', eupmyeondongSelect, true)

  // searchService.stepByStep를 사용하여 선택한 '시군구'에 맞는 '읍면동' 데이터를 가져옵니다
  const eupmyeondongResult = (await searchService.stepByStep({ siDo: selectedSido, siGunGu: selectedSigungu }))

  // '시군구'데이터를 option으로 추가합니다
  eupmyeondongResult.address.forEach((a) => {
    appendOption(a.eupMyeonDong, eupmyeondongSelect)
  })

  selectbox.appendChild(eupmyeondongSelect)
  //'읍면동'을 선택했을 때 선택한 곳으로 지도를 이동하는 이벤트리스너를 추가합니다
  eupmyeondongSelect.addEventListener('input', (_) => {
    moveMap(selectedSido, selectedSigungu, eupmyeondongSelect.value)
  })
}

// 선택한 '시도', '시군구', '읍면동'에 맞는 주소로 지도를 이동하는 함수입니다
async function moveMap(selectedSido, selectedSigungu, selectedEupmyeondong) {
  // searchService.stepByStep를 사용하여 선택한 주소에 맞는 데이터를 가져옵니다
  const eupmyeondongResult = (await searchService.stepByStep({ siDo: selectedSido, siGunGu: selectedSigungu, eupMyeonDong: selectedEupmyeondong })) 
  const latLng = eupmyeondongResult.address[0].geographicInformation.point
  if (!latLng) return

  // 지도에 마커로 표시합니다
  let marker = new ktGms.overlay.Marker({
    lngLat: [latLng.lng, latLng.lat],
    label: `${selectedSido} ${selectedSigungu} ${selectedEupmyeondong}`,
  }).addTo(map)

  // place 좌표로 지도를 이동합니다
  map.flyTo({ center: [latLng.lng, latLng.lat], speed: 2 })
}

// select에 option 태그를 추가하는 함수입니다
function appendOption(text, parentChild, disabled = false) {
  if (!text || !parentChild) return
  let option = document.createElement('option')
  option.innerText = text

  if (disabled) {
    option.disabled = true
    option.selected = true
  }
  parentChild.appendChild(option)
}

// '시도'를 선택했을 때 '시군구' selectbox가 뜨는 이벤트리스너를 추가합니다
sido.addEventListener('input', (_) => {
  getSigungu(sido.value)
})

getSido() // '시도' 정보를 가져옵니다
