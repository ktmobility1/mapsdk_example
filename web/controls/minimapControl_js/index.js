import ktGms from "kt-map-sdk-js"

//지도를 생성합니다.
const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.029414, 37.471401],
	zoom: 16,
	maxPitch: 68,
	// minimapControl: true
});

//지도의 "bottom-right" 위치에 MinimapControl을 추가합니다. 
map.addControl(new ktGms.control.MinimapControl({
	width: 320, //미니맵 너비
    height: 180, //미니맵 높이
}), "bottom-right");
