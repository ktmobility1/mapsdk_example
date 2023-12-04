import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  // drawControl: true
});

//지도의 "top-left" 위치에 DrawControl을 추가합니다. 
map.addControl(new ktGms.control.DrawControl({
  keybindings: true, // 키보드를 이용한 DrawControl 조작 설정 여부 (default: true)
  boxSelect: false, // boxSelect를 이용한 feature 선택 기능 활성화 여부 (default: true)
  clickBuffer: 2, // 도형이나 특정 포인트를 클릭할 때 반응하는 영역의 범위 (default: 2)
  displayControlsDefault: false, // DrawControl에서 사용할 버튼 표출 커스터마이징 여부 (default: true)
  controls: { // DrawControl에서 표출할 버튼 (default: {})
    "point": true,
    "line_string": true,
    "polygon": true,
    "trash": true,
    "combine_features": true,
    "uncombine_features": true,
    "srmode": true
  } 
}), "top-left");
