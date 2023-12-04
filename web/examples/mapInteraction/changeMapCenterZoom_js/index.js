import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.029414, 37.471401],
	zoom: 14,
	maxPitch: 68,
	navigationControl: true
});

// 줌 변경 버튼 클릭 핸들러
document.getElementById("zoom")?.addEventListener("click", () => {
	let zoom = Math.random() * (20 - 0) + 0 // 0과 20 사이 랜덤 숫자 생성

	// 애니메이션 전환을 사용하여 지도를 지정된 확대/축소 수준으로 확대/축소합니다.
	// 설정할 줌 레벨(최소0 ~ 최대20)
	// 밀리초 단위로 측정된 애니메이션의 지속 시간입니다.
	map.zoomTo(zoom, {duration: 3000});
});

// 중심점 변경 버튼 클릭 핸들러
document.getElementById("center")?.addEventListener("click", () => {
	let lng = Math.random() * (128 - 127) + 127 // 경도 - 127과 128 사이 랜덤 숫자 생성
	let lat = Math.random() * (37 - 35) + 35 // 위도 - 35와 37 사이 랜덤 숫자 생성

	// 지도의 지리적 중심점을 설정합니다. `jumpTo({center: center})`와 동일합니다.
	map.setCenter([lng, lat])
});
