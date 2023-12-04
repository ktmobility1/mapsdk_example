import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

//지도의 "top-left" 위치에 NavigationControl을 추가합니다. 
map.addControl(new ktGms.control.NavigationControl({
  showZoom: true, // zoom 슬라이더 표시 (default: true)
  showRotate: true, // 나침반 버튼 표시 (default: true)
  showPitch: true, // pitch조정 시 나침반에서 반영하여 표시 (default: false)
  // scaleColor: "black", // 줌 슬라이더 색깔 지정 (default: "#7725ff")
  darkMode: false // 다크모드 여부 설정 (default: false)
}), "top-left");

