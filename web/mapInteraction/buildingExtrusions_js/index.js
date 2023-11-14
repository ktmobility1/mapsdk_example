import ktGms from "kt-map-sdk-js"

const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.101082, 37.511963],
	zoom: 16,
	maxPitch: 68,
	pitch: 60 // 초기 지도의 기울기 60으로 설정
});

const is3D = document.getElementById("switch");

// 지도 최초 로드 시 3D 건물 가시성 설정합니다.
map.on("load", function () {
	map.changeExtrusionOpacity(is3D.checked ? 1 : 0)
});

// switch가 변경되면 checked여부에 따라 3D 건물 가시성여부를 설정합니다.
is3D?.addEventListener("change", () => {
	if (is3D.checked) {
		// 3D 건물의 불투명도를 1로 설정합니다.
		map.changeExtrusionOpacity(1)
	} else {
		// 3D 건물의 불투명도를 0으로 설정합니다.
		map.changeExtrusionOpacity(0)
	}
});
