import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

//지도의 "top-left" 위치에 MeasureControl을 추가합니다. 
map.addControl(new ktGms.control.MeasureControl({
  markerPosition: "centroid", // 측정 결과가 표시될 위치 (default: "centroid")
  lengthUnit: "kilometers", // 길이 측정 결과의 단위 (default: "kilometers")
  boxColor: "#FFFFFF", // 표출되는 측정 결과의 뒷 배경 표시 여부 및 색 지정 (default: undefined)
  boxPosition: "top-left", // 거리 측정 시 표출되는 중간 결과의 표출 위치 (default: "center")
  boxBorderColor: "#000000", // 표출되는 측정 결과의 뒷 배경 테두리 색 (default: "#3bb2d0")
  textColor: "#000000", // 표출되는 측정 결과의 text 색 (default: "#000000")
  draggable: false, // 측정 결과 라벨 드래그 가능 여부 (default: false)
  visibility: true // 측정 컨트롤 버튼 표출 여부 (default: true)
}), "top-left");
