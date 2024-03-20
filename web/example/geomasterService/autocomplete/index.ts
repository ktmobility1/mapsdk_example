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

const searchService = new geomaster.SearchService({
  accessKey: 'YOUR_ACCESS_TOKEN',
})
const termsInput: HTMLElement = document.getElementById('terms-input')! //사용자가 입력하는 input
const resultDiv: HTMLElement = document.getElementById('result')! // 결과 div
const resultList: HTMLElement = document.getElementById('result_list')! // 자동완성 결과 list

termsInput.addEventListener('keyup', async (e: any) => {
  // 사용자가 검색어를 입력할 때마다 자동완성 함수 호출
  removeList(resultList)

  // 사용자가 입력한 검색어
  const value = e.target.value

  // searchService 의 autocomplete 호출
  let result: any = await searchService.autocomplete({ terms: value, type: 'POI' }) // type을 'POI'로 지정해야 좌표값을 받을 수 있습니다.

  if (value && result && result.suggests?.length > 0) {
    resultDiv.style.display = 'block'
    result.suggests.forEach((s: any) => {
      const li = document.createElement('li')
      li.append(s.terms)
      resultList.append(li)
      li.onclick = () => clickPoi(s)
    })
  } else {
    resultDiv.style.display = 'none'
  }
})

const removeList = (resultList: HTMLElement) => {
  // 결과 화면 초기화 함수
  const liList = resultList.getElementsByTagName('li')
  while (liList.length > 0) {
    liList[0].remove()
  }
}
let marker: ktGms.overlay.Marker

// 리스트 중 하나 클릭했을 때 해당 POI의 위치로 panTo, marker 생성
function clickPoi(s) {
  map.panTo([s.point.lng, s.point.lat])
  if (marker) marker.remove()
  marker = new ktGms.overlay.Marker({
    lngLat: [s.point.lng, s.point.lat],
  }).addTo(map)
}
