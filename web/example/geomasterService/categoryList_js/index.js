import ktGms from 'kt-map-sdk-js';
import geomaster from 'kt-map-sdk-geomaster';

//지도를 생성합니다
let map = new ktGms.Map({
  container: 'map',
  style: 'normal',
  center: [127.017422, 37.49144],
  zoom: 16,
  maxPitch: 68,
  access_token: 'YOUR_ACCESS_TOKEN',
});

let selectbox = document.querySelector('.selectbox');
let master = document.getElementById('master');

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({ accessKey: 'YOUR_ACCESS_TOKEN' });

// 'MASTER' 카테고리 데이터를 가져오는 함수입니다
async function getMaster() {
  const masterResult = await searchService.categoryList({ type: 'MASTER' });
  masterResult.categoryList.forEach((a) => {
    appendOption(a.name, a.code, master)
  })
}

// 선택한 'MASTER'에 맞는 'MIDDLE' 카테고리 데이터를 가져오는 함수입니다
async function getMiddle(selectedMaster) {
  // 'middle' selectbox가 있다면 삭제하고 새로 생성합니다
  if(document.getElementById('middle')) document.getElementById('middle').remove()
  if(document.getElementById('sub')) document.getElementById('sub').remove()
  let middleSelect = document.createElement('select');
  middleSelect.id = 'middle';
  appendOption('Select an MIDDLE category', '', middleSelect, true);

  // searchService.categoryList 사용하여 선택한 'MASTER' 코드에 맞는 'MIDDLE' 카테고리 데이터를 가져옵니다
  const middleResult = (await searchService.categoryList({ type: 'MIDDLE', parentCode: selectedMaster }));

  // 'MIDDLE' 데이터를 option으로 추가합니다
  middleResult.categoryList.forEach((a) => {
    appendOption(a.name, a.code, middleSelect)
  })

  selectbox.appendChild(middleSelect);
  //'MIDDLE' 데이터를 선택했을 때 'SUB' selectbox가 뜨는 이벤트리스너를 추가합니다
  middleSelect.addEventListener('input', (_) => {
    getSub(middleSelect?.value)
  })
}
// 선택한 'MIDDLE'에 맞는 'SUB' 카테고리 데이터를 가져오는 함수입니다
async function getSub(selectedMiddle) {
  // 'sub' selectbox가 있다면 삭제하고 새로 생성합니다
  if(document.getElementById('sub')) document.getElementById('sub').remove()
  let subSelect = document.createElement('select')
  subSelect.id = 'sub'
  appendOption('Select an SUB category', '', subSelect, true)

  // searchService.categoryList 사용하여 선택한 'MIDDLE' 코드에 맞는 'SUB' 카테고리 데이터를 가져옵니다
  const subResult = (await searchService.categoryList({ type: 'SUB', parentCode: selectedMiddle })) 

  // 'SUB' 데이터를 option으로 추가합니다
  subResult.categoryList?.forEach((a) => {
    appendOption(a.name, a.code, subSelect)
  })

  selectbox.appendChild(subSelect)
  //'SUB' 데이터를 선택했을 때 선택한 카테고리의 장소를 검색하는 이벤트리스너를 추가합니다
  subSelect.addEventListener('input', (_) => {
    searchCategory(subSelect.value)
  })
}
// 선택한 카테고리에 맞는 장소를 검색하는 함수입니다
async function searchCategory(selectedSubCode) {
  // searchService.categoryList를 사용하여 선택한 카테고리에 맞는 장소를 검색합니다
  const place = (await searchService.place({ filters: { category: { code: selectedSubCode } } }));
  document.getElementById('features').innerHTML = JSON.stringify(place.pois, null, 2);
}

// select에 option 태그를 추가하는 함수입니다
function appendOption(text, code, parentChild, disabled = false) {
  if (!text || !parentChild)
    return;
  let option = document.createElement('option');
  option.innerText = text;
  option.value = code ?? ''

  if (disabled) {
    option.disabled = true;
    option.selected = true;
  }
  parentChild.appendChild(option);
}

// 'MASTER' 데이터를 선택했을 때 'MIDDLE' selectbox가 뜨는 이벤트리스너를 추가합니다
master.addEventListener('input', (_) => {
  getMiddle(master.value)
});

getMaster(); // 'MASTER' 카테고리 정보를 가져옵니다
