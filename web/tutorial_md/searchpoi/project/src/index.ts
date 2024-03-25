import ktGms from 'kt-map-sdk-js'
import geomaster from 'kt-map-sdk-geomaster'
import { Pagination } from './pagination'

let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token: 'Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9',
})

let input = document.getElementById('search-input') as HTMLInputElement // 검색어 입력 input
let btn = document.getElementById('search-btn') // 검색어 입력 버튼
let search = document.querySelector('.search') // search div

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9' })

// 검색어를 입력하면 자동완성 되도록 이벤트리스너를 설정합니다
input?.addEventListener('input', (e: any) => {
  inputChange()
})

// debounce 함수를 정의합니다
const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = fn(...args)
    }, delay)
    return result
  }
}

// debounce 함수를 사용하여 자동완성 메소드를 호출합니다. 무효한 키 입력이 api를 호출하지 않도록 하기 위함입니다
const inputChange = debounce(() => makeAutocomplete(input.value), 200)

// geomaster의 자동완성 메소드를 실행하고, 그 결과를 화면에 띄우는 함수입니다
async function makeAutocomplete(term: string) {
  // 기존 자동완성 결과가 화면에 있으면 삭제합니다
  document.getElementById('autocomplete')?.remove()
  // 자동완성 할 용어가 없다면 함수를 종료합니다
  if (!term) return

  // 자동완성 결과를 화면에 띄우기 위한 div 영역을 생성합니다
  const autocomplete = document.createElement('div')
  autocomplete.id = 'autocomplete'
  search?.appendChild(autocomplete)

  // geomaster의 자동완성 메소드를 실행합니다
  const result = await searchService.autocomplete({ terms: term })

  // 자동완성 결과를 순회하며 화면에 추가합니다
  result.suggests.map((suggest: any) => {
    // 자동완성 결과 리스트 1개에 대한 div 영역을 생성합니다
    const list = document.createElement('div')
    list.id = suggest.poiId
    list.innerText = suggest.terms
    autocomplete.appendChild(list)

    // 자동완성 결과를 클릭했을 때, 장소를 검색하도록 이벤트리스너를 추가합니다
    list.addEventListener('click', (e: any) => {
      searchPlace(suggest.terms, 1)
    })
  })
}

// 자동완성 외 다른 영역 클릭 시 자동완성 영역이 사라지도록 설정합니다
function removeAutocompleteDivByMouseClick() {
  document.addEventListener('click', (e: any) => {
    document.getElementById('autocomplete')?.remove()
  })
}
removeAutocompleteDivByMouseClick()

// 돋보기 버튼 누르면 검색 되도록 이벤트리스너를 설정합니다
btn?.addEventListener('click', (e: any) => {
  searchPlace(input.value, 1)
})

// 페이징 처리 관련
const paginationNumbers = document.getElementById('pagination-numbers') as HTMLDivElement
const nextButton = document.getElementById('next-button') as HTMLDivElement
const prevButton = document.getElementById('prev-button') as HTMLDivElement

// 검색어에 맞게 geomaster의 place(장소 찾기) 메소드를 실행하고, 그 결과를 띄우는 함수입니다
async function searchPlace(term: string, page: number) {
  if (!term) return
  // poi 결과 목록 화면을 보여줍니다
  document.getElementById('poi-result')!.style.display = 'block'

  let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50, start: 50 * (page - 1) })

  // 장소 총 개수를 보여줍니다
  const poiResultCount = document.getElementById('top') as HTMLDivElement
  poiResultCount.innerHTML = `장소 ${result.numberOfAddress}건`

  // 페이징 객체를 생성합니다
  let pagination = new Pagination(
    paginationNumbers, // 페이지 div
    nextButton, // 다음 버튼 div
    prevButton, // 이전 버튼 div
    Math.ceil(result.numberOfPois / 50), // 전체 페이지 개수
    async (e: number) => {
      // 페이지 클릭 시 수행할 함수
      let result = await searchService.place({ filters: { terms: term, point: map.getCenter() }, numberOfResults: 50, start: 50 * (e - 1) })
      // 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
      makeDisplayPoiList(result.pois, e - 1)
    },
  )
  pagination.makePagination()
}

// 검색된 결과 장소를 화면 목록에 띄우고, 클러스터 레이어를 추가하여 지도에 띄우는 함수입니다
function makeDisplayPoiList(poi: Array<any>, page: number) {
  map.setCenter(poi[0].point) // 첫번째 결과로 지도 중심을 셋팅합니다

  // 기존 poi 결과 목록이 화면에 있으면 삭제합니다
  document.querySelectorAll('#list').forEach((list) => {
    list.remove()
  })

  // 결과 리스트를 보여줍니다
  const listResult = document.getElementById('list-result') // 결과목록 화면 영역
  const listGeometry: Array<ktGms.geometry.PointGeo> = [] // poi 결과 배열
  let selectedMarker: ktGms.overlay.Marker

  poi.forEach((p: any, index: number) => {
    // 화면에 결과 목록 추가합니다
    const list = document.createElement('div')
    list.id = 'list'
    list.innerHTML += `
        <div class="name"><span>[${index + 1 + 50 * page}]</span>${p.name} ${p.branch}</div>
        <div class="info">${p.category.masterName}</div>
        <div class="address">${p.address.siDo} ${p.address.siGunGu} ${p.address.street}</div>
        <div class="address">지번) ${p.address.eupMyeonDong} ${p.address.houseNumber}</div>
    `
    listResult?.appendChild(list)

    // 결과 클릭 시 그 결과를 중심으로 셋팅하고 마커 띄우는 이벤트리스너를 설정합니다
    list.addEventListener('click', (_) => {
      map.setCenter(p.point)
      selectedMarker?.remove()
      selectedMarker = new ktGms.overlay.Marker({ lngLat: [p.point.lng, p.point.lat] }).addTo(map)
    })

    // poi 결과 배열에 geometry 객체를 추가합니다
    listGeometry.push(new ktGms.geometry.PointGeo([p.point.lng, p.point.lat], { name: `${p.name} ${p.branch}`, info: p.category.masterName, address: `${p.address.siDo} ${p.address.siGunGu} ${p.address.street}` }))
  })
  // 지도에 결과를 표시합니다
  setSource(listGeometry)
}

// 레이어 소스를 셋팅하는 함수입니다. 이전에 레이어를 생성한 적 없다면 생성하고, 레이어가 있다면 소스만 변경합니다
function setSource(data: Array<ktGms.geometry.PointGeo>) {
  if (!map.getLayer('poi-layer')) {
    AddLayer(data)
    return
  }
  map.getSource('poi-source')?.setData(data)
}

// 지도에 poi 결과를 표시하기 위해 레이어를 추가하는 함수입니다
function AddLayer(data: Array<ktGms.geometry.PointGeo>) {
  // 기존에 추가한 레이어와 소스가 있으면 제거합니다
  if (map.getLayer('poi-layer')) map.removeLayer('poi-layer')
  if (map.getSource('poi-source')) map.removeSource('poi-source')

  // 소스 데이터를 생성합니다
  const source = new ktGms.source.GeoJSONSource('poi-source', {
    data: data,
  })

  // 클러스터 레이어를 추가합니다
  map.addLayer(
    new ktGms.layer.ClusterLayer(
      'poi-layer',
      new ktGms.style.CircleStyle(
        {
          'circle-color': '#0076ff',
          'circle-radius': 7,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
        {},
      ),
      source,
      '#ccc',
      '#0076ff',
      '#0000FF',
      'name',
      '',
    ),
  )
}
// 레이어 클릭 시 인포윈도우로 정보가 뜨도록 이벤트를 설정합니다
map.onLayer('click', 'poi-layer', clickLayerEvent)

function clickLayerEvent(e: any) {
  let properties = e.features[0].properties

  let html = `<div>
      <div style="font-weight:bold;">${properties.name}</div>
      <hr></hr>
      <div style="display:flex">
          <div>
              <div class="info">
                  <span class="kind">(${properties.info})</span>
              </div>
              <div class="address">${properties.address}</div>
          </div>
      <div>
  </div>`
  new ktGms.overlay.InfoWindow().setLngLat(e.lngLat).setHTML(html).addTo(map)
}

// 카테고리 검색 Selectbox에 카테고리 리스트를 추가합니다
let master = document.getElementById('master') as HTMLSelectElement
async function getMaster() {
  const masterResult = await searchService.categoryList({ type: 'MASTER' })
  masterResult.categoryList?.forEach((a: any) => {
    // select에 option 태그를 추가합니다
    let option = document.createElement('option')
    option.innerText = a.name
    option.value = a.code ?? ''
    master.appendChild(option)
  })
}

getMaster()

// selectbox에서 카테고리 데이터를 선택했을 때 장소를 검색하는 이벤트리스너를 추가합니다
master?.addEventListener('input', async (_) => {
  document.getElementById('poi-result')!.style.display = 'none'

  let result = await searchService.place({ filters: { category: { code: master.value } }, numberOfResults: 50 })
  const listGeometry: Array<ktGms.geometry.PointGeo> = [] // poi 결과 배열
  result.pois.forEach((p: any, index: number) => {
    // poi 결과 배열에 geometry 객체를 추가합니다
    listGeometry.push(new ktGms.geometry.PointGeo([p.point.lng, p.point.lat], { name: `${p.name} ${p.branch}`, info: p.category.masterName, address: `${p.address.siDo} ${p.address.siGunGu} ${p.address.street}` }))
  })
  setSource(listGeometry)
})
