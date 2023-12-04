import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

//지도의 "top-right" 위치에 FullscreenControl을 추가합니다. 
map.addControl(new ktGms.control.FullscreenControl({}), "top-right");
