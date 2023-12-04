import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

//지도의 "top-left" 위치에 DrawControl을 추가합니다. 
map.addControl(new ktGms.control.DrawControl({
  measure: true, // 측정 함수 호출 여부 (default: false)
  showIcon: true, // 측정 결과와 중간 결과의 표출을 조작할 수 있는 마커 표출 여부 (default: true)
  iconRemovable: false, // icon 마커 제거 옵션 (default: false)
  resultPosition: "centroid", // 측정 결과가 표시될 위치 (default: "centroid")
  resultOffset: [0.0006, 0.0003], // 측정 결과의 Offset (default: [0.0006, 0.0003])
  lengthUnit: "kilometers", // 길이 측정 결과의 단위 (default: "kilometers")
  boxColor: undefined, // 표출되는 측정 결과의 뒷 배경 색 지정 옵션 (default: undefined)
  boxBorderColor: undefined, // 표출되는 측정 결과의 배경 테두리 색 옵션 (default: undefined)
  boxPosition: "center", // 길이 측정 시 표출되는 중간 결과의 표출 위치 옵션 (default: "center")
  textColor: "#000000", // 표출되는 측정 결과의 text 색 옵션 (default: "#000000")
  draggable: false, // 측정 결과 라벨의 드래그 가능 여부 설정 옵션 (default: false)
  fixedNumber: 5, // 측정 결과의 소수점 뒤에 나타날 자릿수 (default: 5)
}), "top-left");
