import geomaster from "kt-map-sdk-geomaster";
import ktGms from "kt-map-sdk-js";

let map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  access_token:
    "Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9",
});

// SearchService 객체를 생성합니다
const searchService = new geomaster.SearchService({
  accessKey:
    "Bearer 9886c37a33aca43c88541d669306b8fc431a710760ba0982c524eb30223ecbf657f880a9",
});

let currentSido = document.querySelector("#current .sido") as HTMLDivElement; //선택된 시도
let currentSigungu = document.querySelector(
  "#current .sigungu"
) as HTMLDivElement; // 선택된 시군구
let currentEupmyeondong = document.querySelector(
  "#current .eupmyeondong"
) as HTMLDivElement; //선택된 읍면동
let choiceSido = document.querySelector("#choice-sido") as HTMLDivElement; //시도 리스트
let choiceSigungu = document.querySelector("#choice-sigungu") as HTMLDivElement; //시군구 리스트
let choiceEupmyeondong = document.querySelector(
  "#choice-eupmyeondong"
) as HTMLDivElement; //읍면동 리스트

// '시도' 값을 가져오는 함수입니다
async function getSido() {
  const sidoResult = await searchService.stepByStep();
  sidoResult.address?.forEach((a) => {
    appendOption(a.siDo, choiceSido, () => {
      currentSigungu.innerText = "시/군/구";
      currentEupmyeondong.innerText = "읍/면/동";
      getSigungu(a.siDo);
      currentSido.innerText = a.siDo;
    });
  });
}

// 선택한 '시도'에 맞는 '시군구' 데이터를 가져오는 함수입니다
async function getSigungu(selectedSido: string) {
  // '시군구' selectbox가 있다면 삭제하고 새로 생성합니다
  choiceSigungu.innerHTML = "";

  // searchService.stepByStep를 사용하여 선택한 '시도'에 맞는 '시군구' 데이터를 가져옵니다
  const sigunguResult = await searchService.stepByStep({ siDo: selectedSido });

  // '시군구'데이터를 option으로 추가합니다
  sigunguResult.address?.forEach((a) => {
    appendOption(a.siGunGu, choiceSigungu, () => {
      currentEupmyeondong.innerText = "읍/면/동";
      getEupmyeondong(currentSido.innerText, a.siGunGu);
      currentSigungu.innerText = a.siGunGu;
    });
  });
}

// 선택한 '시도'와 '시군구'에 맞는 '읍면동' 데이터를 가져오는 함수입니다
async function getEupmyeondong(selectedSido: string, selectedSigungu: string) {
  // '시군구' selectbox가 있다면 삭제하고 새로 생성합니다
  choiceEupmyeondong.innerHTML = "";

  // searchService.stepByStep를 사용하여 선택한 '시군구'에 맞는 '읍면동' 데이터를 가져옵니다
  const eupmyeondongResult = await searchService.stepByStep({
    siDo: selectedSido,
    siGunGu: selectedSigungu,
  });

  // '시군구'데이터를 option으로 추가합니다
  eupmyeondongResult.address?.forEach((a) => {
    appendOption(a.eupMyeonDong, choiceEupmyeondong, () => {
      currentEupmyeondong.innerText = a.eupMyeonDong;
      moveMap(currentSido.innerText, currentSigungu.innerText, a.eupMyeonDong);
    });
  });
}

let marker: ktGms.overlay.Marker;
// 선택한 '시도', '시군구', '읍면동'에 맞는 주소로 지도를 이동하는 함수입니다
async function moveMap(
  selectedSido: string,
  selectedSigungu: string,
  selectedEupmyeondong: string
) {
  // searchService.stepByStep를 사용하여 선택한 주소에 맞는 데이터를 가져옵니다
  const eupmyeondongResult = await searchService.stepByStep({
    siDo: selectedSido,
    siGunGu: selectedSigungu,
    eupMyeonDong: selectedEupmyeondong,
  });
  const latLng = eupmyeondongResult.address[0].geographicInformation?.point;
  if (!latLng) return;

  // 지도에 마커로 표시합니다
  marker?.remove();
  marker = new ktGms.overlay.Marker({
    lngLat: [latLng.lng, latLng.lat],
    label: `${selectedSido} ${selectedSigungu} ${selectedEupmyeondong}`,
  }).addTo(map);

  // place 좌표로 지도를 이동합니다
  map.flyTo({ center: [latLng.lng, latLng.lat], speed: 2 });
}

// select에 option 태그를 추가하는 함수입니다
function appendOption(
  text: string,
  parentChild: Element | HTMLElement,
  eventFunc: any
) {
  if (!text || !parentChild) return;
  let option = document.createElement("div") as HTMLElement;
  option.innerText = text;
  option.dataset.name = text;
  option.classList.add("addr");

  parentChild.innerHTML.replace("select", "");

  option.addEventListener("click", () => {
    // 기존에 선택된 요소를 선택 해제 합니다
    Array.prototype.forEach.call(parentChild.children, (element) => {
      if (element.classList.contains("select"))
        element.classList.remove("select");
    });
    // 클릭 시 선택되도록 합니다
    option.classList.add("select");
  });

  // 클릭 이벤트리스너를 추가합니다
  option.addEventListener("click", eventFunc);
  parentChild?.appendChild(option);
}

getSido(); // '시도' 정보를 가져옵니다

// 주소 외 다른 영역 클릭 시 주소 선택 영역이 사라지도록 합니다
function removeAddressDivByMouseClick() {
  document.addEventListener("click", (e: any) => {
    let target = e.target;
    if (!target.className.includes("addr")) {
      document.getElementById("expand")!.style.display = "none";
    }
  });
}
removeAddressDivByMouseClick();

// 주소 현황 클릭했을 때 주소 선택할 수 있는 영역이 뜨도록 합니다
document.getElementById("current")?.addEventListener("click", () => {
  document.getElementById("expand")!.style.display = "flex";
});

// Reverse Geocode로 현재 주소 찾기
async function searchNowAddress() {
  let lngLat = map.getCenter();
  let geocodeResult = await searchService.geocode({ geocodeTerm: lngLat });
  let address = geocodeResult.residentialAddress[0].parcelAddress[0];
  currentSido.innerText = address.siDo;
  currentSigungu.innerText = address.siGunGu;
  currentEupmyeondong.innerText = address.eupMyeonDong;
}

searchNowAddress();

// 지도 드래그 끝났을 때의 주소를 찾습니다
map.on("dragend", () => {
  searchNowAddress();
});

let infoWindow: ktGms.overlay.InfoWindow;

map.on("click", async (e: any) => {
  //지도를 클릭했을 때의 위경도 좌표를 저장합니다
  const lngLat = e.lngLat;

  // geocoding 메소드를 호출합니다
  const data = await searchService.geocode({
    geocodeTerm: { lng: lngLat.lng, lat: lngLat.lat },
  });
  const address = data.residentialAddress[0];

  // 기존 마커가 있으면 삭제하고, 새로 클릭한 곳에 마커를 생성합니다
  if (marker) marker.remove();
  marker = new ktGms.overlay.Marker({
    lngLat: [lngLat.lng, lngLat.lat],
  }).addTo(map);

  let html = `
  <h3>${address.parcelAddress ? address.parcelAddress[0].fullAddress : ""}</h3>
  ${
    address.roadAddress && address.roadAddress?.length > 0
      ? "<h4>[지번]" + address.roadAddress[0].fullAddress + "</h4>"
      : ""
  }
    (위도: ${lngLat.lat}  경도: ${lngLat.lng})
  `;
  // geocoding 메소드를 호출하여 얻은 주소를 infoWindow로 표출합니다
  infoWindow = new ktGms.overlay.InfoWindow().setHTML(html);
  marker.setInfoWindow(infoWindow, true);
});
