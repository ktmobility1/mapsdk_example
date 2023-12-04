import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68,
  ktLogo: false //프리미엄 계정에서만 false가 동작합니다
});

//지도의 "top-left" 위치에 LogoControl을 추가합니다. 
map.addControl(new ktGms.control.LogoControl({}), "top-left");
