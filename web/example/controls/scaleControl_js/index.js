import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

//지도의 "bottom-right" 위치에 ScaleControl을 추가합니다. 
map.addControl(new ktGms.control.ScaleControl({
  maxWidth: 80, //축척 컨트롤의 최대 길이(픽셀 단위)
  unit: "metric" //축척 컨트롤의 눈금 거리 단위
}), "bottom-right");
